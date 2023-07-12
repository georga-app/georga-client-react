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
