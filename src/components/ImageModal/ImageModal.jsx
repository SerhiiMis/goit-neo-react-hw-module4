import Modal from "react-modal";
import styles from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      overlayClassName={styles.overlay}
      className={styles.modal}
    >
      <img src={imageUrl} alt="Large view" />
    </Modal>
  );
};

export default ImageModal;
