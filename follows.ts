export const follows = [
  { follow_id: 1, fan_id: 1, chef_id: 2 }, // Chef John follows Chef Emily
  { follow_id: 2, fan_id: 2, chef_id: 1 }, // Chef Emily follows Chef John
  { follow_id: 3, fan_id: 3, chef_id: 4 }, // Chef Michael follows Chef Sophia
  { follow_id: 4, fan_id: 4, chef_id: 3 }, // Chef Sophia follows Chef Michael
  { follow_id: 5, fan_id: 5, chef_id: 1 }, // Chef Antonio follows Chef John
  { follow_id: 6, fan_id: 1, chef_id: 1 }, // Chef John follows himself
  { follow_id: 7, fan_id: 2, chef_id: 2 }, // Chef Emily follows herself
  { follow_id: 8, fan_id: 3, chef_id: 3 }, // Chef Michael follows himself
  { follow_id: 9, fan_id: 4, chef_id: 4 }, // Chef Sophia follows herself
  { follow_id: 10, fan_id: 5, chef_id: 5 }, // Chef Antonio follows himself
];
