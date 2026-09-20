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
	/** Identifiant ProductVariant de l’API Cave, une fois le livre au catalogue public. */
	productId?: number;
	/** Signal booléen issu de Cave (`in_stock`). Jamais la quantité exacte. */
	inStock?: boolean;
	cover: {
		background: string;
		foreground: string;
		front?: string;
		back?: string;
	};
};

export type CatalogProduct = {
	id: number;
	name: string;
	description: string;
	price: number | null;
	in_stock: boolean;
	image_url: string | null;
	categories: string[];
	attributes: { attribute: string; value: string }[];
};

export type OrderConfirmation = {
	id: number;
	status: string;
	date: string;
};

export type BankTransfer = {
	holder: string;
	iban?: string;
	bic?: string;
	bankName?: string;
	currency: Currency;
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
	bank: BankTransfer;
	presentationPdf: string;
	statement: string[];
	history: string[];
	strengths: Strength[];
	founders: Founder[];
};
