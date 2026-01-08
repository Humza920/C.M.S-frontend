import { useSelector, useDispatch } from "react-redux";
import CompleteProfile from "./CompleteProfile";
import AppointmentModal from "./AppointmentModal";
import UpdateAppointmentModal from "./UpdateAppointmentModal";
import { closeModal } from "../Features/modalSlice";
import { useEffect } from "react";
import AppointmentDetailsModal from "./AppointmentDetailsModal";
import InviteModal from "./InviteModal";
import ViewDetails from "./ViewDetails";
import MedicalRecordsModal from "./MedicalRecordsModal";

export default function ModalRoute() {
  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector((state) => state.modal);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
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
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>

      <div
        className="relativ p-6 rounded-2xl shadow-xl w-[90%] max-w-md z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {modalType === "completeProfile" && <CompleteProfile />}
        {modalType === "appointment" && <AppointmentModal />}
        {modalType === "updateAppointment" && <UpdateAppointmentModal />}
        {modalType === "appointmentDetails" && <AppointmentDetailsModal />}
        {modalType === "invitemodal" && <InviteModal />}
        {modalType === "viewDetails" && <ViewDetails />}
        {modalType === "viewpatienthistorydetails" && <MedicalRecordsModal />}
      </div>
    </div>
  );
}
