import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import header from '../assets/header.png';
import banner from '../assets/banner.png';
import body from '../assets/body.png';
import Loader from '../components/loader/Loader';
import { MdKeyboardArrowRight } from 'react-icons/md';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/user/login`, {
        username,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Login successful!');
      navigate('/account');
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.message || error.message || 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-main">
      <img src={header} alt="Header" className="login-header-img" />
      <div className="login-hero">
        <div className="login-banneraera">

          <img src={banner} alt="" />
          <div className="login-banner-content">

          </div>
        </div>
        <div className="login-form-area">
          <div className="login-box">

            <h3 style={{
              fontSize: "16px",
              marginTop: "20px"
            }}>Login in to Online Banking</h3>
            <br />
            {/* Error Message */}
            {errorMessage && (
              <p
                className="login-error-message"
                style={{
                  color: '#d32f2f',
                  fontSize: '14px',
                  marginTop: '10px',
                  textAlign: 'center',
                  padding: '12px',
                  backgroundColor: '#ffebee',
                  border: '1px solid #ffcdd2',
                  borderRadius: '8px',
                  fontWeight: '500',
                  lineHeight: '1.5',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {errorMessage}
              </p>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin}>
              <div className="login-input-group">
              <label className="login-label">Username</label>

                <input
                  type="text"
                  className="login-input-field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

            

              <div className="login-input-group">
                <label className="login-label">Password</label>
                <input
                  type="password"
                  className="login-input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>


              <br />
              <div style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}>

                <button style={{
                  backgroundColor : "#2c2c2c",
                  opacity: "1",
                  borderRadius: "50px",
                  padding: "10px 20px",
                  width: "50%"
                }} className="login-sign-in-btn" type="submit" disabled={loading}>
                  {loading ? <Loader /> : 'Sign in'}
                </button>

                <a href="#" style={{
                  fontSize: "12px",
                  padding : "5px",
                  width: "25%",
                  color : "#2c2c2c !important"
                }}> Forgot username ?</a>
                  <a href="#" style={{
                  fontSize: "12px",
                  padding : "5px",
                  width: "25%",
                  color : "#2c2c2c !important"
                }}> Forgot password ?</a>
              </div>
            </form>

            {/* Additional Links */}
            <div className="login-links">

              <a href="#" className="login-link">
                New to Online Banking ?
              </a>
              <a href="#" className="login-link login-link-grey">
                Enroll in online banking
              </a>
            </div>
          </div>
        </div>
      </div>
      <br />
      <img src={body} alt="Footer" className="login-body-img" />
    </main>
  );
}

export default Login;