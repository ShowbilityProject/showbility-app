import {HOST} from '../common/constant';
import {get, post} from '../common/requester';

export function postComment(message, contentId, parentComment) {
  let url = `${HOST}/comment/`;
  let body = {
    detail: message,
    content: contentId,
  };
  if (parentComment) {
    body.parentComment = parentComment;
  }
  return post(url, body)
    .then(res => res.json())
    .catch(err => console.log(err));
}

export function getComment(contentId) {
  let url = `${HOST}/comment/?contentId=${contentId}`;
  return get(url)
    .then(res => res.json())
    .catch(err => console.log(err));
}
