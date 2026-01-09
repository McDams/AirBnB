import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const ChartCard = ({ 
  title, 
  subtitle, 
  children, 
  className,
  action,
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn("chart-container", className)}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        {action && (
          <div>{action}</div>
        )}
      </div>
      <div className="w-full">
        {children}
      </div>
    </motion.div>
  );
};

export default ChartCard;
