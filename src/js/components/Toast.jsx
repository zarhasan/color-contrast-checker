import { useContext, useEffect } from "react";
import { AppContext } from "../store";
import { motion, AnimatePresence } from "framer-motion";

const Toast = () => {
  const { toast, setToast } = useContext(AppContext);

  const ms = 5000;

  const timeout = setTimeout(() => {
    setToast(false);
  }, ms);

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, [toast]);

  return (
    <>
      <AnimatePresence>
        {toast.show && (
          <motion.div
            className="toast"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          >
            <p>{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Toast;
