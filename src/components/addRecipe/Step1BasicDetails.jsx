import { FaClock, FaTimes, FaUsers } from "react-icons/fa";

const Step1BasicDetails = ({
    formData,
    setFormData,
    errors,
    cuisineOptions,
    commonTags,
    onAddTag,
    onRemoveTag,
    newTag,
    setNewTag,
    onAddCustomTag,
}) => {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Recipe Details</h2>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="label" htmlFor="title">
                        <span className="label-text">Recipe Title *</span>
                    </label>
                    <input
                        id="title"
                        placeholder="e.g., Grandma's Secret Pasta"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                title: e.target.value,
                            }))
                        }
                        className={`input input-bordered w-full ${
                            errors.title ? "input-error" : ""
                        }`}
                    />
                    {errors.title && (
                        <p className="text-sm text-error">{errors.title}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="label" htmlFor="cuisine">
                        <span className="label-text">Cuisine *</span>
                    </label>
                    <select
                        id="cuisine"
                        value={formData.cuisine}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                cuisine: e.target.value,
                            }))
                        }
                        className={`select select-bordered w-full ${
                            errors.cuisine ? "select-error" : ""
                        }`}
                    >
                        <option value="">Select cuisine...</option>
                        {cuisineOptions.map((cuisine) => (
                            <option key={cuisine} value={cuisine}>
                                {cuisine}
                            </option>
                        ))}
                    </select>
                    {errors.cuisine && (
                        <p className="text-sm text-error">{errors.cuisine}</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <label className="label" htmlFor="description">
                    <span className="label-text">Description *</span>
                </label>
                <textarea
                    id="description"
                    placeholder="Describe your recipe, what makes it special..."
                    value={formData.description}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                        }))
                    }
                    className={`textarea textarea-bordered w-full ${
                        errors.description ? "textarea-error" : ""
                    }`}
                    rows={3}
                />
                {errors.description && (
                    <p className="text-sm text-error">{errors.description}</p>
                )}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <label className="label" htmlFor="servings">
                        <span className="label-text">Servings *</span>
                    </label>
                    <div className="flex items-center gap-2">
                        <FaUsers className="w-4 h-4 text-gray-400" />
                        <input
                            id="servings"
                            type="number"
                            min="1"
                            value={formData.servings}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    servings: parseInt(e.target.value) || 1,
                                }))
                            }
                            className={`input input-bordered w-full ${
                                errors.servings ? "input-error" : ""
                            }`}
                        />
                    </div>
                    {errors.servings && (
                        <p className="text-sm text-error">{errors.servings}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="label" htmlFor="prep-time">
                        <span className="label-text">Prep Time (min) *</span>
                    </label>
                    <div className="flex items-center gap-2">
                        <FaClock className="w-4 h-4 text-gray-400" />
                        <input
                            id="prep-time"
                            type="number"
                            min="0"
                            value={formData.prepMinutes}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    prepMinutes: parseInt(e.target.value) || 0,
                                }))
                            }
                            className={`input input-bordered w-full ${
                                errors.prepMinutes ? "input-error" : ""
                            }`}
                        />
                    </div>
                    {errors.prepMinutes && (
                        <p className="text-sm text-error">
                            {errors.prepMinutes}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="label" htmlFor="cook-time">
                        <span className="label-text">Cook Time (min) *</span>
                    </label>
                    <div className="flex items-center gap-2">
                        <FaClock className="w-4 h-4 text-gray-400" />
                        <input
                            id="cook-time"
                            type="number"
                            min="0"
                            value={formData.cookMinutes}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    cookMinutes: parseInt(e.target.value) || 0,
                                }))
                            }
                            className={`input input-bordered w-full ${
                                errors.cookMinutes ? "input-error" : ""
                            }`}
                        />
                    </div>
                    {errors.cookMinutes && (
                        <p className="text-sm text-error">
                            {errors.cookMinutes}
                        </p>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.isPremium}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    isPremium: e.target.checked,
                                }))
                            }
                            className="checkbox"
                        />
                        <span className="text-sm">Premium Recipe</span>
                    </label>
                </div>

                <div className="space-y-3">
                    <label className="label">
                        <span className="label-text">Tags</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {commonTags.map((tag) => (
                            <span
                                key={tag}
                                className={`badge cursor-pointer ${
                                    formData.tags.includes(tag)
                                        ? "badge-primary"
                                        : "badge-outline"
                                }`}
                                onClick={() =>
                                    formData.tags.includes(tag)
                                        ? onRemoveTag(tag)
                                        : onAddTag(tag)
                                }
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <input
                            placeholder="Add custom tag..."
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyPress={(e) =>
                                e.key === "Enter" && onAddCustomTag()
                            }
                            className="input input-bordered flex-1"
                        />
                        <button
                            className="btn btn-primary"
                            onClick={onAddCustomTag}
                            disabled={!newTag.trim()}
                        >
                            Add
                        </button>
                    </div>

                    {formData.tags.length > 0 && (
                        <div className="space-y-2">
                            <label className="label text-sm">
                                Selected tags:
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {formData.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="badge badge-primary gap-1 flex items-center"
                                    >
                                        {tag}
                                        <FaTimes
                                            className="w-3 h-3 cursor-pointer ml-1"
                                            onClick={() => onRemoveTag(tag)}
                                        />
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Step1BasicDetails;
