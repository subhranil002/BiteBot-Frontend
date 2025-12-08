import { useFieldArray, useFormContext } from "react-hook-form";
import {
  FaClock,
  FaImage,
  FaPlus,
  FaTimes,
  FaUpload,
  FaUsers,
} from "react-icons/fa";

const formatLabel = (str) =>
  str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const Step1BasicDetails = ({ cuisineOptions, dietaryOptions }) => {
  const {
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  const onAddLabel = (label) => {
    const t = label.trim().toLowerCase();
    const current = watch("dietaryLabels") || [];
    if (!current.includes(t)) {
      setValue("dietaryLabels", [...current, t], { shouldDirty: true });
    }
  };

  const onRemoveLabel = (label) => {
    const current = watch("dietaryLabels") || [];
    setValue(
      "dietaryLabels",
      current.filter((l) => l !== label),
      { shouldDirty: true }
    );
  };

  const dietaryLabels = watch("dietaryLabels");
  const thumbnailFile = watch("thumbnailFile");

  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    control,
    name: "externalMediaLinks",
  });

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0] || null;
    setValue("thumbnailFile", file, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Recipe Details</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="space-y-2">
          <label className="label" htmlFor="title">
            <span className="label-text">Recipe Title *</span>
          </label>
          <input
            id="title"
            placeholder="e.g. Grandma's Secret Pasta"
            {...register("title", {
              required: "Recipe title is required",
              minLength: { value: 3, message: "At least 3 characters" },
              maxLength: { value: 100, message: "Max 100 characters" },
            })}
            className={`input input-bordered w-full ${
              errors.title ? "input-error" : ""
            }`}
          />
          {errors.title && (
            <p className="text-sm text-error">{errors.title.message}</p>
          )}
        </div>

        {/* Cuisine */}
        <div className="space-y-2">
          <label className="label" htmlFor="cuisine">
            <span className="label-text">Cuisine *</span>
          </label>
          <select
            id="cuisine"
            {...register("cuisine", {
              required: "Please select a cuisine",
            })}
            className={`select select-bordered w-full ${
              errors.cuisine ? "select-error" : ""
            }`}
          >
            <option value="">Select cuisine.</option>
            {cuisineOptions.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {formatLabel(cuisine)}
              </option>
            ))}
          </select>
          {errors.cuisine && (
            <p className="text-sm text-error">{errors.cuisine.message}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="label" htmlFor="description">
          <span className="label-text">Description *</span>
        </label>
        <textarea
          id="description"
          placeholder="Describe your recipe, what makes it special."
          {...register("description", {
            required: "Description is required",
            minLength: { value: 10, message: "At least 10 characters" },
            maxLength: { value: 1000, message: "Max 1000 characters" },
          })}
          className={`textarea textarea-bordered w-full ${
            errors.description ? "textarea-error" : ""
          }`}
          rows={3}
        />
        {errors.description && (
          <p className="text-sm text-error">{errors.description.message}</p>
        )}
      </div>

      {/* Servings & time */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="label" htmlFor="servings">
            <span className="label-text">Servings *</span>
          </label>
          <div className="flex items-center gap-2">
            <FaUsers className="w-4 h-4 text-gray-400" />
            <input
              id="servings"
              type="number"
              min="1"
              {...register("servings", {
                required: "Servings is required",
                min: { value: 1, message: "At least 1 serving" },
                valueAsNumber: true,
              })}
              className={`input input-bordered w-full ${
                errors.servings ? "input-error" : ""
              }`}
            />
          </div>
          {errors.servings && (
            <p className="text-sm text-error">{errors.servings.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="label" htmlFor="prepMinutes">
            <span className="label-text">Prep Time (min) *</span>
          </label>
          <div className="flex items-center gap-2">
            <FaClock className="w-4 h-4 text-gray-400" />
            <input
              id="prepMinutes"
              type="number"
              min="0"
              {...register("prepMinutes", {
                required: "Prep time is required",
                min: { value: 1, message: "Minimum 1 minute" },
                valueAsNumber: true,
              })}
              className={`input input-bordered w-full ${
                errors.prepMinutes ? "input-error" : ""
              }`}
            />
          </div>
          {errors.prepMinutes && (
            <p className="text-sm text-error">{errors.prepMinutes.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="label" htmlFor="cookMinutes">
            <span className="label-text">Cook Time (min) *</span>
          </label>
          <div className="flex items-center gap-2">
            <FaClock className="w-4 h-4 text-gray-400" />
            <input
              id="cookMinutes"
              type="number"
              min="0"
              {...register("cookMinutes", {
                required: "Cook time is required",
                min: { value: 1, message: "Minimum 1 minute" },
                valueAsNumber: true,
              })}
              className={`input input-bordered w-full ${
                errors.cookMinutes ? "input-error" : ""
              }`}
            />
          </div>
          {errors.cookMinutes && (
            <p className="text-sm text-error">{errors.cookMinutes.message}</p>
          )}
        </div>
      </div>

      {/* Premium toggle + thumbnail + dietary labels + external links */}
      <div className="space-y-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            id="isPremium"
            type="checkbox"
            {...register("isPremium")}
            className="checkbox"
          />
          <span className="text-sm">Premium Recipe</span>
        </label>

        {/* Thumbnail upload + preview (REQUIRED) */}
        <div className="space-y-2">
          <label className="label">
            <span className="label-text">Thumbnail *</span>
          </label>

          <input
            id="thumbnailFile"
            type="file"
            accept="image/*"
            className="hidden"
            {...register("thumbnailFile", {
              validate: (v) =>
                v instanceof File || thumbnailFile instanceof File
                  ? true
                  : "Thumbnail image is required",
            })}
            onChange={handleThumbnailChange}
          />

          <label
            htmlFor="thumbnailFile"
            className="border-2 border-dashed border-base-300 rounded-lg p-4 flex items-center gap-3 cursor-pointer"
          >
            <FaUpload className="w-6 h-6 text-gray-400" />
            <div>
              <p className="text-sm font-medium">
                {thumbnailFile
                  ? "Change thumbnail"
                  : "Click to upload thumbnail"}
              </p>
              <p className="text-xs text-gray-500">
                Recommended: landscape image for your recipe cover
              </p>
            </div>
          </label>

          {errors.thumbnailFile && (
            <p className="text-sm text-error">{errors.thumbnailFile.message}</p>
          )}

          {thumbnailFile && (
            <div className="mt-3 flex items-center gap-4">
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-base-200">
                <img
                  src={URL.createObjectURL(thumbnailFile)}
                  alt="Thumbnail preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm text-gray-600">
                <div className="flex items-center gap-2 font-medium">
                  <FaImage className="w-4 h-4" />
                  <span>{thumbnailFile.name}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dietary labels */}
        <div className="space-y-3">
          <label className="label">
            <span className="label-text">Dietary Labels</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map((label) => {
              const active = dietaryLabels.includes(label);
              return (
                <button
                  type="button"
                  key={label}
                  className={`badge ${
                    active ? "badge-primary" : "badge-outline"
                  } cursor-pointer capitalize`}
                  onClick={() =>
                    active ? onRemoveLabel(label) : onAddLabel(label)
                  }
                >
                  {formatLabel(label)}
                </button>
              );
            })}
          </div>

          {dietaryLabels.length > 0 && (
            <div className="space-y-2">
              <label className="label text-sm">Selected labels:</label>
              <div className="flex flex-wrap gap-2">
                {dietaryLabels.map((label) => (
                  <span
                    key={label}
                    className="badge badge-primary gap-1 flex items-center capitalize"
                  >
                    {formatLabel(label)}
                    <FaTimes
                      className="w-3 h-3 cursor-pointer ml-1"
                      onClick={() => onRemoveLabel(label)}
                    />
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* External media links */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="label">
              <span className="label-text">
                External Links (optional, e.g. YouTube, blog)
              </span>
            </label>
            <button
              type="button"
              className="btn btn-xs btn-outline gap-1"
              onClick={() => appendLink({ name: "", url: "" })}
            >
              <FaPlus className="w-3 h-3" />
              Add Link
            </button>
          </div>

          {linkFields.length === 0 && (
            <p className="text-xs text-gray-500">
              You can attach related videos or articles later.
            </p>
          )}

          <div className="space-y-3">
            {linkFields.map((field, index) => (
              <div
                key={field.id}
                className="grid md:grid-cols-5 gap-3 items-end border border-base-200 rounded-lg p-3"
              >
                <div className="md:col-span-2 space-y-1">
                  <label
                    className="label text-xs"
                    htmlFor={`externalMediaLinks.${index}.name`}
                  >
                    Label
                  </label>
                  <input
                    id={`externalMediaLinks.${index}.name`}
                    type="text"
                    placeholder="e.g. YouTube walkthrough"
                    {...register(`externalMediaLinks.${index}.name`, {
                      required: "Label is required",
                    })}
                    className={`input input-bordered input-sm w-full ${
                      errors?.externalMediaLinks?.[index]?.name
                        ? "input-error"
                        : ""
                    }`}
                  />
                  {errors?.externalMediaLinks?.[index]?.name && (
                    <p className="text-xs text-error">
                      {errors.externalMediaLinks[index].name.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-3 space-y-1">
                  <label
                    className="label text-xs"
                    htmlFor={`externalMediaLinks.${index}.url`}
                  >
                    URL
                  </label>
                  <input
                    id={`externalMediaLinks.${index}.url`}
                    type="url"
                    placeholder="https://example.com/video"
                    {...register(`externalMediaLinks.${index}.url`, {
                      required: "URL is required",
                      pattern: {
                        value: /^https?:\/\/.+$/i,
                        message: "Enter a valid URL starting with http/https",
                      },
                    })}
                    className={`input input-bordered input-sm w-full ${
                      errors?.externalMediaLinks?.[index]?.url
                        ? "input-error"
                        : ""
                    }`}
                  />
                  {errors?.externalMediaLinks?.[index]?.url && (
                    <p className="text-xs text-error">
                      {errors.externalMediaLinks[index].url.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-5 flex justify-end">
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs text-error"
                    onClick={() => removeLink(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1BasicDetails;
