import { useState } from "react";
import Axios from "axios";
import classes from "./ItineraryContainer.module.css";

const ItineraryContainer = () => {
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [comments, setComments] = useState("");

  const addItineraryHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const response = await Axios.post(
        "/itinerary",
        { date, city, comments },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setDate("");
        setCity("");
        setComments("");
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  return (
    <form onSubmit={addItineraryHandler}>
      <table className={classes["itinerary-table"]}>
        <thead>
          <tr>
            <th>Date</th>
            <th>City</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                name="newDate"
                placeholder="Add date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                name="newCity"
                placeholder="Add City"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                name="newComments"
                placeholder="Add comment"
                value={comments}
                onChange={(event) => setComments(event.target.value)}
              />
            </td>
            <td>
              <button type="submit">Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default ItineraryContainer;
