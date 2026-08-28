import { createApp } from "vue";
import "@fontsource/ma-shan-zheng";
import "lxgw-wenkai-webfont/lxgwwenkai-regular.css";
import "lxgw-wenkai-webfont/lxgwwenkai-bold.css";
import App from "./App.vue";
import router from "./router.js";
import { revealDirective } from "./motion.js";
import "./styles.css";
import "./star-map.css";
import "./heritage-type.css";

createApp(App).directive("reveal", revealDirective).use(router).mount("#app");
