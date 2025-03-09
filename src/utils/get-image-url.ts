import { SERVER_IMAGE_URL } from '../types/product';

export const getImageUrl = (imageUrl: string) => {
  return imageUrl.startsWith('/uploads')
    ? SERVER_IMAGE_URL + imageUrl
    : imageUrl;
};
