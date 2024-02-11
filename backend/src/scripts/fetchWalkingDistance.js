require("dotenv").config();

const API_KEY = "AIzaSyBQ9ssgMpjmjaCchzHKdL3BrSk36nHN6C8";

const fetchWalkingDistance = async (origin, destination) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&mode=walking&key=${API_KEY}`,
  );
  const data = await response.json();
  return data;
};

module.exports = fetchWalkingDistance;
