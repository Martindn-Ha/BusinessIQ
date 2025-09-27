import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "../../components/ui/skeleton";
import { formatCurrency, formatPercentage } from "../../utils";

export default function StatsOverview({ businessData, isLoading }) {
  const getTotalStats = () => {
    if (!businessData || businessData.length === 0) {
      return {
        totalRevenue: 0,
        totalCustomers: 0,
        growthRate: 0,
        dataFiles: 0
      };
    }

    return businessData.reduce((acc, data) => {
      const stats = data.summary_stats || {};
      return {
        totalRevenue: acc.totalRevenue + (stats.total_revenue || 0),
        totalCustomers: acc.totalCustomers + (stats.customer_count || 0),
        growthRate: acc.growthRate + (stats.growth_rate || 0),
        dataFiles: acc.dataFiles + 1
      };
    }, { totalRevenue: 0, totalCustomers: 0, growthRate: 0, dataFiles: 0 });
  };

  const stats = getTotalStats();
  const avgGrowthRate = stats.dataFiles > 0 ? stats.growthRate / stats.dataFiles : 0;

  const statCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      trend: avgGrowthRate > 0 ? "up" : "down",
      change: formatPercentage(Math.abs(avgGrowthRate))
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers.toLocaleString(),
      icon: Users,
      trend: "up",
      change: "+12%"
    },
    {
      title: "Data Files",
      value: stats.dataFiles.toString(),
      icon: TrendingUp,
      trend: "up",
      change: "+3 this month"
    },
    {
      title: "Growth Rate",
      value: formatPercentage(avgGrowthRate),
      icon: avgGrowthRate > 0 ? TrendingUp : TrendingDown,
      trend: avgGrowthRate > 0 ? "up" : "down",
      change: avgGrowthRate > 0 ? "+5.2%" : "-2.1%"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {stat.title}
              </CardTitle>
              {isLoading ? (
                <Skeleton className="h-4 w-4" />
              ) : (
                <stat.icon className="h-4 w-4 text-slate-500" />
              )}
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold text-slate-800">
                    {stat.value}
                  </div>
                  <div className={`flex items-center text-xs ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}>
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {stat.change}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}