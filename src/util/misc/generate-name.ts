import { v4 } from 'uuid'

const names = [
  'Ariel',
  'Spencer',
  'Tarlok',
  'Olorin',
  'Anakin',
  'Snooki',
  'Ocean',
  'Brienne',
  'Darth Maul',
  'Maduforo',
  'Frank',
  'Rick',
  'Gandalf',
  'Fry',
  'Leela',
  'Jon Snow',
  'The Night King',
  'Big Yikesss!',
  'Frenchy',
  'Nathan Drake',
  'Finn',
  'KVN',
  'Sterling Archer',
  'Pogo',
]

export const getRandomName = (): string => {
  const index = Math.floor(Math.random() * names.length)
  return names[index] + ' - ' + v4().slice(0, 3)
}
