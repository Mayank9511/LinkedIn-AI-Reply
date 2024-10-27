import { useEffect } from "react";
import { icons } from "@/assets/icons";

const App = () => {
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id! },
        func: (icons) => {
          const generateResponse = (userPrompt: string) => {
            return "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
          };

          /* Modal to input prompt and generate response */
          const createModal = () => {
            const targetElement = document.querySelector(
              ".msg-s-message-list__typing-indicator-container--without-seen-receipt"
            );

            if (!targetElement) return;
            const targetRect = targetElement.getBoundingClientRect();

            const modalWrapper = document.createElement("div");
            modalWrapper.id = "ai-modal-wrapper";
            modalWrapper.style.position = "fixed";
            modalWrapper.style.top = "0";
            modalWrapper.style.left = "0";
            modalWrapper.style.width = "100vw";
            modalWrapper.style.height = "100vh";
            modalWrapper.style.backgroundColor = "#0D0D1233";
            modalWrapper.style.display = "flex";
            modalWrapper.style.justifyContent = "center";
            modalWrapper.style.alignItems = "center";
            modalWrapper.style.zIndex = "1000";

            const modalContent = document.createElement("div");
            modalContent.style.position = "absolute";
            modalContent.style.padding = "15px";
            modalContent.style.bottom = `${targetRect.bottom - 250}px`;
            modalContent.style.left = `${targetRect.left + 10}px`;
            modalContent.style.width = `${targetRect.width - 20}px`;
            modalContent.style.backgroundColor = "white";
            modalContent.style.borderRadius = "10px";
            modalContent.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
            modalContent.style.display = "flex";
            modalContent.style.flexDirection = "column";
            modalContent.style.justifyContent = "end";
            modalContent.style.alignItems = "end";

            /* Detect click outside modal */
            modalWrapper.addEventListener("click", (e) => {
              if (e.target === modalWrapper) {
                document.body.removeChild(modalWrapper);
              }
            });

            /* Input Prompt */
            const promptInput = document.createElement("input");
            promptInput.placeholder = "Your prompt";
            promptInput.style.color = "#666D80";
            promptInput.style.padding = "10px";
            promptInput.style.width = `${targetRect.width - 50}px`;
            promptInput.style.border = "1px solid #C1C7D0";
            promptInput.style.borderRadius = "5px";
            promptInput.style.margin = "5px 0";

            /* Generate button */
            const generateButton = document.createElement("button");
            generateButton.innerHTML = `${icons.generate} <div style="margin-bottom: 2px; margin-left:2px; font-weight: 500;"> Generate </div>`;

            generateButton.style.marginTop = "10px";
            generateButton.style.padding = "2px 8px 2px 8px";
            generateButton.style.border = "none";
            generateButton.style.backgroundColor = "#3B82F6";
            generateButton.style.color = "#fff";
            generateButton.style.display = "flex";
            generateButton.style.alignItems = "center";
            generateButton.style.borderRadius = "5px";
            generateButton.style.cursor = "pointer";
            generateButton.style.height = "30px";
            generateButton.style.width = "105px";

            modalContent.appendChild(promptInput);
            modalContent.appendChild(generateButton);
            modalWrapper.appendChild(modalContent);

            document.body.appendChild(modalWrapper);

            /* Generate button logic */
            generateButton.addEventListener("click", () => {
              const userPrompt = promptInput.value;
              if (userPrompt) {
                /* To show loading in case of API call */
                // generateButton.innerHTML = `<div style="padding-left: 5px; font-weight: 600;"> Loading... </div>`;

                generateButton.disabled = true;
                promptInput.value = "";
                try {
                  /* Get response for user input */
                  const response = generateResponse(userPrompt);

                  // console.log("user prompt: ", userPrompt);
                  // console.log("response: ", response);

                  /* Response text box */
                  const responseText = document.createElement("p");
                  responseText.innerText = response;
                  responseText.style.padding = "10px";
                  responseText.style.marginBottom = "10px";
                  responseText.style.maxWidth = "80%";
                  responseText.style.minWidth = "30%";
                  responseText.style.alignSelf = "flex-start";
                  responseText.style.backgroundColor = "#DBEAFE";
                  responseText.style.color = "#666D80";
                  responseText.style.fontWeight = "400";
                  responseText.style.fontSize = "12px";
                  responseText.style.borderRadius = "8px";
                  modalContent.insertBefore(responseText, promptInput);

                  /* Input text box */
                  const inputText = document.createElement("p");
                  inputText.innerText = userPrompt;
                  inputText.style.padding = "10px";
                  inputText.style.marginBottom = "10px";
                  inputText.style.maxWidth = "80%";
                  inputText.style.minWidth = "30%";
                  inputText.style.alignSelf = "flex-end";
                  inputText.style.backgroundColor = "#DFE1E7";
                  inputText.style.color = "#666D80";
                  inputText.style.fontWeight = "400";
                  inputText.style.fontSize = "12px";
                  inputText.style.borderRadius = "8px";
                  modalContent.insertBefore(inputText, responseText);

                  const buttonWrapper = document.createElement("div");
                  buttonWrapper.style.display = "flex";
                  buttonWrapper.style.justifyContent = "flex-end";

                  /* Insert button */
                  const insertButton = document.createElement("button");
                  insertButton.innerHTML = `${icons.insert} <div style="margin-bottom: 2px; margin-left:3px; font-weight: 500;"> Insert </div>`;
                  insertButton.style.marginTop = "10px";
                  insertButton.style.marginRight = "10px";
                  insertButton.style.padding = "2px 8px 2px 8px";
                  insertButton.style.border = "2px solid #666D80";
                  insertButton.style.color = "#666D80";
                  insertButton.style.display = "flex";
                  insertButton.style.alignItems = "center";
                  insertButton.style.borderRadius = "5px";
                  insertButton.style.cursor = "pointer";
                  insertButton.style.height = "30px";
                  insertButton.style.width = "75px";

                  /* Regenerate button */
                  const regenerateButton = document.createElement("button");
                  regenerateButton.innerHTML = `${icons.regenerate}<div style="margin-bottom: 2px; margin-left:3px; font-weight: 500;"> Regenerate </div>`;
                  regenerateButton.style.marginTop = "10px";
                  regenerateButton.style.padding = "2px 8px 2px 8px";
                  regenerateButton.style.border = "none";
                  regenerateButton.style.backgroundColor = "#3B82F6";
                  regenerateButton.style.color = "white";
                  regenerateButton.style.display = "flex";
                  regenerateButton.style.alignItems = "center";
                  regenerateButton.style.borderRadius = "5px";
                  regenerateButton.style.cursor = "pointer";
                  regenerateButton.style.height = "30px";
                  regenerateButton.style.width = "110px";

                  buttonWrapper.appendChild(insertButton);
                  buttonWrapper.appendChild(regenerateButton);

                  /* Replace Generate button with the Insert and Regenerate buttons */
                  modalContent.replaceChild(buttonWrapper, generateButton);

                  /* Insert button logic */
                  insertButton.addEventListener("click", () => {
                    document.body.removeChild(modalWrapper);

                    const contentEditableDiv = document.querySelector(
                      ".msg-form__contenteditable"
                    ) as HTMLElement;

                    if (contentEditableDiv) {
                      contentEditableDiv.innerHTML = "";

                      const newContent = document.createElement("p");
                      newContent.textContent = responseText.innerText;

                      contentEditableDiv.appendChild(newContent);

                      const range = document.createRange();
                      const selection = window.getSelection();

                      range.setStartAfter(newContent);
                      range.collapse(true);

                      selection?.removeAllRanges();
                      selection?.addRange(range);

                      const inputEvent = new Event("input", {
                        bubbles: true,
                        cancelable: true,
                      });
                      contentEditableDiv.dispatchEvent(inputEvent);

                      contentEditableDiv.focus();
                    }
                  });

                  /* Regenerate button logic */
                  regenerateButton.addEventListener("click", () => {
                    // console.log("regenerate button clicked");
                  });
                } catch (error) {
                  alert(`Failed to fetch response.`);
                  // console.error(error);
                }
              } else {
                alert("Please enter a prompt.");
              }
            });
          };

          /* Show AI Icon on the bottom-right side of Input Box */
          const addAIIcon = () => {
            const contentEditableDiv = document.querySelector(
              ".msg-form__contenteditable"
            ) as HTMLElement;

            removeAIIcon();

            const aiIcon = document.createElement("div");
            aiIcon.id = "ai-icon";
            aiIcon.innerHTML = `${icons.aiIcon}`;

            aiIcon.style.position = "absolute";
            aiIcon.style.bottom = "5px";
            aiIcon.style.right = "5px";
            aiIcon.style.borderRadius = "50%";
            aiIcon.style.backgroundColor = "white";
            aiIcon.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            aiIcon.style.display = "flex";
            aiIcon.style.cursor = "pointer";
            aiIcon.style.padding = "4px";

            /* Create Modal on click of AI Icon */
            aiIcon.onclick = () => {
              createModal();
            };

            if (contentEditableDiv) {
              contentEditableDiv.style.position = "relative";
              contentEditableDiv.appendChild(aiIcon);
            }
          };

          const removeAIIcon = () => {
            const existingIcon = document.getElementById("ai-icon");
            if (existingIcon) {
              existingIcon.remove();
            }
          };

          const setupClickListener = () => {
            document.addEventListener("click", attachIconOnFocus);
          };

          /* Detect focus on Input box */
          const attachIconOnFocus = () => {
            const inputBox = document.querySelector(
              ".msg-form__msg-content-container--is-active"
            );

            if (inputBox) {
              addAIIcon();
            } else {
              removeAIIcon();
            }
          };

          /* Detect click on message screen */
          setupClickListener();
        },
        args: [icons],
      });
    });
  }, []);

  return (
    <div className="w-72 p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
      <h1 className="text-lg font-semibold text-blue-600 mb-3">
        LinkedIn - AI Reply
      </h1>
      <p className="text-gray-600 text-center mb-4">
        Generate quick and professional replies for LinkedIn messages.
      </p>
    </div>
  );
};

export default App;
