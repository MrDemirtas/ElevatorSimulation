import "../assets/Elevator.css";

import { useContext, useEffect, useState } from "react";

import { CurrentStatus } from "./Apt";
import cinAliSvg from "../assets/cinali.svg";

export default function Elevator() {
  const { elevatorState, setElevatorState, currentStatus, setCurrentStatus } = useContext(CurrentStatus);

  const [openDoor, setOpenDoor] = useState({ width: "0%" });

  const elevatorTransition = {
    transition: `all ${2 * Math.abs(elevatorState.goingToFloor - elevatorState.oldFloor)}s`,
    bottom: elevatorState.location,
  };

  useEffect(() => {
    switch (currentStatus) {
      case "openingDoor":
        setOpenDoor({ width: "0%" });
        break;
      case "closingDoor":
        setOpenDoor({ width: "50%" });
        break;
      default:
        break;
    }
  }, [currentStatus]);

  return (
    <div className="elevator" style={elevatorTransition}>
      <div className="left-door" style={openDoor}></div>
      <div className="in-elevator">
        {elevatorState.humans.map((human) => {
          return <Human key={human.id} {...human} elevatorState={elevatorState} setElevatorState={setElevatorState} />;
        })}
      </div>
      <div className="right-door" style={openDoor}></div>
    </div>
  );
}

const Human = ({ id, name, selectedFloor, currentFloor, elevatorState, setElevatorState }) => {
  const handleRemoveElevator = () => {
    setElevatorState({
      ...elevatorState,
      humans: elevatorState.humans.filter((human) => human.id !== id),
    });
  };

  return (
    <>
      {!elevatorState.humans.includes(id) && (
        <div className="human" onClick={handleRemoveElevator}>
          <span>{name}</span>
          <span>{selectedFloor}</span>
          <img src={cinAliSvg} />
        </div>
      )}
    </>
  );
};
