import { useState, useEffect } from "react";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
import toast from "react-hot-toast";

const ACCESS_KEY = "Oxcj1L3pkU6z3mOdacfkLBLGDgc1Q3ssIqoAVsxFhfQ";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    if (!query) return;
    fetchImages();
  }, [query, page]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      setNoResults(false);
      setError(false);

      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=${page}&query=${query}&per_page=12&client_id=${ACCESS_KEY}`
      );
      const data = await response.json();

      if (data.results.length === 0) {
        setNoResults(true);
        toast.error("No images found for your search. Try another query.");
        return;
      }

      setImages((prevImages) =>
        page === 1 ? data.results : [...prevImages, ...data.results]
      );
    } catch {
      setError(true);
      toast.error("Failed to fetch images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage />}
      {noResults && (
        <p style={{ textAlign: "center", fontSize: "18px" }}>
          No images found. Please try another search.
        </p>
      )}
      <ImageGallery images={images} onImageClick={setSelectedImage} />
      {loading && <Loader />}
      {images.length > 0 && !loading && !noResults && (
        <LoadMoreBtn onClick={loadMore} />
      )}
      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}

export default App;
