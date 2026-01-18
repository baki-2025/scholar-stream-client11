import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-primary text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>

      <nav>
        <div className="grid grid-flow-col gap-4">
          {/* X (Twitter) */}
          <a aria-label="X">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="fill-current"
            >
              <path d="M18.901 1.153h3.68l-8.04 9.19 9.46 12.504h-7.4l-5.8-7.6-6.65 7.6H.47l8.6-9.84L0 1.153h7.6l5.25 6.93 6.05-6.93zM17.61 20.65h2.04L6.53 3.21H4.36l13.25 17.44z" />
            </svg>
          </a>

          {/* YouTube */}
          <a aria-label="YouTube">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>

          {/* Facebook */}
          <a aria-label="Facebook">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>
        </div>
      </nav>

      <aside>
        <p>
          © {new Date().getFullYear()} ScholarStream — All rights reserved
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
