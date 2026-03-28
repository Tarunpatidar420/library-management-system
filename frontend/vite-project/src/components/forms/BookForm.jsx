import { useState } from "react";

function BookForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    itemType: "book",
    title: "",
    author: "",
    category: "",
    serialNumber: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.itemType ||
      !formData.title ||
      !formData.author ||
      !formData.category ||
      !formData.serialNumber
    ) {
      setError("All fields are mandatory.");
      return;
    }

    onSubmit?.(formData);
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Type</label>
        <select
          name="itemType"
          value={formData.itemType}
          onChange={handleChange}
        >
          <option value="book">Book</option>
          <option value="movie">Movie</option>
        </select>
      </div>

      <div className="form-row">
        <label>Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter title"
        />
      </div>

      <div className="form-row">
        <label>Author / Director</label>
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Enter author"
        />
      </div>

      <div className="form-row">
        <label>Category</label>
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter category"
        />
      </div>

      <div className="form-row">
        <label>Serial Number</label>
        <input
          name="serialNumber"
          value={formData.serialNumber}
          onChange={handleChange}
          placeholder="Enter serial number"
        />
      </div>

      {error && <p className="error-text">{error}</p>}

      <button className="btn btn-primary" type="submit">
        Confirm
      </button>
    </form>
  );
}

export default BookForm;