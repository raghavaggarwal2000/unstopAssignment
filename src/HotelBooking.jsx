import React, { useEffect, useState } from "react";
import { FLOORS } from "./constants";
import { generateInitialRooms } from "./util/helper";



const HotelBooking = () => {
  const [rooms, setRooms] = useState({});
  const [numRooms, setNumRooms] = useState(1);

  useEffect(() => {
    resetBooking();
  }, []);
  

  const randomizeOccupancy = () => {
    let updatedRooms = generateInitialRooms();
    for (let floor in updatedRooms) {
      updatedRooms[floor] = updatedRooms[floor].map(() => Math.random() > 0.7);
    }
    setRooms(updatedRooms);
  };

  const resetBooking = () => {
    setRooms(generateInitialRooms());
  };

  return (
    <div className="container">
      <h1 className="title">Hotel Room Reservation System</h1>
      <div className="controls">
        <input
          type="number"
          className="input"
          value={numRooms}
          onChange={(e) => setNumRooms(e.target.value)}
        />
        <button className="button random" onClick={randomizeOccupancy}>
          Randomize
        </button>
        <button className="button reset" onClick={resetBooking}>
          Reset
        </button>
      </div>
      {/* <div className="travel-time">Total Travel Time: {travelTime} minutes</div> */}
      <div className="grid">
        {Object.entries(rooms)
          .reverse()
          .map(([floor, rooms]) => (
            <div key={floor} className="floor">
              <span className="floor-label">{floor}</span>
              {rooms.map((occupied, index) => (
                <div
                  key={index}
                  className={`room ${occupied ? "occupied" : "available"}`}
                >
                  {floor * 100 + index + 1}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default HotelBooking;
