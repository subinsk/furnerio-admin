import Link from "next/link";
import { forwardRef, LegacyRef } from "react";

// ----------------------------------------------------------------------

const RouterLink = forwardRef(function RouterLink(
  { href, ...other }: { href: string; [key: string]: any },
  ref: LegacyRef<HTMLAnchorElement> | undefined
) {
  return <Link ref={ref} href={href} {...other} />;
});

RouterLink.displayName = "RouterLink"; // Add the displayName property

export default RouterLink;
