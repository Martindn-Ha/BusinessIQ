import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
  }

  async analyzeBusinessData(data, businessType, fileName) {
    try {
      console.log('🔍 Gemini Service Debug:');
      console.log('- API Key exists:', !!import.meta.env.VITE_GEMINI_API_KEY);
      console.log('- API Key length:', import.meta.env.VITE_GEMINI_API_KEY?.length || 0);
      console.log('- Business Type:', businessType);
      console.log('- File Name:', fileName);
      console.log('- Data sample:', data.slice(0, 2));
      
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        console.error('❌ No Gemini API key found! Please add VITE_GEMINI_API_KEY to .env.local');
        throw new Error('Gemini API key not configured');
      }
      
      const prompt = this.createAnalysisPrompt(data, businessType, fileName);
      console.log('📝 Sending prompt to Gemini...');
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const analysis = response.text();
      
      console.log('✅ Gemini response received:', analysis.substring(0, 200) + '...');
      
      return this.parseAnalysisResponse(analysis);
    } catch (error) {
      console.error('❌ Error analyzing data with Gemini:', error);
      console.error('Full error:', error);
      throw new Error('Failed to analyze data with AI: ' + error.message);
    }
  }

  createAnalysisPrompt(data, businessType, fileName) {
    return `
You are an expert **Data Scientist and Business Consultant**. 
Your goal is to analyze the raw input data and produce only a **Visual Summary** and **Actionable Recommendations** for a non-technical local business owner. 

**STEP 1: DATA PREPARATION & VALIDATION** 
1. **Analyze the raw input data** below, which could be in any format (e.g., CSV, unstructured text, copied spreadsheet data, JSON). 
2. **Clean and standardize it:** Identify and correct common issues (missing values, inconsistent formatting, outliers, incorrect data types). If cleaning is done, briefly state what was corrected (e.g., "Converted date formats"). 
3. **If the data is completely unusable or empty,** state that clearly instead of providing an analysis. 

**STEP 2: BUSINESS ANALYSIS & CONSULTATION** 
Based *only* on the cleaned data, perform a thorough analysis to maximize profit, identify key growth drivers, and pinpoint inefficiencies. 

**RAW BUSINESS DATA INPUT:** 
${JSON.stringify(data, null, 2)}

**REQUIRED OUTPUT FORMAT:** You must respond with ONLY a valid JSON object in the following structure. Do not include any text before or after the JSON:

{
  "summary_stats": {
    "total_revenue": 0,
    "growth_rate": 0,
    "customer_count": 0,
    "avg_transaction": 0,
    "total_transactions": 0
  },
  "insights": [
    {
      "category": "revenue",
      "insight": "Key insight about the data",
      "impact": "high"
    }
  ],
  "recommendations": [
    {
      "priority": "high",
      "title": "Short recommendation title",
      "description": "Brief recommendation description",
      "impact": "Expected business improvement",
      "category": "operations"
    }
  ],
  "visual_summary": {
    "chart1": {
      "title": "Revenue Analysis",
      "description": "This chart shows revenue performance over time",
      "image_prompt": "Create a professional chart showing revenue trends with clear labels and business colors",
      "type": "bar",
      "data": []
    },
    "chart2": {
      "title": "Operational Trends", 
      "description": "This chart shows key operational patterns",
      "image_prompt": "Create a professional chart showing operational trends with distinct colors",
      "type": "line",
      "data": []
    },
    "chart3": {
      "title": "Business Risks",
      "description": "This chart shows critical business risk factors",
      "image_prompt": "Create a professional chart showing risk distribution with clear labels",
      "type": "pie", 
      "data": []
    }
  },
  "final_visualization": {
    "title": "Key Recommendation Impact",
    "description": "This visualization shows the potential impact of the most important recommendation",
    "image_prompt": "Create a professional chart showing the expected impact of implementing the top recommendation",
    "type": "bar",
    "data": []
  }
}

**IMPORTANT:** 
- Return ONLY the JSON object, no other text
- Ensure all JSON is properly formatted and valid
- Use actual data from the analysis for insights and recommendations
- Provide exactly 3 recommendations with short, concise descriptions
- Keep all text brief and business-focused
    `.trim();
  }

  parseAnalysisResponse(response) {
    try {
      console.log('🔍 Gemini Service - Raw AI response:', response);
      console.log('🔍 Gemini Service - Response length:', response.length);
      console.log('🔍 Gemini Service - First 500 chars:', response.substring(0, 500));
      
      // Parse JSON response from Gemini
      const cleanedResponse = this.cleanJsonResponse(response);
      console.log('🔍 Gemini Service - Cleaned response:', cleanedResponse);
      
      const analysis = JSON.parse(cleanedResponse);
      console.log('🔍 Gemini Service - Parsed analysis:', analysis);
      
      return analysis;
    } catch (error) {
      console.error('❌ Error parsing Gemini response:', error);
      console.error('❌ Response that failed to parse:', response);
      return this.createFallbackAnalysis();
    }
  }

  cleanJsonResponse(response) {
    // Remove any markdown formatting or extra text
    let cleaned = response.trim();
    
    // Remove markdown code blocks if present
    cleaned = cleaned.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    
    // Find the first { and last } to extract just the JSON
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    }
    
    // Clean up any common JSON formatting issues
    cleaned = cleaned
      .replace(/\n\s*\n/g, '\n') // Remove empty lines
      .replace(/,\s*}/g, '}') // Remove trailing commas
      .replace(/,\s*]/g, ']') // Remove trailing commas in arrays
      .trim();
    
    return cleaned;
  }

  createFallbackAnalysis() {
    return {
      summary_stats: {
        total_revenue: 0,
        growth_rate: 0,
        customer_count: 0,
        avg_transaction: 0,
        total_transactions: 0
      },
      insights: [
        {
          category: "trends",
          insight: "Data analysis is in progress. Please check back later for detailed insights.",
          impact: "medium"
        }
      ],
      recommendations: [
        {
          title: "Data Processing",
          description: "Your data is being analyzed. AI insights will be available shortly.",
          priority: "medium",
          category: "operations",
          impact: "Improved business understanding"
        }
      ],
      charts_data: {
        sales_over_time: [],
        top_products: [],
        weekly_trends: [],
        category_breakdown: []
      },
      visual_summary: {
        chart1: {
          title: "Revenue Analysis",
          description: "Revenue performance analysis",
          image_prompt: "Create a professional bar chart showing revenue trends",
          type: "bar",
          data: []
        },
        chart2: {
          title: "Product Performance",
          description: "Product performance analysis", 
          image_prompt: "Create a professional bar chart showing product performance",
          type: "bar",
          data: []
        },
        chart3: {
          title: "Trend Analysis",
          description: "Time-based trend analysis",
          image_prompt: "Create a professional line chart showing trends over time",
          type: "line",
          data: []
        }
      },
      final_visualization: {
        title: "Key Insights",
        description: "Most important business insights from the analysis",
        image_prompt: "Create a professional chart showing key business insights",
        type: "pie",
        data: []
      }
    };
  }
}

const geminiService = new GeminiService();
export default geminiService;