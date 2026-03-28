import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import {
  FaBriefcase,
  FaCamera,
  FaGlobe,
  FaGraduationCap,
  FaLink,
  FaMoneyBillWave,
  FaPlus,
  FaSave,
  FaTrash,
  FaUser,
  FaUtensils,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import {
  ALLERGEN_OPTIONS,
  CUISINE_OPTIONS,
  DIETARY_OPTIONS,
} from "../../constants";
import { updateProfile } from "../../redux/slices/authSlice";

/* Reusable Chip */
function Chip({ color, children, onRemove }) {
  const colorMap = {
    green:
      "badge-lg bg-emerald-100 border border-emerald-300 text-emerald-700 hover:text-emerald-900",
    red: "badge-lg bg-rose-100 border border-rose-300 text-rose-700 hover:text-rose-900",
    orange:
      "badge-lg bg-orange-100 border border-orange-300 text-orange-800 hover:text-orange-900",
  };
  return (
    <span className={`badge ${colorMap[color]} gap-2 p-3 h-auto`}>
      <span className="truncate max-w-[15ch] sm:max-w-[25ch] text-sm font-medium">
        {children}
      </span>
      <button
        type="button"
        className="ml-1 btn btn-circle btn-ghost btn-xs text-current opacity-60 hover:opacity-100"
        onClick={onRemove}
      >
        <FaTrash className="w-3 h-3" />
      </button>
    </span>
  );
}

/* Chef Edit Dialog (same style as user modal) */
export default function EditChefProfileDialog() {
  const dlgRef = useRef(null);
  const dispatch = useDispatch();
  const { userData } = useSelector((s) => s.auth);
  const profile = userData?.profile || {};
  const chefProfile = userData?.chefProfile || {};

  // preview + draft states
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dietaryDraft, setDietaryDraft] = useState("");
  const [allergenDraft, setAllergenDraft] = useState("");
  const [linkDraft, setLinkDraft] = useState("");
  const [eduDraft, setEduDraft] = useState("");
  const [expDraft, setExpDraft] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setError,
    clearErrors,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      // user profile fields (same as user modal)
      name: profile.name || "",
      bio: profile.bio || "",
      avatar: null,
      cuisine: profile.cuisine || "",
      dietaryLabels: profile.dietaryLabels?.map((v) => ({ value: v })) || [],
      allergens: profile.allergens?.map((v) => ({ value: v })) || [],

      // chef-only fields
      specialty: chefProfile.specialty || "",
      subscriptionPrice: chefProfile.subscriptionPrice ?? "",

      educationList: chefProfile.education?.map((v) => ({ value: v })) || [],
      experienceList: chefProfile.experience?.map((v) => ({ value: v })) || [],
      externalLinks:
        chefProfile.externalLinks?.map((v) => ({ value: v })) || [],

      // drafts are local state, not part of form defaultValues
    },
  });

  // Field arrays
  const {
    fields: eduFields,
    append: appendEdu,
    remove: removeEdu,
  } = useFieldArray({ control, name: "educationList" });
  const {
    fields: expFields,
    append: appendExp,
    remove: removeExp,
  } = useFieldArray({ control, name: "experienceList" });
  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({ control, name: "externalLinks" });
  const {
    fields: dietaryFields,
    append: appendDietary,
    remove: removeDietary,
  } = useFieldArray({ control, name: "dietaryLabels" });
  const {
    fields: allergenFields,
    append: appendAllergen,
    remove: removeAllergen,
  } = useFieldArray({ control, name: "allergens" });

  // avatar preview
  const watchedFileList = watch("avatar");
  useEffect(() => {
    const file = watchedFileList?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
  }, [watchedFileList]);

  const getAvatarUrl = () => {
    if (previewUrl) return previewUrl;
    const url = profile?.avatar?.secure_url;
    if (url)
      return url.replace(
        "/upload/",
        "/upload/ar_1:1,c_auto,g_auto,w_500/r_max/",
      );
    return null;
  };

  // Helper: ensure unique value in field array
  const ensureUniqueAppend = (fieldName, valueToAdd, appendFn) => {
    if (!valueToAdd) return;
    const currentItems = watch(fieldName) || [];
    const exists = currentItems.some(
      (item) => (item?.value ?? "").toLowerCase() === valueToAdd.toLowerCase(),
    );
    if (!exists) {
      appendFn({ value: valueToAdd });
      clearErrors(fieldName);
    }
  };

  // Add link with basic URL validation
  const handleAddLink = () => {
    if (!linkDraft) return;
    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\w .-]*)*\/?$/;
    if (!urlPattern.test(linkDraft)) {
      setError("externalLinks", {
        type: "manual",
        message: "Please enter a valid URL",
      });
      return;
    }
    ensureUniqueAppend("externalLinks", linkDraft, appendLink);
    setLinkDraft("");
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        profile: {
          name: data.name,
          bio: data.bio,
          avatar: data.avatar,
          cuisine: data.cuisine,
          dietaryLabels: data.dietaryLabels.map((i) => i.value?.toLowerCase()),
          allergens: data.allergens.map((i) => i.value?.toLowerCase()),
        },
        chefProfile: {
          specialty: data.specialty,
          subscriptionPrice: Number(data.subscriptionPrice) || 0,
          education: data.educationList.map((i) => i.value),
          experience: data.experienceList.map((i) => i.value),
          externalLinks: data.externalLinks.map((i) => i.value),
        },
      };

      await dispatch(updateProfile(payload));
      dlgRef.current?.close();
      reset(data);
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  return (
    <dialog
      id="edit-chef-profile"
      ref={dlgRef}
      className="modal backdrop-blur-sm"
      aria-labelledby="edit-chef-profile-title"
    >
      <div className="modal-box w-full max-w-3xl bg-white shadow-2xl border border-orange-100 rounded-3xl p-0 overflow-hidden">
        {/* Header (same style as user modal) */}
        <div className="bg-linear-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-orange-100 flex items-center justify-between">
          <h3
            id="edit-chef-profile-title"
            className="font-bold text-xl text-gray-800 flex items-center gap-2"
          >
            <FaUser className="text-orange-500" />
            Edit Profile
          </h3>

          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost text-gray-500 hover:bg-orange-100 hover:text-orange-600"
            onClick={() => dlgRef.current?.close()}
          >
            <AiOutlineClose className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            {/* Avatar & Basic Info (same layout) */}
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
                <div className="relative group">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-orange-50 ring-2 ring-orange-100">
                    {getAvatarUrl() ? (
                      <img
                        src={getAvatarUrl()}
                        alt="Avatar"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl text-orange-300 font-bold">
                        {profile.name?.charAt(0)}
                      </div>
                    )}
                  </div>

                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-1 right-1 bg-gray-800 text-white p-2.5 rounded-full shadow-lg hover:scale-110 transition cursor-pointer border-2 border-white"
                    title="Change avatar"
                  >
                    <FaCamera className="w-4 h-4" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("avatar", {
                      validate: {
                        fileSize: (files) =>
                          !files?.[0] ||
                          files[0].size < 2000000 ||
                          "Image must be under 2MB",
                        fileType: (files) =>
                          !files?.[0] ||
                          ["image/jpeg", "image/png", "image/webp"].includes(
                            files[0].type,
                          ) ||
                          "Only JPG, PNG or WEBP allowed",
                      },
                    })}
                  />
                </div>
                {errors.avatar && (
                  <p className="text-red-500 text-xs mt-2 text-center max-w-[140px]">
                    {errors.avatar.message}
                  </p>
                )}
              </div>

              <div className="flex-1 space-y-4 w-full">
                <div className="form-control w-full">
                  <label className="label pt-0">
                    <span className="label-text font-bold text-gray-700">
                      Display Name
                    </span>
                  </label>
                  <input
                    className={`input input-bordered w-full bg-gray-50 focus:bg-white border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100/50 rounded-xl transition-all ${errors.name ? "input-error" : ""}`}
                    placeholder="Chef Name"
                    {...register("name", {
                      required: "Name is required",
                      minLength: { value: 2, message: "Min 2 chars" },
                    })}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold text-gray-700">
                      Bio
                    </span>
                  </label>
                  <textarea
                    rows={3}
                    className="textarea textarea-bordered w-full bg-gray-50 focus:bg-white border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100/50 rounded-xl transition-all"
                    placeholder="Share your culinary journey..."
                    {...register("bio", { maxLength: 500 })}
                  />
                </div>
              </div>
            </div>

            <div className="divider"></div>

            {/* Food Preferences (user fields) */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-bold text-gray-700 flex items-center gap-2">
                    <FaUtensils className="text-orange-500" />
                    Food Preferences
                  </span>
                </label>
                <select
                  className="select select-bordered w-full border-gray-200 focus:border-orange-400 rounded-xl font-medium text-gray-700"
                  {...register("cuisine")}
                >
                  <option value="">Select Cuisine</option>
                  {CUISINE_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dietary Preferences */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-gray-700">
                    Dietary Preferences
                  </span>
                </label>
                <div className="flex gap-2 mb-3">
                  <select
                    className="select select-bordered select-sm w-full rounded-lg"
                    value={dietaryDraft}
                    onChange={(e) => setDietaryDraft(e.target.value)}
                  >
                    <option value="">Select Option</option>
                    {DIETARY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-sm btn-square bg-emerald-100 text-emerald-600 border-emerald-200 hover:bg-emerald-200"
                    onClick={() => {
                      ensureUniqueAppend(
                        "dietaryLabels",
                        dietaryDraft,
                        appendDietary,
                      );
                      setDietaryDraft("");
                    }}
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {dietaryFields.map((field, idx) => (
                    <Chip
                      key={field.id}
                      color="green"
                      onRemove={() => removeDietary(idx)}
                    >
                      {field.value}
                    </Chip>
                  ))}
                </div>
              </div>

              {/* Allergens */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-gray-700">
                    Allergen Awareness
                  </span>
                </label>
                <div className="flex gap-2 mb-3">
                  <select
                    className="select select-bordered select-sm w-full rounded-lg"
                    value={allergenDraft}
                    onChange={(e) => setAllergenDraft(e.target.value)}
                  >
                    <option value="">Select Option</option>
                    {ALLERGEN_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-sm btn-square bg-rose-100 text-rose-600 border-rose-200 hover:bg-rose-200"
                    onClick={() => {
                      ensureUniqueAppend(
                        "allergens",
                        allergenDraft,
                        appendAllergen,
                      );
                      setAllergenDraft("");
                    }}
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {allergenFields.map((field, idx) => (
                    <Chip
                      key={field.id}
                      color="red"
                      onRemove={() => removeAllergen(idx)}
                    >
                      {field.value}
                    </Chip>
                  ))}
                </div>
              </div>
            </section>

            <div className="divider"></div>

            {/* Chef Professional Section (specialty, subscriptionPrice, education, experience, links) */}
            <section className="space-y-6">
              <h4 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <FaBriefcase className="text-orange-500" /> Professional
                Background
              </h4>

              {/* Specialty */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold text-gray-600 flex items-center gap-2">
                    <FaUtensils /> Culinary Specialty
                  </span>
                </label>
                <select
                  className="select select-bordered w-full border-gray-200 focus:border-orange-400 rounded-xl"
                  {...register("specialty")}
                >
                  <option value="">Select Specialty</option>
                  {CUISINE_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subscription Price */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold text-gray-600 flex items-center gap-2">
                    <FaMoneyBillWave /> Subscription Price (₹ / month)
                  </span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full border-gray-200 focus:border-orange-400 rounded-xl"
                  {...register("subscriptionPrice", { valueAsNumber: true })}
                  placeholder="e.g. 499"
                />
              </div>

              {/* Education array */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold text-gray-600 flex items-center gap-2">
                    <FaGraduationCap /> Education / Certification
                  </span>
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    className="input input-bordered w-full border-gray-200 focus:border-orange-400 rounded-xl"
                    placeholder="e.g. Le Cordon Bleu"
                    value={eduDraft}
                    onChange={(e) => setEduDraft(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn bg-orange-100 text-orange-600 border-orange-200 hover:bg-orange-200"
                    onClick={() => {
                      if (eduDraft) {
                        ensureUniqueAppend(
                          "educationList",
                          eduDraft,
                          appendEdu,
                        );
                        setEduDraft("");
                      }
                    }}
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {eduFields.map((field, idx) => (
                    <div
                      key={field.id}
                      className="flex items-center justify-between p-2 bg-orange-50/50 border border-orange-100 rounded-lg"
                    >
                      <span className="text-sm text-gray-700">
                        {field.value}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeEdu(idx)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience array */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold text-gray-600 flex items-center gap-2">
                    <FaBriefcase /> Work Experience
                  </span>
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    className="input input-bordered w-full border-gray-200 focus:border-orange-400 rounded-xl"
                    placeholder="e.g. 5 years as Head Chef at The Ritz"
                    value={expDraft}
                    onChange={(e) => setExpDraft(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn bg-orange-100 text-orange-600 border-orange-200 hover:bg-orange-200"
                    onClick={() => {
                      if (expDraft) {
                        ensureUniqueAppend(
                          "experienceList",
                          expDraft,
                          appendExp,
                        );
                        setExpDraft("");
                      }
                    }}
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {expFields.map((field, idx) => (
                    <div
                      key={field.id}
                      className="flex items-center justify-between p-2 bg-orange-50/50 border border-orange-100 rounded-lg"
                    >
                      <span className="text-sm text-gray-700">
                        {field.value}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeExp(idx)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* External links */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold text-gray-600 flex items-center gap-2">
                    <FaGlobe /> Website & Social Links
                  </span>
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <FaLink className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      className={`input input-bordered w-full pl-10 border-gray-200 focus:border-orange-400 rounded-xl ${errors.externalLinks ? "input-error" : ""}`}
                      placeholder="https://portfolio.com"
                      value={linkDraft}
                      onChange={(e) => setLinkDraft(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn bg-orange-100 text-orange-600 border-orange-200 hover:bg-orange-200"
                    onClick={handleAddLink}
                  >
                    <FaPlus />
                  </button>
                </div>
                {errors.externalLinks && (
                  <span className="text-red-500 text-xs mt-1 ml-1">
                    {errors.externalLinks.message}
                  </span>
                )}

                <div className="flex flex-col gap-2 mt-3">
                  {linkFields.map((field, idx) => (
                    <div
                      key={field.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 group hover:border-orange-200 transition-colors"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-orange-500">
                          <FaGlobe className="w-4 h-4" />
                        </div>
                        <span className="text-sm text-gray-600 truncate">
                          {field.value}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLink(idx)}
                        className="btn btn-xs btn-circle btn-ghost text-red-400 hover:bg-red-50 hover:text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  {linkFields.length === 0 && (
                    <p className="text-xs text-gray-400 italic">
                      No links added yet.
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Footer (same buttons & style) */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-orange-100">
              <button
                type="button"
                className="btn btn-ghost hover:bg-gray-100 rounded-xl"
                onClick={() => dlgRef.current?.close()}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!isDirty || isSubmitting}
                className={`btn border-none text-white shadow-lg transition-all rounded-xl gap-2 px-8 ${!isDirty || isSubmitting ? "bg-gray-300 cursor-not-allowed text-gray-500 shadow-none" : "bg-linear-to-r from-orange-500 to-red-500 hover:shadow-orange-200 hover:-translate-y-0.5"}`}
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <FaSave />
                )}
                {isDirty ? "Save Changes" : "No Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
