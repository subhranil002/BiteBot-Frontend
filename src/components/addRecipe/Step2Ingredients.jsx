import { FaMinus,FaPlus } from "react-icons/fa";

const Step2Ingredients = ({
    formData,
    errors,
    unitOptions,
    onAddIngredient,
    onRemoveIngredient,
    onUpdateIngredient,
}) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Ingredients</h2>
                <button
                    type="button"
                    onClick={onAddIngredient}
                    className="btn btn-primary gap-2"
                >
                    <FaPlus className="w-4 h-4" />
                    Add Ingredient
                </button>
            </div>

            <div className="space-y-4">
                {formData.ingredients.map((ingredient, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-12 gap-4 items-end"
                    >
                        <div className="col-span-12 md:col-span-5 space-y-1">
                            <label className="label text-sm">Ingredient</label>
                            <input
                                type="text"
                                placeholder="e.g., Olive oil"
                                value={ingredient.name}
                                onChange={(e) =>
                                    onUpdateIngredient(
                                        index,
                                        "name",
                                        e.target.value
                                    )
                                }
                                className={`input input-bordered w-full ${
                                    errors[`ingredient_${index}_name`]
                                        ? "input-error"
                                        : ""
                                }`}
                            />
                            {errors[`ingredient_${index}_name`] && (
                                <p className="text-xs text-error">
                                    {errors[`ingredient_${index}_name`]}
                                </p>
                            )}
                        </div>

                        <div className="col-span-6 md:col-span-2 space-y-1">
                            <label className="label text-sm">Quantity</label>
                            <input
                                type="number"
                                step="0.1"
                                placeholder="Amount"
                                value={ingredient.quantity}
                                onChange={(e) =>
                                    onUpdateIngredient(
                                        index,
                                        "quantity",
                                        e.target.value
                                    )
                                }
                                className={`input input-bordered w-full ${
                                    errors[`ingredient_${index}_quantity`]
                                        ? "input-error"
                                        : ""
                                }`}
                            />
                            {errors[`ingredient_${index}_quantity`] && (
                                <p className="text-xs text-error">
                                    {errors[`ingredient_${index}_quantity`]}
                                </p>
                            )}
                        </div>

                        <div className="col-span-4 md:col-span-2 space-y-1">
                            <label className="label text-sm">Unit</label>
                            <select
                                value={ingredient.unit}
                                onChange={(e) =>
                                    onUpdateIngredient(
                                        index,
                                        "unit",
                                        e.target.value
                                    )
                                }
                                className="select select-bordered w-full"
                            >
                                {unitOptions.map((unit) => (
                                    <option key={unit} value={unit}>
                                        {unit}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-2 md:col-span-2 space-y-1">
                            <label className="label text-sm">
                                Price/Unit ($)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={ingredient.pricePerUnit}
                                onChange={(e) =>
                                    onUpdateIngredient(
                                        index,
                                        "pricePerUnit",
                                        parseFloat(e.target.value) || 0
                                    )
                                }
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="col-span-12 md:col-span-1">
                            {formData.ingredients.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => onRemoveIngredient(index)}
                                    className="btn btn-outline btn-sm w-full"
                                >
                                    <FaMinus className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {errors.ingredients && (
                <p className="text-sm text-error">{errors.ingredients}</p>
            )}
        </div>
    );
};

export default Step2Ingredients;
