import React from "react";

const Footer = () => (
  <footer className="bg-[#4B1979] text-white py-10">
    <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between items-start">
      <div className="mb-8 md:mb-0">
        <div className="flex items-center mb-6">
          <span className="text-3xl font-bold text-yellow-300 mr-1">🔑</span>
          <span className="text-2xl font-bold">
            <span className="text-yellow-300">Logo</span>
          </span>
        </div>
        <div className="text-xs text-gray-200 mt-8 md:mt-20">
          © 2025 Findedu. All Rights Reserved. Best Girls
        </div>
      </div>

      <div className="flex flex-1 justify-between max-w-2xl w-full">
        <div className="flex flex-col gap-2">
          <a href="#" className="hover:underline">
            Bosh sahifa
          </a>
          <a href="#" className="hover:underline">
            O'quv Markazlar
          </a>
          <a href="#" className="hover:underline">
            Biz haqimizda
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <a href="#" className="hover:underline">
            Aloqa
          </a>
          <a href="#" className="hover:underline">
            Shaharlar
          </a>
          <a href="#" className="hover:underline">
            Loyihalar
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <a href="#" className="hover:underline">
            IT
          </a>
          <a href="#" className="hover:underline">
            Matematika
          </a>
          <a href="#" className="hover:underline">
            Marketing
          </a>
          <a href="#" className="hover:underline">
            SAT
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <a href="#" className="hover:underline">
            Ingliz tili
          </a>
          <a href="#" className="hover:underline">
            SMM
          </a>
          <a href="#" className="hover:underline">
            Dizayn
          </a>
          <a href="#" className="hover:underline">
            Biznes
          </a>
        </div>
      </div>

      {/* Ijtimoiy tarmoqlar */}
      <div className="flex gap-5 mt-8 md:mt-0">
        <a href="#" className="text-white hover:text-yellow-300">
          <svg width="24" height="24" fill="none" stroke="currentColor">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H6v4h4v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
        <a href="#" className="text-white hover:text-yellow-300">
          <svg width="24" height="24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <path d="M16 8.5c.5-1 1.5-1 2 0" />
          </svg>
        </a>
        <a href="#" className="text-white hover:text-yellow-300">
          <svg width="24" height="24" fill="none" stroke="currentColor">
            <path d="M22 4.01c-.77.35-1.6.59-2.47.7A4.13 4.13 0 0 0 21.4 2.2a8.19 8.19 0 0 1-2.6 1A4.1 4.1 0 0 0 12 6.1c0 .32.04.64.1.94A11.65 11.65 0 0 1 3 3.1a4.1 4.1 0 0 0 1.27 5.47A4.07 4.07 0 0 1 2.8 7.7v.05a4.1 4.1 0 0 0 3.3 4.02c-.4.1-.8.13-1.2.05a4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 19.54a11.62 11.62 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.18 8.18 0 0 0 22 4.01z" />
          </svg>
        </a>
        <a href="#" className="text-white hover:text-yellow-300">
          <svg width="24" height="24" fill="none" stroke="currentColor">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <path d="M16 11.37V8a4 4 0 0 0-8 0v3.37" />
            <path d="M7 16h10" />
          </svg>
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
