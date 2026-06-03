// export const sectionFade = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.12,
//       duration: 0.6,
//     },
//   },
// };

// export const titleFade = {
//   hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
//   show: {
//     opacity: 1,
//     y: 0,
//     filter: "blur(0px)",
//     transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// export const cardVariant = {
//   hidden: { opacity: 0, y: 40, scale: 0.96 },
//   show: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.6,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   },
// };

// export const hoverLift = {
//   rest: { y: 0, scale: 1 },
//   hover: {
//     y: -8,
//     scale: 1.02,
//     transition: { duration: 0.25, ease: "easeOut" },
//   },
// };

// export const iconFloat = {
//   rest: { y: 0 },
//   hover: {
//     y: -3,
//     transition: {
//       repeat: Infinity,
//       repeatType: "reverse",
//       duration: 1.2,
//       ease: "easeInOut",
//     },
//   },
// };

// export const cardHover = {
//   scale: 1.03,
//   y: -8,
//   transition: {
//     duration: 0.25,
//     ease: "easeOut",
//   },
// };

export const sectionFade = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      duration: 0.6,
    },
  },
};

export const titleFade = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const cardHover = {
  scale: 1.05,
  y: -8,
  transition: {
    duration: 0.25,
    ease: "easeOut",
  },
};