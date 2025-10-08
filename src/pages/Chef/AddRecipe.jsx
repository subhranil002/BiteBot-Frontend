import { useState } from "react";
import {
    FaCheckCircle,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Step1BasicDetails from "../../components/addRecipe/Step1BasicDetails";
import Step2Ingredients from "../../components/addRecipe/Step2Ingredients";
import Step3Instructions from "../../components/addRecipe/Step3Instructions";
import Step4Preview from "../../components/addRecipe/Step4Preview";
import HomeLayout from "../../layouts/HomeLayout";

const STEPS = [
    {
        id: 1,
        title: "Recipe Details",
        description: "Basic information about your recipe",
    },
    {
        id: 2,
        title: "Ingredients",
        description: "List all ingredients with quantities",
    },
    {
        id: 3,
        title: "Instructions",
        description: "Step-by-step cooking instructions",
    },
    {
        id: 4,
        title: "Preview",
        description: "Review your recipe before publishing",
    },
    {
        id: 5,
        title: "Publish",
        description: "Share your recipe with the world",
    },
];

const DEFAULT_FORM = {
    title: "",
    description: "",
    cuisine: "",
    servings: 4,
    prepMinutes: 15,
    cookMinutes: 30,
    isPremium: false,
    tags: [],
    ingredients: [{ name: "", quantity: "", unit: "g", pricePerUnit: 0 }],
    steps: [{ step: 1, text: "", image: "" }],
    heroImage: "",
    id: null,
};

const cuisineOptions = [
    "Italian",
    "Indian",
    "Thai",
    "Korean",
    "French",
    "Mediterranean",
    "Chinese",
    "Mexican",
    "Japanese",
    "American",
    "Greek",
    "Fusion",
];

const commonTags = [
    "vegetarian",
    "vegan",
    "gluten-free",
    "dairy-free",
    "keto",
    "paleo",
    "quick",
    "healthy",
    "spicy",
    "comfort-food",
    "one-pot",
    "no-cook",
    "budget-friendly",
    "kid-friendly",
    "high-protein",
    "low-fat",
];

const unitOptions = [
    "g",
    "kg",
    "ml",
    "l",
    "cup",
    "tbsp",
    "tsp",
    "pc",
    "oz",
    "lb",
];

export default function AddRecipe() {
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState(DEFAULT_FORM);
    const [errors, setErrors] = useState({});
    const [newTag, setNewTag] = useState("");

    // helper validators
    const validateStep = (step) => {
        const newErrors = {};

        switch (step) {
            case 1:
                if (!formData.title.trim())
                    newErrors.title = "Recipe title is required";
                if (!formData.description.trim())
                    newErrors.description = "Description is required";
                if (!formData.cuisine)
                    newErrors.cuisine = "Please select a cuisine";
                if (formData.servings < 1)
                    newErrors.servings = "Servings must be at least 1";
                if (formData.prepMinutes < 0)
                    newErrors.prepMinutes = "Prep time cannot be negative";
                if (formData.cookMinutes < 0)
                    newErrors.cookMinutes = "Cook time cannot be negative";
                break;

            case 2:
                formData.ingredients.forEach((ingredient, index) => {
                    if (!ingredient.name.trim())
                        newErrors[`ingredient_${index}_name`] =
                            "Ingredient name is required";
                    if (
                        !ingredient.quantity ||
                        Number(ingredient.quantity) <= 0
                    )
                        newErrors[`ingredient_${index}_quantity`] =
                            "Valid quantity is required";
                });
                if (!formData.ingredients || formData.ingredients.length === 0)
                    newErrors.ingredients =
                        "At least one ingredient is required";
                break;

            case 3:
                formData.steps.forEach((s, index) => {
                    if (!s.text.trim())
                        newErrors[`step_${index}_text`] =
                            "Step instruction is required";
                });
                if (!formData.steps || formData.steps.length === 0)
                    newErrors.steps = "At least one step is required";
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((s) => Math.min(s + 1, STEPS.length));
        }
    };
    const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

    const addIngredient = () => {
        setFormData((prev) => ({
            ...prev,
            ingredients: [
                ...prev.ingredients,
                { name: "", quantity: "", unit: "g", pricePerUnit: 0 },
            ],
        }));
    };
    const removeIngredient = (index) => {
        setFormData((prev) => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index),
        }));
    };
    const updateIngredient = (index, field, value) => {
        setFormData((prev) => ({
            ...prev,
            ingredients: prev.ingredients.map((ing, i) =>
                i === index ? { ...ing, [field]: value } : ing
            ),
        }));
    };

    const addStep = () => {
        setFormData((prev) => ({
            ...prev,
            steps: [
                ...prev.steps,
                { step: prev.steps.length + 1, text: "", image: "" },
            ],
        }));
    };
    const removeStep = (index) => {
        setFormData((prev) => ({
            ...prev,
            steps: prev.steps
                .filter((_, i) => i !== index)
                .map((s, i) => ({ ...s, step: i + 1 })),
        }));
    };
    const updateStep = (index, field, value) => {
        setFormData((prev) => ({
            ...prev,
            steps: prev.steps.map((s, i) =>
                i === index ? { ...s, [field]: value } : s
            ),
        }));
    };

    const addTag = (tag) => {
        if (!formData.tags.includes(tag))
            setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    };
    const removeTag = (tag) =>
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((t) => t !== tag),
        }));
    const handleAddCustomTag = () => {
        const t = newTag.trim();
        if (t && !formData.tags.includes(t)) {
            addTag(t);
            setNewTag("");
        }
    };

    const handleSubmit = async () => {
        if (!validateStep(3)) return;

        setIsSubmitting(true);
            const id = "r" + Date.now();
            setFormData((prev) => ({ ...prev, id }));
            setCurrentStep(5);
            setIsSubmitting(false);
    };

    const estimatedPrice = formData.ingredients.reduce(
        (total, ing) =>
            total +
            (parseFloat(ing.quantity) || 0) *
                (parseFloat(ing.pricePerUnit) || 0),
        0
    );

    if (currentStep === 5) {
        return (
            <HomeLayout>
                <div className="container mx-auto px-4 py-16 text-center">
                    <div className="max-w-md mx-auto space-y-6">
                        <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                            <FaCheckCircle className="w-8 h-8 text-success" />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold">
                                Recipe Published!
                            </h1>
                            <p className="text-gray-600">
                                Your recipe "{formData.title}" has been saved
                                locally (demo mode).
                            </p>
                        </div>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() =>
                                    navigate(`/recipe/${formData.id}`)
                                }
                            >
                                View Recipe
                            </button>
                            <button
                                variant="outline"
                                onClick={() => {
                                    setFormData(DEFAULT_FORM);
                                    setCurrentStep(1);
                                }}
                            >
                                Add Another Recipe
                            </button>
                        </div>
                    </div>
                </div>
            </HomeLayout>
        );
    }

    return (
        <HomeLayout>
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-between relative">
                        {STEPS.slice(0, 4).map((step) => (
                            <div
                                key={step.id}
                                className="flex flex-col items-center relative z-10"
                            >
                                <div
                                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                                        currentStep === step.id
                                            ? "border-primary bg-primary text-white"
                                            : currentStep > step.id
                                            ? "border-success bg-success text-white"
                                            : "border-muted bg-white text-muted"
                                    }`}
                                >
                                    {currentStep > step.id ? (
                                        <FaCheckCircle className="w-5 h-5" />
                                    ) : (
                                        step.id
                                    )}
                                </div>
                                <div className="mt-2 text-center">
                                    <div className="text-sm font-medium">
                                        {step.title}
                                    </div>
                                    <div className="text-xs text-gray-500 hidden sm:block">
                                        {step.description}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Progress Line */}
                        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
                            <div
                                className="h-full bg-primary transition-all duration-300"
                                style={{
                                    width: `${((currentStep - 1) / 3) * 100}%`,
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white border rounded-lg p-6">
                    {/* Step content */}
                    {currentStep === 1 && (
                        <Step1BasicDetails
                            formData={formData}
                            setFormData={setFormData}
                            errors={errors}
                            cuisineOptions={cuisineOptions}
                            commonTags={commonTags}
                            onAddTag={addTag}
                            onRemoveTag={removeTag}
                            newTag={newTag}
                            setNewTag={setNewTag}
                            onAddCustomTag={handleAddCustomTag}
                        />
                    )}

                    {currentStep === 2 && (
                        <Step2Ingredients
                            formData={formData}
                            errors={errors}
                            unitOptions={unitOptions}
                            onAddIngredient={addIngredient}
                            onRemoveIngredient={removeIngredient}
                            onUpdateIngredient={updateIngredient}
                        />
                    )}

                    {currentStep === 3 && (
                        <Step3Instructions
                            formData={formData}
                            errors={errors}
                            onAddStep={addStep}
                            onRemoveStep={removeStep}
                            onUpdateStep={updateStep}
                        />
                    )}

                    {currentStep === 4 && <Step4Preview formData={formData} />}
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                    <div className="flex gap-2">
                        <button
                            variant="outline"
                            onClick={() => {
                                prevStep();
                            }}
                            className="flex items-center gap-2"
                        >
                            <FaChevronLeft />
                            Back
                        </button>
                    </div>

                    {currentStep < 4 ? (
                        <button onClick={nextStep} className="gap-2">
                            Next
                            <FaChevronRight />
                        </button>
                    ) : (
                        <div className="flex gap-2 items-center">
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="gap-2"
                                aria-disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? "Publishing..."
                                    : "Publish Recipe"}
                            </button>
                        </div>
                    )}
                </div>

                {/* Optional sidebar preview info */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2" />
                    <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Summary</h4>
                        <div className="text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Estimated cost</span>
                                <span>${estimatedPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mt-2">
                                <span>Servings</span>
                                <span>{formData.servings}</span>
                            </div>
                            <div className="flex justify-between mt-2">
                                <span>Total time</span>
                                <span>
                                    {formData.prepMinutes +
                                        formData.cookMinutes}{" "}
                                    min
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}
