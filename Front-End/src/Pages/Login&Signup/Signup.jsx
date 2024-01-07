import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import './Forms.css'
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import SignupPic from "../../assets/SignupPic.png"
import { useAuthContext } from "../../hooks/useAuthContext";

const Signup = () => {
  const { dispatch } = useAuthContext();


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");



  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username,phoneNumber, password,longitude,latitude);
  };

  return (
    <div className="signup-page">
    <img src={SignupPic} alt="image" width={500}></img>
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign up</h3>

      <label>Username:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <label>Phone:</label>
      <input
      type="tel"
      onChange={(e)=>setPhoneNumber(e.target.value)}
      value={phoneNumber}/>

      <label>Longitude:</label>
      <input
      type="number"
      onChange={(e)=>setLongitude(e.target.value)}
      value={longitude}/>

<label>Latitude:</label>
      <input
      type="number"
      onChange={(e)=>setLatitude(e.target.value)}
      value={latitude}/>

      <button disabled={isLoading}>Sign up</button>
      <div className="googleReactAuth">
      <GoogleOAuthProvider clientId="844847736833-jvqvriahg5c3ofvcmk4edr0k13imj7j3.apps.googleusercontent.com">
            <GoogleLogin
              size="medium"
              width={"203px"}
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                const decoded = jwtDecode(credentialResponse.credential);
                console.log("Decoded", decoded);
                const AuthUser = {
                  accessToken: credentialResponse.credential,
                  role: "user",
                  success: true,
                  username: decoded.given_name + " " + decoded.family_name,
                  googleCredentials: decoded,
                };
                localStorage.setItem("user", JSON.stringify(AuthUser));
                dispatch({ type: "LOGIN", payload: AuthUser });
              }}
              onError={() => {
                console.log("Signup Failed");
              }}
              useOneTap
            />
          </GoogleOAuthProvider>
          </div>


      {error && <div className="error">{error}</div>}
    </form>
    </div>
  );
};

export default Signup;