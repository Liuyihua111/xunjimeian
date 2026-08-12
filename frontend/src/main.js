import { createApp } from "vue";
import "@fontsource/ma-shan-zheng";
import "@fontsource/noto-serif-sc/600.css";
import "lxgw-wenkai-webfont/lxgwwenkai-bold.css";
import App from "./App.vue";
import router from "./router.js";
import "./styles.css";
import "./star-map.css";
import "./heritage-type.css";

createApp(App).use(router).mount("#app");
