import { sample } from 'lodash'
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
  return sample(names) + ' - ' + v4().slice(0, 3)
}
