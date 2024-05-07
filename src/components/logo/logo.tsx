"use client";

import { forwardRef } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
// routes
import { RouterLink } from "@/routes/components";
import Image from "next/image";

// ----------------------------------------------------------------------

const Logo = forwardRef(
  (
    {
      disabledLink = false,
      sx,
      ...other
    }: { disabledLink?: boolean; sx?: any; [key: string]: any },
    ref
  ) => {
    const theme = useTheme();

    const PRIMARY_LIGHT = theme.palette.primary.light;

    const PRIMARY_MAIN = theme.palette.primary.main;

    const PRIMARY_DARK = theme.palette.primary.dark;

    // OR using local (public folder)
    // -------------------------------------------------------
    const logo = <Image src="/next.svg" alt="logo" width={40} height={40} />;

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: "contents" }}>
        {logo}
      </Link>
    );
  }
);

Logo.displayName = "Logo";

export default Logo;
