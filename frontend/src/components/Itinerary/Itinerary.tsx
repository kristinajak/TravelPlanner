import React, { useState, useContext, useEffect, useRef } from "react";
import Axios from "axios";
import classes from "./Itinerary.module.css";
import AuthContext from "../../store/auth-context";
import ItineraryReadOnly from "./ItineraryReadOnly";
import ItineraryContainer from "./ItineraryContainer";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

declare let google: any;

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

const DEFAULT_MAP_CENTER = { lat: 54.8985207, lng: 23.9035965 };

const Itinerary: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [map, setMap] = useState<any>(null);
  const context = useContext(AuthContext);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const addressInputHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target instanceof HTMLInputElement) {
      setInputValue(event.target.value);
    }
  };

  const initializeMap = (center: { lat: number; lng: number }) => {
    const newMap = new google.maps.Map(mapContainerRef.current as HTMLElement, {
      center,
      zoom: 14,
    });

    setMap(newMap);

    new google.maps.Marker({ position: center, map: newMap });
  };

  useEffect(() => {
    initializeMap(DEFAULT_MAP_CENTER);
  }, []);

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

      map.setCenter(coordinates);
      map.setZoom(14);
      new google.maps.Marker({ position: coordinates, map });
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
      <div id="map" className={classes.map} ref={mapContainerRef}></div>
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
