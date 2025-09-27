import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { FileText, Calendar, HardDrive } from "lucide-react";
import { motion } from "framer-motion";

export default function DataPreview({ file, businessType }) {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    return <FileText className="w-8 h-8" />;
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800">
            Ready to Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* File Information */}
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
              <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center flex-shrink-0">
                {getFileIcon(file.name)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-800 truncate">
                  {file.name}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <HardDrive className="w-3 h-3" />
                    {formatFileSize(file.size)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(file.lastModified).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Business Type */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
              <div className="text-sm text-slate-600">Business Type:</div>
              <Badge 
                variant="outline" 
                className={`text-sm ${getBusinessTypeColor(businessType)}`}
              >
                {businessType.charAt(0).toUpperCase() + businessType.slice(1)}
              </Badge>
            </div>

            {/* Processing Information */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-blue-700 font-medium">
                  Ready to generate insights and analytics
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}