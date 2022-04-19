import Theme from '../Components/Shared/Theme';
import RegisterForm from '../Components/Auth/Register';

function Register(props) {
  return (
    <Theme menus={props.menus} bgcolor="none">
      <RegisterForm />
    </Theme>
  );
}

export default Register;
