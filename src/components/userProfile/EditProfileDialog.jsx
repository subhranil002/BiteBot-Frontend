import { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCamera, FaSave, FaTimes, FaPlus, FaTrash } from "react-icons/fa";

const HARD_CODED_INITIAL = {
    profile: {
        name: "John Doe",
        bio: "Food enthusiast exploring Indian and fusion cuisines.",
        avatar: {
            secure_url:
                "https://images.unsplash.com/photo-1603415526960-f7e0328b36f0?w=800&q=60",
        },
        dietary: ["Vegetarian", "Gluten-Free"],
        allergens: ["Peanuts", "Shellfish"],
        cuisines: ["Indian", "Italian", "Fusion"],
    },
};

// Common options for dropdowns
const DIETARY_OPTIONS = [
    "Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", 
    "Paleo", "Pescatarian", "Low-Carb", "Sugar-Free", "Organic"
];

const ALLERGEN_OPTIONS = [
    "Peanuts", "Tree Nuts", "Milk", "Eggs", "Fish", "Shellfish", 
    "Soy", "Wheat", "Gluten", "Sesame", "Sulfites"
];

const CUISINE_OPTIONS = [
    "Indian", "Italian", "Chinese", "Mexican", "Thai", "Japanese",
    "French", "Mediterranean", "American", "Fusion", "Korean",
    "Vietnamese", "Spanish", "Greek", "Lebanese", "Turkish"
];

function EditProfileDialog() {
    const dlgRef = useRef(null);

    const [formData, setFormData] = useState({
        name: HARD_CODED_INITIAL.profile.name,
        bio: HARD_CODED_INITIAL.profile.bio,
        avatar: HARD_CODED_INITIAL.profile.avatar?.secure_url || "",
        dietary: HARD_CODED_INITIAL.profile.dietary || [],
        allergens: HARD_CODED_INITIAL.profile.allergens || [],
        cuisines: HARD_CODED_INITIAL.profile.cuisines || [],
    });

    const [newDietary, setNewDietary] = useState("");
    const [newAllergen, setNewAllergen] = useState("");
    const [newCuisine, setNewCuisine] = useState("");

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setFormData((prev) => ({ ...prev, avatar: url }));
        }
    };

    const closeDialog = () => {
        dlgRef.current?.close();
    };

    const handleSave = () => {
        // TODO: Integrate with backend -> PATCH /user/profile
        console.log("Updated Profile Data:", formData);
        closeDialog();
    };

    // Dietary Functions
    const addDietary = () => {
        if (newDietary.trim() && !formData.dietary.includes(newDietary.trim())) {
            setFormData(prev => ({
                ...prev,
                dietary: [...prev.dietary, newDietary.trim()]
            }));
            setNewDietary("");
        }
    };

    const removeDietary = (index) => {
        setFormData(prev => ({
            ...prev,
            dietary: prev.dietary.filter((_, i) => i !== index)
        }));
    };

    // Allergen Functions
    const addAllergen = () => {
        if (newAllergen.trim() && !formData.allergens.includes(newAllergen.trim())) {
            setFormData(prev => ({
                ...prev,
                allergens: [...prev.allergens, newAllergen.trim()]
            }));
            setNewAllergen("");
        }
    };

    const removeAllergen = (index) => {
        setFormData(prev => ({
            ...prev,
            allergens: prev.allergens.filter((_, i) => i !== index)
        }));
    };

    // Cuisine Functions
    const addCuisine = () => {
        if (newCuisine.trim() && !formData.cuisines.includes(newCuisine.trim())) {
            setFormData(prev => ({
                ...prev,
                cuisines: [...prev.cuisines, newCuisine.trim()]
            }));
            setNewCuisine("");
        }
    };

    const removeCuisine = (index) => {
        setFormData(prev => ({
            ...prev,
            cuisines: prev.cuisines.filter((_, i) => i !== index)
        }));
    };

    const handleKeyPress = (e, addFunction) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addFunction();
        }
    };

    return (
        <dialog
            id="edit-profile"
            ref={dlgRef}
            className="modal"
            aria-label="Edit Profile Dialog"
        >
            <div className="modal-box max-w-2xl w-full bg-white/80 backdrop-blur-md border border-orange-100 shadow-xl rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    type="button"
                    className="btn btn-sm btn-circle bg-gradient-to-r from-orange-400 to-red-400 text-white hover:opacity-90 transition-all shadow-md absolute right-4 top-4 z-10"
                    onClick={closeDialog}
                    aria-label="Close dialog"
                >
                    <AiOutlineClose className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                    <h3 className="font-bold text-2xl text-gray-800 mb-2">
                        Edit Profile
                    </h3>
                    <p className="text-gray-500">
                        Update your profile information and preferences
                    </p>
                </div>

                {/* Form */}
                <form
                    className="space-y-6"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                >
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center space-y-3">
                        <div className="relative">
                            {formData.avatar ? (
                                <img
                                    src={formData.avatar}
                                    alt={formData.name}
                                    className="w-24 h-24 rounded-full border-4 border-orange-100 shadow-md object-cover"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center text-2xl font-semibold text-white shadow-md">
                                    {formData.name?.charAt(0) ?? "U"}
                                </div>
                            )}

                            <label
                                htmlFor="avatar-upload"
                                className="absolute -bottom-2 -right-2 bg-gradient-to-r from-orange-400 to-red-400 text-white p-2 rounded-full shadow-md hover:scale-105 transition-all cursor-pointer"
                                title="Change avatar"
                            >
                                <FaCamera className="w-4 h-4" />
                            </label>
                            <input
                                type="file"
                                id="avatar-upload"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarChange}
                            />
                        </div>
                        <p className="text-xs text-center text-gray-500">
                            Click the camera icon to change your profile picture
                        </p>
                    </div>

                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        {/* Display Name */}
                        <div className="form-control w-full">
                            <label className="label" htmlFor="name">
                                <span className="label-text font-medium text-gray-700">
                                    Display Name *
                                </span>
                            </label>
                            <input
                                id="name"
                                className="input input-bordered w-full border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300 rounded-xl"
                                value={formData.name}
                                onChange={(e) =>
                                    handleChange("name", e.target.value)
                                }
                                placeholder="Enter your display name"
                                required
                            />
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="form-control w-full">
                        <label className="label" htmlFor="bio">
                            <span className="label-text font-medium text-gray-700">
                                Bio
                            </span>
                        </label>
                        <textarea
                            id="bio"
                            className="textarea textarea-bordered w-full border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300 rounded-xl"
                            value={formData.bio}
                            onChange={(e) =>
                                handleChange("bio", e.target.value)
                            }
                            placeholder="Tell us about yourself, your cooking style, or favorite dishes..."
                            rows={3}
                        />
                    </div>

                    {/* Dietary Preferences */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium text-gray-700">
                                Dietary Preferences
                            </span>
                        </label>
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <select
                                    className="select select-bordered flex-1 border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300 rounded-xl"
                                    value={newDietary}
                                    onChange={(e) => setNewDietary(e.target.value)}
                                >
                                    <option value="">Select dietary preference</option>
                                    {DIETARY_OPTIONS.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    className="btn bg-gradient-to-r from-orange-400 to-red-400 text-white border-0 hover:opacity-90 transition-all gap-2"
                                    onClick={addDietary}
                                    disabled={!newDietary.trim()}
                                >
                                    <FaPlus className="w-4 h-4" />
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.dietary.map((item, index) => (
                                    <div key={index} className="badge badge-lg bg-green-100 border-green-300 text-green-700 gap-2 px-3 py-3">
                                        {item}
                                        <button
                                            type="button"
                                            onClick={() => removeDietary(index)}
                                            className="hover:text-green-900 transition-colors"
                                        >
                                            <FaTrash className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Allergens */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium text-gray-700">
                                Allergens
                            </span>
                            <span className="label-text-alt text-gray-500">
                                Foods you're allergic to
                            </span>
                        </label>
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <select
                                    className="select select-bordered flex-1 border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300 rounded-xl"
                                    value={newAllergen}
                                    onChange={(e) => setNewAllergen(e.target.value)}
                                >
                                    <option value="">Select allergen</option>
                                    {ALLERGEN_OPTIONS.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    className="btn bg-gradient-to-r from-orange-400 to-red-400 text-white border-0 hover:opacity-90 transition-all gap-2"
                                    onClick={addAllergen}
                                    disabled={!newAllergen.trim()}
                                >
                                    <FaPlus className="w-4 h-4" />
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.allergens.map((item, index) => (
                                    <div key={index} className="badge badge-lg bg-red-100 border-red-300 text-red-700 gap-2 px-3 py-3">
                                        {item}
                                        <button
                                            type="button"
                                            onClick={() => removeAllergen(index)}
                                            className="hover:text-red-900 transition-colors"
                                        >
                                            <FaTrash className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Cuisines */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium text-gray-700">
                                Favorite Cuisines
                            </span>
                        </label>
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <select
                                    className="select select-bordered flex-1 border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300 rounded-xl"
                                    value={newCuisine}
                                    onChange={(e) => setNewCuisine(e.target.value)}
                                >
                                    <option value="">Select cuisine</option>
                                    {CUISINE_OPTIONS.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    className="btn bg-gradient-to-r from-orange-400 to-red-400 text-white border-0 hover:opacity-90 transition-all gap-2"
                                    onClick={addCuisine}
                                    disabled={!newCuisine.trim()}
                                >
                                    <FaPlus className="w-4 h-4" />
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.cuisines.map((item, index) => (
                                    <div key={index} className="badge badge-lg bg-blue-100 border-blue-300 text-blue-700 gap-2 px-3 py-3">
                                        {item}
                                        <button
                                            type="button"
                                            onClick={() => removeCuisine(index)}
                                            className="hover:text-blue-900 transition-colors"
                                        >
                                            <FaTrash className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="modal-action justify-end flex items-center gap-3 pt-6 border-t border-orange-100">
                        <button
                            type="button"
                            className="btn btn-ghost gap-2 text-gray-600 hover:bg-orange-50"
                            onClick={closeDialog}
                        >
                            <FaTimes className="w-4 h-4" />
                            <span>Cancel</span>
                        </button>

                        <button
                            type="submit"
                            className="btn bg-gradient-to-r from-orange-400 to-red-400 text-white gap-2 hover:opacity-90 transition-all shadow-md"
                        >
                            <FaSave className="w-4 h-4" />
                            <span>Save Changes</span>
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}

export default EditProfileDialog;