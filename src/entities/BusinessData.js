import geminiService from '../services/geminiService';

// BusinessData entity with AI integration
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
    this.recommendations = data.recommendations || [];
    this.visual_summary = data.visual_summary || {};
    this.final_visualization = data.final_visualization || {};
    this.created_date = data.created_date || new Date().toISOString();
    this.ai_processed = data.ai_processed || false;
  }

  // Analyze data with Gemini AI
  static async analyzeWithAI(fileData, businessType, fileName) {
    try {
      console.log('🚀 BusinessData - Starting AI analysis...');
      console.log('🚀 BusinessData - Business Type:', businessType);
      console.log('🚀 BusinessData - File Name:', fileName);
      
      // Convert file data to array of objects for analysis
      const dataArray = this.parseFileData(fileData);
      console.log('🚀 BusinessData - Parsed data array:', dataArray.slice(0, 3), '... (showing first 3 rows)');
      
      // Call Gemini AI service
      const aiAnalysis = await geminiService.analyzeBusinessData(
        dataArray, 
        businessType, 
        fileName
      );
      
      console.log('🚀 BusinessData - AI analysis completed:', aiAnalysis);
      console.log('🚀 BusinessData - visual_summary:', aiAnalysis.visual_summary);
      console.log('🚀 BusinessData - final_visualization:', aiAnalysis.final_visualization);
      
      return {
        summary_stats: aiAnalysis.summary_stats,
        insights: aiAnalysis.insights,
        recommendations: aiAnalysis.recommendations,
        charts_data: aiAnalysis.charts_data,
        visual_summary: aiAnalysis.visual_summary,
        final_visualization: aiAnalysis.final_visualization,
        ai_processed: true,
        analysis_date: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ BusinessData - AI analysis failed:', error);
      // Return fallback analysis
      return this.getFallbackAnalysis(businessType);
    }
  }

  // Parse uploaded file data
  static parseFileData(fileData) {
    // This is a simplified parser - in a real app, you'd use a proper CSV/Excel parser
    try {
      if (typeof fileData === 'string') {
        // Handle CSV data
        const lines = fileData.split('\n');
        const headers = lines[0].split(',');
        
        return lines.slice(1).map(line => {
          const values = line.split(',');
          const obj = {};
          headers.forEach((header, index) => {
            obj[header.trim()] = values[index]?.trim() || '';
          });
          return obj;
        });
      }
      
      // Handle other data formats
      return Array.isArray(fileData) ? fileData : [];
    } catch (error) {
      console.error('Error parsing file data:', error);
      return [];
    }
  }

  // Fallback analysis when AI fails
  static getFallbackAnalysis(businessType) {
    const fallbackData = {
      restaurant: {
        summary_stats: {
          total_revenue: 45000,
          growth_rate: 0.08,
          customer_count: 320,
          avg_transaction: 28.50,
          total_transactions: 1580
        },
        insights: [
          {
            category: "sales",
            insight: "Peak hours are 12-2 PM and 7-9 PM with 40% higher sales",
            impact: "high"
          },
          {
            category: "trends",
            insight: "Weekend sales are 25% higher than weekdays",
            impact: "medium"
          }
        ],
        recommendations: [
          {
            title: "Optimize Staffing",
            description: "Increase staff during peak hours to improve service speed",
            priority: "high",
            category: "operations"
          }
        ]
      },
      retail: {
        summary_stats: {
          total_revenue: 125000,
          growth_rate: 0.15,
          customer_count: 1250,
          avg_transaction: 45.20,
          total_transactions: 2765
        },
        insights: [
          {
            category: "sales",
            insight: "Online sales increased by 35% compared to last quarter",
            impact: "high"
          },
          {
            category: "products",
            insight: "Top 3 products account for 60% of total revenue",
            impact: "medium"
          }
        ],
        recommendations: [
          {
            title: "Expand Online Presence",
            description: "Invest more in digital marketing to capitalize on online growth",
            priority: "high",
            category: "marketing"
          }
        ]
      },
      service: {
        summary_stats: {
          total_revenue: 85000,
          growth_rate: 0.12,
          customer_count: 450,
          avg_transaction: 95.00,
          total_transactions: 895
        },
        insights: [
          {
            category: "trends",
            insight: "Customer satisfaction improved by 15% this month",
            impact: "high"
          },
          {
            category: "growth",
            insight: "Referral rate increased by 20% due to improved service quality",
            impact: "medium"
          }
        ],
        recommendations: [
          {
            title: "Implement Referral Program",
            description: "Create incentives for customer referrals to boost growth",
            priority: "medium",
            category: "marketing"
          }
        ]
      }
    };

    return fallbackData[businessType] || fallbackData.retail;
  }

  // Static methods for data management
  static async list(sortBy = "-created_date", limit = null) {
    // Get data from localStorage or return mock data
    const storedData = this.getStoredData();
    return storedData.slice(0, limit || storedData.length);
  }

  static async create(data) {
    const newItem = new BusinessDataEntity(data);
    this.saveToStorage(newItem);
    return newItem;
  }

  static async findById(id) {
    const data = await this.list();
    return data.find(item => item.id === id);
  }

  // Local storage methods (replace with real database in production)
  static getStoredData() {
    try {
      const stored = localStorage.getItem('businessData');
      return stored ? JSON.parse(stored) : this.getMockData();
    } catch (error) {
      console.error('Error loading stored data:', error);
      return this.getMockData();
    }
  }

  static saveToStorage(item) {
    try {
      const existingData = this.getStoredData();
      const updatedData = [item, ...existingData.filter(d => d.id !== item.id)];
      localStorage.setItem('businessData', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  static getMockData() {
    return [
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
          }
        ],
        summary_stats: {
          total_revenue: 125000,
          growth_rate: 0.15,
          customer_count: 1250
        },
        created_date: "2024-01-15T10:30:00Z",
        ai_processed: true
      }
    ];
  }
}

export { BusinessDataEntity as BusinessData };