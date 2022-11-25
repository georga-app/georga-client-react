import { createContext, useState } from "react";

const UserContext = createContext();

function UserProvider(props) {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("userToken"));

  function login(data) {
    localStorage.setItem("userId", data.id);
    localStorage.setItem("userToken", data.token);
    localStorage.setItem("userAdminLevel", data.adminLevel);
    setLoggedIn(true);
  }
  function logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("userToken");
    localStorage.removeItem("userAdminLevel");
    setLoggedIn(false);
  }
  function isLoggedIn() {
    return loggedIn;
  }
  function adminLevel() {
    return localStorage.getItem("userAdminLevel");
  }
  function hasAdminLevel(level="ANY") {
    let levels = []
    switch (level) {
      case "NONE":
        levels = ["NONE"]
        break;
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
    }
    return levels.includes(adminLevel())
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
      {props.children}
    </UserContext.Provider>
  );
}

export { UserProvider };
export default UserContext;
