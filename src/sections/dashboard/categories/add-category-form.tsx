"use client";

import FormProvider from "@/components/hook-form/form-provider";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RHFEditor, RHFTextField, RHFUpload } from "@/components/hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Stack, Typography } from "@mui/material";
import { addCategory } from "@/services/category.service";
import { categorySchema } from "@/schema/category";
import { useCallback, useState } from "react";
import Label from "@/components/label";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/config";
import { CLOUDINARY_API_URL } from "@/lib/cloudinary";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { imagekit } from "@/lib";
import { slugify } from "@/utils/slugify";

export default function AddCategoryForm({
  parentId,
}: {
  parentId?: string | null;
}): JSX.Element {
  // states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // hooks
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    resolver: zodResolver(categorySchema),
  });

  const { setValue, handleSubmit } = methods;

  // functions
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("image", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => {
    setValue("image", null);
  }, [setValue]);

  const onSubmit = handleSubmit(async (data: FieldValues) => {
    setIsSubmitting(true);

    let imageUrl = "";

    if (data.image) {
      try {
        const response = await imagekit.upload({
          file: data.image,
          fileName: slugify(data.name),
          folder: "/furnerio/categories",
        });

        imageUrl = response.url;
      } catch (error) {
        enqueueSnackbar("Failed to upload image", {
          variant: "error",
        });
      }
    }

    const category = {
      name: data.name,
      description: data.description,
      parent: parentId,
      image: imageUrl,
    };

    try {
      const response = await addCategory(category);

      if (response.success) {
        enqueueSnackbar("Category added successfully", {
          variant: "success",
        });
      } else throw new Error(response.message);
    } catch (error) {
      console.error("error:", error);
      enqueueSnackbar("Failed to add category", {
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
      router.push("/dashboard/categories");
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        <RHFTextField name="name" label="Category Name" />
        <RHFEditor name="description" placeholder="Category Description" />
        <Stack gap={2}>
          <Typography>Category Image</Typography>
          <RHFUpload
            name="image"
            multiple={false}
            maxSize={3145728}
            onDrop={handleDrop}
            onDelete={handleRemoveFile}
            onUpload={() => console.info("ON UPLOAD")}
          />
        </Stack>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Add Category
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
