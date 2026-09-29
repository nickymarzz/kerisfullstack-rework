import { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import RichTextEditor from "./RichTextEditor";

export default function SponsorForm() {
  const [form, setForm] = useState({
    sponsor: "",
    status: true,
    time_start: "",
    time_end: "",
    image: null,
    programs: "",
    majors_offered: "",
    link: "",
    about: "<p></p>"
  });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.id) return;

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
          about: record.about || "<p></p>",
          majors_offered: Array.isArray(record.majors_offered)
            ? record.majors_offered.join(", ")
            : record.majors_offered,
          programs: Array.isArray(record.programs)
            ? record.programs.join(", ")
            : record.programs,
          time_start: record.time_start ? record.time_start.split('T')[0] : "",
          time_end: record.time_end ? record.time_end.split('T')[0] : ""
        });

        if (record.image) {
          setPreview(record.image.startsWith('http') ? record.image : `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/uploads/${record.image}`);
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

  function validateForm() {
    const newErrors = {};

    if (!form.sponsor.trim()) newErrors.sponsor = "Sponsor name is required";
    if (!form.time_start) newErrors.time_start = "Start date is required";
    if (!form.time_end) newErrors.time_end = "End date is required";
    if (form.about === "<p></p>" || !form.about.trim())
      newErrors.about = "About section is required";
    if (!form.majors_offered.trim()) 
      newErrors.majors_offered = "At least one major is required";
    if (!form.programs.trim()) 
      newErrors.programs = "At least one program is required";
    if (typeof form.status !== "boolean")
      newErrors.status = "Status must be set";
    if (!params.id && !form.image) 
      newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const formData = new FormData();
      formData.append("sponsor", form.sponsor);
      formData.append("status", form.status.toString());
      formData.append("time_start", form.time_start);
      formData.append("time_end", form.time_end);
      formData.append("link", form.link);
      formData.append("about", form.about);
      
      // Ensure these are sent as strings
      formData.append("majors_offered", form.majors_offered);
      formData.append("programs", form.programs);
  
      if (form.image) formData.append("image", form.image);
  
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/sponsors`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Reset form on success
      setForm({
        sponsor: "",
        status: true,
        time_start: "",
        time_end: "",
        image: null,
        programs: "",
        majors_offered: "",
        link: "",
        about: "<p></p>"
      });
      setPreview(null);
      navigate("/admin/scholarship-list");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to save sponsor. Please check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-full p-4 sm:p-10">
      <h3 className="text-lg font-semibold p-4">
        {params.id ? "Edit" : "Create"} Scholarship Record
      </h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Scholarship Info
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              This information will be displayed publicly.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-8">
            {/* Sponsor Name Input */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-slate-900">
                Scholarship Name*
              </label>
              <input
                type="text"
                name="sponsor"
                placeholder="e.g. Yayasan Khazanah"
                className={`block w-full border rounded-md p-2 ${
                  errors.sponsor ? "border-red-500" : ""
                }`}
                value={form.sponsor}
                onChange={(e) => updateForm({ sponsor: e.target.value })}
                required
              />
              {errors.sponsor && (
                <p className="mt-1 text-sm text-red-600">{errors.sponsor}</p>
              )}
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
                  <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
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
                  <label htmlFor="inactive" className="ml-2 block text-sm text-gray-900">
                    Inactive
                  </label>
                </div>
              </div>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">{errors.status}</p>
              )}
            </div>

            {/* Time Start */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-slate-900">
                Start Date*
              </label>
              <input
                type="date"
                name="time_start"
                className={`block w-full border rounded-md p-2 ${
                  errors.time_start ? "border-red-500" : ""
                }`}
                value={form.time_start}
                onChange={(e) => updateForm({ time_start: e.target.value })}
                required
              />
              {errors.time_start && (
                <p className="mt-1 text-sm text-red-600">{errors.time_start}</p>
              )}
            </div>

            {/* Time End */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-slate-900">
                End Date*
              </label>
              <input
                type="date"
                name="time_end"
                className={`block w-full border rounded-md p-2 ${
                  errors.time_end ? "border-red-500" : ""
                }`}
                value={form.time_end}
                onChange={(e) => updateForm({ time_end: e.target.value })}
                required
              />
              {errors.time_end && (
                <p className="mt-1 text-sm text-red-600">{errors.time_end}</p>
              )}
            </div>

            {/* About Section */}
            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-slate-900">
                About*
              </label>
              <RichTextEditor
                value={form.about}
                onChange={(html) => updateForm({ about: html })}
              />
              {errors.about && (
                <p className="mt-1 text-sm text-red-600">{errors.about}</p>
              )}
            </div>

            {/* Majors Offered */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-slate-900">
                Majors Offered*
              </label>
              <input
                type="text"
                name="majors_offered"
                placeholder="e.g. Computer Science, Mathematics"
                className={`block w-full border rounded-md p-2 ${
                  errors.majors_offered ? "border-red-500" : ""
                }`}
                value={form.majors_offered}
                onChange={(e) => updateForm({ majors_offered: e.target.value })}
                required
              />
              <p className="text-xs text-slate-500 mt-1">
                Separate multiple majors with commas
              </p>
              {errors.majors_offered && (
                <p className="mt-1 text-sm text-red-600">{errors.majors_offered}</p>
              )}
            </div>

            {/* Programs */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-slate-900">
                Programs*
              </label>
              <input
                type="text"
                name="programs"
                placeholder="e.g. Global, Watan, Lestari"
                className={`block w-full border rounded-md p-2 ${
                  errors.programs ? "border-red-500" : ""
                }`}
                value={form.programs}
                onChange={(e) => updateForm({ programs: e.target.value })}
                required
              />
              <p className="text-xs text-slate-500 mt-1">
                Separate multiple programs with commas
              </p>
              {errors.programs && (
                <p className="mt-1 text-sm text-red-600">{errors.programs}</p>
              )}
            </div>

            {/* Link */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-slate-900">
                Website Link
              </label>
              <input
                type="url"
                name="link"
                className="block w-full border rounded-md p-2"
                value={form.link}
                onChange={(e) => updateForm({ link: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            {/* Image Upload */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-slate-900">
                {params.id ? "Update Image" : "Upload Image*"}
              </label>
              <input
                type="file"
                accept="image/*"
                className={`block w-full border rounded-md p-2 ${
                  errors.image ? "border-red-500" : ""
                }`}
                onChange={handleImageChange}
                required={!params.id}
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image}</p>
              )}
              {preview && (
                <div className="mt-2">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-24 w-24 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => navigate("/admin/scholarship-list")}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-500"
            }`}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}