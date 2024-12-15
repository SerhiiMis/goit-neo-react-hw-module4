const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <img src={imageUrl} alt="Large view" />
      </div>
    </div>
  );
};

export default ImageModal;
