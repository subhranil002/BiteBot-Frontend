export const CUISINE_OPTIONS = [
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

export const ALLERGEN_OPTIONS = [
  "peanuts",
  "tree nuts",
  "milk",
  "egg",
  "wheat",
  "soy",
  "fish",
  "shellfish",
  "sesame",
  "mustard",
  "celery",
  "lupin",
  "sulfites",
  "molluscs",
  "corn",
];

export const DIETARY_OPTIONS = [
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

export const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9\s])[\s\S]{8,}$/;

export const EMAIL_REGEX =
  /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
