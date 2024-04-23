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

export default function AddCategoryForm(): JSX.Element {
  // states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // hooks
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
    console.log(data, CLOUDINARY_UPLOAD_PRESET);

    if (data.image) {
      const formData = new FormData();
      const files = [data.image];

      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append("file", file);
        formData.append("upload_preset", `${CLOUDINARY_UPLOAD_PRESET}`);
        formData.append("cloud_name", `${CLOUDINARY_CLOUD_NAME}`);

        fetch(CLOUDINARY_API_URL, {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            return response.text();
          })
          .then((data) => {
            console.log("data:", data);
          })
          .catch((error) => {
            console.error("error:", error);
            enqueueSnackbar("Failed to upload image", {
              variant: "error",
            });
          });
      }
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
