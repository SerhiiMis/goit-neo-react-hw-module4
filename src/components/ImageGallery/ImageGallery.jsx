import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className="gallery">
      {images.map(({ id, urls, alt_description }) => (
        <ImageCard
          key={id}
          imageUrl={urls.small}
          alt={alt_description}
          onClick={() => onImageClick(urls.regular)}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
