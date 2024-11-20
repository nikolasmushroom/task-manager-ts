import { RootState } from "../../../app/store";

export const selectCaptchaUrl = (state : RootState) => state.auth.captchaUrl