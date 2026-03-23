"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, HelpCircle, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "../../components/theme-toggle"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Model = {
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

const mlModels: Model[] = [
  {
    id: "MDL-001",
    name: "Transaction Monitoring Model v1",
    description: "This model monitors transactions for suspicious activity.",
    type: "Classification",
    format: "TensorFlow",
    version: "1.0",
    lastUpdated: "2024-08-30 10:15:00",
    parameters: {
      threshold: 0.8,
      batchSize: 32,
    },
    features: ["transactionAmount", "location", "timeOfDay"],
    performance: {
      accuracy: 0.95,
      precision: 0.92,
      recall: 0.9,
      f1Score: 0.91,
    },
  },
  {
    id: "MDL-002",
    name: "Customer Risk Model v2",
    description: "This model assesses the risk associated with each customer.",
    type: "Regression",
    format: "PyTorch",
    version: "2.0",
    lastUpdated: "2024-09-15 14:30:00",
    parameters: {
      learningRate: 0.001,
      epochs: 100,
    },
    features: ["age", "income", "creditScore"],
    performance: {
      accuracy: 0.88,
      precision: 0.85,
      recall: 0.82,
      f1Score: 0.83,
    },
  },
  {
    id: "MDL-003",
    name: "Sanctions Screening Model v3",
    description: "This model screens transactions against sanctions lists.",
    type: "Classification",
    format: "Scikit-learn",
    version: "3.0",
    lastUpdated: "2024-10-01 09:00:00",
    parameters: {
      penalty: "l1",
      C: 1.0,
    },
    features: ["name", "address", "country"],
    performance: {
      accuracy: 0.97,
      precision: 0.95,
      recall: 0.94,
      f1Score: 0.94,
    },
  },
]

// Updated ConfusionMatrix component
const ConfusionMatrix = ({ data }: { data: number[][] }) => {
  const maxValue = Math.max(...data.flat())
  const getColor = (value: number) => {
    const intensity = value / maxValue
    return `rgb(255, ${Math.round(255 * (1 - intensity))}, ${Math.round(255 * (1 - intensity))})`
  }

  const totalSamples = data.flat().reduce((sum, val) => sum + val, 0)

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2" colSpan={2} rowSpan={2}></th>
            <th className="border p-2 text-center" colSpan={2}>
              Predicted
            </th>
          </tr>
          <tr>
            <th className="border p-2 text-center">Negative</th>
            <th className="border p-2 text-center">Positive</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {rowIndex === 0 && (
                <th className="border p-2 text-center" rowSpan={2}>
                  Actual
                </th>
              )}
              <th className="border p-2 text-center">{rowIndex === 0 ? "Negative" : "Positive"}</th>
              {row.map((value, colIndex) => (
                <td
                  key={colIndex}
                  className="border p-2 text-center font-bold text-white"
                  style={{ backgroundColor: getColor(value) }}
                >
                  <div>{value}</div>
                  <div className="text-xs">({((value / totalSamples) * 100).toFixed(1)}%)</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Summary of Confusion Matrix results:</p>
        <ul className="list-disc list-inside mt-2">
          <li>
            True Negatives: {data[0][0]} ({((data[0][0] / totalSamples) * 100).toFixed(2)}%)
          </li>
          <li>
            False Positives: {data[0][1]} ({((data[0][1] / totalSamples) * 100).toFixed(2)}%)
          </li>
          <li>
            False Negatives: {data[1][0]} ({((data[1][0] / totalSamples) * 100).toFixed(2)}%)
          </li>
          <li>
            True Positives: {data[1][1]} ({((data[1][1] / totalSamples) * 100).toFixed(2)}%)
          </li>
        </ul>
        <p className="mt-2">
          The model correctly identified {data[0][0] + data[1][1]} out of {totalSamples} samples (
          {(((data[0][0] + data[1][1]) / totalSamples) * 100).toFixed(2)}% accuracy).
        </p>
      </div>
    </div>
  )
}

export default function ModelDetails() {
  const params = useParams()
  const router = useRouter()
  const [model, setModel] = useState<Model | null>(null)

  // Generate random confusion matrix data
  const [confusionMatrix, setConfusionMatrix] = useState<number[][]>([])

  useEffect(() => {
    const foundModel = mlModels.find((m) => m.id === params.id)
    if (foundModel) {
      setModel(foundModel)
      // Generate random confusion matrix data
      setConfusionMatrix([
        [Math.floor(Math.random() * 1000), Math.floor(Math.random() * 100)],
        [Math.floor(Math.random() * 100), Math.floor(Math.random() * 1000)],
      ])
    }
  }, [params.id])

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
          <h1 className="text-lg font-semibold">Model Details</h1>
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
            <TabsTrigger value="confusion-matrix">Confusion Matrix</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Model Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Description</dt>
                    <dd className="text-2xl font-semibold">{model.description}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Version</dt>
                    <dd className="text-2xl font-semibold">{model.version}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Type</dt>
                    <dd className="text-2xl font-semibold">{model.type}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Format</dt>
                    <dd className="text-2xl font-semibold">{model.format}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Last Updated</dt>
                    <dd className="text-2xl font-semibold">{model.lastUpdated}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
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
                      <TableHead>Feature</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {model.features.map((feature) => (
                      <TableRow key={feature}>
                        <TableCell>{feature}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Model Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Accuracy</dt>
                    <dd className="text-2xl font-semibold">{model.performance.accuracy}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Precision</dt>
                    <dd className="text-2xl font-semibold">{model.performance.precision}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Recall</dt>
                    <dd className="text-2xl font-semibold">{model.performance.recall}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">F1 Score</dt>
                    <dd className="text-2xl font-semibold">{model.performance.f1Score}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="confusion-matrix">
            <Card>
              <CardHeader>
                <CardTitle>Confusion Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <ConfusionMatrix data={confusionMatrix} />
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>This confusion matrix shows the model's performance in classifying suspicious activities:</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>True Negatives (top-left): Correctly identified legitimate transactions</li>
                    <li>False Positives (top-right): Incorrectly flagged legitimate transactions as suspicious</li>
                    <li>False Negatives (bottom-left): Missed suspicious transactions</li>
                    <li>True Positives (bottom-right): Correctly identified suspicious transactions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button variant="outline" onClick={() => router.push("/model-management")}>
            Back to Model Management
          </Button>
        </div>
      </main>
    </div>
  )
}

