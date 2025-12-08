import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaCheckCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import addRecipeApi from "../../apis/recipe/addRecipeApi";
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
];

const cuisineOptions = [
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

const dietaryOptions = [
  "vegetarian",
  "vegan",
  "keto",
  "paleo",
  "gluten-free",
  "dairy-free",
  "low-carb",
  "high-protein",
  "sugar-free",
  "organic",
  "raw",
  "mediterranean",
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
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm({
    defaultValues: {
      title: "",
      description: "",
      cuisine: "",
      servings: 0,
      prepMinutes: 0,
      cookMinutes: 0,
      isPremium: false,
      dietaryLabels: [],
      ingredients: [
        { id: "i-1", name: "", quantity: 0, unit: "g", marketPrice: 0 },
      ],
      steps: [{ id: "s-1", text: "", imageFile: null }],
      thumbnailFile: null,
      externalMediaLinks: [],
    },
  });

  const {
    handleSubmit,
    trigger,
    getValues,
    watch,
    setError,
    setValue,
    reset,
    register,
    control,
    formState: { errors },
  } = methods;

  const nextStep = async () => {
    let fieldsToValidate = [];
    const values = getValues();

    if (currentStep === 1) {
      fieldsToValidate = [
        "title",
        "description",
        "cuisine",
        "servings",
        "prepMinutes",
        "cookMinutes",
        "thumbnailFile",
      ];

      const extLinks = values.externalMediaLinks || [];
      if (extLinks.length) {
        fieldsToValidate.push(
          ...extLinks.map((_, i) => `externalMediaLinks.${i}.name`),
          ...extLinks.map((_, i) => `externalMediaLinks.${i}.url`)
        );
      }
    } else if (currentStep === 2) {
      if (!values.ingredients || values.ingredients.length === 0) {
        setError("ingredients", {
          message: "At least one ingredient is required",
        });
        return;
      }
      fieldsToValidate = values.ingredients.flatMap((_, i) => [
        `ingredients.${i}.name`,
        `ingredients.${i}.quantity`,
        `ingredients.${i}.unit`,
        `ingredients.${i}.marketPrice`,
      ]);
    } else if (currentStep === 3) {
      if (!values.steps || values.steps.length === 0) {
        setError("steps", {
          message: "At least one step is required",
        });
        return;
      }
      fieldsToValidate = values.steps.flatMap((_, i) => [
        `steps.${i}.text`,
        `steps.${i}.imageFile`,
      ]);
    }

    const ok = fieldsToValidate.length ? await trigger(fieldsToValidate) : true;
    if (ok) setCurrentStep((s) => Math.min(s + 1, STEPS.length));
  };

  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const totalCookingTime =
        (Number(data.prepMinutes) || 0) + (Number(data.cookMinutes) || 0);

      const ingredients = (data.ingredients || []).map((ing) => ({
        name: ing.name?.trim(),
        quantity: Number(ing.quantity),
        unit: ing.unit,
        marketPrice: Number(ing.marketPrice),
      }));

      const steps = (data.steps || []).map((step, index) => ({
        stepNo: index + 1,
        instruction: step.text?.trim(),
      }));

      const dietaryLabels =
        Array.isArray(data.dietaryLabels) && data.dietaryLabels.length > 0
          ? data.dietaryLabels
          : undefined;

      const externalMediaLinks =
        Array.isArray(data.externalMediaLinks) &&
        data.externalMediaLinks.length > 0
          ? data.externalMediaLinks.map((link) => ({
              name: link.name?.trim(),
              url: link.url,
            }))
          : undefined;

      const thumbnailFile = data.thumbnailFile || null;
      const stepImages = (data.steps || [])
        .map((step) => step.imageFile || null)
        .filter(Boolean);

      const payload = {
        title: data.title?.trim(),
        description: data.description?.trim(),
        cuisine: data.cuisine,
        servings: Number(data.servings),
        totalCookingTime,
        isPremium: !!data.isPremium,

        ingredients,
        steps,
        dietaryLabels,
        externalMediaLinks,

        thumbnailFile,
        stepImages,
      };

      await addRecipeApi(payload);

      reset();
      setCurrentStep(1);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <HomeLayout>
      <FormProvider
        {...{
          register,
          watch,
          setValue,
          control,
          formState: { errors },
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="container mx-auto px-4 py-8 max-w-4xl"
        >
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              {STEPS.map((step) => (
                <div
                  key={step.id}
                  className="flex flex-col items-center relative z-10"
                >
                  <div
                    className={`btn btn-circle ${
                      currentStep === step.id
                        ? "btn-primary text-white"
                        : currentStep > step.id
                        ? "btn-success text-white"
                        : "btn-outline btn-ghost text-gray-500"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <FaCheckCircle className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-sm font-medium">{step.title}</div>
                    <div className="text-xs text-gray-500 hidden sm:block">
                      {step.description}
                    </div>
                  </div>
                </div>
              ))}

              <div className="absolute top-5 left-0 right-0 h-0.5 bg-base-300 -z-10">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-md border border-base-200">
            <div className="card-body">
              {currentStep === 1 && (
                <Step1BasicDetails
                  cuisineOptions={cuisineOptions}
                  dietaryOptions={dietaryOptions}
                />
              )}
              {currentStep === 2 && (
                <Step2Ingredients unitOptions={unitOptions} />
              )}
              {currentStep === 3 && <Step3Instructions />}
              {currentStep === 4 && <Step4Preview />}
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <div className="flex gap-2">
              <button
                type="button"
                className="btn btn-outline btn-neutral flex items-center gap-2"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <FaChevronLeft /> Back
              </button>
            </div>

            {currentStep < 4 ? (
              <button
                type="button"
                className="btn btn-primary gap-2"
                onClick={nextStep}
              >
                Next <FaChevronRight />
              </button>
            ) : (
              <div className="flex gap-2 items-center">
                <button
                  type="submit"
                  className={`btn btn-success gap-2 ${
                    isSubmitting ? "loading" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Publishing..." : "Publish Recipe"}
                </button>
              </div>
            )}
          </div>
        </form>
      </FormProvider>
    </HomeLayout>
  );
}
