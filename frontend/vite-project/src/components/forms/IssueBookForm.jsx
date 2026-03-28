import { useState } from "react";

function IssueBookForm() {
  const today = new Date().toISOString().split("T")[0];

  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 15);

  const [form, setForm] = useState({
    book: "",
    author: "",
    issueDate: today,
    returnDate: futureDate.toISOString().split("T")[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.book) {
      alert("Book name required");
      return;
    }

    alert("Book Issued Successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Issue Book</h3>

      <input
        placeholder="Book Name"
        value={form.book}
        onChange={(e) => setForm({ ...form, book: e.target.value })}
      />

      <input value={form.author} readOnly placeholder="Author auto-fill" />

      <input type="date" value={form.issueDate} readOnly />

      <input
        type="date"
        value={form.returnDate}
        onChange={(e) => setForm({ ...form, returnDate: e.target.value })}
      />

      <button>Issue</button>
    </form>
  );
}

export default IssueBookForm;