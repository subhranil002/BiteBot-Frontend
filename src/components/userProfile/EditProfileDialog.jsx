import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import {
  FaCamera,
  FaPlus,
  FaSave,
  FaTimes,
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

export default function EditProfileDialog() {
  const dlgRef = useRef(null);
  const { profile } = useSelector((state) => state.auth.userData);
  const [previewUrl, setPreviewUrl] = useState(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    watch,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: profile.name || "",
      bio: profile.bio || "",
      avatar: null,
      dietaryLabels: profile.dietaryLabels?.map((v) => ({ value: v })) || [],
      allergens: profile.allergens?.map((v) => ({ value: v })) || [],
      cuisine: profile.cuisine || "",
      dietaryDraft: "",
      allergenDraft: "",
    },
  });

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

  const watchedFileList = watch("avatar");
  const dietaryDraft = watch("dietaryDraft");
  const allergenDraft = watch("allergenDraft");

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
    if (url) {
      return url.replace(
        "/upload/",
        "/upload/ar_1:1,c_auto,g_auto,w_500/r_max/"
      );
    }
    return null;
  };

  const ensureUniqueAppend = (currentItems, valueToAdd, appendFn) => {
    if (!valueToAdd) return;
    const exists = currentItems.some(
      (item) => (item?.value ?? "").toLowerCase() === valueToAdd.toLowerCase()
    );
    if (!exists) {
      appendFn({ value: valueToAdd });
    }
  };

  const onSubmit = async (data) => {
    const formattedDietary = data.dietaryLabels.map((i) => i.value);
    const formattedAllergens = data.allergens.map((i) => i.value);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("bio", data.bio);
    if (data.cuisine) formData.append("cuisine", data.cuisine);
    if (data.avatar && data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }
    formattedDietary.forEach((item) => formData.append("dietaryLabels[]", item));
    formattedAllergens.forEach((item) => formData.append("allergens[]", item));

    try {
      await dispatch(updateProfile(formData)).unwrap();
      dlgRef.current?.close();
      reset(data); 
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  return (
    <dialog
      id="edit-profile"
      ref={dlgRef}
      className="modal backdrop-blur-sm"
      aria-labelledby="edit-profile-title"
    >
      <div className="modal-box w-full max-w-3xl bg-white shadow-2xl border border-orange-100 rounded-3xl p-0 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-orange-100 flex items-center justify-between">
          <h3
            id="edit-profile-title"
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
            
            {/* Top Section: Avatar & Basic Info */}
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              {/* Avatar */}
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
                    {...register("avatar")}
                  />
                </div>
              </div>

              {/* Name & Bio */}
              <div className="flex-1 space-y-4 w-full">
                <div className="form-control w-full">
                  <label className="label pt-0">
                    <span className="label-text font-bold text-gray-700">
                      Display Name
                    </span>
                  </label>
                  <input
                    className={`input input-bordered w-full bg-gray-50 focus:bg-white border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100/50 rounded-xl transition-all ${
                      errors.name ? "input-error" : ""
                    }`}
                    placeholder="Your Name"
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
                    placeholder="Tell us about your favorite foods..."
                    {...register("bio", { maxLength: 500 })}
                  />
                </div>
              </div>
            </div>

            <div className="divider"></div>

            {/* Food Preferences Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                 <h4 className="font-bold text-lg text-gray-800 flex items-center gap-2 mb-4">
                    <FaUtensils className="text-orange-500" />
                    Food Preferences
                </h4>
              </div>

              {/* Cuisine */}
              <div className="form-control w-full md:col-span-2">
                <label className="label">
                  <span className="label-text font-bold text-gray-700">
                    Favorite Cuisine
                  </span>
                </label>
                <select
                  className="select select-bordered w-full border-gray-200 focus:border-orange-400 rounded-xl"
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

              {/* Dietary */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-gray-700">
                    Dietary Preferences
                  </span>
                </label>
                <div className="flex gap-2 mb-3">
                  <select
                    className="select select-bordered select-sm w-full rounded-lg"
                    {...register("dietaryDraft")}
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
                        dietaryFields,
                        dietaryDraft,
                        appendDietary
                      );
                      reset({ ...getValues(), dietaryDraft: "" });
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
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-gray-700">
                    Allergens
                  </span>
                </label>
                <div className="flex gap-2 mb-3">
                  <select
                    className="select select-bordered select-sm w-full rounded-lg"
                    {...register("allergenDraft")}
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
                        allergenFields,
                        allergenDraft,
                        appendAllergen
                      );
                      reset({ ...getValues(), allergenDraft: "" });
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

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-orange-100">
              <button
                type="button"
                className="btn btn-ghost hover:bg-gray-100 rounded-xl"
                onClick={() => dlgRef.current?.close()}
              >
                Cancel
              </button>
              
              {/* 2. Button is now disabled if !isDirty or isSubmitting */}
              <button
                type="submit"
                disabled={!isDirty || isSubmitting}
                className={`btn border-none text-white shadow-lg transition-all rounded-xl gap-2 px-8
                  ${!isDirty || isSubmitting 
                    ? "bg-gray-300 cursor-not-allowed text-gray-500 shadow-none" 
                    : "bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-orange-200 hover:-translate-y-0.5"
                  }`}
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