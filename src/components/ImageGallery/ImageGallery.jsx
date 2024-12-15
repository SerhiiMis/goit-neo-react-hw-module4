import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={styles.gallery}>
      {images.map(({ id, urls, alt_description }) => (
        <li key={id}>
          <ImageCard
            imageUrl={urls.small}
            alt={alt_description}
            onClick={() => onImageClick(urls.regular)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
