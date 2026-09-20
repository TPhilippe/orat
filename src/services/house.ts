import { collections as mockCollections, house as mockHouse } from '../data/house';
import type { Collection, House } from '../types';

export async function getHouse(): Promise<House> {
	return mockHouse;
}

export async function getCollections(): Promise<Collection[]> {
	return mockCollections;
}
