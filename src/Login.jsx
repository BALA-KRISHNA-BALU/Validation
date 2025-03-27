import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = JSON.parse(localStorage.getItem("formData")) || [];

    if (formData.length > 0) {
      const user = formData.find((user) => user.email === email && user.phone === password);

      if (user) {
        localStorage.setItem('isAuthenticated', 'true');
        navigate("/dashboard"); 
      } else {
        setError("Invalid email or password");
      }
    } else {
      setError("No user data found. Please register first.");
    }
  };
   const handleSignUpRedirect = () => {
    navigate("/"); 
  };

  return (
    <div className="container-fluid d-flex justify-content-center login-main">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="icon">
            <i className="bi bi-person-circle"></i>
          </div>
          <div className="filed-blocks">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-inputs"
              required
            />
          </div>
          <div className="filed-blocks">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-inputs"
              required
            />
          </div>
          {error && <div className="error-msg">{error}</div>}
          <button type="submit" className="login-btn">Login</button>
           <p className="suggestion">do not have an account ? <span onClick={handleSignUpRedirect}>signUp</span></p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
