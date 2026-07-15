import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#0f0f0f] border-t border-gray-200 dark:border-gray-800/60 pt-16 pb-10 text-gray-600 dark:text-gray-400 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-black dark:text-white mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Mobile</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">TV & Audio</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Appliances</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-black dark:text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Contact Us</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Order Status</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Warranty</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-black dark:text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-black dark:hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Sustainability</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-black dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Privacy</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Terms</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Accessibility</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-xs text-center md:text-left">
          <p>&copy; 2026 Samsung Electronics Co., Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;