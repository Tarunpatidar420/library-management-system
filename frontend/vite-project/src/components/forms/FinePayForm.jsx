import { useState } from "react";

function FinePayForm() {
  const [paid, setPaid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!paid) {
      alert("Please pay fine");
      return;
    }

    alert("Transaction Completed");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Pay Fine</h3>

      <label>
        <input type="checkbox" onChange={(e) => setPaid(e.target.checked)} />
        Fine Paid
      </label>

      <button>Confirm</button>
    </form>
  );
}

export default FinePayForm;