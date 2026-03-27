import { useEffect, useState } from "react";
import { getMoviesReportApi } from "../../api/reportApi";

function MasterMoviesPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getMoviesReportApi();
      setMovies(data);
    };
    load();
  }, []);

  return (
    <div className="page-card">
      <h2 className="page-title">Master List of Movies</h2>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author / Director</th>
              <th>Category</th>
              <th>Serial Number</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.author}</td>
                <td>{movie.category}</td>
                <td>{movie.serialNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MasterMoviesPage;