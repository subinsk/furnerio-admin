import { _id, _postTitles } from '@/_mock/assets';

const ROOTS = {
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
};


// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

export const paths = {
  auth: {
    root: ROOTS.AUTH,
    login: `${ROOTS.AUTH}/login`,
  },
  dashboard: {
    root: ROOTS.DASHBOARD,
    categories: {
      root: `${ROOTS.DASHBOARD}/categories`,
      new: `${ROOTS.DASHBOARD}/add-category`,
    },
    products: {
      root: `${ROOTS.DASHBOARD}/products`,
      new: `${ROOTS.DASHBOARD}/add-product`,
    },
    orders: {
      root: `${ROOTS.DASHBOARD}/orders`,
      details: (id: string) => `${ROOTS.DASHBOARD}/order/${id}`,
      demo: {
        details: `${ROOTS.DASHBOARD}/order/${MOCK_ID}`,
      },
    },
    bannerImages: {
      root: `${ROOTS.DASHBOARD}/banner-images`,
    },
  },
};
