import {RootState} from "../../../app/store";

export const selectIsInitialized = (state : RootState) => state.auth.isInitialized