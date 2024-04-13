import PropTypes from "prop-types";
import { useEffect } from "react";
// rtl
import rtlPlugin from "stylis-plugin-rtl";
// emotion
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

// ----------------------------------------------------------------------

export default function RTL({
  children,
  themeDirection,
}: {
  children: React.ReactNode;
  themeDirection: "rtl" | "ltr";
}) {
  useEffect(() => {
    document.dir = themeDirection;
  }, [themeDirection]);

  const cacheRtl = createCache({
    key: "rtl",
    prepend: true,
    // https://github.com/styled-components/stylis-plugin-rtl/issues/35
    stylisPlugins: [rtlPlugin],
  });

  if (themeDirection === "rtl") {
    return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
  }

  return <>{children}</>;
}

RTL.propTypes = {
  children: PropTypes.node,
  themeDirection: PropTypes.oneOf(["rtl", "ltr"]),
};

// ----------------------------------------------------------------------

export interface Theme {
  direction: "rtl" | "ltr";
}

export function direction(themeDirection: "rtl" | "ltr"): Theme {
  const theme: Theme = {
    direction: themeDirection,
  };

  return theme;
}
