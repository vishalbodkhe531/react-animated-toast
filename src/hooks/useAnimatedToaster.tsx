import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";

type Toast = {
  id: string;
  message: string;
};

type ToasterProps = {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  reverseOrder?: boolean;
};

const ToastContext = createContext<{
  showToast: (message: string) => void;
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

  const showToast = useCallback(
    (message: string) => {
      const newToast: Toast = { id: Date.now().toString(), message };
      setToasts((prev) =>
        reverseOrder ? [newToast, ...prev] : [...prev, newToast]
      );

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== newToast.id));
      }, 3000);
    },
    [reverseOrder]
  );

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
      <div className={`fixed z-50 ${getPositionStyle()} space-y-2`}>
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="px-4 py-2 rounded shadow"
            >
              {toast.message}
              <BorderBeam duration={8} size={100} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
