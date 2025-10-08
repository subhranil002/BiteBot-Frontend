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
                <div className="container mx-auto px-4 py-8">
                    <div className="space-y-8">
                        {/* Profile Header */}
                        <div className="card bg-base-100 shadow">
                            <div className="card-body p-6">
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    {/* Avatar */}
                                    <div className="relative">
                                        <div className="avatar">
                                            <div className="w-24 h-24 rounded-full overflow-hidden">
                                                {profileData.avatar ? (
                                                    <img
                                                        src={profileData.avatar}
                                                        alt={profileData.name}
                                                        className="object-cover w-full h-full"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xl">
                                                        {profileData.name?.charAt(
                                                            0
                                                        ) ?? "U"}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Profile Info */}
                                    <div className="flex-1 w-full">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                            <div>
                                                <h1 className="text-3xl font-bold">
                                                    {profileData.name}
                                                </h1>
                                                <p className="text-gray-600 mt-1">
                                                    {profileData.bio}
                                                </p>

                                                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                                                    {profileData.location && (
                                                        <div className="flex items-center gap-1">
                                                            <FaMapMarkerAlt className="w-4 h-4" />
                                                            <span>
                                                                {
                                                                    profileData.location
                                                                }
                                                            </span>
                                                        </div>
                                                    )}

                                                    <div className="flex items-center gap-1">
                                                        <FaCalendarAlt className="w-4 h-4" />
                                                        <span>
                                                            Joined{" "}
                                                            {new Date(
                                                                profileData.joinedDate
                                                            ).toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    month: "long",
                                                                    year: "numeric",
                                                                }
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    className="btn btn-outline gap-2"
                                                    onClick={() =>
                                                        document
                                                            .getElementById(
                                                                "edit-profile"
                                                            )
                                                            ?.showModal()
                                                    }
                                                >
                                                    <FaEdit className="w-4 h-4" />
                                                    <span className="hidden sm:inline">
                                                        Edit Profile
                                                    </span>
                                                </button>

                                                <button
                                                    className="btn btn-outline p-3"
                                                    onClick={() => {}}
                                                    aria-label="Open settings tab"
                                                >
                                                    <FaCog className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ProfileStats />
                        <ProfileTabs />
                    </div>
                </div>
            </HomeLayout>
        </>
    );
}

export default UserProfile;
