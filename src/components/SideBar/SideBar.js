import User from './User';
import Suggestions from './Suggestions';
import { useContext } from 'react';
import LoggedInUserContext from '../../context/loggedInUser';

const SideBar = () => {
  const { user: { docId = '', fullName, username, userId, following } = {} } =
    useContext(LoggedInUserContext);

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
