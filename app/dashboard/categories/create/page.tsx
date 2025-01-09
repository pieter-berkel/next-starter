import { Metadata } from "next";

import { CreateCategoryForm } from "@/features/categories/components/create-category-form";

export const metadata: Metadata = {
  title: "Create category",
  description: "Create a new category",
};

export default function Page() {
  return <CreateCategoryForm />;
}
