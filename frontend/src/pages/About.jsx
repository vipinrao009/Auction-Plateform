import React from "react";

const About = () => {
  const values = [
    {
      id: 1,
      title: "Integrity",
      description:
        "We uphold honesty and transparency in every transaction, ensuring a fair and ethical auction experience for all participants.",
    },
    {
      id: 2,
      title: "Innovation",
      description:
        "We continuously enhance our platform with state-of-the-art technology, delivering a seamless and efficient auction experience.",
    },
    {
      id: 3,
      title: "Community",
      description:
        "We foster a thriving community of buyers and sellers who share a passion for unique and valuable items.",
    },
    {
      id: 4,
      title: "Customer Commitment",
      description:
        "We prioritize exceptional customer service, offering dedicated support and resources for a smooth auction journey.",
    },
  ];

  return (
    <>
      <section className="container py-5">
        <div className="mb-5 text-center">
          <h1 className="text-danger display-3 fw-bold">About PrimeBid</h1>
          <p className="fs-5 text-secondary">
            PrimeBid is the premier destination for online auctions, bringing buyers and sellers together in a secure and dynamic marketplace. Founded in 2024, we are dedicated to innovation, integrity, and community-driven experiences.
          </p>
        </div>
        <div className="mb-5">
          <h3 className="fw-bold text-dark">Our Mission</h3>
          <p className="fs-5 text-secondary">
            Our mission is to redefine online auctions by offering an engaging, transparent, and competitive platform where individuals and businesses can discover and trade exceptional items with confidence.
          </p>
        </div>
        <div className="mb-5">
          <h3 className="fw-bold text-dark">Our Values</h3>
          <ul className="list-group">
            {values.map((element) => (
              <li className="list-group-item" key={element.id}>
                <strong>{element.title}:</strong> {element.description}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-5">
          <h3 className="fw-bold text-dark">Our Story</h3>
          <p className="fs-5 text-secondary">
            Established by industry experts, PrimeBid was born from a vision to create a platform that offers an unparalleled auction experience. Our team’s expertise ensures a safe, efficient, and user-friendly marketplace for buyers and sellers worldwide.
          </p>
        </div>
        <div className="mb-5">
          <h3 className="fw-bold text-dark">Join Our Community</h3>
          <p className="fs-5 text-secondary">
            Whether you are looking to buy, sell, or explore, PrimeBid welcomes you to a world of endless possibilities. Experience the thrill of auctions and uncover unique treasures with us.
          </p>
        </div>
        <div className="text-center">
          <p className="text-danger fs-4 fw-bold">
            Thank you for choosing PrimeBid. Your journey to exciting auctions begins here!
          </p>
        </div>
      </section>
    </>
  );
};

export default About;
