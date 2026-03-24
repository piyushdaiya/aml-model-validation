"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, HelpCircle, Bell, BarChart, LineChart, PieChart } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "../../components/theme-toggle"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type MLModel = {
  id: string
  name: string
  description: string
  version: string
  type: "Classification" | "Regression" | "Clustering"
  format: "TensorFlow" | "PyTorch" | "Scikit-learn"
  lastUpdated: string
  parameters: {
    [key: string]: string | number
  }
  features: string[]
  performance: {
    accuracy: number
    precision: number
    recall: number
    f1Score: number
  }
}

const mlModels: MLModel[] = [
  {
    id: "ML-001",
    name: "Transaction Fraud Detector",
    description: "Detects potentially fraudulent transactions using historical data",
    version: "1.2.0",
    type: "Classification",
    format: "TensorFlow",
    lastUpdated: "2024-08-30 10:15:00",
    parameters: {
      learning_rate: 0.001,
      batch_size: 32,
      epochs: 100,
      hidden_layers: 3,
      neurons_per_layer: 64,
    },
    features: [
      "transaction_amount",
      "transaction_time",
      "merchant_category",
      "location",
      "device_type",
      "user_age",
      "account_age",
    ],
    performance: {
      accuracy: 0.95,
      precision: 0.92,
      recall: 0.89,
      f1Score: 0.905,
    },
  },
  {
    id: "ML-002",
    name: "Customer Risk Scorer",
    description: "Assigns risk scores to customers based on their profile and activity",
    version: "2.0.1",
    type: "Regression",
    format: "Scikit-learn",
    lastUpdated: "2024-08-29 14:30:00",
    parameters: {
      n_estimators: 100,
      max_depth: 10,
      min_samples_split: 2,
      min_samples_leaf: 1,
    },
    features: [
      "age",
      "income",
      "credit_score",
      "employment_status",
      "transaction_history",
      "account_balance",
      "number_of_products",
    ],
    performance: {
      accuracy: 0.88,
      precision: 0.85,
      recall: 0.82,
      f1Score: 0.835,
    },
  },
  {
    id: "ML-003",
    name: "AML Pattern Recognizer",
    description: "Identifies patterns in transaction data that may indicate money laundering",
    version: "0.9.5",
    type: "Clustering",
    format: "PyTorch",
    lastUpdated: "2024-08-28 09:45:00",
    parameters: {
      n_clusters: 5,
      learning_rate: 0.01,
      batch_size: 64,
      epochs: 50,
    },
    features: [
      "transaction_frequency",
      "transaction_amount",
      "cross_border_activity",
      "account_type",
      "customer_risk_score",
      "transaction_pattern",
      "beneficiary_count",
    ],
    performance: {
      accuracy: 0.91,
      precision: 0.89,
      recall: 0.87,
      f1Score: 0.88,
    },
  },
]

export default function MLModelDetails() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const model = mlModels.find((item) => item.id === params.id) ?? null

  if (!model) {
    return <div>Model not found</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex items-center h-14 gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">ML Model Details</h1>
          <span className="text-muted-foreground">Max K.</span>
          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-02%20at%2011.08.45%E2%80%AFAM-AffLYlH3E3alKZzLeiso0Ng8V9QC0h.png"
                alt="User avatar"
              />
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">{model.name}</h2>
          <p className="text-sm text-muted-foreground">Model ID: {model.id}</p>
        </div>

        <Tabs defaultValue="info" className="space-y-4">
          <TabsList>
            <TabsTrigger value="info">Model Information</TabsTrigger>
            <TabsTrigger value="features">Model Features</TabsTrigger>
            <TabsTrigger value="performance">Model Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Model Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Description</dt>
                      <dd className="text-sm">{model.description}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Version</dt>
                      <dd className="text-sm font-semibold">{model.version}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Type</dt>
                      <dd className="text-sm font-semibold">{model.type}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Format</dt>
                      <dd className="text-sm font-semibold">{model.format}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Last Updated</dt>
                      <dd className="text-sm font-semibold">{model.lastUpdated}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Model Parameters</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-2 gap-4">
                    {Object.entries(model.parameters).map(([key, value]) => (
                      <div key={key}>
                        <dt className="text-sm font-medium text-muted-foreground">{key}</dt>
                        <dd className="text-sm font-semibold">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>Model Features</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Feature Name</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {model.features.map((feature, index) => (
                      <TableRow key={index}>
                        <TableCell>{feature}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Accuracy</dt>
                      <dd className="text-2xl font-semibold">{(model.performance.accuracy * 100).toFixed(2)}%</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Precision</dt>
                      <dd className="text-2xl font-semibold">{(model.performance.precision * 100).toFixed(2)}%</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Recall</dt>
                      <dd className="text-2xl font-semibold">{(model.performance.recall * 100).toFixed(2)}%</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">F1 Score</dt>
                      <dd className="text-2xl font-semibold">{(model.performance.f1Score * 100).toFixed(2)}%</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Graphs</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2">
                    <BarChart className="h-6 w-6 text-primary" />
                    <span>Confusion Matrix</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LineChart className="h-6 w-6 text-primary" />
                    <span>Lift Curve Plot</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PieChart className="h-6 w-6 text-primary" />
                    <span>ROC Curve</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Note: Actual graphs would be displayed here. These are placeholders for visualization types.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button variant="outline" onClick={() => router.push("/ml-model-management")}>
            Back to ML Model Management
          </Button>
        </div>
      </main>
    </div>
  )
}
