import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { TrendingUp, Package, Calendar, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const COLORS = ['#1e40af', '#059669', '#f59e0b', '#dc2626', '#7c3aed', '#db2777'];

export default function ChartGrid({ data }) {
  const chartsData = data.charts_data || {};
  
  // Mock data for demonstration - in real app this would come from the AI analysis
  const salesOverTime = chartsData.sales_over_time || [
    { month: 'Jan', sales: 4000, revenue: 24000 },
    { month: 'Feb', sales: 3000, revenue: 22000 },
    { month: 'Mar', sales: 5000, revenue: 28000 },
    { month: 'Apr', sales: 4500, revenue: 26000 },
    { month: 'May', sales: 6000, revenue: 32000 },
    { month: 'Jun', sales: 5500, revenue: 30000 }
  ];

  const topProducts = chartsData.top_products || [
    { name: 'Product A', sales: 150, revenue: 4500 },
    { name: 'Product B', sales: 120, revenue: 3600 },
    { name: 'Product C', sales: 100, revenue: 3000 },
    { name: 'Product D', sales: 80, revenue: 2400 }
  ];

  const weeklyTrends = chartsData.weekly_trends || [
    { day: 'Mon', sales: 65 },
    { day: 'Tue', sales: 45 },
    { day: 'Wed', sales: 80 },
    { day: 'Thu', sales: 75 },
    { day: 'Fri', sales: 90 },
    { day: 'Sat', sales: 120 },
    { day: 'Sun', sales: 85 }
  ];

  const categoryBreakdown = [
    { name: 'Electronics', value: 35, count: 45 },
    { name: 'Clothing', value: 25, count: 32 },
    { name: 'Books', value: 20, count: 28 },
    { name: 'Home', value: 20, count: 25 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Sales Over Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Sales Trends Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="text-center text-slate-500">
                <TrendingUp className="w-12 h-12 mx-auto mb-2 text-slate-400" />
                <p className="text-sm">Sales trend chart</p>
                <p className="text-xs">Install recharts for full functionality</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top Products */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Package className="w-5 h-5 text-green-600" />
              Top Performing Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="text-center text-slate-500">
                <Package className="w-12 h-12 mx-auto mb-2 text-slate-400" />
                <p className="text-sm">Product performance chart</p>
                <p className="text-xs">Install recharts for full functionality</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Weekly Patterns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Calendar className="w-5 h-5 text-purple-600" />
              Weekly Sales Pattern
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="text-center text-slate-500">
                <Calendar className="w-12 h-12 mx-auto mb-2 text-slate-400" />
                <p className="text-sm">Weekly pattern chart</p>
                <p className="text-xs">Install recharts for full functionality</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <DollarSign className="w-5 h-5 text-orange-600" />
              Revenue by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="text-center text-slate-500">
                <DollarSign className="w-12 h-12 mx-auto mb-2 text-slate-400" />
                <p className="text-sm">Revenue breakdown chart</p>
                <p className="text-xs">Install recharts for full functionality</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}