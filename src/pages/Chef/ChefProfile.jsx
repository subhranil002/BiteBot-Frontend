import { useState } from "react";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaEdit,
  FaGlobe,
  FaGraduationCap,
  FaHeart,
  FaLink,
  FaStar,
  FaUtensils,
} from "react-icons/fa";
import { useSelector } from "react-redux";

import subscribeApi from "../../apis/user/subscribeApi";
import unsubscribeApi from "../../apis/user/unsubscribeApi";
import RecipeCard from "../../components/recipe/RecipeCard";
import EditProfileDialog from "../../components/userProfile/EditProfileDialog";
import ProfileStats from "../../components/userProfile/ProfileStats";
import ProfileTabs from "../../components/userProfile/ProfileTabs";
import HomeLayout from "../../layouts/HomeLayout";

const ChefProfile = ({ profileData }) => {
  const { userData } = useSelector((state) => state.auth);
  console.log(profileData);

  const isOwnProfile = userData?._id.toString() === profileData?._id.toString();

  const [subscribed, setSubscribed] = useState(
    userData?.profile?.subscribed?.some((chef) => chef._id.toString() === profileData._id.toString())
  );
  const [loading, setLoading] = useState(false);

  const getAverageRating = () => {
    const recipes = profileData?.chefProfile?.recipes;

    if (!recipes || recipes.length === 0) return "N/A";

    const allRatings = recipes.flatMap(
      (recipe) => recipe?.reviews?.map((rev) => rev.rating) || []
    );

    if (allRatings.length === 0) return "0.0";

    const avgRating =
      allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length;

    return avgRating.toFixed(1);
  };

  const stats = [
    {
      label: "Subscribers",
      value: profileData?.chefProfile?.subscribers?.length || 0,
    },
    {
      label: "Recipes",
      value: profileData?.chefProfile?.recipes?.length || 0,
    },
    {
      label: "Chef Type",
      value:
        profileData?.chefProfile?.subscriptionPrice > 0 ? "Premium" : "Free",
    },
    {
      label: "Recipe Rating",
      value: getAverageRating(),
    },
  ];

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

  const subscribeToggle = async () => {
    setLoading(true);
    if (!subscribed) {
      const res = await subscribeApi(profileData._id.toString());
      if (res.success) {
        setSubscribed(!subscribed);
      }
    } else {
      const res = await unsubscribeApi(profileData._id.toString());
      if (res.success) {
        setSubscribed(!subscribed);
      }
    }
    setLoading(false);
  };

  return (
    <>
      {isOwnProfile && <EditProfileDialog profileData={profileData} />}
      <HomeLayout>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50">
          <div className="container mx-auto px-4 py-10">
            {/* Banner */}
            <div className="relative mb-20">
              <div className="w-full h-64 sm:h-80 lg:h-[22rem] rounded-3xl overflow-hidden shadow-2xl border border-orange-100">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=60"
                  alt="banner"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="absolute -bottom-16 left-6 sm:left-12">
                <div className="avatar">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full ring-4 ring-orange-200 ring-offset-2">
                    {profileData?.profile?.avatar ? (
                      <img
                        alt="Profile Avatar"
                        src={modifyCloudinaryURL(
                          profileData?.profile?.avatar?.secure_url || ""
                        )}
                      />
                    ) : (
                      <div className="bg-orange-100 flex items-center justify-center text-2xl font-semibold text-orange-500">
                        {profileData?.profile?.name?.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="mt-20 mb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 bg-clip-text text-transparent">
                  {profileData?.profile?.name}
                </h1>
                <p className="text-gray-600 text-lg">
                  {profileData?.profile?.bio}
                </p>

                {/* External Links */}
                {profileData?.chefProfile?.externalLinks?.length > 0 && (
                  <div className="flex items-center gap-3 flex-wrap">
                    <FaLink className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    <div className="flex flex-wrap gap-2">
                      {profileData.chefProfile.externalLinks.map(
                        (link, index) => (
                          <a
                            key={index}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="badge badge-outline border-orange-300 text-orange-600 hover:bg-orange-50"
                          >
                            <FaGlobe className="w-3 h-3 mr-1" />
                            {new URL(link).hostname}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Cuisine */}
                <div className="flex flex-wrap gap-2">
                  <div className="badge badge-outline border-orange-400 text-orange-500">
                    {profileData?.profile?.cuisine}
                  </div>
                </div>

                {/* Joined + subscribers */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="w-4 h-4 text-orange-400" />
                    <span>
                      Joined{" "}
                      {new Date(profileData.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          month: "long",
                          year: "numeric",
                          timeZone: "Asia/Kolkata",
                        }
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaHeart className="w-4 h-4 text-orange-400" />
                    <span>
                      {profileData?.chefProfile?.subscribers?.length || 0}{" "}
                      Subscribers
                    </span>
                  </div>
                </div>
              </div>

              {/* Subscribe / Edit */}
              <div className="flex flex-col gap-3">
                {isOwnProfile ? (
                  <button
                    className="btn btn-primary bg-gradient-to-r from-orange-500 to-red-500 border-none text-white font-semibold shadow-md"
                    onClick={() =>
                      document.getElementById("edit-profile")?.showModal()
                    }
                  >
                    <FaEdit className="w-4 h-4" />
                    <span className="hidden sm:inline">Edit Profile</span>
                  </button>
                ) : (
                  <button
                  onClick={() => subscribeToggle()}
                  disabled={loading}
                  className={`btn gap-2 ${
                    subscribed
                      ? "btn-outline border-orange-400 text-orange-600 hover:bg-orange-50"
                      : "bg-gradient-to-r from-orange-400 to-red-500 text-white border-none"
                  }`}
                >
                  <FaHeart />
                  {subscribed
                    ? "Unsubscribe"
                    : `Subscribe • $${profileData?.chefProfile?.subscriptionPrice}`}
                </button>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="card bg-base-100 shadow-sm border border-orange-100"
                >
                  <div className="card-body items-center text-center p-4">
                    <div className="card-title text-2xl text-gray-800">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Professional Info Card */}
            {profileData?.chefProfile?.experience && (
              <div className="card bg-base-100 shadow border border-orange-100 mb-8">
                <div className="card-body">
                  <h3 className="card-title text-gray-800">
                    <FaBriefcase className="text-orange-500" />
                    Professional Background
                  </h3>
                  <div className="space-y-4">
                    {profileData?.chefProfile?.education && (
                      <div>
                        <h4 className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
                          <FaGraduationCap className="w-4 h-4 text-orange-500" />
                          Education
                        </h4>
                        <p className="text-gray-600">
                          {profileData.chefProfile.education}
                        </p>
                      </div>
                    )}
                    {profileData?.chefProfile.experience && (
                      <div>
                        <h4 className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
                          <FaBriefcase className="w-4 h-4 text-orange-500" />
                          Experience
                        </h4>
                        <p className="text-gray-600">
                          {profileData.chefProfile.experience}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Recipes */}
            <div className="card bg-base-100 shadow">
              <div className="card-body p-0">
                <h3 className="card-title text-gray-800 pt-5 pl-5">
                  <FaUtensils className="text-orange-500" />
                  Recipes by {profileData?.profile?.name}
                </h3>
                {profileData?.chefProfile?.recipes?.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {profileData?.chefProfile?.recipes.map((recipe) => (
                      <div className="flex justify-center">
                        <RecipeCard key={recipe._id.toString()} recipe={recipe} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    No recipes yet
                  </div>
                )}
              </div>
            </div>

            {/* Reviews */}
            <div className="card bg-base-100 shadow mt-8">
              <div className="card-body">
                <h3 className="card-title">What Subscribers Say</h3>
                <div className="space-y-4">
                  {profileData?.chefProfile?.reviews.slice(0, 3).map((rev) => (
                    <div
                      key={rev._id.toString()}
                      className="border-b border-orange-50 pb-3 last:border-b-0"
                    >
                      <div className="flex items-center gap-2">
                        <FaStar className="text-yellow-400" />
                        <span className="font-semibold">{rev.name}</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{rev.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Only visible to the chef themselves */}
            {isOwnProfile && (
                <>
                  <div className="card glass border mt-4 border-orange-100 shadow-md hover:shadow-orange-300/60 mb-8">
                    <div className="card-body">
                      <ProfileStats profileData={profileData} />
                    </div>
                  </div>
  
                  <div className="card glass border border-orange-100 shadow-md hover:shadow-orange-300/60 mb-8">
                    <div className="card-body">
                      <ProfileTabs profileData={profileData} />
                    </div>
                  </div>
                </>
              )}
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default ChefProfile;
