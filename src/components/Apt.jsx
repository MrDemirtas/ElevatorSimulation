import "../assets/Apt.css";

import { apt, elevator } from "../data";
import { createContext, useContext, useState } from "react";

import Elevator from "./Elevator";
import cinAliSvg from "../assets/cinali.svg";

export const CurrentStatus = createContext(null);
export default function Apt() {
  const [humans, setHumans] = useState([
    {
      id: crypto.randomUUID(),
      name: "Cin Ali",
      selectedFloor: Math.floor(Math.random() * (apt.floorCount + 1)) || 1,
      currentFloor: 0,
    },
    {
      id: crypto.randomUUID(),
      name: "Cin Furkan",
      selectedFloor: Math.floor(Math.random() * (apt.floorCount + 1)) || 1,
      currentFloor: 0,
    },
    {
      id: crypto.randomUUID(),
      name: "Cin Ece",
      selectedFloor: Math.floor(Math.random() * (apt.floorCount + 1)) || 1,
      currentFloor: 0,
    },
    {
      id: crypto.randomUUID(),
      name: "Cin Ece",
      selectedFloor: Math.floor(Math.random() * (apt.floorCount + 1)) || 1,
      currentFloor: 0,
    },
    {
      id: crypto.randomUUID(),
      name: "Cin Ece",
      selectedFloor: Math.floor(Math.random() * (apt.floorCount + 1)) || 1,
      currentFloor: 0,
    },
  ]);

  const [currentStatus, setCurrentStatus] = useState("waiting");

  const [elevatorState, setElevatorState] = useState({
    goingToFloor: 0,
    oldFloor: 0,
    direction: "up",
    location: "0",
    humans: [],
  });

  const runElevator = (floorCount) => {
    setCurrentStatus("closingDoor");
    setTimeout(() => {
      setElevatorState({
        ...elevatorState,
        goingToFloor: floorCount,
        oldFloor: elevatorState.goingToFloor,
        direction: floorCount > elevatorState.floor ? "up" : "down",
        location: `${floorCount * 30}vh`,
      });
      setCurrentStatus("moving");
      setTimeout(() => {
        setCurrentStatus("openingDoor");
        setTimeout(() => {
          setCurrentStatus("waiting");
        }, 1000);
      }, Math.abs(floorCount - elevatorState.goingToFloor) * 2500);
    }, 3000);
  };

  const getFloor = () => {
    let floors = [];
    for (let index = 1; index < apt.floorCount + 1; index++) {
      floors.push(<Floor key={index} floorCount={index} runElevator={runElevator} />);
    }
    return floors.reverse();
  };

  return (
    <CurrentStatus.Provider
      value={{ currentStatus, setCurrentStatus, elevatorState, setElevatorState, humans, setHumans }}
    >
      <div className="apt">
        <div className="apt-elevator-column">
          <Elevator />
        </div>
        <div className="apt-floor-column">
          {getFloor()}
          <div className="floor">
            <button onClick={() => runElevator(0)}>Çağır</button>
            {humans.map((human) => (
              <Human key={human.id} {...human} />
            ))}
          </div>
        </div>
      </div>
    </CurrentStatus.Provider>
  );
}

const Floor = ({ floorCount, runElevator }) => {
  return (
    <div className="floor">
      <button onClick={() => runElevator(floorCount)}>Çağır</button>
      <span>Kat {floorCount}</span>
    </div>
  );
};

const Human = ({ id, name, selectedFloor, currentFloor }) => {
  const { elevatorState, setElevatorState, currentStatus } = useContext(CurrentStatus);

  const handleAddElevator = () => {
    if (elevator.maxHuman === elevatorState.humans.length) {
      alert("Asansörde yer kalmadı");
      return;
    }
    if (elevatorState.goingToFloor !== currentFloor || currentStatus !== "waiting") {
      alert("Asansör bu katta değil");
      return;
    }
    setElevatorState({
      ...elevatorState,
      humans: [...elevatorState.humans, { id, name, selectedFloor, currentFloor }],
    });
  };

  return (
    <>
      {!elevatorState.humans.find((x) => x.id === id) && (
        <div className="human" onClick={handleAddElevator}>
          <span>{name}</span>
          <span>{selectedFloor}</span>
          <img src={cinAliSvg} />
        </div>
      )}
    </>
  );
};
