const ROOTS = {
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
};

export const paths = {
  auth: {
    root: ROOTS.AUTH,
    login: `${ROOTS.AUTH}/login`,
  },
  dashboard: {
    root: ROOTS.DASHBOARD,
  },
};
