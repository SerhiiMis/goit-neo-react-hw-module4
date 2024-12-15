import styles from "./ImageCard.module.css";

const ImageCard = ({ imageUrl, alt, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={imageUrl} alt={alt} />
    </div>
  );
};

export default ImageCard;
