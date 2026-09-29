import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = ({ record, deleteRecord }) => {
  // Helper function to safely handle array fields
  const safeJoin = (field) => {
    if (!field) return ""; // Handle null/undefined
    if (Array.isArray(field)) return field.join(", ");
    return String(field); // Handle single string values
  };

  return (
    <tr className="border-b">
      <td className="p-2 border-r">{record.name}</td>
      <td className="p-2 border-r">{record.sponsor}</td>
      <td className="p-2 border-r">{safeJoin(record.major)}</td>
      <td className="p-2 border-r">{safeJoin(record.institution)}</td>
      <td className="p-2 border-r">{record.email}</td>
      <td className="p-1 border-r text-center">
        {record.availability === true
                ? "✅" // if available
                : record.availability === false
                ? "❌" // if unavailable
                : "❓" // if null or invalid 
                }</td>
      <td className="p-2 flex gap-2">
        <Link className="text-blue-500 hover:underline" to={`edit/${record._id}`}>
          Edit
        </Link>
        <button
          className="text-red-500 hover:underline"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this record?")) {
              deleteRecord(record._id);
            }
          }}
        >
          Delete
        </button>
        <Link className="text-green-500 hover:underline" to={`/scholar/detail/${record._id}`}>
          View
        </Link>
      </td>
    </tr>
  );
};

export default function ScholarRecords() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/`);
      if (!response.ok) {
        console.error(`An error occurred: ${response.statusText}`);
        return;
      }
      const records = await response.json();
      // Normalize data to ensure major and institution are arrays
      const normalizedRecords = records.map(record => ({
        ...record,
        major: Array.isArray(record.major) ? record.major : [record.major].filter(Boolean),
        institution: Array.isArray(record.institution) ? record.institution : [record.institution].filter(Boolean)
      }));
      setRecords(normalizedRecords);
    }
    getRecords();
  }, []);

  async function deleteRecord(id) {
    await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setRecords((prevRecords) => prevRecords.filter((el) => el._id !== id));
  }

  const filteredRecords = records.filter((record) =>
    record.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  return (
    <>
      <div className="min-h-screen">
        <h3 className="text-lg font-semibold mx-4 mt-4">
          <Link to="/admin">
            <span className="hover:bg-[--color-highlight] px-1 mr-1 py-1 rounded-full">
              ❌
            </span>
          </Link>
          Scholar Records
        </h3>

        {/* Filter by Name */}
        <input
          type="text"
          placeholder="Search by name..."
          className="p-2 border m-4 min-w-80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Link to="add" className="bg-green-600 text-[--color-light] hover:bg-[--color-highlight] hover:text-[--color-dark] p-2 rounded-md m-4 inline-block">
          Add Scholar
        </Link>
        
        <p className="px-4 text-sm">
          Note: Some fields (i.e. about) is not available to view in the table as it is too big, it can be viewed in the scholar detail page, the link to access those pages is provided in the table's field below. However, all fields of a scholar is readily editable in the edit page.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-96 bg-white border m-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border-r">Name</th>
                <th className="p-2 border-r">Sponsor</th>
                <th className="p-2 border-r">Major</th>
                <th className="p-2 border-r">Institution</th>
                <th className="p-2 border-r">Email</th>
                <th className="p-2 border-r">Availability</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record) => (
                <Record
                  key={record._id}
                  record={record}
                  deleteRecord={deleteRecord}
                />
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center m-4">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className="mx-1 px-2 bg-[--color-primary] hover:bg-[--color-secondary] text-white rounded-md"
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}