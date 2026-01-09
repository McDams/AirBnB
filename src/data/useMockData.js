import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as staticData from './mockData';

const MockDataContext = createContext({ data: staticData, loading: false, error: null });

export const MockDataProvider = ({ children }) => {
  const [data, setData] = useState(staticData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/mockData.json', { cache: 'no-store' });
        
        if (response.ok) {
          const json = await response.json();
          if (!cancelled) {
            // Merge: JSON data updates static data, but preserve frontend-only fields like cityColors
            const mergedData = { ...staticData, ...json };
            setData(mergedData);
            setError(null);
            console.log('✓ Données JSON chargées avec succès');
          }
        } else {
          throw new Error(`HTTP ${response.status}: Impossible de charger les données JSON`);
        }
      } catch (err) {
        if (!cancelled) {
          console.warn('⚠ Fallback sur données statiques (mockData.js):', err.message);
          // Fallback: keep static data
          setData(staticData);
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => ({ data, loading, error }), [data, loading, error]);

  return (
    <MockDataContext.Provider value={value}>
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = () => {
  const context = useContext(MockDataContext);
  
  if (!context) {
    console.error('useMockData doit être utilisé dans un MockDataProvider');
    return { data: staticData, loading: false, error: null };
  }
  
  return context;
};

// Export all data keys individually for backward compatibility if needed
export const {
  cityColors,
  totalListings,
  priceStats,
  roomTypeDistribution,
  priceDistribution,
  hostsAnalysis,
  priceVsHostListings,
  boxplotData,
  outlierCleaningData,
  mlModelResults,
  predictedVsActual,
  topNeighbourhoods,
  availabilityImpact,
  reviewsImpact,
  data3D,
  summaryKPIs
} = staticData;
