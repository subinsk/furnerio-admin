import Iconify from "@/components/iconify";
import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";
import { Button, Stack } from "@mui/material";

export default function ProductsList({
  categorySlug,
}: {
  categorySlug?: string;
}) {
  return (
    <Stack spacing={4}>
      <Stack width="100%" justifyContent="flex-end" alignItems="end">
        <Button
          variant="contained"
          startIcon={<Iconify icon="tabler:plus" />}
          color="primary"
          sx={{
            width: "180px",
          }}
          LinkComponent={RouterLink}
          href={paths.dashboard.products.new}
        >
          Add Product
        </Button>
      </Stack>
    </Stack>
  );
}
