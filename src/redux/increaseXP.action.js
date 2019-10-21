export function addPlayerXP(experience) {
  return {
    type: 'ADD_XP',
    experience,
  };
}
