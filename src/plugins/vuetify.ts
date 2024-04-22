import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import defaultLightTheme from "@/assets/styles/defaultLightTheme";

export const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "defaultLightTheme",
    themes: { defaultLightTheme },
  },
});

export default vuetify;
