// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const MyProfile = () => {
//   const { user, loading } = useSelector((state) => state.auth);
//   const navigate = useNavigate();

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-lg font-medium text-gray-600">
//         Loading profile...
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen text-center">
//         <p className="text-gray-700 mb-4">No profile data found.</p>
//         <button
//           onClick={() => navigate("/login")}
//           className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           Go to Login
//         </button>
//       </div>
//     );
//   }

//   const profile = user;
//   const base = user.userId || {};

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {/* Header */}
//       <div className="flex items-center gap-6 bg-white shadow-md rounded-2xl p-6">
//         <img
//           src={profile.profileImg || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
//           alt="Profile"
//           className="w-28 h-28 rounded-full object-cover border-4 border-blue-100"
//         />
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-800">
//             {base.userName || "Unnamed"}
//           </h2>
//           <p className="text-gray-500">{base.emailAddress}</p>
//           <span className="mt-2 inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
//             {base.role}
//           </span>
//         </div>
//       </div>

//       {/* Profile Details */}
//       <div className="mt-8 bg-white shadow-md rounded-2xl p-6 space-y-6">
//         <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
//           Personal Information
//         </h3>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           <div>
//             <p className="text-gray-500 text-sm">Phone Number</p>
//             <p className="font-medium text-gray-800">{profile.phoneNumber || "N/A"}</p>
//           </div>

//           <div>
//             <p className="text-gray-500 text-sm">Age</p>
//             <p className="font-medium text-gray-800">{profile.age || "N/A"}</p>
//           </div>

//           <div>
//             <p className="text-gray-500 text-sm">Gender</p>
//             <p className="font-medium text-gray-800">{profile.gender || "N/A"}</p>
//           </div>

//           <div>
//             <p className="text-gray-500 text-sm">Blood Group</p>
//             <p className="font-medium text-gray-800">{profile.bloodGroup || "N/A"}</p>
//           </div>

//           <div>
//             <p className="text-gray-500 text-sm">Address</p>
//             <p className="font-medium text-gray-800">{profile.address || "N/A"}</p>
//           </div>

//           <div>
//             <p className="text-gray-500 text-sm">Medical History</p>
//             <p className="font-medium text-gray-800">
//               {profile.medicalHistory || "N/A"}
//             </p>
//           </div>

//           <div>
//             <p className="text-gray-500 text-sm">Allergies</p>
//             <p className="font-medium text-gray-800">
//               {Array.isArray(profile.allergies) && profile.allergies.length > 0
//                 ? profile.allergies.join(", ")
//                 : "None"}
//             </p>
//           </div>

//           <div>
//             <p className="text-gray-500 text-sm">Emergency Contact</p>
//             <p className="font-medium text-gray-800">
//               {profile.emergencyContact?.phone || "N/A"}
//             </p>
//           </div>

//           <div>
//             <p className="text-gray-500 text-sm">CNIC</p>
//             <p className="font-medium text-gray-800">{base.cnic || "N/A"}</p>
//           </div>
//         </div>

//         <div className="pt-4">
//           <button
//             onClick={() => navigate("/edit-profile")}
//             className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             Edit Profile
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyProfile;


import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium text-gray-600">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-gray-700 mb-4">No profile data found.</p>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const base = user.userId || {};

  // Conditional rendering based on role
  if (base.role === "Doctor") {
    const profile = user; // doctor-specific fields are in user object

    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Doctor Profile</h2>

        <div className="flex items-center gap-6 bg-white shadow-md rounded-2xl p-6">
          <img
            src={profile.profileImg || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-100"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {base.userName || "Unnamed"}
            </h2>
            <p className="text-gray-500">{base.emailAddress}</p>
            <span className="mt-2 inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {base.role}
            </span>
          </div>
        </div>

        <div className="mt-8 bg-white shadow-md rounded-2xl p-6 space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
            Professional Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 text-sm">Gender</p>
              <p className="font-medium text-gray-800">{profile.gender || "N/A"}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Phone Number</p>
              <p className="font-medium text-gray-800">{profile.phoneNumber || "N/A"}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Qualification</p>
              <p className="font-medium text-gray-800">{profile.qualification || "N/A"}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Specialization</p>
              <p className="font-medium text-gray-800">{profile.specialization || "N/A"}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Experience</p>
              <p className="font-medium text-gray-800">{profile.experience || 0} years</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Fees</p>
              <p className="font-medium text-gray-800">{profile.fees || 0}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Available Days</p>
              <p className="font-medium text-gray-800">
                {Array.isArray(profile.availableDays) ? profile.availableDays.join(", ") : "N/A"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Available Time</p>
              <p className="font-medium text-gray-800">
                {profile.availableTime?.start || "N/A"} - {profile.availableTime?.end || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Location</p>
              <p className="font-medium text-gray-800">{profile.location?.country || "N/A"}</p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-gray-500 text-sm">About</p>
              <p className="font-medium text-gray-800">{profile.about || "No description provided"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Patient profile
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Patient Profile</h2>

      <div className="flex items-center gap-6 bg-white shadow-md rounded-2xl p-6">
        <img
          src={base.profileImg || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-blue-100"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {base.userName || "Unnamed"}
          </h2>
          <p className="text-gray-500">{base.emailAddress}</p>
          <span className="mt-2 inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            {base.role}
          </span>
        </div>
      </div>

      <div className="mt-8 bg-white shadow-md rounded-2xl p-6 space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500 text-sm">Phone Number</p>
            <p className="font-medium text-gray-800">{user.phoneNumber || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Age</p>
            <p className="font-medium text-gray-800">{user.age || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Gender</p>
            <p className="font-medium text-gray-800">{user.gender || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Blood Group</p>
            <p className="font-medium text-gray-800">{user.bloodGroup || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Address</p>
            <p className="font-medium text-gray-800">{user.address || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Medical History</p>
            <p className="font-medium text-gray-800">{user.medicalHistory || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Allergies</p>
            <p className="font-medium text-gray-800">
              {Array.isArray(user.allergies) && user.allergies.length > 0
                ? user.allergies.join(", ")
                : "None"}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Emergency Contact</p>
            <p className="font-medium text-gray-800">{user.emergencyContact?.phone || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">CNIC</p>
            <p className="font-medium text-gray-800">{base.cnic || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
