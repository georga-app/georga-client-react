import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useApolloClient } from '@apollo/client';

const IS_LOGGED_IN_QUERY = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function PersonLogoutFlow() {
  let navigate = useNavigate();
  let client = useApolloClient();
  useEffect(() => {
    localStorage.removeItem("authToken");
    client.cache.writeQuery({
      query: IS_LOGGED_IN_QUERY,
      data: {
        isLoggedIn: false,
      },
    });
    navigate("/");
  });
}

export default PersonLogoutFlow;
