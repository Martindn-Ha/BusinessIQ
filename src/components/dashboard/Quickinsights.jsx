import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Lightbulb, TrendingUp, Package, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "../../components/ui/skeleton";

const insightIcons = {
  sales: TrendingUp,
  products: Package,
  trends: Lightbulb,
  growth: TrendingUp,
  recommendations: AlertTriangle
};

const impactColors = {
  high: "bg-red-50 text-red-700 border-red-200",
  medium: "bg-yellow-50 text-yellow-700 border-yellow-200", 
  low: "bg-blue-50 text-blue-700 border-blue-200"
};

export default function QuickInsights({ businessData, isLoading }) {
  const getAllInsights = () => {
    if (!businessData || businessData.length === 0) return [];
    
    return businessData
      .flatMap(data => data.insights || [])
      .slice(0, 6);
  };

  const insights = getAllInsights();

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          Quick Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="p-4 border border-slate-100 rounded-lg">
                <div className="flex items-start gap-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : insights.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Lightbulb className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p>No insights available yet</p>
            <p className="text-sm">Upload data to see AI insights</p>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight, index) => {
              const IconComponent = insightIcons[insight.category] || Lightbulb;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-4 h-4 text-slate-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {insight.insight}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${impactColors[insight.impact] || impactColors.medium}`}
                        >
                          {insight.impact} impact
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-slate-50">
                          {insight.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}