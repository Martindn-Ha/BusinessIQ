import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { CheckCircle, Circle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ProcessingSteps({ currentStep, isProcessing }) {
  const steps = [
    {
      id: 0,
      title: "Upload",
      description: "Choose dataset"
    },
    {
      id: 1,
      title: "Business",
      description: "Select Business"
    },
    {
      id: 2,
      title: "Ready",
      description: "Confirm and process"
    },
    {
      id: 3,
      title: "Processing",
      description: "Generating insights"
    },
    {
      id: 4,
      title: "Complete",
      description: "Analytics ready"
    }
  ];

  const getStepIcon = (stepId) => {
    if (stepId < currentStep) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    } else if (stepId === currentStep && isProcessing) {
      return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />;
    } else if (stepId === currentStep) {
      return <Circle className="w-5 h-5 text-blue-600 fill-current" />;
    } else {
      return <Circle className="w-5 h-5 text-slate-300" />;
    }
  };

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) {
      return "completed";
    } else if (stepId === currentStep) {
      return "active";
    } else {
      return "pending";
    }
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            const isLast = index === steps.length - 1;

            return (
              <React.Fragment key={step.id}>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center flex-1"
                >
                  <div className={`p-3 rounded-full ${
                    status === "completed" ? "bg-green-50" :
                    status === "active" ? "bg-blue-50" : "bg-slate-50"
                  }`}>
                    {getStepIcon(step.id)}
                  </div>
                  
                  <div className="mt-3 text-center">
                    <h3 className={`text-sm font-medium ${
                      status === "completed" ? "text-green-800" :
                      status === "active" ? "text-blue-800" : "text-slate-500"
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-xs mt-1 ${
                      status === "completed" ? "text-green-600" :
                      status === "active" ? "text-blue-600" : "text-slate-400"
                    }`}>
                      {step.description}
                    </p>
                    
                    {status === "active" && isProcessing && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-1 text-xs text-blue-600"
                      >
                        Processing...
                      </motion.div>
                    )}
                  </div>
                </motion.div>
                
                {!isLast && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    status === "completed" ? "bg-green-200" : "bg-slate-200"
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}