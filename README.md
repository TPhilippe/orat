# Éditions Orat

Site vitrine d’une maison d’édition indépendante. Présentation du catalogue et prise de commande.

Les données viendront de l’API REST de l’ERP Django. En attendant, le site s’appuie sur des données locales.

## Structure

```text
src/
├── layouts/        Layout de page
├── components/     En-tête, pied, cartes livre, formulaire
├── pages/          Accueil, catalogue, fiche livre, maison, contact
├── services/       Accès aux données (mock aujourd’hui, API demain)
├── data/           Données locales
├── types/          Types du domaine
└── styles/         Tailwind et thème
```

## Commandes

```sh
npm install
npm run dev      # http://localhost:4321
npm run build
npm run preview
```

Copier `.env.example` vers `.env` et renseigner `PUBLIC_API_URL` lorsque l’API sera disponible.
