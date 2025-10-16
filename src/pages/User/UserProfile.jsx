import { FaCalendarAlt, FaCog, FaEdit, FaMapMarkerAlt } from "react-icons/fa";

import EditProfileDialog from "../../components/userProfile/EditProfileDialog";
import ProfileStats from "../../components/userProfile/ProfileStats";
import ProfileTabs from "../../components/userProfile/ProfileTabs";
import HomeLayout from "../../layouts/HomeLayout";

function UserProfile({ profileData }) {
    function modifyCloudinaryURL(url) {
        if (url === "" || url === null) return "";
        if (import.meta.env.VITE_IMAGE_TRANSFORMATION === "true") {
            return url.replace(
                "/upload/",
                "/upload/ar_1:1,c_auto,g_auto,w_500/r_max/"
            );
        }
        return url;
    }

    return (
        <>
            <EditProfileDialog />
            <HomeLayout>
                <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 overflow-hidden">
                    {/* ✨ Ambient blobs */}
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl mix-blend-multiply animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl mix-blend-multiply animate-pulse delay-2000" />
                    </div>

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 space-y-8">
                        {/* 🧑‍🍳 Profile Header */}
                        <div className="card glass border border-orange-100 shadow-lg hover:shadow-orange-300/70 transition-transform hover:-translate-y-1">
                            <div className="card-body flex flex-col md:flex-row gap-6 items-start">
                                {/* Avatar */}
                                <div className="avatar">
                                    <div className="w-28 sm:w-32 ring ring-orange-200 ring-offset-base-100 ring-offset-2 rounded-full shadow-lg">
                                        {profileData?.profile?.avatar ? (
                                            <img
                                                alt="Profile Avatar"
                                                src={modifyCloudinaryURL(
                                                    profileData?.profile?.avatar
                                                        ?.secure_url || ""
                                                )}
                                            />
                                        ) : (
                                            <div className="bg-orange-100 flex items-center justify-center text-2xl font-semibold text-orange-500">
                                                {profileData?.profile?.name?.charAt(
                                                    0
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="flex-1 w-full">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div>
                                            <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 bg-clip-text text-transparent">
                                                {profileData?.profile?.name}
                                            </h1>
                                            <p className="text-gray-600 mt-2 text-base sm:text-lg">
                                                {profileData?.profile?.bio}
                                            </p>

                                            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <FaCalendarAlt className="w-4 h-4 text-orange-400" />
                                                    <span>
                                                        Joined{" "}
                                                        {new Date(
                                                            profileData.createdAt
                                                        ).toLocaleDateString(
                                                            "en-IN",
                                                            {
                                                                month: "long",
                                                                year: "numeric",
                                                                timeZone:
                                                                    "Asia/Kolkata",
                                                            }
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex gap-3">
                                            <button
                                                className="btn btn-primary bg-gradient-to-r from-orange-500 to-red-500 border-none text-white font-semibold shadow-md hover:scale-105 transition-transform"
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
                                                className="btn btn-circle btn-outline border-orange-200 text-orange-500 hover:bg-orange-50"
                                                aria-label="Settings"
                                            >
                                                <FaCog className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 📊 Profile Stats */}
                        <div className="card glass border border-orange-100 shadow-md hover:shadow-orange-300/60 transition-transform hover:-translate-y-1">
                            <div className="card-body">
                                <ProfileStats />
                            </div>
                        </div>

                        {/* 📑 Profile Tabs */}
                        <div className="card glass border border-orange-100 shadow-md hover:shadow-orange-300/60 transition-transform hover:-translate-y-1">
                            <div className="card-body">
                                <ProfileTabs />
                            </div>
                        </div>
                    </div>
                </div>
            </HomeLayout>
        </>
    );
}

export default UserProfile;
