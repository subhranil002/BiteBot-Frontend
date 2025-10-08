import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCamera, FaSave, FaTimes } from "react-icons/fa";

const HARD_CODED_INITIAL = {
    name: "John Doe",
    bio: "Computer science student. I love building UI and learning new stacks.",
    location: "Kolkata, India",
    avatar: "https://images.unsplash.com/photo-1603415526960-f7e0328b36f0?w=800&q=60",
};

{/* <button
    className="btn"
    onClick={() => document.getElementById("edit-profile")?.showModal()}
>
    Open edit profile
</button>; */}

function EditProfileDialog() {
    const [formData, setFormData] = useState({
        name: HARD_CODED_INITIAL.name,
        bio: HARD_CODED_INITIAL.bio,
        location: HARD_CODED_INITIAL.location,
        avatar: HARD_CODED_INITIAL.avatar,
    });

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        const dlg = document.getElementById("edit-profile");
        dlg?.close();
    };

    return (
        <dialog
            id="edit-profile"
            className="modal"
            aria-label="Edit Profile Dialog"
        >
            <div className="modal-box max-w-md w-full relative">
                <button
                    type="button"
                    className="btn btn-ghost btn-sm absolute right-3 top-3"
                    onClick={() => {
                        const dlg = document.getElementById("edit-profile");
                        dlg?.close();
                    }}
                    aria-label="Close dialog"
                >
                    <AiOutlineClose className="w-5 h-5" />
                </button>

                <h3 className="font-bold text-lg">Edit Profile</h3>
                <p className="py-2 text-sm text-gray-600">
                    Make changes to your profile here. Click save when you're
                    done.
                </p>

                <form
                    className="space-y-6 mt-4"
                    onSubmit={(e) => e.preventDefault()}
                >
                    {/* Avatar */}
                    <div className="flex flex-col items-center space-y-3">
                        <div className="relative">
                            {formData.avatar ? (
                                <img
                                    src={formData.avatar}
                                    alt={formData.name}
                                    className="w-20 h-20 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-lg">
                                    {formData.name?.charAt(0) ?? "U"}
                                </div>
                            )}

                            <button
                                type="button"
                                className="absolute -bottom-2 -right-2 btn btn-ghost btn-sm rounded-full p-2"
                                onClick={() => {}}
                                aria-label="Change avatar"
                                title="Change avatar"
                            >
                                <FaCamera className="w-4 h-4" />
                            </button>
                        </div>

                        <p className="text-xs text-center text-gray-500">
                            Click the camera icon to change your profile picture
                        </p>
                    </div>

                    {/* Name */}
                    <div className="form-control w-full">
                        <label className="label" htmlFor="name">
                            <span className="label-text">Display Name</span>
                        </label>
                        <input
                            id="name"
                            className="input input-bordered w-full"
                            value={formData.name}
                            onChange={(e) =>
                                handleChange("name", e.target.value)
                            }
                            placeholder="Enter your display name"
                            required
                        />
                    </div>

                    {/* Bio */}
                    <div className="form-control w-full">
                        <label className="label" htmlFor="bio">
                            <span className="label-text">Bio</span>
                        </label>
                        <textarea
                            id="bio"
                            className="textarea textarea-bordered w-full"
                            value={formData.bio}
                            onChange={(e) =>
                                handleChange("bio", e.target.value)
                            }
                            placeholder="Tell us about yourself..."
                            rows={3}
                        />
                    </div>

                    {/* Location */}
                    <div className="form-control w-full">
                        <label className="label" htmlFor="location">
                            <span className="label-text">Location</span>
                        </label>
                        <input
                            id="location"
                            className="input input-bordered w-full"
                            value={formData.location}
                            onChange={(e) =>
                                handleChange("location", e.target.value)
                            }
                            placeholder="Your location"
                        />
                    </div>

                    {/* Actions */}
                    <div className="modal-action justify-end">
                        <form method="dialog">
                            <button
                                type="submit"
                                className="btn btn-ghost gap-2"
                            >
                                <FaTimes className="w-4 h-4" />
                                <span>Close</span>
                            </button>
                        </form>

                        <button
                            type="button"
                            className="btn btn-primary gap-2"
                            onClick={handleSave}
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
