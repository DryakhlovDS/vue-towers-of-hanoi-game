import { createApp } from "vue";
import App from "./App.vue";
import TheCard from "./components/UI/TheCard.vue";
import BaseButton from "./components/UI/TheButton.vue";

const app = createApp(App);
app.component("the-card", TheCard);
app.component("base-button", BaseButton);
app.mount("#app");
