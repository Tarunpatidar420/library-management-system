import { useState } from "react";
import { bookAvailabilityApi } from "../../api/transactionApi";

function BookAvailabilityPage() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
  });
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSearch = async (e) => {
    e.preventDefault();
    setError("");
    setBooks([]);

    if (!formData.title && !formData.author) {
      setError("At least one of book name or author is required");
      return;
    }

    try {
      const data = await bookAvailabilityApi(formData);
      setBooks(data);
    } catch (err) {
      setError(err?.response?.data?.message || "Search failed");
    }
  };

  return (
    <div className="page-card">
      <h2 className="page-title">Check Book Availability</h2>

      <form className="form-grid" onSubmit={onSearch}>
        <div className="form-row">
          <label>Book Name</label>
          <input name="title" value={formData.title} onChange={onChange} />
        </div>

        <div className="form-row">
          <label>Author</label>
          <input name="author" value={formData.author} onChange={onChange} />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>

      {books.length > 0 && (
        <div className="table-wrap" style={{ marginTop: "20px" }}>
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>Book Name</th>
                <th>Author</th>
                <th>Serial No</th>
                <th>Available</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>
                    <input
                      type="radio"
                      name="selectedBook"
                      checked={selectedBookId === book._id}
                      onChange={() => setSelectedBookId(book._id)}
                    />
                  </td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.serialNumber}</td>
                  <td>{book.isAvailable ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BookAvailabilityPage;