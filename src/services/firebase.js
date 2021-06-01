import { firebase, FieldValue } from '../lib/firebase';

export const doesUsernameExist = async (username) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => user.data().length > 0); //returns true if user.data().length > 0
};

export const getUserByUsername = async (username) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
};

export const getUserPhotosByUsername = async (username) => {
  const [user] = await getUserByUsername(username);
  const result = firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', user.userId)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
};

//get user from the firestore where userId === userId (passed from auth from firestore)
export const getUserByUserId = async (userId) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
};

export const getSuggestedProfiles = async (userId, following) => {
  const result = await firebase.firestore().collection('users').limit(10).get();

  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id })) //getting all users
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId) //making sure users accnt and accnts already being followed don't show up as a suggestion and
    );
};

export const updateLoggedInUserFollowing = async (
  loggedInUserDocId, //docId of currently logged in user (me)
  profileId, //profile id of user I want to follow
  isFollowingUser //true of false
) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingUser
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
};

export const updateFollowedUserFollowers = async (
  profileDocId, //profile id of user I want to follow
  loggedInUserDocId, //docId of currently logged in user (me)
  isFollowingUser //true of false
) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollowingUser
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId),
    });
};

export const getPhotos = async (userId, following) => {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photosWithUsersDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }

      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUsersDetails;
};

export const isUserFollowingProfile = async (
  loggedInUserUsername,
  profileUserId
) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUserUsername)
    .where('following', 'array-contains', profileUserId)
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
};
