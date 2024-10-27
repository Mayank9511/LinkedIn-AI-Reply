import { defineConfig } from "wxt";

export default defineConfig({
  manifest: {
    manifest_version: 3,
    version: "1.0.0",
    name: "LinkedIn - AI Reply",
    action: {
      default_popup: "index.html",
    },
    permissions: ["scripting", "activeTab", "tabs"],
    host_permissions: ["https://www.linkedin.com/messaging/*"],
    content_security_policy: {
      extension_pages: "script-src 'self'; object-src 'self';",
    },
  },
  modules: ["@wxt-dev/module-react"],
});
