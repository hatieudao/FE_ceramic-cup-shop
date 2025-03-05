import { motion } from 'framer-motion';
import type React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 pb-8 pt-16 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* This Week Top Sales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-4 text-xl font-bold">This Week Top Sales</h3>
            <p className="mb-2 text-gray-400">#New Style</p>
            <p className="mb-4 text-gray-400">Luxury soft</p>
            <button className="bg-white px-6 py-2 font-medium text-gray-900 transition-colors hover:bg-gray-200">
              BUY NOW
            </button>
          </motion.div>

          {/* All Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-4 text-xl font-bold">All Products</h3>
            <h4 className="mb-2 text-lg font-medium">News & Updates</h4>
            <p className="text-gray-400">
              On the other hand, we denounce with righteous indignation and
              dislike men who are so beguiled and demoralized by the charms.
            </p>
          </motion.div>

          {/* Company & Product */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="mb-4 text-xl font-bold">COMPANY</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Blogs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-xl font-bold">PRODUCT</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Customers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Demos
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Helps & Social Network */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="mb-4 text-xl font-bold">HELPS</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Introduction
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Feedback
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Referrals
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Network Status
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-xl font-bold">SOCIAL NETWORK</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Google+
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tags */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-medium">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {[
              'Minimal eCommerce',
              'Marketing',
              'User Experience',
              'Ali Express',
              'Web',
              'Digital Expo',
              'Web Search',
              'Affiliate',
              'UCWeb',
              'Support',
              'Template',
              'Best Quality',
              'Mobile',
              '24 Support',
              'Ali Express',
              'Web',
              'Laptop',
              'Web Search',
              'Affiliate',
              'Photoshop',
              'Support',
              'Template',
            ].map((tag, index) => (
              <a
                key={index}
                href="#"
                className="text-sm text-gray-400 hover:text-white"
              >
                {tag}
                {index < 21 ? ' | ' : ''}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © Beck {currentYear} Made With ❤️ By Hasthemes
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
