import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import UserProfile from '../components/Profile/UserProfile';
import Header from '../components/Header';

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const checkUserExists = async () => {
      const [user] = await getUserByUsername(username);
      if (user.userId) {
        setUser(user);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    };

    checkUserExists();
  }, [username, history]);

  return user?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
};

export default Profile;
