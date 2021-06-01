import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useState } from 'react';
import useUser from '../../hooks/use-user';

const Header = ({
  photosCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    following = [],
  },
  followerCount,
  setFollowerCount,
}) => {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(isFollowing);
    };

    if (user.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.username, profileUserId]);
};

export default Header;

Header.PropTypes = {
  photosCount: PropTypes.string.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    following: PropTypes.array,
  }).isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
};
