import { db } from "@/db";

export const getUserByEmail = async (email: string) => {
  return await db.query.users.findFirst({
    where: (fields, { eq }) => eq(fields.email, email),
  });
};
