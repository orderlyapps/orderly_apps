import { useUserQuery } from "../../features/auth/queries/useUser";
import { useStore } from "./useStore";

export const useAppState = () => {
  const online = useStore.use.online();
  const session = useStore.use.session();
  const user = useUserQuery(session?.user.id || "");
  return { canEdit: !!online && !!session, online, session, user };
};
