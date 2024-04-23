import Iconify from "@/components/iconify";
import { paths } from "@/routes/paths";
import { Card, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function Page() {
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
  ];

  return (
    <Stack direction="row" spacing="24px" sx={{ mt: 3, p: 3 }} flexWrap="wrap">
      {items.map((item, index) => (
        <Card
          key={index}
          component={Link}
          href={item.href}
          sx={{
            width: "270px",
            height: "200px",
            padding: "12px",
          }}
        >
          <Stack direction="row" alignItems="center" spacing="12px">
            <Iconify icon={`tabler:${item.icon}`} width={32} />
            <Typography variant="h4">{item.title}</Typography>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
