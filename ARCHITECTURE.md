# 🏗️ Architecture et Diagrams

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      React Frontend (AirBnB)                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │            index.js → App.js                             │  │
│  └──────────────────────────┬───────────────────────────────┘  │
│                             │                                   │
│                    ┌────────▼────────┐                          │
│                    │ MockDataProvider│ ◄── Loads JSON           │
│                    │ (useMockData.js)│                          │
│                    └────────┬────────┘                          │
│                             │                                   │
│        ┌────────────────────┼────────────────────┐              │
│        │        Pages       │      Charts        │              │
│        │      (4 files)     │    (10 files)      │              │
│        │                    │                    │              │
│        │  • Overview        │  • TotalListings   │              │
│        │  • Prices          │  • PriceDistrib.   │              │
│        │  • Hosts           │  • RoomType        │              │
│        │  • ML              │  • TopNeighbour.   │              │
│        │                    │  • PriceScatter    │              │
│        │  Tables (2 files)  │  • Availability    │              │
│        │  • PriceStats      │  • MLResults       │              │
│        │  • OutlierCleaning │  • HostsAnalysis   │              │
│        │                    │  • PredictedVsAct. │              │
│        │  Tous utilisent:   │  • Scatter3D       │              │
│        │  useMockData()     │                    │              │
│        └────────────────────┼────────────────────┘              │
│                             │                                   │
│                    ┌────────▼────────────────┐                  │
│                    │    data = {              │                  │
│                    │  cityColors,             │                  │
│                    │  totalListings,          │                  │
│                    │  priceStats,             │                  │
│                    │  ... (12 autres clés)    │                  │
│                    │    }                     │                  │
│                    └──────────────────────────┘                  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                             ▲
                             │
                    ┌────────┴───────────┐
                    │ Fetch /data/       │
                    │ mockData.json      │
                    └────────┬───────────┘
                             │
┌─────────────────────────────┴───────────────────────────────────┐
│              Web Server (public/ folder)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│              public/data/mockData.json  ◄──── Fichier statique  │
│              (Accessible à http://...)                           │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                             ▲
                             │ Generate
                    ┌────────┴──────────┐
                    │   R / Rapport.qmd │
                    │                   │
                    │ here::here(        │
                    │   "public",        │
                    │   "data",          │
                    │   "mockData.json"  │
                    │ )                  │
                    │                    │
                    │ jsonlite::         │
                    │   write_json()     │
                    └────────────────────┘
```

---

## Data Flow Sequence

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. R Generation                                                  │
├─────────────────────────────────────────────────────────────────┤
│  Run Rapport.qmd (final chunk)                                  │
│       ↓                                                          │
│  Construire structures R (listes, data.frames)                  │
│       ↓                                                          │
│  jsonlite::write_json() → public/data/mockData.json             │
│       ↓                                                          │
│  ✓ JSON exporté avec timestamp                                  │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. Frontend Startup                                              │
├─────────────────────────────────────────────────────────────────┤
│  npm start                                                       │
│       ↓                                                          │
│  React initialise (index.js)                                    │
│       ↓                                                          │
│  App component monte avec MockDataProvider                      │
│       ↓                                                          │
│  MockDataProvider useEffect exécuté                             │
│       ↓                                                          │
│  fetch('/data/mockData.json')                                   │
│       ├─ Success (200)  → setData(fetchedJSON)                  │
│       └─ Error (404)    → console.error() + fallback            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. Component Rendering                                           │
├─────────────────────────────────────────────────────────────────┤
│  Tous les composants rendent avec:                              │
│       ↓                                                          │
│  const { data } = useMockData()                                 │
│       ↓                                                          │
│  Destructurer: const { charts, stats } = data || {}             │
│       ↓                                                          │
│  Afficher les vraies données du JSON                            │
│       ↓                                                          │
│  ✓ Dashboard complet avec données R                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## File Dependencies

```
App.js
  ├─ MockDataProvider (import)
  ├─ OverviewPage (uses useMockData)
  ├─ PricesPage (uses useMockData)
  ├─ HostsPage (uses useMockData)
  └─ MLPage (uses useMockData)

useMockData.js (PROVIDER)
  ├─ createContext, useState, useEffect, useMemo
  ├─ Fetch from /data/mockData.json
  ├─ Import mockData.js (fallback)
  └─ Export: MockDataProvider + useMockData()

mockData.js (FALLBACK)
  ├─ cityColors (static)
  ├─ totalListings (static)
  ├─ priceStats (static)
  ├─ ... 9 more exports
  └─ Used only if JSON fails to load

pages/
  ├─ OverviewPage.jsx → useMockData()
  ├─ PricesPage.jsx → useMockData()
  ├─ HostsPage.jsx → useMockData()
  └─ MLPage.jsx → useMockData()

components/charts/
  ├─ TotalListingsChart.jsx → useMockData()
  ├─ PriceDistributionChart.jsx → useMockData()
  ├─ RoomTypeChart.jsx → useMockData()
  ├─ TopNeighbourhoodsChart.jsx → useMockData()
  ├─ PriceScatterChart.jsx → useMockData()
  ├─ AvailabilityImpactChart.jsx → useMockData()
  ├─ MLResultsChart.jsx → useMockData()
  ├─ HostsAnalysisChart.jsx → useMockData()
  ├─ PredictedVsActualChart.jsx → useMockData()
  └─ Scatter3D.jsx → useMockData()

components/tables/
  ├─ PriceStatsTable.jsx → useMockData()
  └─ OutlierCleaningTable.jsx → useMockData()

public/data/
  └─ mockData.json (FETCHED AT RUNTIME)

scripts/
  └─ Rapport.qmd (GENERATES mockData.json)
```

---

## State Management Flow

```
┌─────────────────────────┐
│ MockDataProvider State  │
├─────────────────────────┤
│                         │
│ const [data, setData]   │ Initial: mockData.js
│ const [loading, ...]    │ Initial: true
│ const [error, setError] │ Initial: null
│                         │
└──────────────┬──────────┘
               │
        useEffect hook
               │
      ┌────────▼────────┐
      │ fetch(...) →    │
      │ parse JSON →    │
      │ setData()       │
      │ setLoading(false)
      └────────┬────────┘
               │
    ┌──────────┴──────────┐
    │                     │
SUCCESS (200)      ERROR (fetch/404/parse)
    │                     │
    ▼                     ▼
setData(json)      console.error()
setError(null)     setError(err)
setLoading(false)  setData(staticData)
    │                     │
    └──────────┬──────────┘
               │
        ┌──────▼────────┐
        │ All Components│
        │  re-render    │
        │ with new data │
        └───────────────┘
```

---

## Optional Chaining Pattern

```javascript
// ❌ AVANT (risque de crash)
const color = cityColors.paris.main;

// ✅ APRÈS (sûr)
const color = cityColors.paris?.main;

// Pattern complet
const { data } = useMockData();
const { totalListings = [] } = data || {};
const chartData = totalListings?.map(...) || [];

// Dans les composants
<Bar 
  dataKey="r2" 
  fill={cityColors.paris?.main}  ← Safe
/>
```

---

## Performance Timeline

```
Timeline (ms)
0     ├─ React starts
      │
50    ├─ App component mounts
      │
100   ├─ MockDataProvider initializes
      │
150   ├─ useEffect triggers
      │
200   ├─ fetch('/data/mockData.json') START
      │
250   ├─ Network latency...
      │
500   ├─ Response received (JSON ~200KB)
      │
550   ├─ Parse JSON
      │
600   ├─ setData(json) triggers re-render
      │
650   ├─ All components re-render with new data
      │
700   ├─ ✓ Dashboard fully loaded
      │
      └─ User sees real data from R
```

---

## Fallback Cascade

```
Component requests data
    │
    ▼
useMockData() hook
    ├─ Is context data available?
    │  └─ YES → Return data
    │
    ├─ NO → Has JSON loaded?
    │  ├─ YES → Return JSON
    │  └─ NO → Return mockData.js (static)
    │
    └─ Component receives: data || fallback || static
```

---

## Next Steps

1. **Generate JSON** → Run Rapport.qmd
2. **Verify file** → `ls public/data/mockData.json`
3. **Start server** → `npm start`
4. **Check Network** → DevTools, mockData.json status
5. **See results** → Dashboard displays R data ✓

---

## References

- 📖 [QUICK_START.md](QUICK_START.md) — Get started in 5 min
- 📖 [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) — Full guide
- 📖 [README_MIGRATION.md](README_MIGRATION.md) — Complete summary
