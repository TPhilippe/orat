import type { Collection, House } from '../types';

export const house: House = {
	name: 'Éditions Orat',
	legalName: 'Éditions Orat SNC',
	shortName: 'Orat',
	tagline: 'Une édition suisse indépendante, exigeante et créative.',
	founded: 2026,
	city: 'Môtier',
	country: 'Suisse',
	address: ['Ruelle des Vignerons 23', '1787 Môtier (Vully)', 'Suisse'],
	email: 'editions.orat@gmail.com',
	website: 'https://www.editions-orat.ch',
	presentationPdf: '/documents/presentation-orat.pdf',
	statement: [
		'Les Éditions Orat accueillent des textes qui interrogent, éclairent et ouvrent de nouvelles perspectives sur l’existence, la conscience et le rapport au monde.',
		'Prose ou poésie, chaque texte est considéré pour son rythme, sa musicalité, et cette qualité singulière qui lui permet de toucher autant l’esprit que la sensibilité du lecteur.',
	],
	history: [
		'Fondées en Suisse en 2026 par deux amis — écrivains, illustrateurs et thérapeutes — les Éditions Orat sont nées d’une même passion pour l’écriture, l’art, et les chemins qui invitent l’être humain à porter un regard plus profond sur lui-même et sur le monde.',
		'À travers leurs publications, elles souhaitent accompagner les questionnements, les expériences et les recherches qui jalonnent une existence, convaincues que leur partage peut ouvrir de nouveaux espaces de réflexion et éveiller chacun à la beauté du monde et de l’univers.',
		'Récits de vie ou contes fantastiques, visions incarnées, fractales ou mystiques, regards intérieurs ou expériences transcendantes : de la géométrie aux arts sous leurs formes les plus diverses, nombreux sont les chemins qui ramènent à l’essentiel.',
		'Sensibles à une pensée libre et spirituelle, les Éditions Orat portent une attention particulière à la qualité de l’écriture comme à celle des sujets abordés. Soucieuses de permettre aux auteurs de donner à leur œuvre sa forme la plus juste, elles proposent également un accompagnement éditorial, des services de relecture, ainsi qu’un travail d’illustration, notamment inspiré par la géométrie sacrée.',
	],
	strengths: [
		{
			title: 'Le savoir-faire suisse au service de l’objet-livre',
			body: [
				'À l’heure où les impératifs économiques et la standardisation tendent parfois à reléguer au second plan la qualité matérielle du livre, les Éditions Orat font le choix d’une approche différente : redonner à l’ouvrage toute sa valeur d’objet.',
				'Chaque publication fait l’objet d’une attention particulière, de la conception graphique au choix des papiers, de la typographie à la mise en page, de l’illustration aux finitions et à la fabrication. Les compétences artistiques, graphiques et éditoriales de la maison sont réunies au service d’une édition exigeante — afin d’offrir au lecteur une expérience sensorielle et extrasensorielle unique.',
				'La géométrie et les principes de proportion occupent une place singulière dans cette démarche. Les proportions issues de la géométrie sacrée nourrissent la composition, l’équilibre des pages et le travail d’illustration, afin de créer un objet harmonieux où le fond et la forme se répondent.',
			],
		},
	],
	founders: [
		{
			slug: 'dorian-amar',
			name: 'Dorian Amar',
			origin: 'Né à Cannes en 1982, originaire de Lausanne.',
			portrait: '/pictures/dorian_2024.jpg',
			bio: 'Technicien forestier, ingénieur œnologue, vigneron spécialisé en aménagement de l’espace, conseiller international en création de terroir et en agro-écologie. Écrivain, rédacteur en chef du Journal Objectif et président de l’Association des diplômés de Changins. Magnétiseur, masseur thérapeutique et relaxant. Penseur contemporain en quête d’un lien sacré entre le corps et l’esprit : une approche transdisciplinaire, à la croisée de l’essai, du récit poétique et du fantastique intérieur.',
			highlights: [
				'16 ans d’expérience dans la publication et la production d’œuvres littéraires en Suisse, en France et en Belgique.',
				'9 ouvrages publiés chez Slatkine, Œnoplurimedia et Samsa.',
				'20 articles techniques publiés dans des revues professionnelles suisses et françaises.',
				'Cité par la presse suisse et internationale ; certains livres ont reçu des distinctions internationales.',
			],
		},
		{
			slug: 'anthony-tombez',
			name: 'Anthony Tombez',
			origin: 'Né à Lausanne en 1978.',
			bio: 'Dessinateur géomètre, thérapeute, artiste peintre et illustrateur. Son travail explore les liens entre géométrie sacrée, art et aménagement de l’espace. À travers ses soins, son art et son écriture, une même aspiration : la reconnexion à soi et à la lumière intérieure.',
			highlights: [
				'Expositions dans plusieurs galeries d’art en Suisse.',
				'Mandats d’illustration et de création graphique : logos, étiquettes de vins et supports visuels.',
				'Participation à la création de la bande dessinée « Lumière sur la Cave ».',
				'Conception de fresques, illustrations et compositions graphiques inspirées par la géométrie sacrée.',
			],
			website: 'https://www.anthonytombez.ch',
		},
	],
};

export const collections: Collection[] = [
	{
		id: 'recits',
		slug: 'recits',
		name: 'Récits',
		description: 'Récits de vie, voyages initiatiques, fantastique intérieur.',
	},
	{
		id: 'essais',
		slug: 'essais',
		name: 'Essais',
		description: 'Pensée, terroir, agroforesterie — des textes qui interrogent le rapport au monde.',
	},
];
