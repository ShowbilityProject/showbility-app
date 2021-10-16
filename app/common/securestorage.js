import EncryptedStorage from 'react-native-encrypted-storage';

async function storeUserSession(key, data) {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(data));
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

export {storeUserSession, retrieveUserSession};