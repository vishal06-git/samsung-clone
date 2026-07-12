import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8 text-sm">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Top Section: Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold mb-4 text-black text-[15px]">Product & Service</h3>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#" className="hover:text-black">Smartphones</a></li>
              <li><a href="#" className="hover:text-black">Tablets</a></li>
              <li><a href="#" className="hover:text-black">Audio Sound</a></li>
              <li><a href="#" className="hover:text-black">Watches</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-black text-[15px]">Shop</h3>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#" className="hover:text-black">Offers</a></li>
              <li><a href="#" className="hover:text-black">Samsung Experience Store</a></li>
              <li><a href="#" className="hover:text-black">Where to Buy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-black text-[15px]">Support</h3>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#" className="hover:text-black">Contact Us</a></li>
              <li><a href="#" className="hover:text-black">Phone Support</a></li>
              <li><a href="#" className="hover:text-black">Community</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-black text-[15px]">Sustainability</h3>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#" className="hover:text-black">Environment</a></li>
              <li><a href="#" className="hover:text-black">Security & Privacy</a></li>
              <li><a href="#" className="hover:text-black">Corporate Citizenship</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Legal & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 text-gray-500 text-xs">
          <p>Copyright © 1995-2026 Samsung. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="font-bold text-black border-r border-gray-300 pr-4">India/English</a>
            <a href="#" className="hover:text-black">Privacy</a>
            <a href="#" className="hover:text-black">Legal</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;