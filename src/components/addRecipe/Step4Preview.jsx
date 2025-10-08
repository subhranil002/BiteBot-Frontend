import { FaClock, FaUsers } from "react-icons/fa";

const Step4Preview = ({ formData }) => {
    const totalTime = formData.prepMinutes + formData.cookMinutes;
    const estimatedPrice = formData.ingredients.reduce((total, ingredient) => {
        return (
            total +
            (parseFloat(ingredient.quantity) || 0) *
                (parseFloat(ingredient.pricePerUnit) || 0)
        );
    }, 0);

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Preview Your Recipe</h2>

            <div className="border border-base-300 rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-base-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold mb-2">
                                {formData.title}
                            </h1>
                            <p className="text-gray-500 mb-4">
                                {formData.description}
                            </p>

                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                    <FaUsers className="w-4 h-4" />
                                    <span>{formData.servings} servings</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaClock className="w-4 h-4" />
                                    <span>{totalTime} minutes</span>
                                </div>
                                <span className="badge badge-outline">
                                    {formData.cuisine}
                                </span>
                                {formData.isPremium && (
                                    <span className="badge badge-primary">
                                        Premium
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {formData.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="badge badge-outline text-xs"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Ingredients */}
                <div className="p-6 border-b border-base-300">
                    <h3 className="font-semibold mb-4">Ingredients</h3>
                    <div className="grid gap-2">
                        {formData.ingredients.map((ingredient, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center"
                            >
                                <span>
                                    {ingredient.quantity} {ingredient.unit}{" "}
                                    {ingredient.name}
                                </span>
                                {ingredient.pricePerUnit > 0 && (
                                    <span className="text-sm text-gray-500">
                                        $
                                        {(
                                            (parseFloat(ingredient.quantity) ||
                                                0) *
                                            (parseFloat(
                                                ingredient.pricePerUnit
                                            ) || 0)
                                        ).toFixed(2)}
                                    </span>
                                )}
                            </div>
                        ))}
                        {estimatedPrice > 0 && (
                            <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                                <span>Estimated cost per serving:</span>
                                <span>
                                    $
                                    {(
                                        estimatedPrice / formData.servings
                                    ).toFixed(2)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Instructions */}
                <div className="p-6">
                    <h3 className="font-semibold mb-4">Instructions</h3>
                    <div className="space-y-4">
                        {formData.steps.map((step, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="w-8 h-8 bg-primary text-primary-content rounded-full flex items-center justify-center text-sm font-medium">
                                    {step.step}
                                </div>
                                <div className="flex-1">
                                    <p>{step.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step4Preview;
