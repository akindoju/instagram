import { firebase, FieldValue } from '../lib/firebase';

export const doesUsernameExist = async (username) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => user.data().length > 0); //returns true if user.data().length > 0
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
