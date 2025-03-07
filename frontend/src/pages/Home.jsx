import React from 'react'
import { Link } from 'react-router-dom';
import SideDrawer from '../Layout/SideDrawer';

const Home = () => {

    const howItWorks = [
        { title: "Post Items", description: "Auctioneer posts items for bidding." },
        { title: "Place Bids", description: "Bidders place bids on listed items." },
        {
          title: "Win Notification",
          description: "Highest bidder receives a winning email.",
        },
      ];
    
    const { isAuthenticated } = true
    return (
        <div className='d-flex'>
        <SideDrawer/>
        <section className="container-fluid px-3 px-md-5 pt-5 pt-lg-20 min-vh-100 d-flex flex-column justify-content-center">
            <div>
            <p className="text-secondary fw-bold fs-5 mb-4">
                Transparency Leads to Your Victory
            </p>
            <h1 className="text-dark fw-bold mb-2 display-6 display-md-3 display-lg-2 display-xl-1">
                Transparent Auctions
            </h1>
            <h1 className="text-danger fw-bold mb-2 display-6 display-md-3 display-lg-2 display-xl-1">
                Be The Winner
            </h1>
            <div className="d-flex gap-3 my-4">
                {!isAuthenticated && (
                <>
                    <Link
                    to="/sign-up"
                    className="btn btn-danger fw-semibold px-4 py-2"
                    >
                    Sign Up
                    </Link>
                    <Link
                    to="/login"
                    className="btn btn-outline-secondary fw-bold px-4 py-2"
                    >
                    Login
                    </Link>
                </>
                )}
            </div>
            </div>
            <div className="d-flex flex-column gap-3">
            <h3 className="text-dark fs-4 fw-semibold mb-3">
                How it works
            </h3>
            <div className="row g-3">
                {howItWorks.map((element) => (
                <div key={element.title} className="col-12 col-md-6 col-lg-4">
                    <div className="bg-white p-3 rounded shadow-sm hover-shadow transition">
                    <h5 className="fw-bold">{element.title}</h5>
                    <p className="mb-0">{element.description}</p>
                    </div>
                </div>
                ))}
            </div>
            </div>
            {/* <FeaturedAuctions />
            <UpcomingAuctions />
            <Leaderboard /> */}
        </section>
        </div>
    )
}

export default Home
