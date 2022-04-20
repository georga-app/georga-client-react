import Theme from '../Components/Shared/Theme';

import PersonDataTable from '../Components/Models/PersonDataTable';

function Dashboard(props) {
  return (
    <Theme menus={props.menus}>
      <PersonDataTable />
    </Theme>
  );
}

export default Dashboard;
