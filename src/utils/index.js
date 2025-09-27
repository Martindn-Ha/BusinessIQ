// Utility functions for the application

export const createPageUrl = (pageName) => {
  const routes = {
    Dashboard: "/",
    Analytics: "/analytics", 
    Upload: "/upload"
  };
  return routes[pageName] || "/";
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US').format(number);
};

export const formatPercentage = (value) => {
  return `${(value * 100).toFixed(1)}%`;
};

export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};
