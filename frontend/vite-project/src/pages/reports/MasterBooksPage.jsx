import { useEffect, useState } from "react";
import { getBooksReportApi } from "../../api/reportApi";

function MasterBooksPage() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await getBooksReportApi();
        setBooks(data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load books");
      }
    };

    loadBooks();
  }, []);

  return (
    <div className="page-card">
      <h2 className="page-title">Master List of Books</h2>

      {error && <p className="error-text">{error}</p>}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Serial No</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.serialNumber}</td>
                <td>{book.isAvailable ? "Yes" : "No"}</td>
              </tr>
            ))}

            {books.length === 0 && (
              <tr>
                <td colSpan="5">No books found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MasterBooksPage;