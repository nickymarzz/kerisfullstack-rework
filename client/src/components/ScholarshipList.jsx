import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SponsorRecord = ({ record, deleteRecord }) => {
  // Helper function to safely handle array fields
  const safeJoin = (field) => {
    if (!field) return ""; // Handle null/undefined
    if (Array.isArray(field)) return field.join(", ");
    return String(field); // Handle single string values
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <tr className="border-b">
      <td className="p-2 border-r">{record.sponsor}</td>
      <td className="p-2 border-r">{safeJoin(record.majors_offered)}</td>
      <td className="p-2 text-center border-r">{safeJoin(record.programs)}</td>
      <td className="p-2 text-center border-r">{formatDate(record.time_start)}</td>
      <td className="p-2 text-center border-r">{formatDate(record.time_end)}</td>
      <td className="p-1 border-r text-center">
        {record.status === true
          ? "✅" // if active
          : record.status === false
          ? "❌" // if inactive
          : "❓" // if null or invalid 
        }
      </td>
      <td className="p-2 flex gap-2">
        <Link className="text-blue-500 hover:underline" to={`edit/${record._id}`}>
          Edit
        </Link>
        <button
          className="text-red-500 hover:underline"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this sponsor?")) {
              deleteRecord(record._id);
            }
          }}
        >
          Delete
        </button>
        <Link className="text-green-500 hover:underline" to={`/scholarship/detail/${record._id}`}>
          View
        </Link>
      </td>
    </tr>
  );
};

export default function SponsorRecords() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/sponsors`);
      if (!response.ok) {
        console.error(`An error occurred: ${response.statusText}`);
        return;
      }
      const records = await response.json();
      // Normalize data to ensure array fields are properly formatted
      const normalizedRecords = records.map(record => ({
        ...record,
        majors_offered: Array.isArray(record.majors_offered) ? record.majors_offered : [record.majors_offered].filter(Boolean),
        programs: Array.isArray(record.programs) ? record.programs : [record.programs].filter(Boolean)
      }));
      setRecords(normalizedRecords);
    }
    getRecords();
  }, []);

  async function deleteRecord(id) {
    await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/sponsors/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setRecords((prevRecords) => prevRecords.filter((el) => el._id !== id));
  }

  const filteredRecords = records.filter((record) =>
    record.sponsor.toLowerCase().includes(search.toLowerCase())
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
          Sponsor Records
        </h3>

        {/* Filter by Sponsor Name */}
        <input
          type="text"
          placeholder="Search by sponsor name..."
          className="p-2 border m-4 min-w-80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Link to="add" className="bg-green-600 text-[--color-light] hover:bg-[--color-highlight] hover:text-[--color-dark] p-2 rounded-md m-4 inline-block">
          Add Sponsor
        </Link>
        
        <p className="px-4 text-sm">
          Note: Some fields (i.e. about) are not available to view in the table as they are too large. 
          They can be viewed in the sponsor detail page, accessible via the links in the table below.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-96 bg-white border m-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border-r">Sponsor</th>
                <th className="p-2 border-r">Majors Offered</th>
                <th className="p-2 border-r">Programs</th>
                <th className="p-2 border-r">Start Date (MM/DD/YYYY)</th>
                <th className="p-2 border-r">End Date (MM/DD/YYYY)</th>
                <th className="p-2 border-r">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record) => (
                <SponsorRecord
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