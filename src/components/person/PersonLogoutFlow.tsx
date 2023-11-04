/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useEffect, useContext } from "react";
import { useRouter } from 'next/navigation';

import UserContext from "@/provider/User";

function PersonLogoutFlow() {
  const router = useRouter();
  const user = useContext(UserContext);

  useEffect(() => {
    user.logout();
    router.push("/");
  });
  return <></>;
}

export default PersonLogoutFlow;
