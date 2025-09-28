import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Target, TrendingUp, Users, DollarSign, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const priorityColors = {
  high: "bg-red-50 text-red-700 border-red-200",
  medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
  low: "bg-blue-50 text-blue-700 border-blue-200"
};

const categoryIcons = {
  revenue: DollarSign,
  operations: Target,
  marketing: TrendingUp,
  customer: Users,
  default: AlertCircle
};

export default function RecommendationsPanel({ recommendations = [] }) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <Card className="border-slate-200 shadow-sm h-fit">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-slate-500">
            <Target className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p>No recommendations available</p>
            <p className="text-sm">Upload data to get AI-powered recommendations</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200 shadow-sm h-fit">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          <Target className="w-5 h-5 text-green-600" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((recommendation, index) => {
            const IconComponent = categoryIcons[recommendation.category] || categoryIcons.default;
            
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
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-slate-800">
                        {recommendation.title}
                      </h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${priorityColors[recommendation.priority] || priorityColors.medium}`}
                      >
                        {recommendation.priority} priority
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-slate-600 leading-relaxed mb-2">
                      {recommendation.description}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs bg-slate-50">
                        {recommendation.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-slate-200 mt-6">
          <div className="text-xs text-slate-500 space-y-1">
            <p>🎯 Recommendations are generated using AI analysis of your data</p>
            <p>📊 Priority levels help you focus on high-impact actions</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
