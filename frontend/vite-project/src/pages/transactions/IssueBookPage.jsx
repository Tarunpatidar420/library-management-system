import { useEffect, useState } from "react";
import { getItemsApi } from "../../api/itemApi";
import { issueBookApi } from "../../api/transactionApi";

function IssueBookPage() {
  const [books, setBooks] = useState([]);
  const [itemId, setItemId] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [issueDate, setIssueDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      const data = await getItemsApi();
      setBooks(data.filter((x) => x.itemType === "book"));
    };
    load();
  }, []);

  const handleBookSelect = (e) => {
    const id = e.target.value;
    setItemId(id);
    const book = books.find((b) => b._id === id);
    setSelectedBook(book || null);
  };

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!itemId || !issueDate || !returnDate) {
      setError("Please fill all required fields");
      return;
    }

    try {
      const data = await issueBookApi({
        itemId,
        issueDate,
        returnDate,
        remarks,
      });
      setMessage(data.message || "Book issued successfully");
    } catch (err) {
      setError(err?.response?.data?.message || "Issue failed");
    }
  };

  return (
    <div className="page-card">
      <h2 className="page-title">Issue Book</h2>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Book Name</label>
          <select value={itemId} onChange={handleBookSelect}>
            <option value="">Select Book</option>
            {books.map((book) => (
              <option key={book._id} value={book._id}>
                {book.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>Author</label>
          <input value={selectedBook?.author || ""} disabled />
        </div>

        <div className="form-row">
          <label>Issue Date</label>
          <input type="date" value={issueDate} min={today} onChange={(e) => setIssueDate(e.target.value)} />
        </div>

        <div className="form-row">
          <label>Return Date</label>
          <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
        </div>

        <div className="form-row">
          <label>Remarks</label>
          <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} />
        </div>

        {message && <p className="success-text">{message}</p>}
        {error && <p className="error-text">{error}</p>}

        <button className="btn btn-primary" type="submit">
          Confirm Issue
        </button>
      </form>
    </div>
  );
}

export default IssueBookPage;