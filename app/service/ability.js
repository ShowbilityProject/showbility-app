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

export async function getTagList() {
  let url = `${HOST}/tags/`;
  const res = await asyncGet(url);
  return res;
}