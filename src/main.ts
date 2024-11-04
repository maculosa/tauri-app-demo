import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router/index";
import { pinia } from "./store";

// import { enable, isEnabled } from '@tauri-apps/plugin-autostart';

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");

// 启用 autostart
// await enable();

// 检查 autostart 是否启用
// console.log(`registered for autostart ? ${await isEnabled()}`);

// 禁用 autostart
// await disable();
