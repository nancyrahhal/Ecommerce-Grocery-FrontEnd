import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import LoginPic from "../assets/LoginPic.png";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuthContext } from "../hooks/useAuthContext";

const Login = () => {
  const { dispatch } = useAuthContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="login-page">
      <img src={LoginPic} alt="image" width={500}></img>
      <form className="login" onSubmit={handleSubmit}>
        <h3>Log in </h3>
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
        <button disabled={isLoading}>Log in</button>
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
                console.log("Login Failed");
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

export default Login;
