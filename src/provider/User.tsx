/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import { createContext, useState } from 'react';

import AdminLevel from '@/types/AdminLevel';
import { TokenAuthMutation } from '@/types/__generated__/graphql';

// see https://developer.school/snippets/react/localstorage-is-not-defined-nextjs
let localStorage: Storage = (typeof window !== "undefined") ? window.localStorage : {
  length: 0,
  key: () => null,
  clear: () => undefined,
  getItem: () => null,
  setItem: () => null,
  removeItem: () => null,
};

const UserContext = createContext({
  isLoggedIn: false,
  hasAdminLevel: (level: AdminLevel | "ANY" = "ANY") => false as boolean,
  login: (data: TokenAuthMutation["tokenAuth"]) => {},
  logout: () => {},
});

function UserContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("userToken"));

  const login = (data: TokenAuthMutation["tokenAuth"]) => {
    localStorage.setItem("userId", data?.id || "");
    localStorage.setItem("userToken", data?.token || "");
    localStorage.setItem("userAdminLevel", data?.adminLevel || "");
    if (!localStorage.getItem("globalOrganization"))
      localStorage.setItem("globalOrganization", data?.defaultOrganization || "");
    setLoggedIn(true);
  }
  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userToken");
    localStorage.removeItem("userAdminLevel");
    setLoggedIn(false);
  }
  const isLoggedIn = () => {
    return loggedIn;
  }
  const adminLevel = () => {
    return localStorage.getItem("userAdminLevel") as AdminLevel || "NONE";
  }
  const hasAdminLevel = (level: AdminLevel | "ANY" = "ANY") => {
    let levels: AdminLevel[] = []
    switch (level) {
      case "ANY":
        levels = ["ORGANIZATION", "PROJECT", "OPERATION"];
        break;
      case "OPERATION":
        levels = ["ORGANIZATION", "PROJECT", "OPERATION"];
        break;
      case "PROJECT":
        levels = ["ORGANIZATION", "PROJECT"];
        break;
      case "ORGANIZATION":
        levels = ["ORGANIZATION"];
        break;
      default:
        levels = ["NONE"]
    }
    return levels.includes(adminLevel());
  }

  let user = {
    id: localStorage.getItem("userId"),
    token: localStorage.getItem("userToken"),
    adminLevel: adminLevel(),
    login: login,
    logout: logout,
    isLoggedIn: isLoggedIn(),
    hasAdminLevel: hasAdminLevel,
  }

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContextProvider };
export default UserContext;
