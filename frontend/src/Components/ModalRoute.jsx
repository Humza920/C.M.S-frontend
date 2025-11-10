import { useSelector, useDispatch } from "react-redux";
import CompleteProfile from "./CompleteProfile";
import AppointmentModal from "./AppointmentModal";
import UpdateAppointmentModal from "./UpdateAppointmentModal";
import { closeModal } from "../Features/modalSlice";
import { useEffect } from "react";
import AppointmentDetailsModal from "./AppointmentDetailsModal";

export default function ModalRoute() {
  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector((state) => state.modal);

  // 🔹 Disable scroll when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // stop scrolling
    } else {
      document.body.style.overflow = "auto"; // restore scroll
    }

    // cleanup
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={() => dispatch(closeModal())}
    >
      {/* 🔹 Blurred & darkened background */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>

      {/* 🔹 Modal box */}
      <div
        className="relative bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {modalType === "completeProfile" && <CompleteProfile />}
        {modalType === "appointment" && <AppointmentModal />}
        {modalType === "updateAppointment" && <UpdateAppointmentModal />}
        {modalType === "appointmentDetails" && <AppointmentDetailsModal />}

      </div>
    </div>
  );
}
