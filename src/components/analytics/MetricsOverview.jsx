import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { TrendingUp, DollarSign, ShoppingCart, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export default function MetricsOverview({ data }) {
  const summaryStats = data.summary_stats || {};
  const dataAnalysis = data.data_analysis || {};
  
  const metrics = [
    {
      title: "Total Revenue",
      value: `$${(summaryStats.total_revenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: "green",
      trend: summaryStats.growth_rate ? `+${summaryStats.growth_rate.toFixed(1)}%` : "No trend data"
    },
    {
      title: "Total Transactions",
      value: (summaryStats.total_transactions || dataAnalysis.summary?.total_rows || 0).toLocaleString(),
      icon: ShoppingCart,
      color: "blue", 
      trend: "All time"
    },
    {
      title: "Average Transaction",
      value: `$${(summaryStats.avg_transaction || 0).toFixed(2)}`,
      icon: TrendingUp,
      color: "purple",
      trend: "Per sale"
    },
    {
      title: "Data Points",
      value: (dataAnalysis.summary?.total_rows || 0).toLocaleString(),
      icon: BarChart3,
      color: "orange",
      trend: "Analyzed"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="border-slate-200 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {metric.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-${metric.color}-50`}>
                  <metric.icon className={`w-4 h-4 text-${metric.color}-600`} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-slate-800">
                  {metric.value}
                </div>
                <p className="text-xs text-slate-500">
                  {metric.trend}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}