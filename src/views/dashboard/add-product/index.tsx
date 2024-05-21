"use client";

import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import { useSettingsContext } from "@/components/settings";
import { paths } from "@/routes/paths";
import AddProductForm from "@/sections/dashboard/products/add-product-form";
import { Container } from "@mui/material";

export default function AddProductView() {
  const settings: any = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading="Create a new product"
        links={[
          {
            name: "Dashboard",
            href: paths.dashboard.root,
          },
          {
            name: "Products",
            href: paths.dashboard.products.root,
          },
          { name: "New product" },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <AddProductForm />
    </Container>
  );
}
