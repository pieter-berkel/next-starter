import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";

export const formatProviderIcon = (provider: string) => {
  switch (provider) {
    case "google":
      return <FcGoogle className="size-4" />;
    case "github":
      return <FaGithub className="size-4" />;
    default:
      return <FaRegCircle className="size-4" />;
  }
};
