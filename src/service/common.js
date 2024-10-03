import AsyncStorage from '@react-native-async-storage/async-storage';
import {HOST} from '../common/constant';
import {isEmpty} from '../common/util';

const REACENT_SEARCH = 'recent_search';

export async function saveSearchWord(word) {
  let words = await getRecentSearchWord();
  if (isEmpty(word)) return words;
  if (words.includes(word)) return words;
  else {
    words.unshift(word);
    await AsyncStorage.setItem(REACENT_SEARCH, JSON.stringify(words));
    return words;
  }
}

export async function getRecentSearchWord() {
  let words = await AsyncStorage.getItem(REACENT_SEARCH);
  words = words === null ? [] : JSON.parse(words);
  return words;
}

export async function clearRecentSearchWord() {
  console.log('Clear recent search words');
  await AsyncStorage.setItem(REACENT_SEARCH, '[]');
}

export async function getPrivacyText(tp = 'priv') {
  console.debug('Request getPrivacyText type=' + tp);

  let uri = `${HOST}/static/privacy`;
  let ret = await fetch(uri, {method: 'GET'});
  if (ret.ok) return ret.text();
  else return false;
}
