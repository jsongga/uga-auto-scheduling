import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    console.log(user, isAuthenticated, isLoading);
  
    if (isLoading) {
      return <div>Loading ...</div>;
    }
  
    if (!isAuthenticated) {
      return <div>Please log in</div>;
    }
  
    return (
      <div>
        <p>{JSON.stringify(user)}</p>
      </div>
    );
  };

export default Profile;