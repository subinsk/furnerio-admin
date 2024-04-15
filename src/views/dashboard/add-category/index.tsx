"use client";

import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import { useSettingsContext } from "@/components/settings";
import { paths } from "@/routes/paths";
import AddCategoryForm from "@/sections/dashboard/categories/add-category-form";
import { Container } from "@mui/material";

export default function AddCategoryView() {
  const settings: any = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading="Categories"
        links={[
          {
            name: "Dashboard",
            href: paths.dashboard.root,
          },
          {
            name: "Add Category",
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <AddCategoryForm />
    </Container>
  );
}
