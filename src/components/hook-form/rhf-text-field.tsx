import { useFormContext, Controller } from "react-hook-form";
// @mui
import TextField from "@mui/material/TextField";

// ----------------------------------------------------------------------

export default function RHFTextField({
  name,
  helperText,
  type,
  ...other
}: {
  name: string;
  helperText?: any;
  type?: string;
  [key: string]: any;
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={type === "number" && field.value === 0 ? "" : field.value}
          onChange={(event) => {
            if (type === "number") {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}