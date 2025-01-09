import "server-only";

import { cache } from "react";
import { eq } from "drizzle-orm";

import { CreateUser, User } from "@/db/schema";
import { database, schema } from "@/db";

export const getUserById = cache(async (id: string) => {
  return await database.query.users.findFirst({
    where: (fields, { eq }) => eq(fields.id, id),
  });
});

export const getUserByEmail = cache(async (email: string) => {
  return await database.query.users.findFirst({
    where: (fields, { eq }) => eq(fields.email, email),
  });
});

export const createUser = async (user: CreateUser) => {
  await database.insert(schema.users).values(user);
};

export const updateUser = async (id: string, user: Partial<User>) => {
  await database.update(schema.users).set(user).where(eq(schema.users.id, id));
};
