import { useForm } from "react-hook-form";
import {
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet default icon import (so markers show)
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import HomeLayout from "../layouts/HomeLayout";

const orangeIcon = new L.Icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function ContactUs() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // intentionally blank
  };

  return (
    <HomeLayout>
    <div className="py-12 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-orange-50 via-amber-50 to-white">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Get in{" "}
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or need help? We’d love to hear from you.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {/* Contact Form */}
          <div className="card bg-white shadow-xl border border-orange-100 w-full lg:max-w-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body p-6 md:p-8">
              <div className="mb-6">
                <h2 className="card-title text-2xl font-bold mb-2 flex items-center gap-2 text-orange-600">
                  <FiMessageSquare className="text-3xl" />
                  Send Us a Message
                </h2>
                <p className="text-gray-600">
                  Fill out the form and we’ll get back to you soon.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div className="form-control flex flex-col">
                  <label htmlFor="name" className="label mb-2">
                    <span className="label-text font-semibold text-gray-700">
                      Full Name
                    </span>
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    type="text"
                    placeholder="Enter your full name"
                    className="input w-full input-bordered focus:border-orange-400 focus:ring focus:ring-orange-200"
                  />
                </div>

                {/* Email */}
                <div className="form-control flex flex-col">
                  <label htmlFor="email" className="label mb-2">
                    <span className="label-text font-semibold text-gray-700">
                      Email Address
                    </span>
                  </label>
                  <input
                    id="email"
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                    className="input w-full input-bordered focus:border-orange-400 focus:ring focus:ring-orange-200"
                  />
                </div>

                {/* Message */}
                <div className="form-control flex flex-col">
                  <label htmlFor="message" className="label mb-2">
                    <span className="label-text font-semibold text-gray-700">
                      Message
                    </span>
                  </label>
                  <textarea
                    id="message"
                    {...register("message")}
                    placeholder="Type your message..."
                    className="textarea resize-none w-full textarea-bordered h-32 focus:border-orange-400 focus:ring focus:ring-orange-200"
                  ></textarea>
                </div>

                {/* Submit */}
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold gap-2 rounded-2xl shadow-md transition-all duration-300 w-full"
                  >
                    <FiSend className="text-lg" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 w-full lg:max-w-sm">
            <div className="card bg-white shadow-md border border-orange-100 hover:shadow-lg transition-all duration-300">
              <div className="card-body p-6 space-y-4">
                <h3 className="card-title text-lg font-bold text-orange-600">
                  Contact Information
                </h3>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <FiMail className="text-xl text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-600">support@example.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <FiPhone className="text-xl text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-gray-600">+91 91234 56789</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <FiMapPin className="text-xl text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="text-gray-600">
                      Kolkata, West Bengal, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="card bg-white shadow-xl border border-orange-100 mt-12">
          <div className="card-body p-6">
            <h2 className="card-title text-2xl font-bold mb-4 text-orange-600">
              Find Us
            </h2>
            <div className="rounded-lg overflow-hidden h-64 border border-orange-100">
              <MapContainer
                center={[22.5726, 88.3639]} // Kolkata coordinates
                zoom={13}
                scrollWheelZoom={false}
                className="h-full w-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <Marker position={[22.5726, 88.3639]} icon={orangeIcon}>
                  <Popup>
                    <b>BiteBot HQ</b> <br />
                    Kolkata, West Bengal 🇮🇳
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
    </HomeLayout>
  );
}

export default ContactUs;
