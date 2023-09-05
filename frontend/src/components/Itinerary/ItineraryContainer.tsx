import { useState, useEffect } from "react";
import Axios from "axios";
import classes from "./ItineraryContainer.module.css";
interface ItineraryItem {
  id: number;
  date: string;
  city: string;
  comments: string;
}

const ItineraryContainer = () => {
  const [date, setDate] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [itineraryData, setItineraryData] = useState<ItineraryItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchItineraryData = async () => {
    try {
      const response = await Axios.get("/itinerary", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setItineraryData(response.data);
      }
    } catch (error) {
      console.error("Error fetching itinerary data:", error);
    }
  };

  useEffect(() => {
    fetchItineraryData(); // Fetch initial data when component mounts
  }, []);

  const addItineraryHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!date || !city || !comments) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

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
        fetchItineraryData();
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  return (
    <div>
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
            {itineraryData.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.city}</td>
                <td>{item.comments}</td>
              </tr>
            ))}
            <tr>
              <td>
                <input
                  type="date"
                  name="newDate"
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
      {errorMessage && <p className={classes.error}>{errorMessage}</p>}
    </div>
  );
};

export default ItineraryContainer;
