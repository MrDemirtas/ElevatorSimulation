import "../assets/Apt.css";

import { apt, defaultHumans, elevator } from "../data";
import { createContext, useContext, useEffect, useState } from "react";

import Elevator from "./Elevator";
import cinAliSvg from "../assets/cinali.svg";

export const CurrentStatus = createContext(null);
export default function Apt() {
  const [humans, setHumans] = useState(defaultHumans);
  const [currentStatus, setCurrentStatus] = useState("waiting");

  const [elevatorState, setElevatorState] = useState({
    goingToFloor: 0,
    oldFloor: 0,
    direction: "up",
    location: "0",
    humans: [],
  });

  const [aptFloorCount, setAptFloorCount] = useState(apt.floorCount);

  useEffect(() => {
    switch (currentStatus) {
      case "moving":
        goToNextStation();
        break;
      case "waiting":
        runElevator();
        break;
      case "closingDoor":
        elevatorState.humans.map((human) => {
          if (human.selectedFloor === elevatorState.goingToFloor) {
            setHumans(humans.filter((x) => x.id !== human.id));
          }
        });
        setElevatorState({
          ...elevatorState,
          humans: elevatorState.humans.filter((human) => human.selectedFloor !== elevatorState.goingToFloor),
        });
        setTimeout(() => {
          setCurrentStatus("moving");
        }, 2500);
        break;
      default:
        break;
    }
  }, [currentStatus]);

  function findClosest(target, numbers) {
    return numbers.reduce((closest, num) => (Math.abs(num - target) < Math.abs(closest - target) ? num : closest));
  }

  const goToNextStation = () => {
    if (humans.length === 0 && elevatorState.humans.length === 0) return;

    let aptFloors = [];
    for (let index = 1; index < aptFloorCount + 1; index++) {
      aptFloors.push(index);
    }
    const selectedFloorsInElevator = elevatorState.humans.map((human) => human.selectedFloor);
    const selectedFloorsOutElevator = humans
      .filter((human) => elevatorState.humans.find((x) => x.id !== human.id))
      .map((human) => human.currentFloor);

    const elevatorStations = Array.from(new Set([...selectedFloorsInElevator, ...selectedFloorsOutElevator])).filter(
      (x) => x !== elevatorState.goingToFloor
    );

    const nextStation = findClosest(elevatorState.goingToFloor, elevatorStations);
    setElevatorState({
      ...elevatorState,
      goingToFloor: nextStation,
      oldFloor: elevatorState.goingToFloor,
      direction: nextStation > elevatorState.goingToFloor ? "up" : "down",
      location: `${nextStation * 30}vh`,
    });
    setTimeout(() => {
      setCurrentStatus("openingDoor");
      setTimeout(() => {
        setCurrentStatus("waiting");
      }, 1000);
    }, Math.abs(nextStation - elevatorState.goingToFloor) * 2500);
  };

  const runElevator = () => {
    const filteredHumans = humans.filter((human) => human.currentFloor === elevatorState.goingToFloor);
    setHumans(humans.filter((human) => human.currentFloor !== elevatorState.goingToFloor));
    setElevatorState({
      ...elevatorState,
      humans: [...elevatorState.humans, ...filteredHumans],
    });

    setTimeout(() => {
      setCurrentStatus("closingDoor");
      setTimeout(() => {
        setCurrentStatus("moving");
      }, 3000);
    }, 2500);

    // setTimeout(() => {
    //   setElevatorState({
    //     ...elevatorState,
    //     goingToFloor: floorCount,
    //     oldFloor: elevatorState.goingToFloor,
    //     direction: floorCount > elevatorState.goingToFloor ? "up" : "down",
    //     location: `${floorCount * 30}vh`,
    //   });
    //   setCurrentStatus("moving");
    //   setTimeout(() => {
    //     setCurrentStatus("openingDoor");
    //     setTimeout(() => {
    //       setCurrentStatus("waiting");
    //     }, 1000);
    //   }, Math.abs(floorCount - elevatorState.goingToFloor) * 2500);
    // }, 3000);
  };

  const getFloor = () => {
    let floors = [];
    for (let index = 1; index < aptFloorCount + 1; index++) {
      floors.push(<Floor key={index} floorCount={index} />);
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
            {humans
              .filter((human) => human.currentFloor === 0)
              .map((human) => (
                <Human key={human.id} {...human} />
              ))}
          </div>
        </div>
      </div>
    </CurrentStatus.Provider>
  );
}

const Floor = ({ floorCount }) => {
  const { humans } = useContext(CurrentStatus);
  return (
    <div className="floor">
      {humans
        .filter((human) => human.currentFloor === floorCount)
        .map((human) => (
          <Human key={human.id} {...human} />
        ))}
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
