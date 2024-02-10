require("dotenv").config();

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const fetchWalkingDistance = async (origin, destination) => {
	const response = await fetch(
		`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&mode=walking&key=${API_KEY}`
	);
	const data = await response.json();
	return data;
};

fetchWalkingDistance("Vancouver, BC", "Seattle, WA").then((data) =>
	console.log(data)
);

module.exports = fetchWalkingDistance;
