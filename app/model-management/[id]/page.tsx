"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle, FileText, AlertCircle, Save } from "lucide-react";
import Link from "next/link";

export default function ModelDetailWorkspace() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header Section */}
      <div className="flex items-center justify-between space-y-2">
        <div>
          <div className="flex items-center space-x-4">
            <Link href="/model-management">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight">Retail Cash Structuring Model</h2>
            <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">
              Active Production
            </Badge>
          </div>
          <p className="text-muted-foreground ml-14">
            Version: 3.2 | Owner: John Doe (BSA Officer) | Last Validated: Oct 12, 2025
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save Findings"}
          </Button>
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
            Submit for Approval
          </Button>
        </div>
      </div>

      <Tabs defaultValue="conceptual" className="space-y-4">
        <TabsList>
          <TabsTrigger value="conceptual">Conceptual Soundness</TabsTrigger>
          <TabsTrigger value="limitations">Assumptions & Limitations</TabsTrigger>
          <TabsTrigger value="data">Data Lineage & Mapping</TabsTrigger>
        </TabsList>

        {/* --- CONCEPTUAL SOUNDNESS TAB --- */}
        <TabsContent value="conceptual" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Targeted Typologies</CardTitle>
                <CardDescription>Select the ML/TF risks this model is designed to mitigate based on the Bank&apos;s Risk Assessment.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="typ1" defaultChecked />
                  <Label htmlFor="typ1">Rapid Cash Movement (Velocity)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="typ2" defaultChecked />
                  <Label htmlFor="typ2">Branch Hopping</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="typ3" defaultChecked />
                  <Label htmlFor="typ3">Below-Threshold Aggregation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="typ4" />
                  <Label htmlFor="typ4">Funnel Accounts</Label>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Methodology Review Narrative</CardTitle>
                <CardDescription>Document your independent challenge of the model&apos;s design and mathematical approach.</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Enter your qualitative assessment here..." 
                  className="min-h-[250px]"
                  defaultValue="The model utilizes a standard rules-based approach to aggregate cash deposits across all related accounts within a 30-day rolling window. The methodology aligns with FinCEN guidance on structuring. However, the peer-grouping logic relies on static NAICS codes which may not accurately reflect current customer behavior..."
                />
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Methodology Document v3.2 Linked
                </div>
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  View Bank Methodology PDF
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* --- ASSUMPTIONS & LIMITATIONS TAB --- */}
        <TabsContent value="limitations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Logged Limitations</CardTitle>
              <CardDescription>Tracked management overrides, data proxies, and known blind spots.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start p-4 border rounded-lg bg-amber-50 dark:bg-amber-950/30">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="font-semibold text-amber-900 dark:text-amber-400">ATM Location Proxy</h4>
                    <p className="text-sm text-amber-800 dark:text-amber-500 mt-1">
                      The model assumes all ATM deposits occur at the customer&apos;s primary branch zip code because exact terminal ID location data is currently dropped during the ETL pipeline. This limits geographic anomaly detection.
                    </p>
                    <Badge variant="outline" className="mt-2 bg-white dark:bg-transparent">Impact: Medium</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
