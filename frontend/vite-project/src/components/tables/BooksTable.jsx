function BooksTable() {
  const books = [
    {
      name: "Math",
      author: "NCERT",
      available: true,
    },
    {
      name: "Physics",
      author: "HC Verma",
      available: false,
    },
  ];

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Book</th>
          <th>Author</th>
          <th>Available</th>
        </tr>
      </thead>
      <tbody>
        {books.map((b, i) => (
          <tr key={i}>
            <td>{b.name}</td>
            <td>{b.author}</td>
            <td>
              <input type="radio" checked={b.available} readOnly />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BooksTable;