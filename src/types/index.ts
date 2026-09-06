export type Currency = 'CHF' | 'EUR';

export type BookStatus = 'published' | 'forthcoming';

export type Author = {
	id: string;
	slug: string;
	name: string;
	bio?: string;
	website?: string;
};

export type Collection = {
	id: string;
	slug: string;
	name: string;
	description: string;
};

export type Book = {
	id: string;
	slug: string;
	title: string;
	subtitle?: string;
	authors: Author[];
	collection: Collection;
	year: number;
	release?: string;
	pages?: number;
	isbn?: string;
	price?: number;
	currency: Currency;
	synopsis: string;
	previousEdition?: string;
	status: BookStatus;
	featured?: boolean;
	cover: {
		background: string;
		foreground: string;
	};
};

export type Founder = {
	slug: string;
	name: string;
	origin: string;
	bio: string;
	highlights: string[];
	portrait?: string;
	website?: string;
};

export type Strength = {
	title: string;
	body: string[];
};

export type House = {
	name: string;
	legalName: string;
	shortName: string;
	tagline: string;
	founded: number;
	city: string;
	country: string;
	address: string[];
	email: string;
	website: string;
	phone?: string;
	presentationPdf: string;
	statement: string[];
	history: string[];
	strengths: Strength[];
	founders: Founder[];
};
