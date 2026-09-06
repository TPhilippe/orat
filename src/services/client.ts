const API_BASE = import.meta.env.PUBLIC_API_URL as string | undefined;

export function isApiEnabled(): boolean {
	return Boolean(API_BASE);
}

export async function apiGet<T>(path: string): Promise<T> {
	if (!API_BASE) {
		throw new Error('PUBLIC_API_URL n’est pas défini.');
	}

	const url = `${API_BASE.replace(/\/$/, '')}${path}`;
	const response = await fetch(url, {
		headers: { Accept: 'application/json' },
	});

	if (!response.ok) {
		throw new Error(`API ${response.status} — ${path}`);
	}

	return response.json() as Promise<T>;
}
