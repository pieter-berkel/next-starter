import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { signIn } from "../lib/auth";

export const ProviderButtons = ({ redirectTo }: { redirectTo?: string }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo });
        }}
      >
        <Button type="submit" variant="outline" className="w-full gap-2">
          <FcGoogle className="size-4" />
          <span>Google</span>
        </Button>
      </form>
      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo });
        }}
      >
        <Button type="submit" variant="outline" className="w-full gap-2">
          <FaGithub className="size-4" />
          <span>Github</span>
        </Button>
      </form>
    </div>
  );
};
