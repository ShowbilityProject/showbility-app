import {HOST} from '../common/constant';
import {get, rawPost} from '../common/requester';

export async function createGroup(
  name,
  detail,
  visible,
  categories,
  tags,
  image,
) {
  let url = `${HOST}/group/`;
  const formData = new FormData();
  formData.append('name', name);
  formData.append('detail', detail);
  formData.append('is_visible', visible);
  for (var category of categories) formData.append('categories', category);
  for (var tag of tags) formData.append('tags', tag);

  const imageData = {
    type: image.type,
    uri: image.uri,
    name: image.fileName,
  };
  formData.append('repr_image', imageData);
  const res = await rawPost(url, formData);
  return res;
}

export const GET_GROUP_TYPE = {
  ALL: 'all',
  MY: 'my',
  GATHERING: 'gathering',
};

export function getGroups(_type = GET_GROUP_TYPE.ALL) {
  let url = `${HOST}/group/`;
  url += `?type=${_type}`;
  console.log(url);
  return get(url)
    .then(res => res.json())
    .catch(err => console.log('Error getGroups', err.message));
}

export function getGroupById(id) {
  let url = `${HOST}/group/`;
  url += `${id}/`;
  console.log(url);
  return get(url)
    .then(res => res.json())
    .catch(err => console.log('Error getGroupById', err.message));
}