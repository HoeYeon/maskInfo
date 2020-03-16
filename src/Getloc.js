import React, { useState } from "react";

const GetLoc = () => {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const tmp = () => {
    navigator.geolocation.getCurrentPosition(position => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  };
  tmp();
  console.log(lat, long);
  return [lat, long];
};

export default GetLoc;
