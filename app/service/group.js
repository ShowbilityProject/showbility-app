import {GROUP_CONTENT_STATUS, HOST} from '../common/constant';
import {deleteReq, get, post, rawPost} from '../common/requester';

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

export function getGroups(_type = GET_GROUP_TYPE.ALL, tags = []) {
  let url = `${HOST}/group/`;
  url += `?type=${_type}`;
  for (let tag of tags) {
    url += `&tags=${tag}`;
  }
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

export function getNextGroupsList(url) {
  return get(url)
    .then(res => res.json())
    .catch(err => console.log('Error fetching next', err.message));
}

export function getGroupMembersByGroupId(groupId, status) {
  let url = `${HOST}/group/${groupId}/members/?status=${status}`;
  return get(url)
    .then(res => res.json())
    .catch(err => console.log('Error fetching group members', err.message));
}

export function requestGroupJoin(groupId) {
  let url = `${HOST}/group/${groupId}/members/`;
  return post(url)
    .then(res => {
      if (res.ok) return res.json();
      else return res.status;
    })
    .catch(err => console.log('Error request join group', err.message));
}

export function requestDeleteGroupJoin(groupId) {
  let url = `${HOST}/group/${groupId}/members/`;
  return deleteReq(url)
    .then(res => {
      if (res.ok) return res.json();
      else return res.status;
    })
    .catch(err => console.log('Error request join group', err.message));
}

export function getNext(url) {
  return get(url)
    .then(res => res.json())
    .catch(err => console.log('Error fetching next', err.message));
}

export function requestAddContentToGroup(groupId, contentId) {
  let url = `${HOST}/group/${groupId}/contents/`;
  let body = {
    content_id: contentId,
  };
  return post(url, body)
    .then(res => res.json())
    .catch(err =>
      console.log('Error request add content to group', err.message),
    );
}

export function updateMemberStatus(groupId, memberId, status) {
  let url = `${HOST}/group/${groupId}/members/${memberId}/`;
  let body = {
    status: status,
  };
  return post(url, body, true, 'PATCH')
    .then(res => res.json())
    .catch(err => {
      console.error('Error update member status', err.message);
      return false;
    });
}

export function getGroupContentList(
  groupId,
  status = GROUP_CONTENT_STATUS.ACTIVE,
) {
  let url = `${HOST}/group/${groupId}/contents/?status=${status}`;
  return get(url)
    .then(res => res.json())
    .catch(err => {
      console.error('Error update member status', err.message);
      return false;
    });
}

export function updateGroupContentStatus(groupId, groupContentId, status) {
  let url = `${HOST}/group/${groupId}/contents/${groupContentId}/`;
  let body = {
    status: status,
  };
  return post(url, body, true, 'PATCH')
    .then(res => res.json())
    .catch(err => {
      console.error('Error update member status', err.message);
      return false;
    });
}
