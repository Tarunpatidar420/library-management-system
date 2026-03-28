function ActiveIssuesTable() {
  const issues = [
    {
      user: "Ramu Sharma",
      book: "Math",
      issueDate: "2026-03-01",
    },
    {
      user: "Shamu Verma",
      book: "Physics",
      issueDate: "2026-03-05",
    },
  ];

  return (
    <table border="1">
      <thead>
        <tr>
          <th>User</th>
          <th>Book</th>
          <th>Issue Date</th>
        </tr>
      </thead>
      <tbody>
        {issues.map((i, idx) => (
          <tr key={idx}>
            <td>{i.user}</td>
            <td>{i.book}</td>
            <td>{i.issueDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ActiveIssuesTable;