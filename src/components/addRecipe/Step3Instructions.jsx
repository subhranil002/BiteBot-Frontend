import { useFieldArray, useFormContext } from "react-hook-form";
import { FaMinus, FaPlus, FaUpload } from "react-icons/fa";

const Step3Instructions = () => {
  const {
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  const steps = watch("steps") || [];

  const handleImageChange = (index, file) => {
    setValue(`steps.${index}.imageFile`, file || null, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Cooking Instructions</h2>
        <button
          type="button"
          onClick={() =>
            append({
              id: `s-${Date.now()}`,
              text: "",
              imageFile: null,
            })
          }
          className="btn btn-primary gap-2"
        >
          <FaPlus className="w-4 h-4" />
          Add Step
        </button>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border border-base-300 rounded-lg p-4 space-y-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Step {index + 1}</h3>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="btn btn-outline btn-sm gap-2"
                >
                  <FaMinus className="w-4 h-4" />
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* instruction text */}
              <div className="space-y-2">
                <label className="label" htmlFor={`steps.${index}.text`}>
                  <span className="label-text">Instructions *</span>
                </label>
                <textarea
                  id={`steps.${index}.text`}
                  placeholder="Describe this step in detail."
                  {...register(`steps.${index}.text`, {
                    required: "Step instruction is required",
                    maxLength: {
                      value: 1000,
                      message: "Max 1000 characters",
                    },
                  })}
                  className={`textarea textarea-bordered w-full ${
                    errors?.steps?.[index]?.text ? "textarea-error" : ""
                  }`}
                  rows={3}
                />
                {errors?.steps?.[index]?.text && (
                  <p className="text-sm text-error">
                    {errors.steps[index].text.message}
                  </p>
                )}
              </div>

              {/* image upload – REQUIRED */}
              <div className="space-y-2">
                <label className="label">
                  <span className="label-text">Step Image *</span>
                </label>

                <input
                  type="file"
                  accept="image/*"
                  id={`steps.${index}.imageFile`}
                  className="hidden"
                  {...register(`steps.${index}.imageFile`, {
                    validate: (v) =>
                      v instanceof File ||
                      steps?.[index]?.imageFile instanceof File
                        ? true
                        : "Image is required for this step",
                  })}
                  onChange={(e) =>
                    handleImageChange(index, e.target.files?.[0] || null)
                  }
                />

                <label
                  htmlFor={`steps.${index}.imageFile`}
                  className="border-2 border-dashed border-base-300 rounded-lg p-6 text-center cursor-pointer block"
                >
                  <FaUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    Click to upload an image for this step
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Images help users follow along with your recipe
                  </p>
                </label>

                {steps?.[index]?.imageFile && (
                  <img
                    src={URL.createObjectURL(steps[index].imageFile)}
                    alt={`Step ${index + 1}`}
                    className="mt-3 rounded-lg max-h-40 object-cover"
                  />
                )}

                {errors?.steps?.[index]?.imageFile && (
                  <p className="text-sm text-error">
                    {errors.steps[index].imageFile.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {errors?.steps?.message && (
        <p className="text-sm text-error">{errors.steps.message}</p>
      )}
    </div>
  );
};

export default Step3Instructions;
