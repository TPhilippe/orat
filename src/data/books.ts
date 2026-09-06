import type { Author, Book } from '../types';
import { collections } from './house';

const recits = collections[0];
const essais = collections[1];

export const authors: Author[] = [
	{
		id: 'dorian-amar',
		slug: 'dorian-amar',
		name: 'Dorian Amar',
		bio: 'Originaire de Lausanne. Penseur contemporain en quête d’un lien sacré entre le corps et l’esprit. Son écriture est hybride, organique et habitée — à la croisée de l’essai, du récit poétique et du fantastique intérieur.',
	},
	{
		id: 'anthony-tombez',
		slug: 'anthony-tombez',
		name: 'Anthony Tombez',
		bio: 'Thérapeute, artiste et auteur établi en Suisse. Il partage, à travers ses soins, son art et son écriture, une même aspiration : la reconnexion à soi et à la lumière intérieure.',
		website: 'https://www.anthonytombez.ch',
	},
];

const bySlug = Object.fromEntries(authors.map((author) => [author.slug, author]));

export const books: Book[] = [
	{
		id: '1',
		slug: 'les-portes-de-l-amour',
		title: 'Les Portes de l’Amour',
		subtitle: 'Récit initiatique et témoignage spirituel',
		authors: [bySlug['anthony-tombez']],
		collection: recits,
		year: 2026,
		release: 'Janvier–mars 2027',
		pages: 250,
		price: 29,
		currency: 'CHF',
		status: 'forthcoming',
		featured: true,
		cover: { background: '#7c322c', foreground: '#f3eee4' },
		synopsis:
			'Que se passe-t-il lorsque la vie nous confronte à des expériences qui dépassent toute explication rationnelle ? Lorsque l’invisible s’invite dans le quotidien et bouleverse à jamais notre regard sur le monde ? Dans ce récit à la croisée de l’autobiographie intime et du voyage initiatique, Anthony Tombez partage l’histoire d’une transformation profonde. Entre enracinement et élévation, le livre invite chaque lecteur à se reconnecter à sa propre essence, à écouter son souffle, à honorer son corps et à s’ouvrir aux mystères de la vie.',
	},
	{
		id: '2',
		slug: 'schizophrenia',
		title: 'Schizophrenia',
		subtitle: 'Affinité élective et toxicité',
		authors: [bySlug['dorian-amar']],
		collection: recits,
		year: 2026,
		release: 'Janvier–mars 2027',
		pages: 128,
		currency: 'CHF',
		status: 'forthcoming',
		featured: true,
		cover: { background: '#2c241c', foreground: '#eadfcf' },
		synopsis:
			'Lettre oubliée d’un carnet fantastique. Dorian Amar plonge dans le jeu bouleversant d’une perverse narcissique. Dans un récit tour à tour sombre et lumineux, l’auteur s’interroge, au fil de sa chute, sur les raisons qui l’ont poussé à poursuivre cette relation et qui l’ont entraîné dans ce terrible jeu de séduction. Une prose dense, instinctive et charnelle, où la réflexion philosophique passe par la chair, l’esprit et la nature.',
	},
	{
		id: '3',
		slug: 'de-l-amour',
		title: 'De l’Amour',
		subtitle: 'Sur la colère et la violence, les fantasmes et les pulsions',
		authors: [bySlug['dorian-amar']],
		collection: essais,
		year: 2026,
		release: 'Janvier–mars 2027',
		pages: 200,
		currency: 'CHF',
		status: 'forthcoming',
		previousEdition: '1re éd. Samsa, 2024',
		cover: { background: '#4d4450', foreground: '#f3eee4' },
		synopsis:
			'Un essai sur la colère, la violence, les fantasmes et les pulsions. Dorian Amar poursuit ici une pensée incarnée, à la croisée de l’intime et du philosophique.',
	},
	{
		id: '4',
		slug: 'a-la-recherche-de-la-lumiere-par-la-bete-decomposee',
		title: 'À la recherche de la Lumière par la Bête décomposée',
		authors: [bySlug['dorian-amar']],
		collection: recits,
		year: 2026,
		release: 'Janvier–mars 2027',
		pages: 186,
		currency: 'CHF',
		status: 'forthcoming',
		previousEdition: '1re éd. Samsa, 2023',
		cover: { background: '#1f2a24', foreground: '#eadfcf' },
		synopsis:
			'Un récit de quête, entre ombre et lumière, où la bête intérieure devient le chemin d’une connaissance plus vaste de soi.',
	},
	{
		id: '5',
		slug: 'sur-la-bete-humaine',
		title: 'Sur la bête humaine',
		subtitle: 'L’intégrale — quatre titres',
		authors: [bySlug['dorian-amar']],
		collection: recits,
		year: 2026,
		release: 'Janvier–mars 2027',
		currency: 'CHF',
		status: 'forthcoming',
		cover: { background: '#3d4a52', foreground: '#e8e4dc' },
		synopsis:
			'L’intégrale Sur la bête humaine réunit quatre titres de Dorian Amar, dans une édition Orat.',
	},
	{
		id: '6',
		slug: 'la-cite-des-oenologues',
		title: 'La cité des œnologues',
		subtitle: 'Discours sur la vigne, le vin et l’unique verre',
		authors: [bySlug['dorian-amar']],
		collection: essais,
		year: 2026,
		release: 'Janvier–mars 2027',
		pages: 138,
		currency: 'CHF',
		status: 'forthcoming',
		previousEdition: '1re éd. Samsa, 2021',
		cover: { background: '#5c2222', foreground: '#f6f0e6' },
		synopsis:
			'Un discours sur la vigne, le vin et l’unique verre. La pensée du terroir, portée par un ingénieur œnologue et écrivain.',
	},
	{
		id: '7',
		slug: 'les-arbres-de-patmos',
		title: 'Les arbres de Patmos',
		subtitle: 'Plaidoyer pour une gestion de l’espace en agroforesterie',
		authors: [bySlug['dorian-amar']],
		collection: essais,
		year: 2026,
		release: 'Janvier–mars 2027',
		pages: 82,
		currency: 'CHF',
		status: 'forthcoming',
		previousEdition: '1re éd. Samsa, 2020',
		cover: { background: '#4a5c3a', foreground: '#f0eadc' },
		synopsis:
			'Un plaidoyer pour une gestion de l’espace en agroforesterie. La nature, ici, n’est pas décorative : elle est symbolique, spirituelle et métaphysique.',
	},
	{
		id: '8',
		slug: 'sortie-astrale',
		title: 'Sortie astrale',
		authors: [bySlug['dorian-amar'], bySlug['anthony-tombez']],
		collection: recits,
		year: 2026,
		release: 'Janvier–mars 2027',
		currency: 'CHF',
		status: 'forthcoming',
		featured: true,
		cover: { background: '#2a1f2e', foreground: '#e6dcc8' },
		synopsis:
			'Un livre à quatre mains. Dorian Amar et Anthony Tombez réunissent écriture et illustration autour d’une expérience de sortie, entre corps, esprit et géométrie intérieure.',
	},
];
