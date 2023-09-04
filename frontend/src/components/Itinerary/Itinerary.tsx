import React, { useState, useContext } from "react";
import Axios from "axios";
import classes from "./Itinerary.module.css";
import AuthContext from "../../store/auth-context";
import ItineraryReadOnly from "./ItineraryReadOnly";
import ItineraryContainer from "./ItineraryContainer";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

declare var google: any;

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

const Itinerary: React.FC = () => {
  const [inputValue, setInputValue] = useState(""); // State to store the user's entered address
  const context = useContext(AuthContext);

  const addressInputHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target instanceof HTMLInputElement) {
      setInputValue(event.target.value);
    }
  };

  // Function to handle the form submission
  const searchAddressHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    try {
      const response = await Axios.get<GoogleGeocodingResponse>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
          inputValue
        )}&key=${apiKey}`
      );

      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }

      const coordinates = response.data.results[0].geometry.location;
      console.log(coordinates);
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: coordinates,
          zoom: 14,
        }
      );
      new google.maps.Marker({ position: coordinates, map: map });
    } catch (error: any) {
      console.error("Error loading a map", error);
    }
  };

  return (
    <div className={classes.itinerary}>
      <h1>Itinerary</h1>
      <p>
        Create a detailed itinerary with dates and cities, including important
        information about local customs, popular attractions, and local cuisine
        to make the most of your trip.
      </p>
      {!context.isLoggedIn && <ItineraryReadOnly />}
      {context.isLoggedIn && <ItineraryContainer />}
      <div id="map" className={classes.map}>
        Please enter an address
      </div>
      <form className={classes.form} onSubmit={searchAddressHandler}>
        <input
          type="text"
          id="address"
          className={classes.input}
          placeholder="Enter an address"
          value={inputValue}
          onChange={addressInputHandler}
        />
        <button type="submit" className={classes.button}>
          Search address
        </button>
      </form>
    </div>
  );
};

export default Itinerary;
