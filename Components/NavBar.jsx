"use client";

import React from "react";
import Image from "next/image";
import { TrackingContext } from "../Context/TrackingContext";
import { AdminContext } from "../Context/AdminContext";
import { Nav1, Nav2, Nav3 } from "../Components/index";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { currentUser, connectWallet, disconnectWallet } = React.useContext(TrackingContext);
  const { Logout, user } = React.useContext(AdminContext);

  const navigation = [
    { title: "Home", path: "#" },
    { title: "Services", path: "#" },
    { title: "Contact Us", path: "#" },
  ];

  React.useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('.navbar-content') && !e.target.closest('.menu-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const showLogoutButton = currentUser && user;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-screen-xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between py-6 md:py-8">
          {/* Logo and Navigation Group */}
          <div className="flex items-center space-x-6 md:space-x-8">
            <a href="#" className="flex-shrink-0">
              <Image
                src="/Shipment_logo.png"
                alt="Shipment LOGO"
                width={160}
                height={40}
                className="h-24 w-auto"
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <ul className="flex space-x-6 pl-6">
                {navigation.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.path}
                      className="text-base text-lg font-large text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="menu-button md:hidden p-3 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <Nav1 className="h-6 w-6" /> : <Nav2 className="h-6 w-6" />}
          </button>

          {/* Desktop Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            { user? (
              <>
                {<button
                    onClick={Logout}
                    className="px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Log out
                  </button>}
                
                {currentUser ?(
                  <>
                      <p className="px-6 py-3 text-base font-medium text-white bg-gray-800 rounded-full">
                      {currentUser.slice(0, 25)}..
                    </p>
                    <button
                      onClick={disconnectWallet}
                      className="px-6 py-3 text-base font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      Disconnect Wallet
                    </button> 
                </>
                ) : (
                  <>
                    <button
                      onClick={connectWallet}
                      className="px-6 py-3 text-base font-medium text-white bg-gray-800 rounded-full hover:bg-gray-700 transition-colors flex items-center"
                    >
                      Connect Wallet
                      <span className="ml-2"><Nav3 className="h-5 w-5" /></span>
                  </button>
                  </>
                )}
              </>
            ) : (
              <>
                <h1 class="text-xl font-medium text-center text-navy-600 ">
                  Login first for further access....
                  </h1>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`navbar-content md:hidden ${
            isOpen ? "block" : "hidden"
          } py-6 border-t`}
        >
          <ul className="space-y-4 pb-6">
            {navigation.map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.path}
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Buttons */}
          <div className="space-y-4 px-4">
            {currentUser ? (
              <>
                <p className="px-6 py-3 text-base font-medium text-white bg-gray-800 rounded-full text-center">
                  {currentUser.slice(0, 25)}..
                </p>
                <button
                  onClick={disconnectWallet}
                  className="w-full px-6 py-3 text-base font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  Disconnect Wallet
                </button>
                {showLogoutButton && (
                  <button
                    onClick={Logout}
                    className="w-full px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Log out
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={connectWallet}
                className="w-full px-6 py-3 text-base font-medium text-white bg-gray-800 rounded-full hover:bg-gray-700 transition-colors flex items-center justify-center"
              >
                Connect Wallet
                <span className="ml-2"><Nav3 className="h-5 w-5" /></span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;