import { useFormContext } from "react-hook-form";
import { FaClock, FaUsers } from "react-icons/fa";

const formatLabel = (str) =>
  str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const Step4Preview = () => {
  const { watch } = useFormContext();
  const formData = watch();

  const totalTime =
    (Number(formData.prepMinutes) || 0) + (Number(formData.cookMinutes) || 0);

  const estimatedPrice = (formData.ingredients || []).reduce(
    (t, ing) => t + ing.marketPrice,
    0
  );

  const costPerServing =
    formData.servings > 0 ? estimatedPrice / formData.servings : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Preview Your Recipe</h2>

      <div className="border border-base-300 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-base-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{formData.title}</h1>
              <p className="text-gray-500 mb-4">{formData.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <FaUsers className="w-4 h-4" />
                  <span>{formData.servings} servings</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaClock className="w-4 h-4" />
                  <span>{totalTime} minutes</span>
                </div>
                <span className="badge badge-outline">
                  {formatLabel(formData.cuisine)}
                </span>
                {formData.isPremium && (
                  <span className="badge badge-primary">Premium</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.dietaryLabels.map((tag) => (
              <span
                key={tag}
                className="badge badge-outline text-xs capitalize"
              >
                {formatLabel(tag)}
              </span>
            ))}
          </div>
        </div>

        {/* Ingredients */}
        <div className="p-6 border-b border-base-300">
          <h3 className="font-semibold mb-4">Ingredients</h3>
          <div className="grid gap-2">
            {formData.ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="flex justify-between items-center"
              >
                <span>
                  {ingredient.quantity} {ingredient.unit} {ingredient.name}
                </span>
                <span className="text-sm text-gray-500">
                  &#8377;{ingredient.marketPrice.toFixed(2)}
                </span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2 flex justify-between font-medium">
              <span>Estimated cost per serving:</span>
              <span>&#8377;{costPerServing.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-6 border-b border-base-300">
          <h3 className="font-semibold mb-4">Instructions</h3>
          <div className="space-y-4">
            {formData.steps.map((step, index) => (
              <div key={step.id || index} className="flex gap-4">
                <div className="w-8 h-8 bg-primary text-primary-content rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div className="flex-1 space-y-2">
                  <p>{step.text}</p>
                  {step.imageFile && (
                    <img
                      src={URL.createObjectURL(step.imageFile)}
                      alt={`Step ${index + 1}`}
                      className="rounded-lg max-h-48 object-cover"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* External media links */}
        <div className="p-6">
          <h3 className="font-semibold mb-3">External Links</h3>
          <ul className="space-y-2 text-sm">
            {formData.externalMediaLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="link link-primary"
                >
                  {link.name || link.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Step4Preview;
