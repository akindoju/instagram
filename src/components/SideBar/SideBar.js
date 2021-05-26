import useUser from '../../hooks/use-user';
import User from './User';
import Suggestions from './Suggestions';

const SideBar = () => {
  const {
    user: { fullName, username, userId },
  } = useUser();

  return (
    <div>
      <User fullName={fullName} username={username} />
      <Suggestions userId={userId} />
    </div>
  );
};

export default SideBar;
