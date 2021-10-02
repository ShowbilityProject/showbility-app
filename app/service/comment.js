import {HOST} from '../common/constant';
import {post} from '../common/requester';

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
