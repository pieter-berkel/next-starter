import { database } from "@/db";

export const getUserByEmail = async (email: string) => {
  return await database.query.users.findFirst({
    where: (fields, { eq }) => eq(fields.email, email),
  });
};
