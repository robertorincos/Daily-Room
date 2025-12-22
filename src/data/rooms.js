export const rooms = [
  {
    id: 'entrance-hall',
    name: 'Entrance Hall',
    doors: 3,
    pay: [],
    receives: [],
    color: 'Ground',
    directions: ['N', 'E', 'W']
  },
  {
    id: 'foyer',
    name: 'Foyer',
    doors: 4,
    pay: [],
    receives: [],
    color: 'Ground',
    directions: ['N', 'S', 'E', 'W']
  },
  {
    id: 'grand-staircase',
    name: 'Grand Staircase',
    doors: 1,
    pay: [],
    receives: [],
    color: 'Ground',
    directions: ['N']
  },
  {
    id: 'library',
    name: 'Library',
    doors: 2,
    pay: [],
    receives: ['Knowledge'], // Custom item for now
    color: 'Yellow',
    directions: ['N', 'S']
  },
  {
    id: 'gymnasium',
    name: 'Gymnasium',
    doors: 2,
    pay: [],
    receives: ['Speed'],
    color: 'Yellow',
    directions: ['E', 'W']
  },
  {
    id: 'chapel',
    name: 'Chapel',
    doors: 1,
    pay: [],
    receives: ['Sanity'],
    color: 'White',
    directions: ['N']
  },
  {
    id: 'conservatory',
    name: 'Conservatory',
    doors: 1,
    pay: [],
    receives: [],
    color: 'Green',
    directions: ['N']
  },
  {
    id: 'vault',
    name: 'Vault',
    doors: 1,
    pay: ['Knowledge'], // Need knowledge to open? Or pay to enter?
    receives: ['Item', 'Gold'],
    color: 'Red',
    directions: ['N']
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    doors: 2,
    pay: [],
    receives: ['Item'], // Food is an item
    color: 'Yellow',
    directions: ['N', 'E']
  },
  {
    id: 'dining-room',
    name: 'Dining Room',
    doors: 2,
    pay: [],
    receives: ['Item'],
    color: 'Yellow',
    directions: ['S', 'W']
  },
  {
    id: 'coal-chute',
    name: 'Coal Chute',
    doors: 1,
    pay: [],
    receives: [],
    color: 'Black',
    directions: ['S']
  }
];
