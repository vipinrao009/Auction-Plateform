// import { register } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    password: "",
    bankAccountName: "",
    bankAccountNumber: "",
    bankName: "",
    easypaisaAccountNumber: "",
    paypalEmail: "",
    profileImage: "",
  });
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });
    dispatch(register(form));
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setFormData({ ...formData, profileImage: file });
    };
  };

  return (
    <div className="container w-50 ms-auto py-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center text-danger fw-bold">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input type="text" name="userName" value={formData.userName} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Role</label>
              <select name="role" value={formData.role} onChange={handleChange} className="form-select" required>
                <option value="">Select Role</option>
                <option value="Auctioneer">Auctioneer</option>
                <option value="Bidder">Bidder</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-12">
              <label className="form-label">Profile Image</label>
              <div className="d-flex align-items-center gap-3">
                <img src={profileImagePreview || "/imageHolder.jpg"} alt="Profile Preview" className="rounded-circle" width="50" height="50" />
                <input type="file" onChange={imageHandler} className="form-control" />
              </div>
            </div>
            {formData.role === "Auctioneer" && (
              <>
                <div className="col-md-12">
                  <h5 className="text-primary">Payment Details</h5>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Bank Name</label>
                  <select name="bankName" value={formData.bankName} onChange={handleChange} className="form-select">
                    <option value="">Select Your Bank</option>
                    <option value="Meezan Bank">Meezan Bank</option>
                    <option value="UBL">UBL</option>
                    <option value="HBL">HBL</option>
                    <option value="Allied Bank">Allied Bank</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Bank Account Number</label>
                  <input type="text" name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} className="form-control" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Bank Account Name</label>
                  <input type="text" name="bankAccountName" value={formData.bankAccountName} onChange={handleChange} className="form-control" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Easypaisa Account Number</label>
                  <input type="text" name="easypaisaAccountNumber" value={formData.easypaisaAccountNumber} onChange={handleChange} className="form-control" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Paypal Email</label>
                  <input type="email" name="paypalEmail" value={formData.paypalEmail} onChange={handleChange} className="form-control" />
                </div>
              </>
            )}
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-danger w-50" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
