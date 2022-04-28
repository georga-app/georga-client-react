import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useApolloClient } from '@apollo/client';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function Logout() {
  let navigate = useNavigate();
  let client = useApolloClient();
  useEffect(() => {
    localStorage.removeItem("authToken");
    client.cache.writeQuery({
      query: IS_LOGGED_IN,
      data: {
        isLoggedIn: !!localStorage.getItem("authToken"),
      },
    });
    navigate("/");
  });
}

export default Logout;
