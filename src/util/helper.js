import { FLOORS, LAST_FLOOR_ROOMS, ROOMS_PER_FLOOR } from "../constants";

const generateInitialRooms = () => {
  let rooms = {};
  let availability = [];
  for (let floor = 10; floor > 0; floor--) {
    let numRooms = floor === 10 ? LAST_FLOOR_ROOMS : ROOMS_PER_FLOOR;
    rooms[floor] = Array(numRooms).fill(false); // false means available
    availability.push(numRooms);
  }
  return { rooms, availability };
};

const findOptimalRooms = (rooms, numRooms, availability) => {
  let selectedRooms = [];

  // Checking if booking on same floor is available amd adjacent to each other
  // for (let floor = 10; floor > 0; floor--) {
  //   let availableIndexes = rooms[floor]
  //     .map((occupied, index) => (!occupied ? index : null))
  //     .filter((index) => index !== null);

  //   for (let i = 0; i <= availableIndexes.length - numRooms; i++) {
  //     let isAdjacent = true;
  //     for (let j = 1; j < numRooms; j++) {
  //       if (availableIndexes[i + j] !== availableIndexes[i] + j) {
  //         isAdjacent = false;
  //         break;
  //       }
  //     }
  //     if (isAdjacent) {
  //       return availableIndexes
  //         .slice(i, i + numRooms)
  //         .map((index) => ({ floor, index }));
  //     }
  //   }
  // }

  // Same floor but not adjacent to each other
  for (let floor = 10; floor > 0; floor--) {
    let availableIndexes = rooms[floor]
      .map((occupied, index) => (!occupied ? index : null))
      .filter((index) => index !== null);

    if (availableIndexes.length >= numRooms) {
      return availableIndexes
        .slice(0, numRooms)
        .map((index) => ({ floor, index }));
    }
  }

  // Adjacent rooms across multiple floors
  for (let floor = 10; floor < FLOORS; floor--) {
    if (availability[floor - 1] > 0 && availability[floor] > 0) {
      let floor1Indexes = rooms[floor]
        .map((occupied, index) => (!occupied ? index : null))
        .filter((index) => index !== null);
      let floor2Indexes = rooms[floor + 1]
        .map((occupied, index) => (!occupied ? index : null))
        .filter((index) => index !== null);

      if (floor1Indexes.length && floor2Indexes.length) {
        selectedRooms.push({ floor, index: floor1Indexes[0] });
        selectedRooms.push({ floor: floor + 1, index: floor2Indexes[0] });

        if (selectedRooms.length === numRooms) return selectedRooms;
      }
    }
  }

  // Different floor
  for (let floor = 10; floor > 0; floor--) {
    for (let index = 0; index < rooms[floor].length; index++) {
      if (!rooms[floor][index]) {
        selectedRooms.push({ floor, index });
        if (selectedRooms.length === numRooms) return selectedRooms;
      }
    }
  }

  return selectedRooms;
};

export { generateInitialRooms, findOptimalRooms };
