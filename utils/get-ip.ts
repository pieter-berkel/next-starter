import { headers } from "next/headers";

export const getIP = async () => {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0] || "0.0.0.0";
  }

  const realIP = headersList.get("x-real-ip");

  if (realIP) {
    return realIP.trim();
  }

  return "0.0.0.0";
};
