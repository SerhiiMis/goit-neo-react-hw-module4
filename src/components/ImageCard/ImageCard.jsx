const ImageCard = ({ imageUrl, alt, onClick }) => {
  return (
    <li className="gallery-item">
      <img src={imageUrl} alt={alt} onClick={onClick} />
    </li>
  );
};

export default ImageCard;
