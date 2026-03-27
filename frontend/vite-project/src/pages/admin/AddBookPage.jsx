import { useState } from "react";
import { createItemApi } from "../../api/itemApi";

function AddBookPage() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    serialNumber: "",
    itemType: "book",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await createItemApi(formData);
      setMessage("Item added successfully");
      setFormData({
        title: "",
        author: "",
        category: "",
        serialNumber: "",
        itemType: "book",
      });
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add item");
    }
  };

  return (
    <div className="page-card">
      <h2 className="page-title">Add Book / Movie</h2>

      <form className="form-grid" onSubmit={onSubmit}>
        <div className="form-row">
          <label>Type</label>
          <select name="itemType" value={formData.itemType} onChange={onChange}>
            <option value="book">Book</option>
            <option value="movie">Movie</option>
          </select>
        </div>

        <div className="form-row">
          <label>Title</label>
          <input name="title" value={formData.title} onChange={onChange} required />
        </div>

        <div className="form-row">
          <label>Author / Director</label>
          <input name="author" value={formData.author} onChange={onChange} required />
        </div>

        <div className="form-row">
          <label>Category</label>
          <input name="category" value={formData.category} onChange={onChange} required />
        </div>

        <div className="form-row">
          <label>Serial Number</label>
          <input name="serialNumber" value={formData.serialNumber} onChange={onChange} required />
        </div>

        {message && <p className="success-text">{message}</p>}
        {error && <p className="error-text">{error}</p>}

        <button className="btn btn-primary" type="submit">
          Add Item
        </button>
      </form>
    </div>
  );
}

export default AddBookPage;