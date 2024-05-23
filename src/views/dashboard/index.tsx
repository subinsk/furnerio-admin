"use client";

import Iconify from "@/components/iconify";
import { paths } from "@/routes/paths";
import { Card, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function DashboardView() {
  // variables
  const items = [
    {
      title: "Categories",
      icon: "category",
      href: paths.dashboard.categories.root,
    },
    {
      title: "Products",
      icon: "building-store",
      href: paths.dashboard.products.root,
    },
    {
      title: "Orders",
      icon: "truck-delivery",
      href: paths.dashboard.orders.root,
    },
    {
       title: "Banner Images",
      icon: "photo",
      href: paths.dashboard.bannerImages.root,
    }
  ];

  return (
    <Stack direction="row" spacing="24px" sx={{ mt: 1, p: 3 }} flexWrap="wrap">
      {items.map((item, index) => (
        <Card
          key={index}
          component={Link}
          href={item.href}
          sx={{
            width: "270px",
            height: "200px",
            padding: "12px",
            textDecoration: "none",
          }}
        >
          <Stack direction="row" alignItems="center" spacing="12px">
            <Iconify icon={`tabler:${item.icon}`} width={44} />
            <Typography variant="h5">{item.title}</Typography>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
