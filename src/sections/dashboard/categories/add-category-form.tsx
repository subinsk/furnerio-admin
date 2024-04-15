"use client";

import FormProvider from "@/components/hook-form/form-provider";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RHFEditor, RHFTextField } from "@/components/hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { Stack } from "@mui/material";

export default function AddCategoryForm(): JSX.Element {
  const categorySchema: ZodType<FormData> = z.object({
    name: z.string().min(1, "Category name is required"),
    description: z.string().min(1, "Category description is required"),
    image: z.string().optional(),
    parent: z.string().optional(),
  });

  const methods = useForm({
    resolver: zodResolver(categorySchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data: FormData) => {
    console.log(data);
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        <RHFTextField name="name" label="Category Name" />
        <RHFEditor name="description" placeholder="Category Description" />
        <RHFTextField name="image" label="Category Image" />
        <RHFTextField name="parent" label="Parent Category" />
        <LoadingButton
          type="submit"
          variant="contained"
          loading={methods.formState.isSubmitting}
        >
          Add Category
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
