import { FaCalendarAlt, FaCog, FaEdit, FaMapMarkerAlt } from "react-icons/fa";
import EditProfileDialog from "../../components/userProfile/EditProfileDialog";
import ProfileStats from "../../components/userProfile/ProfileStats";
import ProfileTabs from "../../components/userProfile/ProfileTabs";
import HomeLayout from "../../layouts/HomeLayout";

const profileData = {
  name: "Asha Roy",
  bio: "Home cook • Loves Bengali sweets",
  location: "Kolkata, India",
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=60",
  joinedDate: "2023-04-12T00:00:00.000Z",
};

function UserProfile() {
  return (
    <>
      <EditProfileDialog />
      <HomeLayout>
        <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 overflow-hidden">
          {/* ✨ Soft ambient gradient blobs */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-br from-rose-200 to-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 space-y-8">
            {/* 🧑‍🍳 Profile Header */}
            <div className="bg-white/70 backdrop-blur-md border border-orange-100 rounded-2xl shadow-md shadow-orange-200/50 transition-all hover:shadow-orange-300/70 hover:-translate-y-1">
              <div className="p-6 flex flex-col md:flex-row gap-6 items-start">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white ring-4 ring-orange-200 overflow-hidden shadow-lg">
                    {profileData.avatar ? (
                      <img
                        src={profileData.avatar}
                        alt={profileData.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-orange-100 flex items-center justify-center text-2xl font-semibold text-orange-500">
                        {profileData.name?.charAt(0) ?? "U"}
                      </div>
                    )}
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 w-full">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 bg-clip-text text-transparent">
                        {profileData.name}
                      </h1>
                      <p className="text-gray-600 mt-2 text-base sm:text-lg">
                        {profileData.bio}
                      </p>

                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                        {profileData.location && (
                          <div className="flex items-center gap-1">
                            <FaMapMarkerAlt className="w-4 h-4 text-orange-400" />
                            <span>{profileData.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt className="w-4 h-4 text-orange-400" />
                          <span>
                            Joined{" "}
                            {new Date(profileData.joinedDate).toLocaleDateString(
                              "en-US",
                              { month: "long", year: "numeric" }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold flex items-center gap-2 shadow-md shadow-orange-200/50 hover:shadow-orange-400/50 hover:-translate-y-1 transition-all"
                        onClick={() =>
                          document
                            .getElementById("edit-profile")
                            ?.showModal()
                        }
                      >
                        <FaEdit className="w-4 h-4" />
                        <span className="hidden sm:inline">Edit Profile</span>
                      </button>

                      <button
                        className="p-3 rounded-xl bg-white/70 border border-orange-100 text-gray-700 shadow-md shadow-orange-100/40 hover:bg-orange-50 transition-all"
                        aria-label="Open settings tab"
                      >
                        <FaCog className="w-4 h-4 text-orange-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 📊 Profile Stats */}
            <div className="bg-white/70 backdrop-blur-md border border-orange-100 rounded-2xl shadow-md shadow-orange-200/50 p-6 transition-all hover:-translate-y-1 hover:shadow-orange-300/60">
              <ProfileStats />
            </div>

            {/* 📑 Profile Tabs */}
            <div className="bg-white/70 backdrop-blur-md border border-orange-100 rounded-2xl shadow-md shadow-orange-200/50 p-6 transition-all hover:-translate-y-1 hover:shadow-orange-300/60">
              <ProfileTabs />
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}

export default UserProfile;
