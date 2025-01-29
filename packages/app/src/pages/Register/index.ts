import { AgreementRoute } from "./AgreementPage";
import { InfoRoute } from "./InfoPage";

export const registerScreens = {
  "Register.Agreement": AgreementRoute,
  "Register.Info": InfoRoute,
} as const;
