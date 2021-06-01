import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/Header';
import UserProfile from '../components/Profile/UserProfile';

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const checkUserExists = async () => {
      const user = await getUserByUsername(username);
      if (user.length > 0) {
        setUser(user[0]);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    };

    checkUserExists();
  }, [username, history]);

  return user?.length > 0 ? (
    <div className="bg-gray-background">
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
};

export default Profile;
