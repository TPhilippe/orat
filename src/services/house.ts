import { collections as mockCollections, house as mockHouse } from '../data/house';
import type { Collection, House } from '../types';
import { apiGet, isApiEnabled } from './client';

export async function getHouse(): Promise<House> {
	if (isApiEnabled()) {
		return apiGet<House>('/house/');
	}

	return mockHouse;
}

export async function getCollections(): Promise<Collection[]> {
	if (isApiEnabled()) {
		return apiGet<Collection[]>('/collections/');
	}

	return mockCollections;
}
