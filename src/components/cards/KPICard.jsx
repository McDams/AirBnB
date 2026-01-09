import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export const KPICard = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  trendValue, 
  icon: Icon, 
  cityClass,
  delay = 0 
}) => {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success bg-success/10';
    if (trend === 'down') return 'text-destructive bg-destructive/10';
    return 'text-muted-foreground bg-muted';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn("kpi-card", cityClass && `city-${cityClass}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center",
              cityClass === 'paris' && "bg-paris/10 text-paris",
              cityClass === 'bordeaux' && "bg-bordeaux/10 text-bordeaux",
              cityClass === 'lyon' && "bg-lyon/10 text-lyon",
              !cityClass && "bg-primary/10 text-primary"
            )}>
              <Icon className="w-5 h-5" />
            </div>
          )}
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
        </div>
        {trendValue && (
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
            getTrendColor()
          )}>
            {getTrendIcon()}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className={cn(
          "text-3xl font-display font-bold",
          cityClass === 'paris' && "text-paris",
          cityClass === 'bordeaux' && "text-bordeaux",
          cityClass === 'lyon' && "text-lyon",
          !cityClass && "text-foreground"
        )}>
          {value}
        </p>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
};

export default KPICard;
