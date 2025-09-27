
import React, { useState, useEffect } from "react";
import { BusinessData } from "../entities/BusinessData";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Upload, TrendingUp, FileText, BarChart3, PlusCircle, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import StatsOverview from "../components/dashboard/statsoverview";
import RecentUploads from "../components/dashboard/RecentUploads";
import QuickInsights from "../components/dashboard/Quickinsights";

export default function Dashboard() {
  const [businessData, setBusinessData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await BusinessData.list("-created_date", 10);
      setBusinessData(data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              Business Analytics Dashboard
            </h1>
            <p className="text-slate-600 text-lg">
              Transform your business data into actionable insights
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Link to={createPageUrl("Analytics")} className="flex-1 md:flex-none">
              <Button 
                variant="outline" 
                className="w-full border-slate-200 hover:bg-slate-50 text-slate-700"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </Link>
            <Link to={createPageUrl("Upload")} className="flex-1 md:flex-none">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg">
                <PlusCircle className="w-4 h-4 mr-2" />
                Upload Data
              </Button>
            </Link>
          </div>
        </motion.div>

        <StatsOverview businessData={businessData} isLoading={isLoading} />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <RecentUploads 
              businessData={businessData}
              isLoading={isLoading}
              onRefresh={loadData}
            />
          </div>
          
          <div>
            <QuickInsights 
              businessData={businessData}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
