import { FaMinus, FaPlus, FaUpload } from "react-icons/fa";

const Step3Instructions = ({
    formData,
    errors,
    onAddStep,
    onRemoveStep,
    onUpdateStep,
}) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Cooking Instructions</h2>
                <button
                    type="button"
                    onClick={onAddStep}
                    className="btn btn-primary gap-2"
                >
                    <FaPlus className="w-4 h-4" />
                    Add Step
                </button>
            </div>

            <div className="space-y-6">
                {formData.steps.map((step, index) => (
                    <div
                        key={index}
                        className="border border-base-300 rounded-lg p-4"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-medium">Step {step.step}</h3>
                            {formData.steps.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => onRemoveStep(index)}
                                    className="btn btn-outline btn-sm gap-2"
                                >
                                    <FaMinus className="w-4 h-4" />
                                    Remove
                                </button>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="label">
                                    <span className="label-text">
                                        Instructions *
                                    </span>
                                </label>
                                <textarea
                                    placeholder="Describe this step in detail..."
                                    value={step.text}
                                    onChange={(e) =>
                                        onUpdateStep(
                                            index,
                                            "text",
                                            e.target.value
                                        )
                                    }
                                    className={`textarea textarea-bordered w-full ${
                                        errors[`step_${index}_text`]
                                            ? "textarea-error"
                                            : ""
                                    }`}
                                    rows={3}
                                />
                                {errors[`step_${index}_text`] && (
                                    <p className="text-sm text-error">
                                        {errors[`step_${index}_text`]}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="label">
                                    <span className="label-text">
                                        Step Image (Optional)
                                    </span>
                                </label>
                                <div className="border-2 border-dashed border-base-300 rounded-lg p-6 text-center cursor-pointer">
                                    <FaUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500">
                                        Click to upload an image for this step
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Images help users follow along with your
                                        recipe
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {errors.steps && (
                <p className="text-sm text-error">{errors.steps}</p>
            )}
        </div>
    );
};

export default Step3Instructions;
