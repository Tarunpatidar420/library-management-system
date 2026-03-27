import { useLocation } from "react-router-dom";
import { useState } from "react";
import { payFineApi } from "../../api/transactionApi";

function PayFinePage() {
  const location = useLocation();
  const transactionId = location.state?.transactionId || "";
  const fineCalculated = location.state?.fineCalculated || 0;

  const [finePaid, setFinePaid] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    setMessage("");
    setError("");

    if (!transactionId) {
      setError("Transaction not found");
      return;
    }

    if (fineCalculated > 0 && !finePaid) {
      setError("Fine must be paid before completing return");
      return;
    }

    try {
      const data = await payFineApi({
        transactionId,
        finePaid: fineCalculated > 0 ? finePaid : false,
        remarks,
      });

      setMessage(data.message || "Return completed successfully");
    } catch (err) {
      setError(err?.response?.data?.message || "Fine payment failed");
    }
  };

  return (
    <div className="page-card">
      <h2 className="page-title">Pay Fine</h2>

      <div className="form-grid">
        <div className="form-row">
          <label>Transaction ID</label>
          <input value={transactionId} disabled />
        </div>

        <div className="form-row">
          <label>Fine Calculated</label>
          <input value={fineCalculated} disabled />
        </div>

        <div className="form-row">
          <label>
            <input
              type="checkbox"
              checked={finePaid}
              onChange={(e) => setFinePaid(e.target.checked)}
            />{" "}
            Fine Paid
          </label>
        </div>

        <div className="form-row">
          <label>Remarks</label>
          <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} />
        </div>

        {message && <p className="success-text">{message}</p>}
        {error && <p className="error-text">{error}</p>}

        <button className="btn btn-primary" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default PayFinePage;