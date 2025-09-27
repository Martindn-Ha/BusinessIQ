import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Lightbulb, TrendingUp, Package, AlertTriangle, Target } from "lucide-react";
import { motion } from "framer-motion";

const insightIcons = {
  sales: TrendingUp,
  products: Package,
  trends: Lightbulb,
  growth: Target,
  recommendations: AlertTriangle
};

const impactColors = {
  high: "bg-red-50 text-red-700 border-red-200",
  medium: "bg-yellow-50 text-yellow-700 border-yellow-200", 
  low: "bg-blue-50 text-blue-700 border-blue-200"
};

export default function InsightsPanel({ insights }) {
  const groupedInsights = insights.reduce((acc, insight) => {
    if (!acc[insight.category]) {
      acc[insight.category] = [];
    }
    acc[insight.category].push(insight);
    return acc;
  }, {});

  return (
    <Card className="border-slate-200 shadow-sm h-fit">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          AI Business Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        {insights.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Lightbulb className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p>No insights available</p>
            <p className="text-sm">Analysis in progress...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedInsights).map(([category, categoryInsights], categoryIndex) => {
              const IconComponent = insightIcons[category] || Lightbulb;
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                >
                  <div className="mb-3">
                    <h4 className="font-medium text-slate-800 flex items-center gap-2 capitalize">
                      <IconComponent className="w-4 h-4" />
                      {category.replace('_', ' ')}
                    </h4>
                  </div>
                  
                  <div className="space-y-3">
                    {categoryInsights.map((insight, index) => (
                      <div key={index} className="p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                        <p className="text-sm text-slate-700 leading-relaxed mb-2">
                          {insight.insight}
                        </p>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${impactColors[insight.impact] || impactColors.medium}`}
                        >
                          {insight.impact} impact
                        </Badge>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            <div className="pt-4 border-t border-slate-200">
              <div className="text-xs text-slate-500 space-y-1">
                <p>💡 Insights are generated using AI analysis of your data</p>
                <p>📊 Refresh analysis after uploading new data</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}