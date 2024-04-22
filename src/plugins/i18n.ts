import { createI18n } from "vue-i18n";
import fr from "@/assets/locales/fr.json";
import LangEnum from "@/core/types/enums/langEnum";

const i18n = createI18n({
  legacy: false,
  locale: LangEnum.FR,
  fallbackLocale: LangEnum.FR,
  messages: { fr },
});

export default i18n;
