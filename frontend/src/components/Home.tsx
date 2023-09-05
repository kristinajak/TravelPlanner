import { Link } from "react-router-dom";

import monkeyImg from "../assets/monkeys.jpg";
import itemsImg from "../assets/items.jpg";
import financeImg from "../assets/finance.jpg";
import classes from "./Home.module.css";

function HomePageGuest() {
  return (
    <>
      <div className={classes.text}>
        <h1>Welcome to PlanToGo!</h1>
        <p>What do you need to have your trip as relaxed as possible?</p>
        <p>We believe it is all about planning!</p>
      </div>
      <div className={classes.container}>
        <div className={classes["image-container"]}>
          <Link to="checklist">
            <img
              className={classes.description}
              src={monkeyImg}
              alt="Monkeys"
            />
            <div className={classes["description-container"]}>
              <h2 className={classes.mobileText}>Checklist</h2>
              <div className={classes["description-info"]}>
                <h2>Checklist</h2>
                <p>
                  No more headache and pounding heart about something you forgot
                  to take!
                </p>
                <p>
                  Here you will find an interactive checklist of items to be
                  taken to your trip.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className={classes["image-container"]}>
          <Link to="itinerary">
            <img className={classes.description} src={itemsImg} alt="Items" />
            <div className={classes["description-container"]}>
              <h2 className={classes.mobileText}>Itinerary</h2>
              <div className={classes["description-info"]}>
                <h2>Itinerary</h2>
                <p>
                  What cities and places are you planning to visit? What are the
                  prices, working hours and other valuable information?
                </p>
                <p>Click me to have everything in one place.</p>
              </div>
            </div>
          </Link>
        </div>
        <div className={classes["image-container"]}>
          <Link to="budget">
            <img
              className={classes.description}
              src={financeImg}
              alt="Finance"
            />
            <div className={classes["description-container"]}>
              <h2 className={classes.mobileText}>Travel Budget</h2>
              <div className={classes["description-info"]}>
                <h2>Travel budget</h2>
                <p>Are you keen to get some numbers? </p>
                <p>
                  Here you will find all the information about your travel
                  budget.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default HomePageGuest;
