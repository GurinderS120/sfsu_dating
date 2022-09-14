let imgUrl = null;

const PreviewImage = ({ image }) => {
  if (imgUrl) {
    URL.revokeObjectURL(imgUrl);
  }

  imgUrl = URL.createObjectURL(image);

  return (
    <div>
      <img src={imgUrl} alt="profile-pic" />
    </div>
  );
};

export default PreviewImage;
