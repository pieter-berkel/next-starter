import { next } from "storageflow/adapters";
import { AWSProvider } from "storageflow/providers";
import { server } from "storageflow/server";

const router = next.router((storage) => ({
  avatar: storage(),
}));

// used for autocompletion in the clients
export type StorageRouter = typeof router;

const handler = next.handler({
  provider: AWSProvider(),
  router: router,
});

export { handler as GET, handler as POST };

export const storage = server({
  provider: AWSProvider(),
  router: router,
});
