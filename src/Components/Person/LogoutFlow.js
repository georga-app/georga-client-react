import { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';

import UserContext from "../../Context/User";

function PersonLogoutFlow() {
  let navigate = useNavigate();
  const user = useContext(UserContext);

  useEffect(() => {
    user.logout();
    navigate("/");
  });
}

export default PersonLogoutFlow;
