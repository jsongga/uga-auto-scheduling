
const domain = "dev-hngcj4gnq03d0dw2.us.auth0.com";
const clientId = "zY5pzNXnlxSpC2YaDByP9pGzClDW5x8A";

import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate, Outlet } from 'react-router-dom';

export default function AllTemplate() {
    const navigate = useNavigate()

  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname);
  }

    return (
        <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: "https://172.20.147.40:5173/scheduler"
    }}
    onRedirectCallback={onRedirectCallback}
    >
        <Outlet />
    </Auth0Provider>)
}