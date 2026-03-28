function OverdueTable() {
  const overdue = [
    {
      name: "Ramu Sharma",
      book: "Math",
      daysLate: 5,
    },
    {
      name: "Shamu Verma",
      book: "Physics",
      daysLate: 2,
    },
  ];

  return (
    <table border="1">
      <thead>
        <tr>
          <th>User</th>
          <th>Book</th>
          <th>Days Late</th>
        </tr>
      </thead>
      <tbody>
        {overdue.map((o, i) => (
          <tr key={i}>
            <td>{o.name}</td>
            <td>{o.book}</td>
            <td>{o.daysLate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OverdueTable;