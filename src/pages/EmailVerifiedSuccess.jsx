import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmailVerifiedSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  }, [navigate]);

  return (
    <div className="card">
      <h2>Email Verified Successfully 🎉</h2>
      <p>Redirecting to login...</p>
    </div>
  );
};

export default EmailVerifiedSuccess;
