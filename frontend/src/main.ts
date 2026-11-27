import "@fontsource/anton/400.css";
import "@fontsource-variable/inter";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";

import { createPinia } from "pinia";
import { createApp } from "vue";

import "@/assets/styles/tokens.css";
import "@/assets/styles/base.css";

import App from "./App.vue";
import { router } from "./router";

createApp(App).use(createPinia()).use(router).mount("#app");
