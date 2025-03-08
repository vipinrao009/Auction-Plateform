import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiAuctionFill, RiInstagramFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaFacebook, FaUserCircle, FaFileInvoiceDollar, FaEye } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css";
import { logout } from "../store/slice/userSlice";

const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, user} = useSelector((state)=>state.user)
  console.log(user)
  const dispatch = useDispatch();
  const handleLogout = ()=>{
    dispatch(logout())
  }

  useEffect(()=>{
    user
  })

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="btn btn-danger d-lg-none position-fixed top-2 end-0 me-3 p-2 rounded-circle"
        onClick={() => setShow(true)}
      >
        <GiHamburgerMenu size={24} />
      </button>




      {/* Sidebar */}
      <div onClick={()=> setShow(!show)} className={`sidebar  ${show ? "show" : ""} d-lg-block`}>
        <div className="p-3 d-flex flex-column h-100">
          {/* Logo */}
          <Link to="/" className="text-decoration-none">
            <h4 className="fw-bold">
              Prime<span className="text-danger">Bid</span>
            </h4>
          </Link>

          {/* Navigation Links */}
          <ul className="list-unstyled mt-3">
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

          {/* Footer */}
          <div className="mt-auto p-3 text-center">
            <div className="d-flex justify-content-center gap-2 mb-2">
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
                Vipin Kumar
              </Link>
            </p>
          </div>
        </div>

        {/* Close Button for Mobile */}
        <IoMdCloseCircleOutline
          onClick={() => setShow(false)}
          className="position-fixed top-2 end-0 me-3 p-2 cursor-pointer text-danger d-lg-none"
        />
      </div>
    </>
  );
};

export default SideDrawer;
