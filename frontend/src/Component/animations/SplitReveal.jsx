import { motion } from "framer-motion";

export default function SplitReveal({
  image,
  imageAlt = "",
  children,
  reverse = false,
}) {
  return (
    <div
      className={`grid lg:grid-cols-2 gap-12 items-center ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Image Side */}
      <motion.div
        initial={{
          opacity: 0,
          x: -100,
          scale: 1.1,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        viewport={{
          once: false,
          amount: 0.3,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="overflow-hidden rounded-3xl"
      >
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover rounded-3xl"
        />
      </motion.div>

      {/* Content Side */}
      <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.3 }}
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }}
>
  {React.Children.map(children, (child) => (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 30,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      transition={{
        duration: 0.7,
      }}
    >
      {child}
    </motion.div>
  ))}
</motion.div>
    </div>
  );
}