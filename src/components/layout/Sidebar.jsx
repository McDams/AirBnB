import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Euro, 
  Users, 
  Brain, 
  ChevronLeft,
  ChevronRight,
  Home,
  MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const menuItems = [
  { id: 'overview', label: 'Vue générale', icon: LayoutDashboard },
  { id: 'prices', label: 'Analyse des prix', icon: Euro },
  { id: 'hosts', label: 'Analyse des hôtes', icon: Users },
  { id: 'ml', label: 'Machine Learning', icon: Brain },
];

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ width: 260 }}
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen z-50 glass-card border-r border-border/50 flex flex-col"
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-border/30">
        <motion.div
          animate={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-paris to-bordeaux flex items-center justify-center shadow-glow-primary">
            <Home className="w-5 h-5 text-foreground" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col"
            >
              <span className="font-display font-bold text-lg text-foreground">AirBnB</span>
              <span className="text-xs text-muted-foreground">Analytics Dashboard</span>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-2">
        <TooltipProvider delayDuration={0}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "w-full justify-start gap-3 h-12 px-3 transition-all duration-200",
                      isActive 
                        ? "bg-primary/10 text-primary border border-primary/20 shadow-glow-primary" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon className={cn(
                      "w-5 h-5 shrink-0",
                      isActive && "text-primary"
                    )} />
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </Button>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right" className="glass-card">
                    {item.label}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>

      {/* City Legend */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 border-t border-border/30"
        >
          <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">Villes</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-paris shadow-glow-paris" />
              <span className="text-sm text-foreground">Paris</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-bordeaux shadow-glow-bordeaux" />
              <span className="text-sm text-foreground">Bordeaux</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-lyon shadow-glow-lyon" />
              <span className="text-sm text-foreground">Lyon</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-border/30">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-center text-muted-foreground hover:text-foreground"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
