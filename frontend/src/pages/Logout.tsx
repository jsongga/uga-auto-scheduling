
import { useAuth0 } from "@auth0/auth0-react";

export default function Logout() {
    const { logout } = useAuth0();

    return (
      <button onClick={() => logout({ logoutParams: { returnTo: "https://172.20.147.40:5173" } })}>
        Log Out
      </button>
    );
}

