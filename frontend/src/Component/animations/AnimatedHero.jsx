import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AnimatedHero({ children }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: false,   // 👈 IMPORTANT (replays every scroll)
        amount: 0.4,
      }}
      className="w-full"
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={index}
              variants={item}
            >
              {child}
            </motion.div>
          ))
        : (
          <motion.div variants={item}>
            {children}
          </motion.div>
        )}
    </motion.div>
  );
}