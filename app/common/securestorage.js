import EncryptedStorage from 'react-native-encrypted-storage';

async function storeUserSession(key, data) {
  try {
    await EncryptedStorage.setItem(key, data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function retrieveUserSession(key) {
  try {
    const session = await EncryptedStorage.getItem(key);

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
    await EncryptedStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
}

export {storeUserSession, retrieveUserSession, removeUserSession};
