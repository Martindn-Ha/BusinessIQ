import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { motion } from "framer-motion";
import { Store, ShoppingBag, Wrench } from "lucide-react";

export default function BusinessTypeSelector({ selectedType, onTypeSelect }) {
  const businessTypes = [
    {
      id: "restaurant",
      name: "Restaurant",
      description: "Food, tables, orders",
      icon: Store,
      color: "bg-orange-50 border-orange-200 text-orange-700"
    },
    {
      id: "retail",
      name: "Retail",
      description: "Products, inventory, sales",
      icon: ShoppingBag,
      color: "bg-blue-50 border-blue-200 text-blue-700"
    },
    {
      id: "service",
      name: "Service",
      description: "Appointments, clients, staff",
      icon: Wrench,
      color: "bg-green-50 border-green-200 text-green-700"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800">
            What type of business is this?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {businessTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className={`w-full h-auto p-6 text-left border-2 transition-all ${
                    selectedType === type.id
                      ? `${type.color} border-current`
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                  onClick={() => onTypeSelect(type.id)}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <type.icon className="w-8 h-8" />
                    <div className="text-center">
                      <h3 className="font-semibold text-base">{type.name}</h3>
                      <p className="text-sm opacity-75 mt-1">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>

          {selectedType && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
            >
              <p className="text-sm text-blue-700">
                ✓ Selected: <strong>{businessTypes.find(t => t.id === selectedType)?.name}</strong>
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}