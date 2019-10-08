export const TECH_LEVELS = [
  "Pre-agricultural",
  "Agricultural",
  "Medieval",
  "Renaissance",
  "Early Industrial",
  "Industrial",
  "Post-Industrial",
  "Hi-Tech"
];

export const POLITICAL_SYSTEMS = {
  anarchy: "Anarchy",
  capitalistState: "Capitalist State",
  communistState: "Communist State",
  confederacy: "Confederacy",
  corporateState: "Corporate State",
  cyberneticState: "Cybenetic State",
  democracy: "Democracy",
  dictatorship: "Dictatorship",
  fascistState: "Fascist State",
  feudalState: "Feudal State",
  militaryState: "Military State",
  monarchy: "Monarchy",
  pacifistState: "Pacifist State",
  socialistState: "Socialist State",
  stateOfSatori: "State of Satori",
  technocracy: "Technocracy",
  theocracy: "Theocracy"
};

export function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

export const RESOURCE_DEFINITIONS = {
  water: {
    min: 10,
    max: 20,
    politicalSystem: {
      communism: 1,
      monarchy: 3
    },
    techLevel: 1
  },
  furs: {
    min: 10,
    max: 20,
    politicalSystem: {
      communism: 1,
      monarchy: 3
    },
    techLevel: 1
  },
  food: {
    min: 10,
    max: 20,
    politicalSystem: {
      communism: 1,
      monarchy: 3
    },
    techLevel: 1
  },
  ore: {
    min: 10,
    max: 20,
    politicalSystem: {
      communism: 1,
      monarchy: 3
    },
    techLevel: 1
  },
  games: {
    min: 10,
    max: 20,
    politicalSystem: {
      communism: 1,
      monarchy: 3
    },
    techLevel: 1
  },
  firearms: {
    min: 10,
    max: 20,
    politicalSystem: {
      communism: 1,
      monarchy: 3
    },
    techLevel: 1
  },
  machines: {
    min: 10,
    max: 20,
    politicalSystem: {
      communism: 1,
      monarchy: 3
    },
    techLevel: 1
  },
  narcotics: {
    min: 1,
    max: 5,
    politicalSystem: {
      communism: 1,
      monarchy: 0.5
    },
    techLevel: 8
  },
  robots: {
    min: 1,
    max: 5,
    politicalSystem: {
      communism: 1,
      monarchy: 0.5
    },
    techLevel: 8
  }
};
