import { motion } from 'framer-motion';
import type React from 'react';

const features = [
  {
    id: 1,
    title: 'THERE ARE MANY VARIATIONS OF PASSAGES OF LOREM.',
  },
  {
    id: 2,
    title: 'THERE ARE MANY VARIATIONS OF PASSAGES OF LOREM.',
  },
  {
    id: 3,
    title: 'THERE ARE MANY VARIATIONS OF PASSAGES OF LOREM.',
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="border border-gray-200 p-6 text-center transition-shadow hover:shadow-lg"
            >
              <h3 className="mb-4 font-bold">{feature.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
