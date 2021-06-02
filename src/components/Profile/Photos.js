import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

const Photos = ({ photos }) => {
  return (
    <div className="h-16 border-t border-gray-primary mt-12 pt-4">
      <div className="grid grid-cols-3 gap-8 mt-4  mb-8">
        {!photos ? (
          <>
            <Skeleton count={12} width={320} height={400} />
          </>
        ) : photos.length > 0 ? (
          photos.map((photo) => (
            <div className="relative group last:mb-8" key={photo.docId}>
              <img src={photo.imageSrc} alt={photo.caption} />
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
};

export default Photos;

Photos.propTypes = {
  photos: PropTypes.array.isRequired,
};
