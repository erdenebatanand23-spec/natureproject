import powoPlantsJson from './powoPlants.json';
import { PowoPlant } from '../types/botany';

// All previous hardcoded/manual plant records have been cleared and replaced
// strictly by the structured Plants of the World Online (POWO) dataset.
export const PLANTS_DATA: PowoPlant[] = powoPlantsJson as PowoPlant[];
