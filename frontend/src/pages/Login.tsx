import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function Login() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const navigate = useNavigate();
  

  useEffect(() => {
  if (isAuthenticated) {
    navigate("/scheduler");
  }}, [isAuthenticated]);

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
}

