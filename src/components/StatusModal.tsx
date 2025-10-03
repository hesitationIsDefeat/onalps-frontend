import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { ModalState } from "../enums/ModalState";

export interface StatusModalProps {
  type: ModalState;
  message?: string;
  url?: string;
  seconds?: number;
  onClose?: () => void;
}

export const StatusModal: React.FC<StatusModalProps> = ({
  type,
  message,
  url,
  seconds,
  onClose,
}) => {
  const [countdown, setCountdown] = useState(seconds || 3);

  useEffect(() => {
    if (!url) return;

    if (countdown <= 0) {
      window.location.href = url;
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, url]);

  const getMessage = () => {
    if (message) return message;
    if (type === ModalState.SUCCESS) return "Success";
    if (type === ModalState.ERROR) return "Fail";
    return "Info";
  };

  const getColor = () => {
    if (type === ModalState.SUCCESS) return "text-green-600";
    if (type === ModalState.ERROR) return "text-red-600";
    return "text-blue-600";
  };

  return (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div
      className={`relative w-[24rem] h-[12rem] bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-center items-center border-3 border-solid ${getColor()}`}
    >
      {/* Close Icon only if no URL */}
      {!url && onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 bg-transparent border-0 p-0"
        >
          <X size={20} />
        </button>
      )}

      {/* Main Message */}
      <p className={`text-xl font-semibold mb-2 ${getColor()}`}>
        {getMessage()}
      </p>

      {/* URL Redirect Info */}
      {url && (
        <p className="text-sm text-gray-600">
          You are being directed... ({countdown})
        </p>
      )}
    </div>
  </div>
);
};