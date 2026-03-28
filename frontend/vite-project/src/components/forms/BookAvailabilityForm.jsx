import { useState } from "react";

function BookAvailabilityForm({ onSearch }) {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bookName && !author) {
      alert("Please enter Book Name or Author");
      return;
    }

    onSearch({ bookName, author });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Book Availability</h3>

      <input
        placeholder="Enter Book Name"
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
      />

      <input
        placeholder="Enter Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default BookAvailabilityForm;