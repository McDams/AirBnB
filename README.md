# Analyse AirBnB - Paris, Bordeaux, Lyon

## Description du projet

Ce projet propose une analyse complète et comparative des données AirBnB pour trois grandes villes françaises : **Paris**, **Bordeaux** et **Lyon**. L'objectif est d'explorer les tendances du marché de la location courte durée, d'identifier les facteurs influençant les prix et de construire des modèles prédictifs.

## Objectifs

- **Analyse exploratoire** : Comprendre la distribution des annonces, des prix et des types de logements
- **Comparaison inter-villes** : Identifier les différences et similitudes entre les trois villes
- **Étude des facteurs de prix** : Analyser l'impact de la disponibilité, des avis, du type d'hôte, etc.
- **Détection d'outliers** : Nettoyer les données pour améliorer la qualité de l'analyse
- **Machine Learning** : Prédire les prix des logements à partir de caractéristiques clés

## Structure du projet

```
AirBnB/
├── data/                          # Données brutes
│   ├── paris/
│   ├── bordeaux/
│   └── lyon/
├── data_cleaned/                  # Données nettoyées
│   ├── paris/
│   ├── bordeaux/
│   ├── lyon/
├── scripts/                       # Scripts d'analyse
│   └── Rapport.qmd                # Rapport Quarto avec analyse complète
├── images/                        # Graphiques exploratoires
├── figures/                       # Graphiques d'analyse avancée
├── .gitignore
├── AirBnB.Rproj
└── README.md
```

## Technologies utilisées

- **R** (4.x)
- **Quarto** : Pour la génération de rapports reproductibles
- **Bibliothèques R** :
  - `tidyverse` : Manipulation et visualisation de données
  - `readr` : Import de données
  - `ggplot2` : Visualisations
  - `lubridate` : Gestion des dates
  - `skimr` : Statistiques descriptives
  - `broom` : Modèles statistiques
  - `plotly` : Visualisations 3D interactives

## Installation et utilisation

### Prérequis

- R (version 4.0 ou supérieure)
- RStudio (recommandé)
- Quarto CLI

### Installation des dépendances

```r
install.packages(c(
  "readr",
  "tidyverse",
  "lubridate",
  "skimr",
  "ggplot2",
  "broom",
  "plotly"
))
```

### Exécution de l'analyse

1. Clonez ce dépôt :
```bash
git clone https://github.com/McDams/AirBnB.git
cd AirBnB
```

2. Ouvrez le projet dans RStudio :
```bash
open AirBnB.Rproj
```

3. Exécutez le rapport Quarto :
```bash
quarto render scripts/Rapport.qmd
```

Ou depuis R/RStudio :
```r
quarto::quarto_render("scripts/Rapport.qmd")
```

## Analyses réalisées

### 1. Statistiques descriptives
- Nombre total d'annonces par ville
- Répartition des annonces (pie chart)
- Prix moyens, médians, min, max par ville

### 2. Analyse des prix
- Distribution des prix (histogrammes facettés)
- Prix moyens par ville
- Comparaison avant/après traitement des outliers

### 3. Analyse des types de logements
- Distribution des types de chambres (`room_type`)
- Prix moyens par type de logement et par ville

### 4. Avis et notations
- Corrélation entre nombre d'avis et prix
- Impact de la fréquence des avis (`reviews_per_month`)
- Segmentation par niveau de réputation

### 5. Disponibilité
- Taux de disponibilité par ville
- Corrélation entre disponibilité annuelle et prix
- Logements disponibles vs non disponibles

### 6. Analyse des hôtes
- Hôtes individuels vs hôtes multi-logements
- Impact du nombre de logements sur le prix

### 7. Détection et traitement des outliers
- Boxplots par ville
- Méthode IQR (Interquartile Range)
- Comparaison avant/après nettoyage

### 8. Machine Learning
- Régression linéaire simple : `Prix ~ Disponibilité`
- Régression multiple : Prix en fonction de plusieurs features
  - `calculated_host_listings_count`
  - `number_of_reviews`, `number_of_reviews_ltm`
  - `reviews_per_month`
  - `availability_365`
  - `room_type`
- Évaluation des modèles (R²)
- Visualisations 3D interactives (plotly)

### 9. Synthèses visuelles
- Top 10 quartiers les plus chers par ville
- Impact de l'activité (avis/mois) sur le prix
- Comparaison multi-villes sur un même graphe

## Résultats clés

- **Paris** concentre la majorité des annonces AirBnB
- Les prix varient fortement selon le type de logement et la ville
- Les hôtes multi-logements (professionnels) ont un impact sur les prix
- La disponibilité annuelle est corrélée négativement au prix dans certaines villes
- Les modèles de régression permettent d'expliquer une partie significative de la variance des prix

## Sources des données

Les données proviennent d'**Inside Airbnb** (http://insideairbnb.com/), une plateforme indépendante fournissant des données publiques sur les listings AirBnB.

## Contributeurs

- Serge DONOU
- Jokast KASSA
- Yannick COULIBALY
- Rufus MOUAKASSA