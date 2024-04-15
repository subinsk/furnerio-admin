"use client";

import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import { useSettingsContext } from "@/components/settings/context";
import { paths } from "@/routes/paths";
import AddCategoryForm from "@/sections/dashboard/categories/add-category-form";
import CategoriesList from "@/sections/dashboard/categories/categories-list";
import { Container } from "@mui/material";

export default function CategoriesView() {
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
            name: "Categories",
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CategoriesList />
    </Container>
  );
}