import {HOST} from '../common/constant';
import {asyncPost, get, post, rawPost} from '../common/requester';

export function getContentsList(page = 1, page_size = 10) {
  let url = `${HOST}/contents/?page=${page}&page_size=${page_size}`;
  return get(url)
    .then(response => response.json())
    .catch(err => console.log(err));
}

export function getNestContentsList(url) {
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

export function getContentById(contentId) {
  let url = `${HOST}/contents/${contentId}/`;
  return get(url)
    .then(response => response.json())
    .catch(err => {
      console.log('Get Error : ', err.message);
    });
}

export async function uploadContentMeta(title, categories, tags, detail) {
  let url = `${HOST}/contents/`;
  const body = {
    title: title,
    categories: categories,
    tags: tags,
    detail: detail,
  };
  const res = await asyncPost(url, body);
  return res;
}

export async function uploadImageWithContentId(image, contentId, order) {
  const url = `${HOST}/contents/${contentId}/image/`;
  const formData = new FormData();
  const imageData = {
    type: image.type,
    uri: image.uri,
    name: image.fileName,
  };
  console.log(image);
  formData.append('image', imageData);
  formData.append('order', order);
  const res = await rawPost(url, formData);
  return res;
}
