function MoviesTable() {
  const movies = [
    {
      name: "3 Idiots",
      category: "Education",
    },
    {
      name: "Taare Zameen Par",
      category: "Drama",
    },
  ];

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Movie</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((m, i) => (
          <tr key={i}>
            <td>{m.name}</td>
            <td>{m.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MoviesTable;