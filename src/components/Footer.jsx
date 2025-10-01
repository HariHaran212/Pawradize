import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black/80 text-white mt-12 font-poppins">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold text-lg">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link className="hover:text-secondary transition" to="/shop">Shop by Pet</Link>
            </li>
            <li>
              <Link className="hover:text-secondary transition" to="/shop">Welcome Home Kits</Link>
            </li>
            <li>
              <Link className="hover:text-secondary transition" to="/shop">Deals & Offers</Link>
            </li>
            <li>
              <Link className="hover:text-secondary transition" to="/contact">Track Your Order</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg">Discover</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link className="hover:text-secondary transition" to="/find-a-friend">Find a Friend</Link>
            </li>
            <li>
              <Link className="hover:text-secondary transition" to="/pet-care-resources">Pet Care Resources</Link>
            </li>
            <li>
              <Link className="hover:text-secondary transition" to="/about">Coimbatore Spotlight</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg">Company</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link className="hover:text-secondary transition" to="/about">About Us</Link>
            </li>
            <li>
              <Link className="hover:text-secondary transition" to="/about">Our Ethical Promise</Link>
            </li>
            <li>
              <Link className="hover:text-secondary transition" to="/about">Testimonials</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg">Support</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link className="hover:text-secondary transition" to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link className="hover:text-secondary transition" to="/pet-care-resources">Help & FAQ</Link>
            </li>
            <li>
              <Link className="hover:text-secondary transition" to="/contact">Shipping Policy</Link>
            </li>
          </ul>

          <div className="mt-6">
            <p className="text-sm mb-2">Subscribe for updates</p>
            <div className="flex">
              <input
                className="flex-1 rounded-l-md py-2 px-3 text-gray-800 bg-ivory placeholder-gray-500 border-0 outline-none"
                placeholder="Your email"
              />
              <button className="rounded-r-md px-4 bg-primary/90 text-gray-800 font-semibold hover:bg-primary/80 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 py-4 text-center text-sm">
        © {new Date().getFullYear()} Pawradise - All rights reserved.
      </div>
    </footer>
  );
}
