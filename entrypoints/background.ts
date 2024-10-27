export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
});
// export default defineBackground(() => {
//   console.log('Hello world!');
// });