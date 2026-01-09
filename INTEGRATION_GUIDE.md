# Guide d'intégration des données R en Front

## Vue d'ensemble

Le dashboard intègre des données exportées de R via JSON. Les données mock (statiques) servent de fallback tandis qu'un système de contexte React charge dynamiquement les données JSON générées par R.

## Architecture

### Structure des fichiers

```
AirBnB/
├── public/
│   └── data/
│       └── mockData.json          ← Données générées par R (à la racine web)
├── src/
│   ├── data/
│   │   ├── mockData.js            ← Données mock statiques (fallback)
│   │   └── useMockData.js         ← Hook React + Provider (nouveau)
│   ├── App.js                     ← Wrappé avec MockDataProvider
│   ├── pages/
│   │   ├── OverviewPage.jsx       ← Utilise useMockData()
│   │   ├── PricesPage.jsx         ← Utilise useMockData()
│   │   ├── HostsPage.jsx          ← Utilise useMockData()
│   │   └── MLPage.jsx             ← Utilise useMockData()
│   └── components/
│       ├── charts/                ← Tous les charts utilisent useMockData()
│       └── tables/                ← Tous les tables utilisent useMockData()
└── scripts/
    └── Rapport.qmd                ← Pipeline R générant mockData.json
```

## Flux de données

```
R (Rapport.qmd)
    ↓
    Exporte → public/data/mockData.json
                    ↓
        MockDataProvider (useMockData.js)
            ├── Charge le JSON au mount
            ├── Fusionne avec les données statiques (mockData.js)
            └── Fourni via contexte React
                    ↓
            Tous les composants consomment via useMockData()
                    ↓
        Affichage des données en temps réel
```

## Utilisation

### 1. **Dans un composant page** (ex: OverviewPage.jsx)

```jsx
import { useMockData } from '@/data/useMockData';

export const OverviewPage = ({ selectedCity }) => {
  const { data, loading, error } = useMockData();
  
  // Déstructurer les données avec des valeurs par défaut
  const { summaryKPIs = {}, totalListings = [], priceStats = [] } = data || {};
  
  if (error) {
    console.warn('Erreur chargement données:', error);
    // Les données statiques sont utilisées en fallback
  }

  return (
    // Utiliser summaryKPIs, totalListings, priceStats...
  );
};
```

### 2. **Dans un composant chart** (ex: TotalListingsChart.jsx)

```jsx
import { useMockData } from '@/data/useMockData';

export const TotalListingsChart = () => {
  const { data } = useMockData();
  const totalListings = data?.totalListings || [];
  const cityColors = data?.cityColors || {};

  const getBarColor = (city) => {
    switch (city) {
      case 'Paris': return cityColors.paris?.main;
      case 'Bordeaux': return cityColors.bordeaux?.main;
      case 'Lyon': return cityColors.lyon?.main;
      default: return 'hsl(var(--primary))';
    }
  };

  return (
    // Utiliser les données...
  );
};
```

### 3. **Accès au contexte global** (si besoin hors composant)

```jsx
const { data, loading, error } = useMockData();
// data contient toutes les clés du JSON
```

## Exporter les données depuis R

### Prérequis

```r
library(here)      # Pour les chemins absolus
library(jsonlite)  # Pour write_json()
```

### Chunk R dans Rapport.qmd

```r
# Construire vos structures de données...

output_path <- here::here("public", "data", "mockData.json")
dir.create(dirname(output_path), recursive = TRUE, showWarnings = FALSE)

jsonlite::write_json(
  list(
    cityColors = list(
      paris = list(main = 'hsl(...)', glow = 'hsl(...)', ...),
      bordeaux = list(...),
      lyon = list(...)
    ),
    totalListings = total_listings,
    priceStats = price_stats,
    roomTypeDistribution = room_type_distribution,
    priceDistribution = price_distribution,
    hostsAnalysis = hosts_analysis,
    priceVsHostListings = price_vs_host_listings,
    boxplotData = boxplot_data,
    outlierCleaningData = outlier_cleaning,
    mlModelResults = ml_model_results,
    predictedVsActual = predicted_vs_actual,
    topNeighbourhoods = top_neighbourhoods,
    availabilityImpact = availability_impact,
    reviewsImpact = reviews_impact,
    data3D = data3d,
    summaryKPIs = summary_kpis
  ),
  output_path,
  auto_unbox = TRUE,
  pretty = TRUE
)

cat("✓ JSON exporté vers:", output_path, "\n")
```

### Format attendu des données

Toutes les données doivent correspondre aux clés du `mockData.js` statique:

```javascript
{
  cityColors: {
    paris: { main, glow, gradient, class },
    bordeaux: { ... },
    lyon: { ... }
  },
  totalListings: [{ city, total, color }, ...],
  priceStats: [{ city, mean, median, min, max, color }, ...],
  roomTypeDistribution: {
    Paris: [{ type, count, percentage }, ...],
    Bordeaux: [...],
    Lyon: [...]
  },
  priceDistribution: {
    Paris: [{ range, count }, ...],
    Bordeaux: [...],
    Lyon: [...]
  },
  hostsAnalysis: {
    Paris: [{ type, count, percentage }, ...],
    Bordeaux: [...],
    Lyon: [...]
  },
  priceVsHostListings: {
    Paris: [{ hostListings, price }, ...],
    Bordeaux: [...],
    Lyon: [...]
  },
  boxplotData: {
    Paris: { q1, median, q3, min, max, outliers },
    Bordeaux: {...},
    Lyon: {...}
  },
  outlierCleaningData: {
    Paris: { before: { count, mean, median }, after: {...} },
    Bordeaux: {...},
    Lyon: {...}
  },
  mlModelResults: [
    { city, r2, rmse },
    ...
  ],
  predictedVsActual: {
    Paris: [{ actual, predicted }, ...],
    Bordeaux: [...],
    Lyon: [...]
  },
  topNeighbourhoods: {
    Paris: [{ neighbourhood, meanPrice }, ...],
    Bordeaux: [...],
    Lyon: [...]
  },
  availabilityImpact: {
    Paris: [{ availability, price }, ...],
    Bordeaux: [...],
    Lyon: [...]
  },
  reviewsImpact: {
    Paris: [{ reviewsPerMonth, price }, ...],
    Bordeaux: [...],
    Lyon: [...]
  },
  data3D: {
    Paris: [{ x, y, z }, ...],  // x=availability, y=reviews, z=price
    Bordeaux: [...],
    Lyon: [...]
  },
  summaryKPIs: {
    totalListings,
    averagePrice,
    totalCities,
    avgR2Score
  }
}
```

## Bonnes pratiques

### ✅ À faire

1. **Garder les formes de données identiques** — Les charts expect les mêmes structures
2. **Générer les mêmes bins d'histogramme** — Pour que PriceDistributionChart fonctionne correctement (7 ranges)
3. **Maintenir les valeurs R² entre 0 et 1** — Le front multiplie par 100 pour afficher en pourcentage
4. **Mettre les fichiers JSON dans `public/`** — Accès direct sans build
5. **Échantillonner côté R** — Pour scatter/3D, limiter à max 200-300 points par ville pour perf
6. **Vérifier les chemins avec `here::here()`** — Évite les dépendances de working directory

### ❌ À éviter

1. ❌ Exporter vers `src/data/mockData.json` — Le front attend `public/data/mockData.json`
2. ❌ Changer les noms de clés — Les composants les attendent exactement
3. ❌ Utiliser des chemins relatifs en dehors de R — Utiliser `here::here()`
4. ❌ Exporter trop de points pour scatter/3D — Causera du lag au front
5. ❌ Mélanger statique et dynamique — Choisir soit mock.js, soit JSON

## Dépannage

### Le JSON ne se charge pas

**Problème:** `public/data/mockData.json` n'existe pas

**Solutions:**
1. Assurez-vous que `public/data/` existe
2. Exécutez le chunk R qui exporte le JSON
3. Vérifiez le chemin dans Rapport.qmd : `here::here("public", "data", "mockData.json")`

### Les données statiques s'affichent

**Normal !** C'est le fallback. Le JSON charge en arrière-plan.

**Vérifier:**
1. Ouvrez DevTools → Network → cherchez `mockData.json`
2. Si ça charge (200), vérifiez la structure du JSON
3. Si ça ne charge pas (404), le fichier n'existe pas

### Erreurs de typage

**Problème:** `Cannot read property 'main' of undefined`

**Solution:** Utiliser l'optional chaining (`?.`)
```jsx
cityColors.paris?.main  // ✅ Sûr
cityColors.paris.main   // ❌ Peut crash
```

### Données mélangées/obsolètes

**Solution:** 
1. Régénérez le JSON: Re-run le chunk R dans Rapport.qmd
2. Hard refresh le navigateur: `Ctrl+Shift+Del` (ou Cmd+Shift+Del sur Mac)
3. Vérifiez la date de modification du fichier: `public/data/mockData.json`

## Performance

- **Taille JSON cible:** < 500KB
- **Temps de chargement:** < 100ms (avec cache)
- **Points de données:** max 200-300 par chart/ville
- **Fréquence mise à jour:** Recharger la page pour voir nouvelles données

## Prochaines étapes

1. ✅ **Exécutez** le chunk R pour générer `public/data/mockData.json`
2. ✅ **Lancez** le serveur front (`npm start`)
3. ✅ **Vérifiez** que le JSON se charge (DevTools → Network)
4. ✅ **Testez** que les données apparaissent sur les pages
5. ✅ **Itérez** sur la structure R pour affiner les données

## Références

- **Hook Provider:** [src/data/useMockData.js](src/data/useMockData.js)
- **Données statiques (fallback):** [src/data/mockData.js](src/data/mockData.js)
- **Pipeline R:** [scripts/Rapport.qmd](scripts/Rapport.qmd)
- **App.js:** Wrappé avec `<MockDataProvider>`
