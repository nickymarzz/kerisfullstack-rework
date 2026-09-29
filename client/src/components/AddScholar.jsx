import { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import RichTextEditor from "./RichTextEditor";

export default function Record() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    ig_acc: "",
    about: "<p></p>",
    sponsor: "",
    major: "",
    institution: "",
    availability: true, // Default to true (Available)
    image: null,
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
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/${params.id}`
        );
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const record = await response.json();
        if (!record) return navigate("/");

        setForm({
          ...record,
          about: record.about || "<p></p>",
          major: Array.isArray(record.major)
            ? record.major.join(", ")
            : record.major,
          institution: Array.isArray(record.institution)
            ? record.institution.join(", ")
            : record.institution,
          availability:
            record.availability !== undefined ? record.availability : true, // Ensure boolean
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

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (form.about === "<p></p>" || !form.about.trim())
      newErrors.about = "About section is required";
    if (!form.sponsor.trim()) newErrors.sponsor = "Sponsor is required";
    if (!form.major.trim()) newErrors.major = "Major is required";
    if (!form.institution.trim())
      newErrors.institution = "Institution is required";
    if (typeof form.availability !== "boolean")
      newErrors.availability = "Availability must be set";
    /*if (!form.image && !params.id) newErrors.image = "Image is required";*/

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
      const majors = form.major
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item);
      const institutions = form.institution
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      if (form.ig_acc.trim()) formData.append("ig_acc", form.ig_acc);
      formData.append("about", form.about);
      formData.append("sponsor", form.sponsor);
      formData.append("availability", form.availability.toString()); // Convert boolean to string

      majors.forEach((major) => formData.append("major[]", major));
      institutions.forEach((institution) =>
        formData.append("institution[]", institution)
      );

      if (form.image) formData.append("image", form.image);

      // Debug what's being sent
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      let response;
      if (!params.id) {
        response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/`, {
          method: "POST",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          body: formData,
        });
      } else {
        response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/${params.id}`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          body: formData,
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Reset form on success
      setForm({
        name: "",
        email: "",
        ig_acc: "",
        about: "<p></p>",
        sponsor: "",
        major: "",
        institution: "",
        availability: true,
        image: null,
      });
      setPreview(null);
      navigate("/admin/scholar-list");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to save record. Please check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-full p-4 sm:p-10">
      <h3 className="text-lg font-semibold p-4">
        {params.id ? "Edit" : "Create"} Scholar Record
      </h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Scholar Info
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              This information will be displayed publicly.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-8">
            {/* Name Input */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-slate-900">
                Name*
              </label>
              <input
                type="text"
                name="name"
                className={`block w-full border rounded-md p-2 ${
                  errors.name ? "border-red-500" : ""
                }`}
                value={form.name}
                onChange={(e) => updateForm({ name: e.target.value })}
                required
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-slate-900">
                Email*
              </label>
              <input
                type="email"
                name="email"
                className={`block w-full border rounded-md p-2 ${
                  errors.email ? "border-red-500" : ""
                }`}
                value={form.email}
                onChange={(e) => updateForm({ email: e.target.value })}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Instagram Account */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-slate-900">
                Instagram Account
              </label>
              <input
                type="text"
                name="ig_acc"
                className="block w-full border rounded-md p-2"
                value={form.ig_acc}
                onChange={(e) => updateForm({ ig_acc: e.target.value })}
              />
            </div>

            {/* Availability Radio Buttons */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-slate-900">
                Availability*
              </label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="available"
                    name="availability"
                    checked={form.availability === true}
                    onChange={() => updateForm({ availability: true })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="available" className="ml-2 block text-sm text-gray-900">
                    Available
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="unavailable"
                    name="availability"
                    checked={form.availability === false}
                    onChange={() => updateForm({ availability: false })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="unavailable" className="ml-2 block text-sm text-gray-900">
                    Unavailable
                  </label>
                </div>
              </div>
              {errors.availability && (
                <p className="mt-1 text-sm text-red-600">{errors.availability}</p>
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

            {/* Sponsor */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-slate-900">
                Sponsor*
              </label>
              <input
                type="text"
                name="sponsor"
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

            {/* Major */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-slate-900">
                Major*
              </label>
              <input
                type="text"
                name="major"
                className={`block w-full border rounded-md p-2 ${
                  errors.major ? "border-red-500" : ""
                }`}
                value={form.major}
                onChange={(e) => updateForm({ major: e.target.value })}
                required
              />
              <p className="text-xs text-slate-500 mt-1">
                Separate multiple majors with commas
              </p>
              {errors.major && (
                <p className="mt-1 text-sm text-red-600">{errors.major}</p>
              )}
            </div>

            {/* Institution */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-slate-900">
                Institution*
              </label>
              <input
                type="text"
                name="institution"
                className={`block w-full border rounded-md p-2 ${
                  errors.institution ? "border-red-500" : ""
                }`}
                value={form.institution}
                onChange={(e) => updateForm({ institution: e.target.value })}
                required
              />
              <p className="text-xs text-slate-500 mt-1">
                Separate multiple institutions with commas
              </p>
              {errors.institution && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.institution}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-slate-900">
                {params.id ? "Update Image" : "Upload Image"}
              </label>
              <input
                type="file"
                accept="image/*"
                className={`block w-full border rounded-md p-2 ${
                  errors.image ? "border-red-500" : ""
                }`}
                onChange={handleImageChange}
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
            onClick={() => navigate("/admin/scholar-list")}
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
