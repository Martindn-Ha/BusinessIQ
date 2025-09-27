// Mock BusinessData entity for demo purposes
class BusinessDataEntity {
  constructor(data) {
    this.id = data.id || Date.now().toString();
    this.file_name = data.file_name;
    this.file_url = data.file_url;
    this.business_type = data.business_type;
    this.data_analysis = data.data_analysis;
    this.insights = data.insights || [];
    this.charts_data = data.charts_data;
    this.summary_stats = data.summary_stats;
    this.created_date = data.created_date || new Date().toISOString();
  }

  // Mock static methods for demo
  static async list(sortBy = "-created_date", limit = null) {
    // Return mock data for demo
    const mockData = [
      {
        id: "1",
        file_name: "Q3 Sales Report.csv",
        file_url: "/uploads/q3-sales.csv",
        business_type: "retail",
        insights: [
          {
            category: "sales",
            insight: "Sales increased by 15% compared to Q2",
            impact: "high"
          },
          {
            category: "trends",
            insight: "Online sales are growing faster than in-store",
            impact: "medium"
          }
        ],
        summary_stats: {
          total_revenue: 125000,
          growth_rate: 0.15,
          customer_count: 1250
        },
        created_date: "2024-01-15T10:30:00Z"
      },
      {
        id: "2", 
        file_name: "Customer Feedback Data.xlsx",
        file_url: "/uploads/customer-feedback.xlsx",
        business_type: "service",
        insights: [
          {
            category: "products",
            insight: "Customer satisfaction improved by 8% this month",
            impact: "high"
          }
        ],
        summary_stats: {
          satisfaction_score: 4.2,
          response_count: 340,
          avg_response_time: 2.5
        },
        created_date: "2024-01-10T14:20:00Z"
      }
    ];
    
    return mockData.slice(0, limit || mockData.length);
  }

  static async create(data) {
    const newItem = new BusinessDataEntity(data);
    // In a real app, this would save to a database
    return newItem;
  }

  static async findById(id) {
    const data = await this.list();
    return data.find(item => item.id === id);
  }
}

export { BusinessDataEntity as BusinessData };