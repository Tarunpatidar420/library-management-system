function ReturnBookForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Redirect to Fine Page");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Return Book</h3>

      <input placeholder="Book Name" required />
      <input placeholder="Author" readOnly />
      <input placeholder="Serial No" required />

      <button>Confirm Return</button>
    </form>
  );
}

export default ReturnBookForm;