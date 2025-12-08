import { useFieldArray, useFormContext } from "react-hook-form";
import { FaPlus, FaTrash, FaUpload, FaImage, FaExclamationCircle } from "react-icons/fa";

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

  // Watch steps to render image previews
  const steps = watch("steps") || [];

  const handleImageChange = (index, file) => {
    setValue(`steps.${index}.imageFile`, file || null, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div className="space-y-8 p-1">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-base-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-base-content">Cooking Instructions</h2>
          <p className="text-sm text-base-content/60 mt-1">
            Break down the recipe into clear, easy-to-follow steps.
          </p>
        </div>
        
        <button
          type="button"
          onClick={() =>
            append({
              id: `s-${Date.now()}`,
              text: "",
              imageFile: null,
            })
          }
          className="btn btn-sm btn-outline border-orange-400 text-orange-600 hover:bg-orange-500 hover:border-orange-500 hover:text-white gap-2 transition-all"
        >
          <FaPlus className="w-3 h-3" />
          Add Step
        </button>
      </div>

      {/* --- Steps List --- */}
      <div className="space-y-6">
        
        {fields.length === 0 && (
           <div className="alert bg-base-100 border border-dashed border-base-300 flex flex-col items-center justify-center py-10 text-center shadow-none">
             <div className="text-base-content/40 mb-2">
                 <FaExclamationCircle className="w-6 h-6 mx-auto" />
             </div>
             <span className="text-base-content/60 text-sm">No instructions added yet.</span>
             <button 
                 type="button"
                 onClick={() => append({ id: `s-${Date.now()}`, text: "", imageFile: null })}
                 className="btn btn-link btn-sm text-orange-500 no-underline hover:text-orange-600"
             >
                 Start with Step 1
             </button>
           </div>
        )}

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="card card-compact bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all duration-200 group"
          >
            <div className="card-body p-5 space-y-4">
              
              {/* Card Header: Step Number & Remove */}
              <div className="flex items-center justify-between border-b border-base-100 pb-2">
                <div className="badge badge-lg badge-warning text-yellow-950 font-bold gap-2">
                    Step {index + 1}
                </div>
                
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="btn btn-square btn-sm btn-ghost text-base-content/40 hover:text-error hover:bg-error/10 transition-colors"
                    title="Remove Step"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                
                {/* 1. Instruction Text */}
                <div className="form-control w-full">
                  <label className="label pt-0" htmlFor={`steps.${index}.text`}>
                    <span className="label-text font-semibold text-base-content/80">Instructions *</span>
                  </label>
                  <textarea
                    id={`steps.${index}.text`}
                    rows={5}
                    placeholder="Describe this step in detail..."
                    {...register(`steps.${index}.text`, {
                      required: "Step instruction is required",
                      maxLength: {
                        value: 1000,
                        message: "Max 1000 characters",
                      },
                    })}
                    className={`textarea textarea-bordered text-base w-full focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all ${
                      errors?.steps?.[index]?.text ? "textarea-error" : ""
                    }`}
                  />
                  {errors?.steps?.[index]?.text && (
                    <span className="text-xs text-error mt-1 flex items-center gap-1">
                        <FaExclamationCircle /> {errors.steps[index].text.message}
                    </span>
                  )}
                </div>

                {/* 2. Step Image Upload */}
                <div className="form-control w-full">
                  <label className="label pt-0">
                    <span className="label-text font-semibold text-base-content/80">Step Image *</span>
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
                    className={`h-full min-h-[140px] max-h-[140px] pb-0 flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 p-4
                      ${
                        errors?.steps?.[index]?.imageFile
                          ? "border-error bg-error/5"
                          : "border-base-300 hover:border-orange-400 hover:bg-orange-50/50"
                      }
                    `}
                  >
                    {steps?.[index]?.imageFile ? (
                      <div className="relative w-full h-full flex flex-col items-center justify-center gap-2">
                        <div className="w-full h-32 rounded-lg overflow-hidden border border-base-200">
                             <img
                                src={URL.createObjectURL(steps[index].imageFile)}
                                alt={`Step ${index + 1}`}
                                className="w-full h-full object-cover"
                             />
                        </div>
                        <div className="flex items-center gap-2 text-xs text-success font-medium">
                            <FaImage />
                            <span className="truncate max-w-[150px]">{steps[index].imageFile.name}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-2">
                        <div className="p-3 bg-base-200 rounded-full inline-block text-base-content/50">
                            <FaUpload className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-base-content/80">Upload Photo</p>
                            <p className="text-xs text-base-content/50">Show how it looks</p>
                        </div>
                      </div>
                    )}
                  </label>

                  {errors?.steps?.[index]?.imageFile && (
                    <span className="text-xs text-error mt-1 flex items-center gap-1">
                        <FaExclamationCircle /> {errors.steps[index].imageFile.message}
                    </span>
                  )}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Global Error */}
      {errors?.steps?.message && (
        <div className="alert alert-error shadow-sm py-2">
            <FaExclamationCircle />
            <span className="text-sm">{errors.steps.message}</span>
        </div>
      )}
    </div>
  );
};

export default Step3Instructions;