
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "../utils";
import { BarChart3, Upload, TrendingUp, FileText, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: BarChart3,
  },
  {
    title: "Analytics",
    url: createPageUrl("Analytics"),
    icon: TrendingUp,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <>
      <style>{`
        :root {
          --primary-blue: #1e40af;
          --primary-green: #059669;
          --accent-orange: #f59e0b;
          --neutral-50: #f8fafc;
          --neutral-100: #f1f5f9;
          --neutral-800: #1e293b;
          --neutral-600: #475569;
        }
        
        .gradient-bg {
          background: linear-gradient(135deg, var(--neutral-50) 0%, #ffffff 100%);
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      <SidebarProvider>
        <div className="min-h-screen flex w-full gradient-bg">
          <Sidebar className="border-r border-slate-200/60 glass-effect">
            <SidebarHeader className="border-b border-slate-200/60 p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-800 text-lg">BusinessIQ</h2>
                  <p className="text-xs text-slate-500 font-medium">Analytics Platform</p>
                </div>
              </div>
            </SidebarHeader>
            
            <SidebarContent className="p-4">
              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 py-3">
                  Navigation
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-2">
                    {navigationItems.map((item) => {
                      const isActive = location.pathname === item.url;
                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton 
                            asChild 
                            className={`rounded-xl transition-all duration-200 ${
                              isActive 
                                ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' 
                                : 'hover:bg-slate-50 text-slate-600 hover:text-slate-800'
                            }`}
                          >
                            <Link to={item.url} className="flex items-center gap-3 px-4 py-3 font-medium">
                              <item.icon className="w-5 h-5" />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup className="mt-8">
                <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 py-3">
                  Quick Stats
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="px-4 py-3 space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-slate-600">Data files processed</span>
                      <span className="ml-auto font-bold text-slate-800">0</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-slate-600">Insights generated</span>
                      <span className="ml-auto font-bold text-slate-800">0</span>
                    </div>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-slate-200/60 p-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                <div className="w-9 h-9 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">B</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm truncate">Business Owner</p>
                  <p className="text-xs text-slate-500 truncate">Analyze your data</p>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>

          <main className="flex-1 flex flex-col">
            <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 px-6 py-4 md:hidden">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors" />
                <h1 className="text-xl font-bold text-slate-800">BusinessIQ</h1>
              </div>
            </header>

            <div className="flex-1 overflow-auto animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}
