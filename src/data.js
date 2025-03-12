export const apt = {
  floorCount: 6,
};

export const elevator = {
  maxHuman: 4,
};

// * Gideceği katı belirleyen fonksiyon, bulunduğu kattan farklı bir kat seçmesi için
const getRandomFloor = (floor) => {
  let randomFloor = Math.floor(Math.random() * (apt.floorCount + 1));
  if (randomFloor === floor) {
    return getRandomFloor(floor);
  }
  return randomFloor;
};

export const defaultHumans = [
  {
    id: crypto.randomUUID(),
    name: "Cin Ali",
    selectedFloor: getRandomFloor(0),
    currentFloor: 0,
  },
  {
    id: crypto.randomUUID(),
    name: "Cin Furkan",
    selectedFloor: getRandomFloor(5),
    currentFloor: 5,
  },
  {
    id: crypto.randomUUID(),
    name: "Cin Ece",
    selectedFloor: getRandomFloor(3),
    currentFloor: 3,
  },
  {
    id: crypto.randomUUID(),
    name: "Cin Gaye",
    selectedFloor: getRandomFloor(4),
    currentFloor: 4,
  },
  {
    id: crypto.randomUUID(),
    name: "Cin Ömer",
    selectedFloor: getRandomFloor(5),
    currentFloor: 5,
  },
  {
    id: crypto.randomUUID(),
    name: "Cin Atakan",
    selectedFloor: getRandomFloor(2),
    currentFloor: 2,
  },
  {
    id: crypto.randomUUID(),
    name: "Cin Nihat",
    selectedFloor: getRandomFloor(6),
    currentFloor: 6,
  },
  {
    id: crypto.randomUUID(),
    name: "Cin Orhan",
    selectedFloor: getRandomFloor(6),
    currentFloor: 6,
  },
  {
    id: crypto.randomUUID(),
    name: "Cin Buse",
    selectedFloor: getRandomFloor(5),
    currentFloor: 5,
  },
  {
    id: crypto.randomUUID(),
    name: "Cin Berna",
    selectedFloor: getRandomFloor(4),
    currentFloor: 4,
  },
  {
    id: crypto.randomUUID(),
    name: "Cin Gökdeniz",
    selectedFloor: getRandomFloor(3),
    currentFloor: 3,
  },
  {
    id: crypto.randomUUID(),
    name: "Cin Merve",
    selectedFloor: getRandomFloor(2),
    currentFloor: 2,
  },
  {
    id: crypto.randomUUID(),
    name: "Cin Akif",
    selectedFloor: getRandomFloor(1),
    currentFloor: 1,
  },
];
