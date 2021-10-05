import { HOST } from "../common/constant";
import { post, rawPost } from "../common/requester";


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
