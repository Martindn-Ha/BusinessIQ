import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { FileText, Calendar, RefreshCw, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "../../components/ui/skeleton";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";

export default function RecentUploads({ businessData, isLoading, onRefresh }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getBusinessTypeColor = (type) => {
    const colors = {
      restaurant: "bg-orange-50 text-orange-700 border-orange-200",
      retail: "bg-blue-50 text-blue-700 border-blue-200",
      service: "bg-green-50 text-green-700 border-green-200"
    };
    return colors[type] || "bg-slate-50 text-slate-700 border-slate-200";
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Recent Uploads
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="border-slate-200 hover:bg-slate-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="p-4 border border-slate-100 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Skeleton className="h-4 w-48 mb-2" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : businessData.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <FileText className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p>No data files uploaded yet</p>
            <p className="text-sm">Upload your first dataset to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {businessData.map((data, index) => (
              <motion.div
                key={data.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-slate-800 truncate">
                      {data.file_name}
                    </h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(data.created_date)}
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getBusinessTypeColor(data.business_type)}`}
                      >
                        {data.business_type}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to={createPageUrl("Analytics")}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-200 hover:bg-slate-50"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}