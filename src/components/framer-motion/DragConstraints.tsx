import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const constraints = {
  width: 300,
  height: 300,
  backgroundColor: "var(--hue-1-transparent)",
  borderRadius: 10,
};

const box = {
  width: 100,
  height: 100,
  backgroundColor: "#ff0088",
  borderRadius: 10,
};

export default function DragConstraints() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (constraintsRef.current) {
      setIsReady(true);
    }
  }, []);

  return (
    <motion.div ref={constraintsRef} style={constraints}>
      {isReady && (
        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.2}
          style={box}
        />
      )}
    </motion.div>
  );
}
