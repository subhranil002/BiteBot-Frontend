import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCamera, FaSave, FaTimes } from "react-icons/fa";

const HARD_CODED_INITIAL = {
  profile: {
    name: "John Doe",
    bio: "Food enthusiast exploring Indian and fusion cuisines.",
    location: "Kolkata, India",
    avatar: {
      secure_url:
        "https://images.unsplash.com/photo-1603415526960-f7e0328b36f0?w=800&q=60",
    },
  },
};

function EditProfileDialog() {
  const [formData, setFormData] = useState({
    name: HARD_CODED_INITIAL.profile.name,
    bio: HARD_CODED_INITIAL.profile.bio,
    location: HARD_CODED_INITIAL.profile.location,
    avatar: HARD_CODED_INITIAL.profile.avatar?.secure_url || "",
  });

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

  const handleSave = () => {
    // TODO: Integrate with backend -> PATCH /user/profile
    console.log("Updated Profile Data:", formData);
    const dlg = document.getElementById("edit-profile");
    dlg?.close();
  };

  return (
    <dialog
      id="edit-profile"
      className="modal"
      aria-label="Edit Profile Dialog"
    >
      <div className="modal-box max-w-md w-full bg-white/80 backdrop-blur-md border border-orange-100 shadow-xl rounded-2xl p-6 relative">
        {/* Close Button */}
        <button
          type="button"
          className="btn btn-sm btn-circle bg-gradient-to-r from-orange-400 to-red-400 text-white hover:opacity-90 transition-all shadow-md absolute right-4 top-4"
          onClick={() => document.getElementById("edit-profile")?.close()}
          aria-label="Close dialog"
        >
          <AiOutlineClose className="w-5 h-5" />
        </button>

        {/* Header */}
        <h3 className="font-bold text-xl text-gray-800">Edit Profile</h3>
        <p className="py-2 text-sm text-gray-500">
          Make changes to your profile here. Click save when you're done.
        </p>

        {/* Form */}
        <form className="space-y-6 mt-5" onSubmit={(e) => e.preventDefault()}>
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

          {/* Display Name */}
          <div className="form-control w-full">
            <label className="label" htmlFor="name">
              <span className="label-text font-medium text-gray-700">
                Display Name
              </span>
            </label>
            <input
              id="name"
              className="input input-bordered w-full border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300 rounded-xl"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter your display name"
              required
            />
          </div>

          {/* Bio */}
          <div className="form-control w-full">
            <label className="label" htmlFor="bio">
              <span className="label-text font-medium text-gray-700">Bio</span>
            </label>
            <textarea
              id="bio"
              className="textarea textarea-bordered w-full border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300 rounded-xl"
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              placeholder="Tell us about yourself..."
              rows={3}
            />
          </div>

          {/* Location */}
          <div className="form-control w-full">
            <label className="label" htmlFor="location">
              <span className="label-text font-medium text-gray-700">
                Location
              </span>
            </label>
            <input
              id="location"
              className="input input-bordered w-full border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300 rounded-xl"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Your location"
            />
          </div>

          {/* Actions */}
          <div className="modal-action justify-end flex items-center gap-3 pt-4">
            <form method="dialog">
              <button className="btn btn-ghost gap-2 text-gray-600 hover:bg-orange-50">
                <FaTimes className="w-4 h-4" />
                <span>Close</span>
              </button>
            </form>

            <button
              type="button"
              className="btn bg-gradient-to-r from-orange-400 to-red-400 text-white gap-2 hover:opacity-90 transition-all shadow-md"
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
