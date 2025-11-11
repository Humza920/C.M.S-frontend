import { useSelector } from "react-redux";
import { closeModal } from "../Features/modalSlice";
import { useDispatch } from "react-redux";

const MedicalRecordsModal = () => {
    const { modalData } = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    if (!modalData) return null;

    const { 
        appointment,
        diagnosis,
        prescription,
        notes,
        followUpDate,
        doctor,
        createdAt
    } = modalData;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatDateTime = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Medical Record Details</h2>
                            <p className="text-green-100 text-sm mt-1">
                                Case History • {formatDateTime(createdAt)}
                            </p>
                        </div>
                        <button
                            onClick={() => dispatch(closeModal())}
                            className="text-white hover:bg-green-500 p-2 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
                    <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                            {/* Appointment Information */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Appointment Details
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Date:</span>
                                        <span className="font-medium text-gray-900">
                                            {formatDate(appointment?.appointmentDate)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Time:</span>
                                        <span className="font-medium text-gray-900">
                                            {appointment?.startAt} - {appointment?.endAt}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Status:</span>
                                        <span className="font-medium text-green-600 capitalize">
                                            {appointment?.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Doctor Information */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Treating Doctor
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Name:</span>
                                        <span className="font-medium text-gray-900">
                                            {doctor?.userId?.userName || "N/A"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Specialization:</span>
                                        <span className="font-medium text-gray-900">
                                            {doctor?.specialization || "N/A"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Experience:</span>
                                        <span className="font-medium text-gray-900">
                                            {doctor?.experience || "N/A"} years
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Follow-up Information */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Follow-up
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Follow-up Date:</span>
                                        <span className="font-medium text-gray-900">
                                            {followUpDate ? formatDate(followUpDate) : "Not scheduled"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Record Created:</span>
                                        <span className="font-medium text-gray-900">
                                            {formatDateTime(createdAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Medical Details */}
                        <div className="space-y-6">
                            {/* Diagnosis */}
                            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Diagnosis
                                </h3>
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <p className="text-gray-800 whitespace-pre-wrap">
                                        {diagnosis || "No diagnosis recorded"}
                                    </p>
                                </div>
                            </div>

                            {/* Prescription */}
                            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                    Prescription
                                </h3>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <p className="text-gray-800 whitespace-pre-wrap">
                                        {prescription || "No prescription provided"}
                                    </p>
                                </div>
                            </div>

                            {/* Clinical Notes */}
                            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Clinical Notes
                                </h3>
                                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                    <p className="text-gray-800 whitespace-pre-wrap">
                                        {notes || "No additional clinical notes"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="flex justify-between items-center text-sm text-gray-500">
                                <div>
                                    <span className="font-medium">Record ID: </span>
                                    <span className="font-mono">{modalData._id}</span>
                                </div>
                                <div>
                                    <span className="font-medium">Last Updated: </span>
                                    <span>{formatDateTime(modalData.updatedAt)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Close Button */}
                <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                    <div className="flex justify-end">
                        <button
                            onClick={() => dispatch(closeModal())}
                            className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicalRecordsModal;