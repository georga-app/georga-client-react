import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useMutation, useApolloClient } from '@apollo/client';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function Logout() {
  let navigate = useNavigate();
  let client = useApolloClient();
  localStorage.removeItem("authToken");
  client.cache.writeQuery({
    query: IS_LOGGED_IN,
    data: {
      isLoggedIn: !!localStorage.getItem("authToken"),
    },
  });
  useEffect(() => {
    navigate("/");
  });
}

export default Logout;
