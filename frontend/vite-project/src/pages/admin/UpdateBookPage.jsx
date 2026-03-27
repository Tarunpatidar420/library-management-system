import { useEffect, useState } from "react";
import { getItemsApi, updateItemApi } from "../../api/itemApi";

function UpdateBookPage() {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    serialNumber: "",
    itemType: "book",
    status: "active",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadItems = async () => {
    try {
      const data = await getItemsApi();
      setItems(data);
    } catch (err) {
      setError("Failed to load items");
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedId(id);

    const item = items.find((x) => x._id === id);
    if (item) {
      setFormData({
        title: item.title || "",
        author: item.author || "",
        category: item.category || "",
        serialNumber: item.serialNumber || "",
        itemType: item.itemType || "book",
        status: item.status || "active",
      });
    }
  };

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await updateItemApi(selectedId, formData);
      setMessage("Item updated successfully");
      loadItems();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update item");
    }
  };

  return (
    <div className="page-card">
      <h2 className="page-title">Update Book / Movie</h2>

      <div className="form-grid">
        <div className="form-row">
          <label>Select Item</label>
          <select value={selectedId} onChange={handleSelect}>
            <option value="">Select</option>
            {items.map((item) => (
              <option key={item._id} value={item._id}>
                {item.title} - {item.serialNumber}
              </option>
            ))}
          </select>
        </div>

        {selectedId && (
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
              <input name="title" value={formData.title} onChange={onChange} />
            </div>

            <div className="form-row">
              <label>Author</label>
              <input name="author" value={formData.author} onChange={onChange} />
            </div>

            <div className="form-row">
              <label>Category</label>
              <input name="category" value={formData.category} onChange={onChange} />
            </div>

            <div className="form-row">
              <label>Serial Number</label>
              <input name="serialNumber" value={formData.serialNumber} onChange={onChange} />
            </div>

            <div className="form-row">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={onChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {message && <p className="success-text">{message}</p>}
            {error && <p className="error-text">{error}</p>}

            <button className="btn btn-primary" type="submit">
              Update Item
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default UpdateBookPage;