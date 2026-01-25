import React from "react";
import { FcDepartment } from "react-icons/fc";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-primary text-base-content px-10 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">

        {/* LEFT: Logo + Name */}
        <aside className="flex items-center gap-2">
          <FcDepartment size={36} />
          <h2 className="text-2xl font-bold text-white">
            Scholar<span className="text-green-300">Stream</span>
          </h2>
        </aside>

        {/* RIGHT: Links + Social + Copyright */}
        <div className="flex flex-col items-center md:items-end gap-4">

          {/* Links */}
          <nav className="flex gap-4">
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
          </nav>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a aria-label="X">
              <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24">
                <path d="M18.901 1.153h3.68l-8.04 9.19 9.46 12.504h-7.4l-5.8-7.6-6.65 7.6H.47l8.6-9.84L0 1.153h7.6l5.25 6.93 6.05-6.93z" />
              </svg>
            </a>

            <a aria-label="YouTube">
              <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>

            <a aria-label="Facebook">
              <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-center md:text-right">
            © {new Date().getFullYear()} ScholarStream — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
