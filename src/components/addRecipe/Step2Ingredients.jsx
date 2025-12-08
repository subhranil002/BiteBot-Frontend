import { useFieldArray, useFormContext } from "react-hook-form";
import { FaMinus, FaPlus } from "react-icons/fa";

const Step2Ingredients = ({ unitOptions = [] }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Ingredients</h2>
        <button
          type="button"
          onClick={() =>
            append({
              id: `i-${Date.now()}`,
              name: "",
              quantity: 0,
              unit: "g",
              marketPrice: 0,
            })
          }
          className="btn btn-primary gap-2"
        >
          <FaPlus className="w-4 h-4" />
          Add Ingredient
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-12 gap-4 items-end">
            {/* name */}
            <div className="col-span-12 md:col-span-5 space-y-1">
              <label
                className="label text-sm"
                htmlFor={`ingredients.${index}.name`}
              >
                Ingredient
              </label>
              <input
                id={`ingredients.${index}.name`}
                type="text"
                placeholder="e.g., Olive oil"
                {...register(`ingredients.${index}.name`, {
                  required: "Ingredient name is required",
                })}
                className={`input input-bordered w-full ${
                  errors?.ingredients?.[index]?.name ? "input-error" : ""
                }`}
              />
              {errors?.ingredients?.[index]?.name && (
                <p className="text-xs text-error">
                  {errors.ingredients[index].name.message}
                </p>
              )}
            </div>

            {/* quantity */}
            <div className="col-span-6 md:col-span-2 space-y-1">
              <label
                className="label text-sm"
                htmlFor={`ingredients.${index}.quantity`}
              >
                Quantity
              </label>
              <input
                id={`ingredients.${index}.quantity`}
                type="number"
                step="0.5"
                placeholder="Amount"
                {...register(`ingredients.${index}.quantity`, {
                  required: "Quantity is required",
                  min: { value: 0.001, message: "Must be > 0" },
                  valueAsNumber: true,
                })}
                className={`input input-bordered w-full ${
                  errors?.ingredients?.[index]?.quantity ? "input-error" : ""
                }`}
              />
              {errors?.ingredients?.[index]?.quantity && (
                <p className="text-xs text-error">
                  {errors.ingredients[index].quantity.message}
                </p>
              )}
            </div>

            {/* unit */}
            <div className="col-span-4 md:col-span-2 space-y-1">
              <label
                className="label text-sm"
                htmlFor={`ingredients.${index}.unit`}
              >
                Unit
              </label>
              <select
                id={`ingredients.${index}.unit`}
                {...register(`ingredients.${index}.unit`, {
                  required: "Unit is required",
                })}
                className={`select select-bordered w-full ${
                  errors?.ingredients?.[index]?.unit ? "select-error" : ""
                }`}
              >
                {unitOptions.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
              {errors?.ingredients?.[index]?.unit && (
                <p className="text-xs text-error">
                  {errors.ingredients[index].unit.message}
                </p>
              )}
            </div>

            {/* marketPrice */}
            <div className="col-span-6 md:col-span-2 space-y-1">
              <label
                className="label text-sm"
                htmlFor={`ingredients.${index}.marketPrice`}
              >
                Market Price (&#8377;)
              </label>
              <input
                id={`ingredients.${index}.marketPrice`}
                type="number"
                placeholder="0.00"
                {...register(`ingredients.${index}.marketPrice`, {
                  required: "Market price is required",
                  min: { value: 0.01, message: "Must be > 0" },
                  valueAsNumber: true,
                })}
                className={`input input-bordered w-full ${
                  errors?.ingredients?.[index]?.marketPrice ? "input-error" : ""
                }`}
              />
              {errors?.ingredients?.[index]?.marketPrice && (
                <p className="text-xs text-error">
                  {errors.ingredients[index].marketPrice.message}
                </p>
              )}
            </div>

            {/* remove */}
            <div className="col-span-12 md:col-span-1">
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="btn btn-outline btn-sm w-full"
                >
                  <FaMinus className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {errors?.ingredients?.message && (
        <p className="text-sm text-error">{errors.ingredients.message}</p>
      )}
    </div>
  );
};

export default Step2Ingredients;
