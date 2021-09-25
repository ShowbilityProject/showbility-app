import {HOST} from '../common/constant';
import {get, post} from '../common/requester';

export function getContentsList(page = 1, page_size = 10) {
  let url = `${HOST}/contents/?page=${page}&page_size=${page_size}`;
  return get(url)
    .then(response => response.json())
    .catch(err => console.log(err));
}

export function getContent(url) {
  return get(url)
    .then(response => response.json())
    .catch(err => {
      console.log('Get Error : ', err.message);
    });
}