import React, { useState, useEffect } from "react";
import { BusinessData } from "../entities/BusinessData";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ArrowLeft, Download, BarChart3, TrendingUp, Package, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { motion } from "framer-motion";

import ChartGrid from "../components/analytics/ChartGrid";
import InsightsPanel from "../components/analytics/InsightsPanel";
import MetricsOverview from "../components/analytics/MetricsOverview";
import RecommendationsPanel from "../components/analytics/RecommendationsPanel";

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const [businessData, setBusinessData] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await BusinessData.list("-created_date");
      setBusinessData(data);
      if (data.length > 0) {
        setSelectedDataset(data[0]);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const handleDatasetChange = (datasetId) => {
    const dataset = businessData.find(d => d.id === datasetId);
    setSelectedDataset(dataset);
  };

  const generateReport = async () => {
    // This would typically generate a PDF report
    // For now, we'll just show an alert
    alert("PDF report generation will be implemented with a backend service");
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6"
        >
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate(createPageUrl("Dashboard"))}
              className="border-slate-200 hover:bg-slate-50"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Business Analytics</h1>
              <p className="text-slate-600 mt-1">Comprehensive insights and visualizations</p>
            </div>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            {businessData.length > 0 && (
              <Select value={selectedDataset?.id || ""} onValueChange={handleDatasetChange}>
                <SelectTrigger className="w-full md:w-64 border-slate-200">
                  <SelectValue placeholder="Select dataset" />
                </SelectTrigger>
                <SelectContent>
                  {businessData.map((dataset) => (
                    <SelectItem key={dataset.id} value={dataset.id}>
                      {dataset.file_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            
            <Button 
              onClick={generateReport}
              variant="outline"
              className="border-slate-200 hover:bg-slate-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </motion.div>

        {businessData.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
              <BarChart3 className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-3">
              No data to analyze yet
            </h3>
            <p className="text-slate-500 mb-6">
              Upload your first dataset to see detailed analytics and insights
            </p>
            <Button 
              onClick={() => navigate(createPageUrl("Upload"))}
              className="bg-blue-600 hover:bg-blue-700 shadow-lg"
            >
              Upload Data
            </Button>
          </motion.div>
        ) : selectedDataset ? (
          <div className="space-y-8">
            <MetricsOverview data={selectedDataset} />
            
            <ChartGrid data={selectedDataset} />
            
            <div className="grid lg:grid-cols-2 gap-8">
              <InsightsPanel insights={selectedDataset.insights || []} />
              <RecommendationsPanel recommendations={selectedDataset.recommendations || []} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}