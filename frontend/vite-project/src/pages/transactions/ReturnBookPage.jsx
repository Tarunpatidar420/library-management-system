import { useState } from "react";
import { returnBookApi } from "../../api/transactionApi";
import { useNavigate } from "react-router-dom";

function ReturnBookPage() {
  const navigate = useNavigate();

  const [serialNumber, setSerialNumber] = useState("");
  const [actualReturnDate, setActualReturnDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!serialNumber || !actualReturnDate) {
      setError("Serial number and actual return date are required");
      return;
    }

    try {
      const data = await returnBookApi({
        serialNumber,
        actualReturnDate,
        remarks,
      });

      navigate("/transactions/pay-fine", {
        state: {
          transactionId: data.transactionId,
          fineCalculated: data.fineCalculated,
          transaction: data.transaction,
        },
      });
    } catch (err) {
      setError(err?.response?.data?.message || "Return processing failed");
    }
  };

  return (
    <div className="page-card">
      <h2 className="page-title">Return Book</h2>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Serial Number</label>
          <input value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
        </div>

        <div className="form-row">
          <label>Actual Return Date</label>
          <input type="date" value={actualReturnDate} onChange={(e) => setActualReturnDate(e.target.value)} />
        </div>

        <div className="form-row">
          <label>Remarks</label>
          <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button className="btn btn-primary" type="submit">
          Confirm Return
        </button>
      </form>
    </div>
  );
}

export default ReturnBookPage;