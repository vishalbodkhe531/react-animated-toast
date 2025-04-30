import { AnimatePresence, motion } from "framer-motion";
import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FiAlertTriangle, FiXCircle } from "react-icons/fi";

import { BorderBeam } from "@/components/magicui/border-beam";
import confetti from "canvas-confetti";

type Toast = {
  id: string;
  message: string;
  variant: "success" | "error" | "warning";
};

type ToasterProps = {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  reverseOrder?: boolean;
};

const ToastContext = createContext<{
  showToast: {
    success: (msg: string) => void;
    error: (msg: string) => void;
    warning: (msg: string) => void;
  };
} | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within AnimatedToaster");
  return context;
};

export const AnimatedToaster: React.FC<
  React.PropsWithChildren<ToasterProps>
> = ({ children, position = "top-right", reverseOrder = false }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const constraintRef = useRef<HTMLDivElement>(null);

  const triggerConfetti = () => {
    const end = Date.now() + 2 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  const addToast = useCallback(
    (message: string, variant: Toast["variant"]) => {
      const newToast: Toast = {
        id: Date.now().toString(),
        message,
        variant,
      };

      setToasts((prev) =>
        reverseOrder ? [newToast, ...prev] : [...prev, newToast]
      );

      // 🎉 Trigger confetti only for success
      if (variant === "success") {
        triggerConfetti();
      }

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== newToast.id));
      }, 3000);
    },
    [reverseOrder]
  );

  const showToast = {
    success: (message: string) => addToast(message, "success"),
    error: (message: string) => addToast(message, "error"),
    warning: (message: string) => addToast(message, "warning"),
  };

  const getPositionStyle = () => {
    const pos: Record<string, string> = {
      "top-left": "top-4 left-4",
      "top-right": "top-4 right-4",
      "bottom-left": "bottom-4 left-4",
      "bottom-right": "bottom-4 right-4",
    };
    return pos[position];
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        ref={constraintRef}
        className="fixed inset-0 pointer-events-none z-50"
      >
        <div
          className={`absolute ${getPositionStyle()} space-y-2 pointer-events-auto`}
        >
          <AnimatePresence>
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                drag
                dragConstraints={constraintRef}
                dragElastic={0.3}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`px-4 py-2 rounded-lg shadow-lg text-white font-semibold relative cursor-pointer flex items-center gap-2
                ${
                  toast.variant === "success"
                    ? "bg-gradient-to-r from-green-400 to-green-600 shadow-green-500/40"
                    : ""
                }
                ${
                  toast.variant === "error"
                    ? "bg-gradient-to-r from-red-400 to-red-600 shadow-red-500/40"
                    : ""
                }
                ${
                  toast.variant === "warning"
                    ? "bg-gradient-to-r from-yellow-300 to-yellow-500 text-black shadow-yellow-400/50"
                    : ""
                }
              `}
              >
                {toast.variant === "success" && <FaRegCircleCheck size={20} />}
                {toast.variant === "error" && <FiXCircle size={20} />}
                {toast.variant === "warning" && <FiAlertTriangle size={20} />}

                <span>{toast.message}</span>

                <BorderBeam
                  duration={8}
                  size={100}
                  colorFrom={
                    toast.variant === "success"
                      ? "#34D399"
                      : toast.variant === "error"
                      ? "#F87171"
                      : "#FBBF24"
                  }
                  colorTo={
                    toast.variant === "success"
                      ? "#FF416C"
                      : toast.variant === "error"
                      ? "#00F5A0"
                      : "#F59E0B"
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ToastContext.Provider>
  );
};
