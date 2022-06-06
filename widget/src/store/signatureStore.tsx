import utils from '../utils';

const loadImages = async (page = 1) => {
  const path = utils.server.getUrl();

  const response = await fetch(`${path}/api/signatures/approved?page=${page}&limit=40`);

  if (response.status === 200) {
    const images = await response.json();

    return images;
  }

  return [];
}

export {
  loadImages,
}
