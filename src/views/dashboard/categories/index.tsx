"use client";

import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import { useSettingsContext } from "@/components/settings/context";
import { paths } from "@/routes/paths";
import AddCategoryForm from "@/sections/dashboard/categories/add-category-form";
import CategoriesList from "@/sections/dashboard/categories/categories-list";
import ProductsList from "@/sections/dashboard/products/list";
import { useGetCategories } from "@/services/category.service";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`item-tabpanel-${index}`}
      aria-labelledby={`item-tab-${index}`}
      {...other}
    >
      {value === index ? <Box sx={{ p: 3 }}>{children}</Box> : null}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `item-tab-${index}`,
    "aria-controls": `item-tabpanel-${index}`,
  };
}

export default function CategoriesView({
  categorySlug,
}: {
  categorySlug?: string;
}) {
  const settings: any = useSettingsContext();

  // states
  const [tab, setTab] = useState<number>(0);

  // functions
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  //

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
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="Categories" {...a11yProps(0)} />
          <Tab
            label="Products"
            disabled={categorySlug ? false : true}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>

      <CustomTabPanel value={tab} index={0}>
        <CategoriesList categorySlug={categorySlug} />
      </CustomTabPanel>

      <CustomTabPanel value={tab} index={1}>
        <ProductsList categorySlug={categorySlug} />
      </CustomTabPanel>
    </Container>
  );
}
