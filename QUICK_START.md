# Quick Start: Mise en production des données

## 🚀 Démarrage rapide (5 minutes)

### Étape 1: Générer le JSON depuis R

Dans votre **Rapport.qmd**, exécutez le **dernier chunk** qui contient:

```r
library(here)
library(jsonlite)

output_path <- here::here("public", "data", "mockData.json")
dir.create(dirname(output_path), recursive = TRUE, showWarnings = FALSE)

jsonlite::write_json(
  list(
    cityColors = list(...),
    totalListings = ...,
    priceStats = ...,
    # ... autres clés
  ),
  output_path,
  auto_unbox = TRUE,
  pretty = TRUE
)

cat("✓ JSON exporté vers:", output_path, "\n")
```

**Vous verrez:** `✓ JSON exporté vers: /chemin/public/data/mockData.json`

### Étape 2: Vérifier le fichier

Allez à la racine de votre projet et vérifiez:

```bash
ls public/data/mockData.json
# ou sur Windows:
dir public\data\mockData.json
```

Le fichier doit exister et contenir du JSON valide.

### Étape 3: Lancer le front

```bash
cd frontend/AirBnB
npm start
```

### Étape 4: Vérifier le chargement

1. Ouvrez le navigateur à `http://localhost:3000`
2. Ouvrez DevTools: `F12` → onglet **Network**
3. Rechargez la page: `F5`
4. Cherchez `mockData.json`:
   - **Status 200 ✅** → Données chargées !
   - **Status 404 ❌** → Fichier non trouvé, vérifier chemin

### Étape 5: Voir les données

Visitez les pages du dashboard:
- Overview
- Prices
- Hosts
- ML

Les données doivent afficher vos vraies données de R ! 🎉

---

## 📝 Si ça ne fonctionne pas

### 1️⃣ Fichier JSON n'existe pas

```bash
# Créer manuellement le répertoire
mkdir -p public/data

# Relancer R pour générer le JSON
```

### 2️⃣ JSON vide ou mal formé

Vérifier dans Rapport.qmd:
- Tous les `data_frame` sont convertis en list
- Les `NA` sont gérés
- `auto_unbox = TRUE` est présent

### 3️⃣ Données statiques s'affichent

C'est normal ! Les données du fallback (`mockData.js`) s'affichent si le JSON charge pas.

**Vérifier:**
- DevTools → Console: cherchez erreurs
- Network: status du mockData.json
- Si 404: fichier n'existe pas
- Si erreur JSON: malformation du fichier

### 4️⃣ Hard refresh

```
Windows/Linux: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

---

## 📊 Exemple de flux complet

```
1. Run Rapport.qmd
   ↓
   public/data/mockData.json généré ✅

2. npm start
   ↓
   Front démarre

3. Browser charge la page
   ↓
   MockDataProvider fetch /data/mockData.json
   ↓
   setData({...staticData, ...json})
   ↓
   Tous les composants re-render avec vraies données

4. ✅ Dashboard affiche les vraies données de R
```

---

## 🔍 Vérifier la structure du JSON

Ouvrez `public/data/mockData.json` et assurez-vous qu'il contient:

```json
{
  "cityColors": {
    "paris": { "main": "...", "glow": "..." },
    "bordeaux": { ... },
    "lyon": { ... }
  },
  "totalListings": [ ... ],
  "priceStats": [ ... ],
  "roomTypeDistribution": { ... },
  "priceDistribution": { ... },
  "hostsAnalysis": { ... },
  "priceVsHostListings": { ... },
  "boxplotData": { ... },
  "outlierCleaningData": { ... },
  "mlModelResults": [ ... ],
  "predictedVsActual": { ... },
  "topNeighbourhoods": { ... },
  "availabilityImpact": { ... },
  "reviewsImpact": { ... },
  "data3D": { ... },
  "summaryKPIs": { ... }
}
```

Tous ces champs doivent être présents.

---

## ⚡ Performance tips

1. **Limiter les points scatter** → max 300 par ville
2. **Compresser le JSON** → `gzip` sur le serveur
3. **Cache-buster** → Ajouter timestamp au nom
   ```r
   output_path <- paste0("public/data/mockData_", Sys.time() %% 86400, ".json")
   ```

---

## 📚 Documentation complète

- **Vue d'ensemble:** [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)
- **Résumé setup:** [SETUP_SUMMARY.md](SETUP_SUMMARY.md)
- **Résolution erreur:** [ERROR_RESOLUTION.md](ERROR_RESOLUTION.md)

---

## ✨ Vous êtes prêt ! 🎉

Exécutez le chunk R, lancez le front, et profitez de vos données en temps réel !

**Questions?** Consultez la [documentation complète](INTEGRATION_GUIDE.md).
