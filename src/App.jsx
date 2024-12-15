import { useState, useEffect } from "react";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
import axios from "axios";
import "../src/App.css";

const ACCESS_KEY = "Oxcj1L3pkU6z3mOdacfkLBLGDgc1Q3ssIqoAVsxFhfQ";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query,
              page,
              per_page: 12,
              client_id: ACCESS_KEY,
            },
          }
        );
        setImages((prevImages) => [...prevImages, ...response.data.results]);
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (imageUrl) => {
    setModalImage(imageUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage("");
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <LoadMoreBtn onClick={loadMore} />}
      {showModal && <ImageModal imageUrl={modalImage} onClose={closeModal} />}
    </>
  );
}

export default App;
