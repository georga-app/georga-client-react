/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useContext } from "react";
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

import UserContext from "@/provider/User";

// import AdminLevel from '@/types/AdminLevel';
import AdminLevel from '@/types/AdminLevel';
import { TokenAuthMutation } from '@/types/__generated__/graphql';

function PersonAuthFlow() {
  // provider
  const router = useRouter();
  const user = useContext(UserContext);

  // params
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || '';
  const token = searchParams.get('token') || '';
  const adminLevel = searchParams.get('adminLevel') || '';
  const redirect = searchParams.get('redirect') || '/';

  // sanity checks
  if (!id || !token || !adminLevel
      || !['ORGANIZATION', 'PROJECT', 'OPERATION', 'NONE']
         .includes(adminLevel)) {
    user.logout();
    router.push('/login')
    return <></>;
  }

  // auth
  user.login({
    id: id,
    token: token,
    adminLevel: adminLevel,
  } as TokenAuthMutation['tokenAuth']);

  // redirect
  router.push(redirect)

  // return
  return <></>;
}

export default PersonAuthFlow;
