import * as SecureStore from "expo-secure-store";

async function storeUserSession(key, data) {
  try {
    await SecureStore.setItemAsync(key, data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function retrieveUserSession(key) {
  try {
    const session = await SecureStore.getItemAsync(key);

    if (session !== undefined) {
      return session;
    }
  } catch (error) {
    console.log('Error retrieveUserSession', error);
    return undefined;
  }
}

async function removeUserSession(key) {
  try {
    await SecureStore.deleteItemAsync(key);
    return true;
  } catch (error) {
    return false;
  }
}

export {storeUserSession, retrieveUserSession, removeUserSession};
