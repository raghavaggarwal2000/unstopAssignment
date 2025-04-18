import React, { useEffect, useState } from "react";
import { MAX_BOOKING_ALLOWED } from "./constants";
import { findOptimalRooms, generateInitialRooms } from "./util/helper";

const HotelBooking = () => {
  const [rooms, setRooms] = useState({});
  const [numRooms, setNumRooms] = useState(1);
  const [totalAvailability, setTotalAvailability] = useState([]);

    useEffect(() => {
      resetBooking();
    }, []);

    const bookRooms = () => {
    if(numRooms > MAX_BOOKING_ALLOWED){
      alert("A guest can register 5 rooms only.")
    }
    let updatedRooms = { ...rooms };
    let updatedAvailability = [...totalAvailability];
    let selectedRooms = findOptimalRooms(updatedRooms, numRooms, totalAvailability, setTotalAvailability);

    if (selectedRooms.length < numRooms) {
      alert(`Not enough available rooms!`);
      return;
    }

    selectedRooms.forEach(({ floor, index }) => {
      updatedRooms[floor][index] = true;
      updatedAvailability[floor - 1] -= 1;
    });
    setRooms(updatedRooms);
    setTotalAvailability(updatedAvailability);
  };

const randomizeOccupancy = () => {
  const { rooms: updatedRooms } = generateInitialRooms();

  Object.keys(updatedRooms).forEach((floor) => {
    updatedRooms[floor] = updatedRooms[floor].map(() => Math.random() > 0.7);
  });

  const updatedAvailability = Object.keys(updatedRooms).map(
    (floor) => updatedRooms[floor].filter((room) => !room).length
  );

  setRooms(updatedRooms);
  setTotalAvailability(updatedAvailability);
};


  const resetBooking = () => {
    const {rooms, availability} = generateInitialRooms()
    setRooms(rooms);
    setTotalAvailability(availability);
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
            onChange={(e) => setNumRooms(Number(e.target.value))}
            style={{width: "90%"}}
          />
          {!IsBookingAllowed && <small>Rooms should be less than 6</small>}

        </div>
        <button 
          className={`button book ${!IsBookingAllowed && 'cursor-disabled'}`} 
          onClick={bookRooms}
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
