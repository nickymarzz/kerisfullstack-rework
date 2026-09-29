import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import placeholderImg from "../assets/img/imgplaceholdersponsors.jpg";
import DOMPurify from 'dompurify'; // For XSS protection

// Date formatting function
const formatDate = (dateString) => {
  if (!dateString) return "Present"; // Handle empty/undefined dates

  const date = new Date(dateString);

  // Get day, month (0-11 so we add 1), and year
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const ScholarshipDetail = () => {
  const { id } = useParams(); // Get sponsor ID from the URL
  const [sponsor, setSponsor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSponsor() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/sponsors/${id}`
        );
        if (!response.ok) throw new Error("Sponsor not found");
        const data = await response.json();
        setSponsor(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchSponsor();
  }, [id]);

    // Safe HTML render function
    const renderHTML = (html) => {
      if (!html) return "No details provided.";
      const cleanHTML = DOMPurify.sanitize(html);
      return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
    };
  

  if (loading)
    return (
      <div className="text-center min-h-screen m-10">
        <strong>Loading...</strong>
      </div>
    );
    

  if (!sponsor)
    return (
      <div className="text-center m-10 min-h-screen text-[--color-primary]">
        <strong>
          Sponsor not found
        </strong>
        <div className="text-center m-6">
          <Link
            to="/scholarship"
            className="inline-block bg-[--color-primary] text-white hover:bg-[--color-light] hover:text-[--color-secondary] px-4 py-2 rounded-md font-medium transition"
          >
            Back to Scholarships List
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="h-96 flex items-center justify-center text-center text-white relative"
        style={{
          backgroundImage: `url(${sponsor.image || placeholderImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 p-4">
          <h1 className="text-4xl text-[--color-light] font-bold mb-2">
            {sponsor.sponsor}
          </h1>
          <p className="text-md text-[--color-light]">
            {
              sponsor.status === true
                ? "Application Open: ✅" // if available
                : sponsor.status === false
                ? "Application Closed: ❌" // if unavailable
                : "Invalid: ❓" // if null or invalid
            }
          </p>
        </div>
      </div>

      {/* Scholarship Information Grid */}
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">General</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700">Application Date(s)</h3>
                <p className="gap-2">
                  {formatDate(sponsor.time_start)} →{" "}
                  {formatDate(sponsor.time_end)}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Application Link</h3>
                <p>
                  {sponsor.link ? (
                    <a
                      href={`${sponsor.link}`}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                    >
                      {sponsor.link}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Education</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700">Major(s)</h3>
                <p>
                  {sponsor.majors_offered?.length > 0
                    ? sponsor.majors_offered.join(", ")
                    : "Not specified"}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Program(s)</h3>
                <p>
                  {sponsor.programs?.length > 0
                    ? sponsor.programs.join(", ")
                    : "Not specified"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Scholar Section */}
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <h2 className="text-2xl font-semibold mb-4">About {sponsor.sponsor}</h2>
        {renderHTML(sponsor.about)}
      </div>

      {/* Back Button */}
      <div className="text-center m-6 text-white">
        <Link to="/scholarship">
          <button className="bg-[--color-primary] hover:bg-[--color-light] hover:text-[--color-secondary] px-4 py-2 rounded-md">
            Back to Sponsors List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ScholarshipDetail;
