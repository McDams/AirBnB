import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { OverviewPage } from '@/pages/OverviewPage';
import { PricesPage } from '@/pages/PricesPage';
import { HostsPage } from '@/pages/HostsPage';
import { MLPage } from '@/pages/MLPage';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCity, setSelectedCity] = useState('all');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderPage = () => {
    const pageProps = { selectedCity };
    
    switch (activeTab) {
      case 'overview':
        return <OverviewPage {...pageProps} />;
      case 'prices':
        return <PricesPage {...pageProps} />;
      case 'hosts':
        return <HostsPage {...pageProps} />;
      case 'ml':
        return <MLPage {...pageProps} />;
      default:
        return <OverviewPage {...pageProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Orbs */}
      <div className="bg-orb bg-orb-paris w-96 h-96 top-20 -left-48 animate-float" />
      <div className="bg-orb bg-orb-bordeaux w-80 h-80 top-1/2 -right-40 animate-float" style={{ animationDelay: '2s' }} />
      <div className="bg-orb bg-orb-lyon w-72 h-72 bottom-20 left-1/3 animate-float" style={{ animationDelay: '4s' }} />

      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="ml-[260px] transition-all duration-300">
        <Header selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
        
        <main className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="p-6 border-t border-border/30 mt-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>
              Dashboard AirBnB Analytics • Données basées sur l'analyse R
            </p>
            <p>
              Paris • Bordeaux • Lyon
            </p>
          </div>
        </footer>
      </div>

      <Toaster />
    </div>
  );
}

export default App;
