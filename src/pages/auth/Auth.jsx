import React, { useState } from "react";
import "./Auth.css";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../img/logo/Beats_main_logo-removebg-preview.png";
import { logIn, signUp } from "../../Action/AuthAction";

function Auth() {
  const [isSignUp, setIsSignUp] = useState(true);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpassword: "",
  });
  const [confirmpass, setconfirmpass] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpassword
        ? dispatch(signUp(data))
        : setconfirmpass(false);
    } else {
      dispatch(logIn(data));
    }
  };
  const resetForm = () => {
    setconfirmpass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpassword: "",
    });
  };
  return (
    <div className="Auth">
      {/* left side */}
      <div className="auth-main-left">
        <div className="auth-left">
          <img src={Logo} alt="" />
          <div className="Logo-name">
            <h1>BeAt Media Ltd</h1>
            <h6>Explore the world by connecting and sharing</h6>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="auth-right">
        <form className="infoform" onSubmit={handleSubmit}>
          <h1>{isSignUp ? "Signup Now" : "Login Now"}</h1>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                name="firstname"
                className="infoInput"
                onChange={handleChange}
                required
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastname"
                className="infoInput"
                onChange={handleChange}
                required
                value={data.lastname}
              />
            </div>
          )}

          <div>
            <input
              type="email"
              placeholder="username"
              name="username"
              className="infoInput"
              onChange={handleChange}
              required
              value={data.username}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="infoInput"
              onChange={handleChange}
              required
              value={data.password}
            />
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmpassword"
                className="infoInput"
                onChange={handleChange}
                required
                value={data.confirmpassword}
              />
            )}
          </div>
          <h6
            style={{
              display: confirmpass ? "none" : "block",
              color: "red",
              fontSize: "13px",
              alignSelf: "flex-end",
              marginBottom: "-20px",
            }}
          >
            * Confirm Password is not same
          </h6>
          <div>
            {isSignUp ? (
              <span
                className="small_text"
                onClick={() => {
                  setIsSignUp((prev) => {
                    return !prev;
                  });
                  resetForm();
                }}
              >
                Already have an Account. <span>Login Here</span>
              </span>
            ) : (
              <span
                className="small_text"
                onClick={() => setIsSignUp((prev) => !prev)}
              >
                Don't have an Account. <span>Signup Here</span>
              </span>
            )}
          </div>
          {isSignUp ? (
            <button
              className="button sign_button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          ) : (
            <button
              className="button sign_button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Log In"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

// function SignUp() {
//   return (
//     <div className="auth-right">
//       <form className="infoform">
//         <h1>Signup Now</h1>
//         <div>
//           <input
//             type="text"
//             placeholder="First Name"
//             name="firstname"
//             className="infoInput"
//           />
//           <input
//             type="text"
//             placeholder="Last Name"
//             name="lastname"
//             className="infoInput"
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="username"
//             name="username"
//             className="infoInput"
//           />
//         </div>
//         <div>
//           <input
//             type="password"
//             placeholder="Password"
//             name="password"
//             className="infoInput"
//           />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             name="confirmpassword"
//             className="infoInput"
//           />
//         </div>
//         <div>
//           <span className="small_text">
//             Already have an Account. <span>Login Here</span>
//           </span>
//         </div>
//         <button className="button sign_button" type="submit">
//           Signup
//         </button>
//       </form>
//     </div>
//   );
// }
// function Login() {
//   return (
//     <div className="auth-right">
//       <form className="infoform">
//         <h1>Login Now</h1>

//         <div>
//           <input
//             type="text"
//             placeholder="username"
//             name="username"
//             className="infoInput"
//           />
//         </div>
//         <div>
//           <input
//             type="password"
//             placeholder="Password"
//             name="password"
//             className="infoInput"
//           />
//         </div>
//         <div>
//           <span className="small_text">
//             Don't have an Account. <span>Signup Here</span>
//           </span>
//         </div>
//         <button className="button sign_button" type="submit">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

export default Auth;
