import { 
  FaUtensils, 
  FaUsers, 
  FaStar, 
  FaTags, 
  FaCog, 
  FaSearch, 
  FaBell,
  FaArrowUp,
  FaCheck,
  FaTimes,
  FaEye,
  FaClock
} from "react-icons/fa";
import HomeLayout from "../layouts/HomeLayout";

export default function AdminDashboard() {
  return (
    <HomeLayout>
    <div className="min-h-screen bg-base-200 font-sans text-base-content">

      {/* --- Main Container --- */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- Left Sidebar (3 Cols) --- */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="bg-base-100 rounded-xl shadow-sm p-4 sticky top-24">
               <ul className="menu bg-base-100 w-full text-base-content/80 font-medium">
                  <li className="menu-title text-orange-600 uppercase tracking-wider text-xs font-bold mb-2">Management</li>
                  <li>
                    <a className="active:bg-orange-500 hover:bg-orange-50 hover:text-orange-600 mb-1">
                      <FaUtensils className="w-4 h-4" /> All Recipes
                    </a>
                  </li>
                  <li>
                    <a className="hover:bg-orange-50 hover:text-orange-600 mb-1">
                      <FaUsers className="w-4 h-4" /> Users List
                    </a>
                  </li>
                  <li>
                    <a className="hover:bg-orange-50 hover:text-orange-600 mb-1">
                      <FaStar className="w-4 h-4" /> Subscriptions
                      <span className="badge badge-sm badge-warning ml-auto">New</span>
                    </a>
                  </li>
                  <li>
                    <a className="hover:bg-orange-50 hover:text-orange-600 mb-1">
                      <FaTags className="w-4 h-4" /> Categories
                    </a>
                  </li>

                  <li className="menu-title text-orange-600 uppercase tracking-wider text-xs font-bold mt-4 mb-2">System</li>
                  <li>
                    <a className="hover:bg-orange-50 hover:text-orange-600">
                      <FaCog className="w-4 h-4" /> Settings
                    </a>
                  </li>
               </ul>
            </div>
          </aside>

          {/* --- Main Dashboard Content (9 Cols) --- */}
          <main className="lg:col-span-9 space-y-8">
            
            {/* 1. Metrics Stats Row */}
            <div className="stats shadow-sm w-full bg-base-100 border border-base-200">
              
              <div className="stat">
                <div className="stat-figure text-orange-500">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <FaUtensils className="w-6 h-6" />
                  </div>
                </div>
                <div className="stat-title font-semibold">Total Recipes</div>
                <div className="stat-value text-base-content">1,247</div>
                <div className="stat-desc text-success flex items-center gap-1">
                    <FaArrowUp /> 12% this month
                </div>
              </div>
              
              <div className="stat">
                <div className="stat-figure text-blue-500">
                  <div className="p-3 bg-blue-100 rounded-full">
                     <FaUsers className="w-6 h-6" />
                  </div>
                </div>
                <div className="stat-title font-semibold">Active Users</div>
                <div className="stat-value text-base-content">820</div>
                <div className="stat-desc text-success flex items-center gap-1">
                    <FaArrowUp /> 34 new today
                </div>
              </div>

              <div className="stat">
                <div className="stat-figure text-yellow-500">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <FaStar className="w-6 h-6" />
                  </div>
                </div>
                <div className="stat-title font-semibold">Premium</div>
                <div className="stat-value text-base-content">56</div>
                <div className="stat-desc">Conversion rate 5.2%</div>
              </div>
              
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* 2. Recent Recipes Table (Takes 2/3 width on large screens) */}
                <div className="xl:col-span-2 bg-base-100 rounded-xl shadow-sm border border-base-200 overflow-hidden">
                    <div className="p-6 border-b border-base-200 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-base-content">Pending Approvals</h2>
                        <button className="btn btn-sm btn-ghost text-orange-600 hover:bg-orange-50">View All</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table">
                        {/* head */}
                        <thead className="bg-base-50 text-base-content/60">
                            <tr>
                            <th>Dish Details</th>
                            <th>Author</th>
                            <th>Status</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Row 1 */}
                            <tr className="hover:bg-base-50/50 transition-colors">
                            <td>
                                <div className="flex items-center space-x-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12 bg-base-300">
                                        <img src="https://source.unsplash.com/random/100x100/?chicken,curry" alt="Food" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">Spicy Tandoori</div>
                                    <div className="text-xs opacity-50">Indian • 45 mins</div>
                                </div>
                                </div>
                            </td>
                            <td>
                                <div className="text-sm font-medium">Aryan Sharma</div>
                                <div className="text-xs opacity-50">Joined Nov 2025</div>
                            </td>
                            <td>
                                <span className="badge badge-warning gap-1 text-xs font-semibold text-yellow-900">
                                    Pending
                                </span>
                            </td>
                            <th>
                                <div className="flex gap-2">
                                    <button className="btn btn-square btn-xs btn-outline border-base-300 hover:bg-green-50 hover:border-green-500 hover:text-green-600" title="Approve">
                                        <FaCheck />
                                    </button>
                                    <button className="btn btn-square btn-xs btn-outline border-base-300 hover:bg-red-50 hover:border-red-500 hover:text-red-600" title="Reject">
                                        <FaTimes />
                                    </button>
                                </div>
                            </th>
                            </tr>

                            {/* Row 2 */}
                            <tr className="hover:bg-base-50/50 transition-colors">
                            <td>
                                <div className="flex items-center space-x-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12 bg-base-300">
                                        <img src="https://source.unsplash.com/random/100x100/?bread,garlic" alt="Food" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">Garlic Bread</div>
                                    <div className="text-xs opacity-50">Italian • 20 mins</div>
                                </div>
                                </div>
                            </td>
                            <td>
                                <div className="text-sm font-medium">Priya Mehta</div>
                                <div className="text-xs opacity-50">Pro Member</div>
                            </td>
                            <td>
                                <span className="badge badge-success gap-1 text-xs font-semibold text-white">
                                    Approved
                                </span>
                            </td>
                            <th>
                                <button className="btn btn-xs btn-ghost gap-1 opacity-70">
                                    <FaEye /> View
                                </button>
                            </th>
                            </tr>

                            {/* Row 3 */}
                            <tr className="hover:bg-base-50/50 transition-colors">
                            <td>
                                <div className="flex items-center space-x-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12 bg-base-300">
                                        <img src="https://source.unsplash.com/random/100x100/?noodles" alt="Food" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">Veggie Noodles</div>
                                    <div className="text-xs opacity-50">Chinese • 15 mins</div>
                                </div>
                                </div>
                            </td>
                            <td>
                                <div className="text-sm font-medium">Sahil Gupta</div>
                                <div className="text-xs opacity-50">Joined yesterday</div>
                            </td>
                            <td>
                                <span className="badge badge-error gap-1 text-xs font-semibold text-white">
                                    Rejected
                                </span>
                            </td>
                            <th>
                                <button className="btn btn-xs btn-ghost gap-1 opacity-70">
                                    <FaEye /> View
                                </button>
                            </th>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>

                {/* 3. Activity Feed (Takes 1/3 width on large screens) */}
                <div className="bg-base-100 rounded-xl shadow-sm border border-base-200 p-6">
                    <h2 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
                        <FaClock className="text-orange-500" /> Recent Activity
                    </h2>
                    
                    <ul className="timeline timeline-vertical compact">
                        <li>
                            <div className="timeline-middle">
                                <div className="w-2 h-2 rounded-full bg-orange-500 ring ring-orange-100 ring-offset-1"></div>
                            </div>
                            <div className="timeline-end mb-4">
                                <div className="text-sm font-semibold text-base-content">New Recipe Approved</div>
                                <div className="text-xs text-base-content/60">"Paneer Butter Masala" by Admin</div>
                                <div className="text-[10px] text-base-content/40 mt-1">10 mins ago</div>
                            </div>
                            <hr className="bg-base-200"/>
                        </li>
                        <li>
                            <hr className="bg-base-200"/>
                            <div className="timeline-middle">
                                <div className="w-2 h-2 rounded-full bg-blue-500 ring ring-blue-100 ring-offset-1"></div>
                            </div>
                            <div className="timeline-end mb-4">
                                <div className="text-sm font-semibold text-base-content">New User Signup</div>
                                <div className="text-xs text-base-content/60">Rahul99 joined BiteBot</div>
                                <div className="text-[10px] text-base-content/40 mt-1">25 mins ago</div>
                            </div>
                            <hr className="bg-base-200"/>
                        </li>
                        <li>
                            <hr className="bg-base-200"/>
                            <div className="timeline-middle">
                                <div className="w-2 h-2 rounded-full bg-red-500 ring ring-red-100 ring-offset-1"></div>
                            </div>
                            <div className="timeline-end">
                                <div className="text-sm font-semibold text-base-content">Recipe Rejected</div>
                                <div className="text-xs text-base-content/60">"Burnt Toast" - Low quality image</div>
                                <div className="text-[10px] text-base-content/40 mt-1">1 hour ago</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

          </main>
        </div>
      </div>
    </div>
    </HomeLayout>
  );
}