import useUser from '../../hooks/use-user';
import User from './User';
import Suggestions from './Suggestions';

const SideBar = () => {
  const {
    user: { docId, fullName, username, userId, following },
  } = useUser();

  return (
    <div>
      <User fullName={fullName} username={username} />
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  );
};

export default SideBar;
