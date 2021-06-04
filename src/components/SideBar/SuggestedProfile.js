import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
} from '../../services/firebase';

const SuggestedProfile = ({
  userId,
  profileDocId,
  profileId,
  username,
  loggedInUserDocId,
}) => {
  const [isNotFollowed, setIsNotFollowed] = useState(true);

  const handleFollowUser = async () => {
    setIsNotFollowed(false);

    //update the 'following' array of the logged in user
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);

    //update the 'followers' array of the user who has been followed
    await updateFollowedUserFollowers(profileDocId, userId, false);
  };

  return isNotFollowed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          src={`/images/avatars/${username}.jpg`}
          alt=""
          className="rounded-full w-8 flex mr-3"
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <button
        className="text-sm font-bold text-blue-medium focus:outline-none"
        type="button"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
};

export default SuggestedProfile;

SuggestedProfile.propTypes = {
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  profileDocId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired,
};
