import * as SecureStore from "expo-secure-store";

const loadingState = Symbol("loading");
const TOKEN_KEY = "authToken" as const;

function createTokenStore() {
  let tokenCache: string | null | typeof loadingState = loadingState;

  return {
    getToken: async () => {
      if (tokenCache === loadingState) {
        tokenCache = await SecureStore.getItemAsync(TOKEN_KEY);
      }

      return tokenCache;
    },

    setToken: async (token: string) => {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      tokenCache = token;
    },
    invalidateCache: () => {
      tokenCache = loadingState;
    },
  };
}

export const tokenStore = createTokenStore();
