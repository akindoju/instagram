import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

const AddComment = ({ docId, comments, setComments, commentInput }) => {
  const [comment, setComment] = useState('');
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: { displayName },
  } = useContext(UserContext);

  const handleSubmitComment = (event) => {
    event.preventDefault();

    setComments([{ displayName, comment }, ...comments]);
    setComment('');
    //create a new array, add new comments, add old comments

    return firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment }),
      });
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        method="POST"
        className="justify-between flex pl-0 pr-5"
        onSubmit={(event) =>
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
      >
        <input
          type="text"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4 focus:outline-none"
          aria-label="Add a comment"
          autoComplete="off"
          name="add-comment"
          placeholder="Add a comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput} //used to reference the input field if comment btn is clicked
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && 'opacity-25'
          }`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddComment;

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object.isRequired,
};
