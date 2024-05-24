import Iconify from "@/components/iconify";
import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";
import { Button, Stack } from "@mui/material";
import ProductsTable from "./products-table";

export default function ProductsList({ categoryId }: { categoryId?: string }) {
  return (
    <Stack spacing={4}>
      <Stack width="100%" justifyContent="flex-end" alignItems="end">
        <Button
          variant="contained"
          startIcon={<Iconify icon="tabler:plus" />}
          disabled={!categoryId}
          color="primary"
          sx={{
            width: "180px",
          }}
          LinkComponent={RouterLink}
          href={`${paths.dashboard.products.new}?category-id=${categoryId}`}
        >
          Add Product
        </Button>
      </Stack>
      <ProductsTable products={[]} productsLoading={false} />
    </Stack>
  );
}
