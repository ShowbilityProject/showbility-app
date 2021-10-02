import {HOST} from '../common/constant';
import {get} from '../common/requester';

export function getAbilityList() {
  let url = `${HOST}/categories/`;
  return get(url)
    .then(res => res.json())
    .catch(err => console.log(err));
}
