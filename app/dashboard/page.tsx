"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { Download, AlertTriangle, CheckCircle2, Activity } from "lucide-react";

// --- STORYTELLING MOCK DATA ---
const overviewData = [
  { month: "Jan", totalAlerts: 4200, falsePositives: 3900, sars: 300 },
  { month: "Feb", totalAlerts: 4500, falsePositives: 4150, sars: 350 },
  { month: "Mar", totalAlerts: 5100, falsePositives: 4800, sars: 300 }, // Spike in FPs
];

export default function Dashboard() {
  // State for our interactive BTL Threshold Tuning
  const [velocityThreshold, setVelocityThreshold] = useState([30]);

  // Dynamically calculate chart data based on the slider
  // As threshold drops (fewer days), we catch more alerts, but false positives skyrocket
  const dynamicBtlData = [
    { 
      parameter: "Cash Aggregation", 
      currentAlerts: 5100, 
      projectedAlerts: 5100 + ((30 - velocityThreshold[0]) * 150),
      projectedSARs: 300 + ((30 - velocityThreshold[0]) * 5),
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Validation Workspace</h2>
          <p className="text-muted-foreground">
            Target: Retail Banking Cash Structuring Model v3.2
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export SR 11-7 Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Model Overview</TabsTrigger>
          <TabsTrigger value="btl">Below-the-Line (BTL) Tuning</TabsTrigger>
          <TabsTrigger value="atl">Above-the-Line (ATL) Testing</TabsTrigger>
        </TabsList>

        {/* --- OVERVIEW TAB --- */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Alerts (Q1)</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">13,800</div>
                <p className="text-xs text-muted-foreground">+12% from last quarter</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">SAR Conversion Rate</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6.8%</div>
                <p className="text-xs text-muted-foreground">Below industry benchmark (8%)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Integrity Score</CardTitle>
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.2%</div>
                <p className="text-xs text-muted-foreground">Warning: High NULL rate in Beneficiary fields</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Historical Alert Yield</CardTitle>
              <CardDescription>Ratio of False Positives to Suspicious Activity Reports (SARs)</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={overviewData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="falsePositives" name="False Positives" fill="#94a3b8" stackId="a" />
                  <Bar dataKey="sars" name="SARs Filed" fill="#0f172a" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- BELOW THE LINE TAB (INTERACTIVE) --- */}
        <TabsContent value="btl" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Parameter Tuning</CardTitle>
                <CardDescription>Adjust threshold to simulate BTL capture rates.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium leading-none">Velocity Threshold (Days)</label>
                    <span className="text-sm font-bold">{velocityThreshold[0]} Days</span>
                  </div>
                  <Slider 
                    defaultValue={[30]} 
                    max={30} 
                    min={7} 
                    step={1}
                    value={velocityThreshold}
                    onValueChange={setVelocityThreshold}
                  />
                  <p className="text-xs text-muted-foreground">
                    Lowering the day count tightens the rule, forcing the engine to look for structuring over a shorter period.
                  </p>
                </div>
                <Button className="w-full">Run BTL Simulation</Button>
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Projected Impact</CardTitle>
                <CardDescription>Estimated alerts based on {velocityThreshold[0]}-day threshold.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dynamicBtlData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="parameter" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="currentAlerts" name="Current Baseline Alerts" fill="#cbd5e1" />
                    <Bar dataKey="projectedAlerts" name="Projected New Alerts" fill="#64748b" />
                    <Bar dataKey="projectedSARs" name="Projected Hidden SARs (BTL Catch)" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* --- ABOVE THE LINE TAB --- */}
        <TabsContent value="atl" className="space-y-4">
           <Card>
              <CardHeader>
                <CardTitle>Replication Testing (Accuracy)</CardTitle>
                <CardDescription>Validating the bank&apos;s generated alerts against the raw extraction.</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                    <p className="text-sm text-muted-foreground">ATL Replication Engine Results will render here.</p>
                 </div>
              </CardContent>
           </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
