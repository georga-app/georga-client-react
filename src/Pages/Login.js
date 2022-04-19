import Theme from '../Components/Shared/Theme';
import LoginForm from '../Components/Auth/Login';

function Login(props) {
  return (
    <Theme menus={props.menus} bgcolor="none">
      <LoginForm />
    </Theme>
  );
}

export default Login;
