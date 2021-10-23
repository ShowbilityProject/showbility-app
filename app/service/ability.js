import {HOST} from '../common/constant';
import {asyncGet, get} from '../common/requester';

export function getAbilityList() {
  let url = `${HOST}/categories/`;
  return get(url)
    .then(res => res.json())
    .catch(err => console.log(err));
}

export function getCategoryList() {
  let url = `${HOST}/categories/`;
  return get(url)
    .then(res => res.json())
    .catch(err => console.log(err));
}

export async function getTagList(categories = []) {
  let url = `${HOST}/tags/?`;
  url += '&sections=' + encodeURIComponent('감성');
  for (var category of categories) {
    url += `&categories=${encodeURIComponent(category)}`;
  }
  console.log(url);
  const res = await asyncGet(url);
  return res;
}
