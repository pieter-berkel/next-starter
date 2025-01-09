import { Metadata } from "next";

import { CreateProductForm } from "@/features/products/components/create-product-form";

export const metadata: Metadata = {
  title: "Create product",
  description: "Create a new product",
};

export default function Page() {
  return <CreateProductForm />;
}
