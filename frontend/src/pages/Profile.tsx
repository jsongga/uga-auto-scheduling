import { useAuth0 } from "@auth0/auth0-react";
import { Card, CardContent, Typography, AspectRatio, Box, Button } from '@mui/joy';
import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <>
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", flexDirection: "column"}}>
      <Card variant="soft" sx={{ width: 320, marginBottom: 2}}>
        <CardContent>
        <Typography level="title-lg">{user.name}</Typography>
        <Typography level="body-sm">{user.email}</Typography>
        <AspectRatio minHeight={"120px"} maxHeight={"200px"}>
          <img src={user?.picture} alt="L" />
        </AspectRatio>
        </CardContent>
      </Card>
      <Button sx={{width: 320}} onClick={() => navigate("/")}>Go Back</Button>
    </Box>

    </>
  );
};

export default Profile;