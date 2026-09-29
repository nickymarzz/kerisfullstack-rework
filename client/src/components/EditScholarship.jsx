import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RichTextEditor from "./RichTextEditor";

export default function EditSponsor() {
  const [form, setForm] = useState({
    sponsor: "",
    status: true,
    time_start: "",
    time_end: "",
    about: "",
    majors_offered: "",
    programs: "",
    link: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/sponsors/${params.id}`
        );
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const record = await response.json();
        if (!record) return navigate("/");

        setForm({
          ...record,
          majors_offered: Array.isArray(record.majors_offered)
            ? record.majors_offered.join(", ")
            : record.majors_offered || "",
          programs: Array.isArray(record.programs)
            ? record.programs.join(", ")
            : record.programs || "",
          time_start: record.time_start ? record.time_start.split('T')[0] : "",
          time_end: record.time_end ? record.time_end.split('T')[0] : "",
        });

        if (record.image) {
          setCurrentImageUrl(record.image);
          setPreview(record.image);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [params.id, navigate]);

  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  }

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("sponsor", form.sponsor);
    formData.append("status", form.status);
    formData.append("time_start", form.time_start);
    formData.append("time_end", form.time_end);
    formData.append("link", form.link);
    formData.append("about", form.about);

    // Handle array fields
    const majors_offered = form.majors_offered
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);
    const programs = form.programs
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);
      
    majors_offered.forEach((major) => formData.append("majors_offered[]", major));
    programs.forEach((program) => formData.append("programs[]", program));

    // Image handling
    if (form.image instanceof File) {
      formData.append("image", form.image);
    } else if (form.image === null && currentImageUrl) {
      formData.append("imageAction", "remove");
    } else if (currentImageUrl) {
      formData.append("image", currentImageUrl);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/sponsors/${params.id}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          body: formData,
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      navigate("/admin/scholarship-list");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update sponsor: " + error.message);
    }
  }

  function handleRemoveImage() {
    setForm((prev) => ({ ...prev, image: null }));
    setPreview(null);
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-6xl">
      <h3 className="text-2xl font-bold mb-6">Edit Sponsor Record</h3>

      <form onSubmit={onSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Column 1: Sponsor Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sponsor Name*
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={form.sponsor}
                onChange={(e) => updateForm({ sponsor: e.target.value })}
                required
              />
            </div>

            {/* Status Radio Buttons */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-slate-900">
                Status*
              </label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="active"
                    name="status"
                    checked={form.status === true}
                    onChange={() => updateForm({ status: true })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="active"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Active
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="inactive"
                    name="status"
                    checked={form.status === false}
                    onChange={() => updateForm({ status: false })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="inactive"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Inactive
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website Link
              </label>
              <input
                type="url"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                value={form.link}
                onChange={(e) => updateForm({ link: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
          </div>

          {/* Column 2: Program Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date*
              </label>
              <input
                type="date"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                value={form.time_start}
                onChange={(e) => updateForm({ time_start: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date*
              </label>
              <input
                type="date"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                value={form.time_end}
                onChange={(e) => updateForm({ time_end: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Majors Offered*
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Computer Science, Engineering"
                value={form.majors_offered}
                onChange={(e) => updateForm({ majors_offered: e.target.value })}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate multiple majors with commas
              </p>
            </div>
          </div>

          {/* Column 3: Image Upload */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Programs*
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Scholarship, Internship"
                value={form.programs}
                onChange={(e) => updateForm({ programs: e.target.value })}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate multiple programs with commas
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Update Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={handleImageChange}
              />
              {preview && (
                <div className="mt-3">
                  <div className="relative inline-block">
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-32 w-32 object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  {!(form.image instanceof File) && (
                    <p className="text-xs text-green-600 mt-1">
                      Current image will be preserved
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* About Section (Full Width) */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            About*
          </label>
          <RichTextEditor
            value={form.about}
            onChange={(html) => updateForm({ about: html })}
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={() => navigate("/admin/scholarship-list")}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Update Sponsor
          </button>
        </div>
      </form>
    </div>
  );
}