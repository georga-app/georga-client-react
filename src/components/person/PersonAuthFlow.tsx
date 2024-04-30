/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useContext, Suspense } from "react";
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
  const embed = !!parseInt(searchParams.get('embed') || "");
  const emulator = !!parseInt(searchParams.get('emulator') || "");

  // sanity checks
  if (!id || !token || !adminLevel
      || !['ORGANIZATION', 'PROJECT', 'OPERATION', 'NONE']
         .includes(adminLevel)) {
    user.logout();
    router.push('/login')
    return <></>;
  }

  // embed
  localStorage.setItem("embed", embed ? "1" : "0");
  localStorage.setItem("emulator", emulator ? "1" : "0");

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

function PersonAuthFlowSuspense() {
  return (
    <Suspense>
      <PersonAuthFlow />
    </Suspense>
  )
}

export default PersonAuthFlowSuspense;
