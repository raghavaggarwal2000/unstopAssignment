import React, { useEffect, useState } from "react";
import { FLOORS, MAX_BOOKING_ALLOWED } from "./constants";
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

  const IsBookingAllowed = numRooms <= MAX_BOOKING_ALLOWED;

  return (
    <div className="container">
      <h1 className="title">Hotel Room Reservation System</h1>
      <div className="controls">
        <div className="input-container">
          <input
            type="number"
            className="input"
            value={numRooms}
            max={MAX_BOOKING_ALLOWED}
            onChange={(e) => setNumRooms(e.target.value)}
            style={{width: "90%"}}
          />
          {!IsBookingAllowed && <small>Rooms should be less than 6</small>}

        </div>
        <button 
          className={`button book ${!IsBookingAllowed && 'cursor-disabled'}`} 
          disabled={!IsBookingAllowed}
        >
          Book Rooms
        </button>
        <button className="button random" onClick={randomizeOccupancy}>
          Randomize
        </button>
        <button className="button reset" onClick={resetBooking}>
          Reset
        </button>
      </div>
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
