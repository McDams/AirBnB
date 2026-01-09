# AirBnB Analytics Dashboard - PRD

## Aperçu du Projet

Dashboard d'analyse de données AirBnB pour les villes de Paris, Bordeaux et Lyon, basé sur les résultats d'une analyse R.

## Stack Technique

- **Frontend**: React.js avec Tailwind CSS
- **Composants UI**: shadcn/ui (Radix UI)
- **Visualisations**: Recharts, React Three Fiber (3D)
- **Animations**: Framer Motion
- **Données**: Données mockées basées sur l'analyse R

## Fonctionnalités Implémentées

### 1. Navigation par Onglets
- **Vue générale**: KPIs globaux, nombre d'annonces par ville, distribution des prix
- **Analyse des prix**: Statistiques des prix, boxplot, top quartiers
- **Analyse des hôtes**: Répartition hôtes professionnels vs particuliers
- **Machine Learning**: Résultats du modèle de régression (R², RMSE)

### 2. Filtrage par Ville
- Dropdown interactif pour filtrer par: Paris, Bordeaux, Lyon, ou toutes les villes
- Mise à jour dynamique des graphiques et KPIs

### 3. Visualisations
- Bar charts (nombre d'annonces, distribution prix)
- Pie charts (types de logement)
- Scatter plots (prix vs variables)
- Tables de statistiques
- Graphiques 2D interactifs avec onglets

### 4. Design System
- Theme sombre avec glassmorphism
- Couleurs par ville: Paris (bleu), Bordeaux (rouge), Lyon (vert)
- Animations fluides et micro-interactions
- Interface entièrement en français

## Données Mockées

Les données sont basées sur les résultats de l'analyse R:
- **Total listings**: 83,403 (Paris: 65,124 | Bordeaux: 8,456 | Lyon: 9,823)
- **Prix moyen global**: ~110€/nuit
- **Score R² moyen des modèles ML**: 30.8%

## Structure des Fichiers

```
/app/frontend/src/
├── components/
│   ├── cards/
│   │   ├── KPICard.jsx
│   │   └── ChartCard.jsx
│   ├── charts/
│   │   ├── TotalListingsChart.jsx
│   │   ├── PriceDistributionChart.jsx
│   │   ├── RoomTypeChart.jsx
│   │   ├── HostsAnalysisChart.jsx
│   │   ├── PriceScatterChart.jsx
│   │   ├── TopNeighbourhoodsChart.jsx
│   │   ├── MLResultsChart.jsx
│   │   ├── PredictedVsActualChart.jsx
│   │   ├── AvailabilityImpactChart.jsx
│   │   └── Scatter3D.jsx
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   └── Header.jsx
│   └── tables/
│       ├── PriceStatsTable.jsx
│       └── OutlierCleaningTable.jsx
├── data/
│   └── mockData.js
├── pages/
│   ├── OverviewPage.jsx
│   ├── PricesPage.jsx
│   ├── HostsPage.jsx
│   └── MLPage.jsx
└── App.js
```

## Notes Importantes

⚠️ **DONNÉES MOCKÉES**: Ce dashboard utilise des données simulées basées sur l'analyse R.
Pour une utilisation en production, remplacer les données dans `/src/data/mockData.js` par vos vrais exports JSON depuis R.

## Prochaines Étapes (Optionnel)

1. Intégrer une vraie API backend pour charger les données CSV
2. Ajouter l'export PDF des rapports
3. Implémenter une visualisation 3D interactive avec WebGL
4. Ajouter un mode clair/sombre
