import CustomPopover, { usePopover } from "@/components/custom-popover";
import Iconify from "@/components/iconify";
import {
  Checkbox,
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
} from "@mui/material";

export default function CategoriesTableRow({
  row,
  index,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: {
  row: any;
  index: number;
  selected: boolean;
  onEditRow: () => void;
  onSelectRow: () => void;
  onDeleteRow: () => void;
}) {
  const { name } = row;

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell align="right" sx={{ px: 1, whiteSpace: "nowrap" }}>
          <IconButton
            color={popover.open ? "inherit" : "default"}
            onClick={popover.onOpen}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      {popover.open && (
        <CustomPopover
          open={popover.open}
          onClose={popover.onClose}
          sx={{ width: 120, height: 300 }}
        >
          <MenuItem onClick={onEditRow}>
            <Iconify icon="eva:edit-2-fill" />
          </MenuItem>
        </CustomPopover>
      )}
    </>
  );
}
