function MembershipTable() {
  const memberships = [
    {
      name: "Ramu Sharma",
      type: "6 Months",
      status: "Active",
    },
    {
      name: "Shamu Verma",
      type: "1 Year",
      status: "Active",
    },
  ];

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Membership</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {memberships.map((m, i) => (
          <tr key={i}>
            <td>{m.name}</td>
            <td>{m.type}</td>
            <td>{m.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MembershipTable;