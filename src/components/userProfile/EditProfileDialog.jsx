import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { FaCamera, FaPlus, FaSave, FaTimes, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { updateProfile } from "../../redux/slices/authSlice";

const DIETARY_OPTIONS = [
  "vegetarian",
  "vegan",
  "gluten-free",
  "dairy-free",
  "keto",
  "paleo",
  "pescatarian",
  "low-carb",
  "sugar-free",
  "organic",
];

const ALLERGEN_OPTIONS = [
  "Peanuts",
  "Tree Nuts",
  "Milk",
  "Eggs",
  "Fish",
  "Shellfish",
  "Soy",
  "Wheat",
  "Gluten",
  "Sesame",
  "Sulfites",
];

const CUISINE_OPTIONS = [
  "indian",
  "italian",
  "chinese",
  "mexican",
  "thai",
  "japanese",
  "french",
  "mediterranean",
  "american",
  "korean",
  "vietnamese",
  "middle-eastern",
  "british",
  "spanish",
  "german",
  "greek",
];

function Chip({ color, children, onRemove }) {
  const colorMap = {
    green:
      "badge-lg bg-green-100 border border-green-300 text-green-700 hover:text-green-900",
    red: "badge-lg bg-red-100 border border-red-300 text-red-700 hover:text-red-900",
  };
  return (
    <span className={`badge ${colorMap[color]} gap-2 uppercase`}>
      <span className="truncate max-w-[12ch] sm:max-w-[20ch]">{children}</span>
      <button
        type="button"
        className="ml-1 btn btn-ghost btn-xs px-1"
        onClick={onRemove}
        aria-label={`Remove ${children}`}
      >
        <FaTrash className="w-3 h-3" />
      </button>
    </span>
  );
}

export default function EditProfileDialog() {
  const dlgRef = useRef(null);
  const { profile } = useSelector((state) => state.auth.userData);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: profile.name || "",
      bio: profile.bio || "",
      dietaryLabels: profile.dietaryLabels.map((v) => ({ value: v })),
      allergens: profile.allergens.map((v) => ({ value: v })),
      cuisine: profile.cuisine || "",
      dietaryDraft: "",
      allergenDraft: "",
      avatar: null,
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
      (item) => (item?.value ?? "") === valueToAdd
    );
    if (!exists) appendFn({ value: valueToAdd });
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    data.dietaryLabels = data.dietaryLabels.map((i) => i.value);
    data.allergens = data.allergens.map((i) => i.value);
    try {
      dlgRef.current?.close();
      await dispatch(updateProfile(data));
    } catch (err) {
      console.error("Profile update failed:", err);
    } finally {
      setIsLoading(false);
      reset({
        name: profile.name,
        bio: profile.bio,
        dietaryLabels: profile.dietaryLabels.map((v) => ({ value: v })),
        allergens: profile.allergens.map((v) => ({ value: v })),
        cuisine: profile.cuisine,
        dietaryDraft: "",
        allergenDraft: "",
        file: null,
      });
    }
  };

  return (
    <dialog
      id="edit-profile"
      ref={dlgRef}
      className="modal"
      aria-labelledby="edit-profile-title"
    >
      <div className="modal-box w-full max-w-2xl bg-white/80 backdrop-blur-md border border-orange-100 shadow-xl rounded-2xl p-4 sm:p-6 relative max-h-[92vh] overflow-y-auto">
        {/* Close */}
        <button
          type="button"
          className="btn btn-sm btn-circle bg-gradient-to-r from-orange-400 to-red-400 text-white hover:opacity-90 shadow-md absolute right-3 top-3"
          onClick={() => dlgRef.current?.close()}
          aria-label="Close edit profile dialog"
        >
          <AiOutlineClose className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <h3
            id="edit-profile-title"
            className="font-bold text-xl sm:text-2xl text-gray-800"
          >
            Edit Profile
          </h3>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Avatar */}
          <section className="flex flex-col items-center gap-3">
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-orange-100 shadow-md overflow-hidden bg-gradient-to-br from-orange-200 to-red-200 grid place-items-center">
                {getAvatarUrl() && (
                  <img
                    src={getAvatarUrl()}
                    alt="User avatar"
                    className="object-cover w-full h-full"
                  />
                )}
              </div>

              <label
                htmlFor="avatar-upload"
                className="absolute -bottom-2 -right-2 bg-gradient-to-r from-orange-400 to-red-400 text-white p-2 rounded-full shadow-md hover:scale-105 transition cursor-pointer"
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
                      !files?.[0] || files[0].size <= 5_000_000 || "Max 5MB",
                    fileType: (files) =>
                      !files?.[0] ||
                      ["image/jpeg", "image/png", "image/webp"].includes(
                        files[0].type
                      ) ||
                      "Invalid file type",
                  },
                })}
              />
            </div>
            <p className="text-xs text-center text-gray-500">
              Tap the camera icon to update your picture
            </p>
          </section>

          {/* Name */}
          <section className="grid grid-cols-1 gap-4">
            <div className="form-control w-full">
              <label className="label" htmlFor="name">
                <span className="label-text font-medium text-gray-700">
                  Display Name
                </span>
              </label>
              <input
                id="name"
                className={`input input-bordered w-full border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300 rounded-xl ${errors.name ? "input-error" : ""
                  }`}
                placeholder="Enter your display name"
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 2, message: "Min 2 characters" },
                })}
              />
              {errors.name && (
                <span className="label-text-alt text-red-500 mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>
          </section>

          {/* Bio */}
          <section className="form-control w-full">
            <label className="label" htmlFor="bio">
              <span className="label-text font-medium text-gray-700">Bio</span>
            </label>
            <textarea
              id="bio"
              rows={3}
              className={`textarea textarea-bordered w-full border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300 rounded-xl ${errors.bio ? "textarea-error" : ""
                }`}
              placeholder="Tell us about yourself, your cooking style, or favorite dishes..."
              {...register("bio", {
                maxLength: {
                  value: 500,
                  message: `Max 500 characters`,
                },
              })}
            />
            {errors.bio && (
              <span className="label-text-alt text-red-500 mt-1">
                {errors.bio.message}
              </span>
            )}
          </section>

          {/* Dietary Preferences */}
          <section className="form-control w-full">
            <label className="label" htmlFor="dietary-select">
              <span className="label-text font-medium text-gray-700">
                Dietary Preferences
              </span>
            </label>

            <div className="flex flex-col sm:flex-row gap-2">
              <select
                id="dietary-select"
                className="select select-bordered w-full rounded-xl uppercase"
                {...register("dietaryDraft")}
              >
                <option value="">Select dietary preference</option>
                {DIETARY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="btn bg-gradient-to-r  from-orange-400 to-red-400 text-white gap-2 hover:opacity-90 shadow-md"
                disabled={!dietaryDraft}
                onClick={() => {
                  ensureUniqueAppend(
                    dietaryFields,
                    dietaryDraft,
                    appendDietary
                  );
                  reset({ ...getValues(), dietaryDraft: "" });
                }}
              >
                <FaPlus className="w-3 h-3" />
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {dietaryFields.map((field, idx) => (
                <div key={field.id} className="inline-flex items-center gap-2">
                  <input
                    type="hidden"
                    defaultValue={field.value}
                    {...register(`dietaryLabels.${idx}.value`)}
                  />
                  <Chip
                    color="green"
                    onRemove={() => removeDietary(idx)}
                    title={`Remove ${field.value}`}
                  >
                    {field.value}
                  </Chip>
                </div>
              ))}
            </div>
          </section>

          {/* Allergens */}
          <section className="form-control w-full">
            <label className="label" htmlFor="allergen-select">
              <span className="label-text font-medium text-gray-700">
                Allergens
              </span>
            </label>

            {/* Inline "Picker" (no separate component) */}
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                id="allergen-select"
                className="select select-bordered w-full border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300 rounded-xl uppercase"
                defaultValue=""
                {...register("allergenDraft")}
              >
                <option value="">Select allergen</option>
                {ALLERGEN_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="btn bg-gradient-to-r  from-orange-400 to-red-400 text-white gap-2 hover:opacity-90 shadow-md"
                disabled={!allergenDraft}
                onClick={() => {
                  ensureUniqueAppend(
                    allergenFields,
                    allergenDraft,
                    appendAllergen
                  );
                  reset({ ...getValues(), allergenDraft: "" });
                }}
              >
                <FaPlus className="w-3 h-3" />
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {allergenFields.map((field, idx) => (
                <div key={field.id} className="inline-flex items-center gap-2">
                  <input
                    type="hidden"
                    defaultValue={field.value}
                    {...register(`allergens.${idx}.value`)}
                  />
                  <Chip
                    color="red"
                    onRemove={() => removeAllergen(idx)}
                    title={`Remove ${field.value}`}
                  >
                    {field.value}
                  </Chip>
                </div>
              ))}
            </div>
          </section>

          {/* Cuisine (single) */}
          <section className="form-control w-full">
            <label className="label" htmlFor="cuisine-select">
              <span className="label-text font-medium text-gray-700">
                Favorite Cuisine
              </span>
              <span className="label-text-alt text-gray-500">
                Single choice
              </span>
            </label>
            <select
              id="cuisine-select"
              className="select select-bordered w-full border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300 rounded-xl uppercase"
              defaultValue={profile.cuisine || ""}
              {...register("cuisine")}
            >
              <option value="">Select cuisine</option>
              {CUISINE_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </section>

          {/* Actions */}
          <div className="modal-action flex items-center justify-end gap-3 pt-4 border-t border-orange-100">
            <button
              type="button"
              className="btn btn-ghost gap-2 text-gray-600 hover:bg-orange-50"
              onClick={() => dlgRef.current?.close()}
            >
              <FaTimes className="w-4 h-4" />
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              className="btn bg-gradient-to-r from-orange-400 to-red-400 text-white gap-2 hover:opacity-90 shadow-md"
              disabled={isSubmitting}
            >
              <FaSave className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
