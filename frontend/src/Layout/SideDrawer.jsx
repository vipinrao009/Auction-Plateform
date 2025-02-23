import React, { useState } from "react";
import { RiAuctionFill, RiInstagramFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaFacebook, FaUserCircle, FaFileInvoiceDollar, FaEye } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Mock authentication
  const user = { role: "Auctioneer" }; // Mock user role

  return (
    <>
      {/* Hamburger Icon (Mobile View) */}
      <div
        onClick={() => setShow(!show)}
        className="position-fixed top-2 end-2 bg-danger text-white fs-3 p-2 rounded cursor-pointer d-lg-none"
      >
        <GiHamburgerMenu />
      </div>

      {/* Side Drawer */}
      <div
        className={`position-fixed top-0 bg-light h-100 p-3 border-end transition ${show ? "start-0" : "start-100 d-none d-lg-block"}`}
        style={{ width: "300px" }}
      >
        <div className="position-relative">
          <Link to="/" className="text-decoration-none">
            <h4 className="fw-bold">
              Prime<span className="text-danger">Bid</span>
            </h4>
          </Link>
          <ul className="list-unstyled">
            <li>
              <Link to="/auctions" className="d-flex align-items-center text-dark fw-semibold fs-5 mb-2 text-decoration-none">
                <RiAuctionFill className="me-2" /> Auctions
              </Link>
            </li>
            <li>
              <Link to="/leaderboard" className="d-flex align-items-center text-dark fw-semibold fs-5 mb-2 text-decoration-none">
                <MdLeaderboard className="me-2" /> Leaderboard
              </Link>
            </li>

            {/* Auctioneer-Only Links */}
            {isAuthenticated && user?.role === "Auctioneer" && (
              <>
                <li>
                  <Link to="/submit-commission" className="d-flex align-items-center text-dark fw-semibold fs-5 mb-2 text-decoration-none">
                    <FaFileInvoiceDollar className="me-2" /> Submit Commission
                  </Link>
                </li>
                <li>
                  <Link to="/create-auction" className="d-flex align-items-center text-dark fw-semibold fs-5 mb-2 text-decoration-none">
                    <IoIosCreate className="me-2" /> Create Auction
                  </Link>
                </li>
                <li>
                  <Link to="/view-my-auctions" className="d-flex align-items-center text-dark fw-semibold fs-5 mb-2 text-decoration-none">
                    <FaEye className="me-2" /> View My Auctions
                  </Link>
                </li>
              </>
            )}

            {/* Admin-Only Links */}
            {isAuthenticated && user?.role === "Super Admin" && (
              <li>
                <Link to="/dashboard" className="d-flex align-items-center text-dark fw-semibold fs-5 mb-2 text-decoration-none">
                  <MdDashboard className="me-2" /> Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* Authentication Buttons */}
          {!isAuthenticated ? (
            <div className="d-flex gap-2 my-3">
              <Link to="/sign-up" className="btn btn-danger fw-semibold fs-5 px-4">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-outline-secondary fw-bold fs-5 px-4">
                Login
              </Link>
            </div>
          ) : (
            <div className="my-3">
              <button onClick={() => setIsAuthenticated(false)} className="btn btn-danger fw-semibold fs-5 px-4">
                Logout
              </button>
            </div>
          )}

          <hr className="mb-3" />

          {/* Additional Links */}
          <ul className="list-unstyled">
            {isAuthenticated && (
              <li>
                <Link to="/me" className="d-flex align-items-center text-dark fw-semibold fs-5 mb-2 text-decoration-none">
                  <FaUserCircle className="me-2" /> Profile
                </Link>
              </li>
            )}
            <li>
              <Link to="/how-it-works-info" className="d-flex align-items-center text-dark fw-semibold fs-5 mb-2 text-decoration-none">
                <SiGooglesearchconsole className="me-2" /> How it works
              </Link>
            </li>
            <li>
              <Link to="/about" className="d-flex align-items-center text-dark fw-semibold fs-5 mb-2 text-decoration-none">
                <BsFillInfoSquareFill className="me-2" /> About Us
              </Link>
            </li>
          </ul>

          {/* Close Button (Mobile View) */}
          <IoMdCloseCircleOutline
            onClick={() => setShow(!show)}
            className="position-absolute top-0 end-0 fs-2 cursor-pointer d-lg-none"
          />
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <div className="d-flex gap-2 mb-2">
            <Link to="/" className="btn btn-light p-2 rounded-circle text-dark">
              <FaFacebook />
            </Link>
            <Link to="/" className="btn btn-light p-2 rounded-circle text-dark">
              <RiInstagramFill />
            </Link>
          </div>
          <Link to="/contact" className="text-secondary fw-semibold text-decoration-none d-block mb-1">
            Contact Us
          </Link>
          <p className="text-secondary mb-1">&copy; PrimeBid, LLC.</p>
          <p className="text-secondary">
            Designed by{" "}
            <Link to="/" className="fw-semibold text-danger text-decoration-none">
              CodeWithZeeshu
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
