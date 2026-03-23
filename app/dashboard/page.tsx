"use client"
import { ArrowLeft, HelpCircle, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "../components/theme-toggle"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define riskClasses here
const riskClasses = ["Very High", "High", "Medium", "Low"]

// ... (keep the existing imports and color definitions)

const colors = ["#FFB3BA", "#BAFFC9", "#BAE1FF", "#FFFFBA", "#FFD9BA", "#E5BAFF"]

// ... (keep the existing chart components)

const generateRandomData = (categories: string[], max: number) => {
  return categories.map((category) => ({
    name: category,
    value: Math.floor(Math.random() * max) + 1,
  }))
}

const PartiesByRiskClass = () => {
  const data = generateRandomData(riskClasses, 100)
  const customColors = ["#FFB3BA", "#BAFFC9", "#BAE1FF", "#FFFFBA"]
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={customColors[index % customColors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

const AlertsByCaseChart = ({ title }: { title: string }) => {
  const data = riskClasses.map((riskClass) => ({
    name: riskClass,
    Open: Math.floor(Math.random() * 50) + 1,
    Closed: Math.floor(Math.random() * 50) + 1,
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Open" fill={colors[0]} />
        <Bar dataKey="Closed" fill={colors[1]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

const SARsByRiskClass = () => {
  const data = generateRandomData(riskClasses, 50)
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill={colors[2]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

const ModelPerformanceByRiskClass = () => {
  const models = ["Model A", "Model B", "Model C"]
  const data = riskClasses.map((riskClass) => {
    const entry: any = { name: riskClass }
    models.forEach((model) => {
      entry[`${model} SAR Alerts`] = Math.floor(Math.random() * 30) + 1
      entry[`${model} Effective Alerts`] = Math.floor(Math.random() * 50) + 1
      entry[`${model} Ineffective Alerts`] = Math.floor(Math.random() * 20) + 1
    })
    return entry
  })

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {models.map((model, index) => [
          <Bar
            key={`${model}-sar`}
            dataKey={`${model} SAR Alerts`}
            stackId={model}
            fill={colors[index * 3]}
            name={`${model} - SAR Alerts`}
          />,
          <Bar
            key={`${model}-effective`}
            dataKey={`${model} Effective Alerts`}
            stackId={model}
            fill={colors[index * 3 + 1]}
            name={`${model} - Effective Alerts`}
          />,
          <Bar
            key={`${model}-ineffective`}
            dataKey={`${model} Ineffective Alerts`}
            stackId={model}
            fill={colors[index * 3 + 2]}
            name={`${model} - Ineffective Alerts`}
          />,
        ])}
      </BarChart>
    </ResponsiveContainer>
  )
}

// Update the RulePerformanceByRiskClass component
const RulePerformanceByRiskClass = () => {
  const data = riskClasses.map((riskClass) => ({
    name: riskClass,
    "SAR Alerts": Math.floor(Math.random() * 30) + 1,
    "Effective Alerts": Math.floor(Math.random() * 50) + 1,
    "Ineffective Alerts": Math.floor(Math.random() * 20) + 1,
  }))

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: "Alerts Count", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="SAR Alerts" stackId="a" fill={colors[0]} />
        <Bar dataKey="Effective Alerts" stackId="a" fill={colors[1]} />
        <Bar dataKey="Ineffective Alerts" stackId="a" fill={colors[2]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

// Update the MLModelPerformanceByRiskClass component
const MLModelPerformanceByRiskClass = () => {
  const models = ["Model A", "Model B", "Model C"]
  const data = riskClasses.map((riskClass) => {
    const entry: any = { name: riskClass }
    models.forEach((model) => {
      entry[`${model} SAR Alerts`] = Math.floor(Math.random() * 30) + 1
      entry[`${model} Effective Alerts`] = Math.floor(Math.random() * 50) + 1
      entry[`${model} Ineffective Alerts`] = Math.floor(Math.random() * 20) + 1
    })
    return entry
  })

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: "Alerts Count", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        {models.map((model, index) => [
          <Bar
            key={`${model}-sar`}
            dataKey={`${model} SAR Alerts`}
            stackId={model}
            fill={colors[index * 3]}
            name={`${model} - SAR Alerts`}
          />,
          <Bar
            key={`${model}-effective`}
            dataKey={`${model} Effective Alerts`}
            stackId={model}
            fill={colors[index * 3 + 1]}
            name={`${model} - Effective Alerts`}
          />,
          <Bar
            key={`${model}-ineffective`}
            dataKey={`${model} Ineffective Alerts`}
            stackId={model}
            fill={colors[index * 3 + 2]}
            name={`${model} - Ineffective Alerts`}
          />,
        ])}
      </BarChart>
    </ResponsiveContainer>
  )
}

const UpdatedModelPerformanceByRiskClass = () => {
  const models = ["Model A", "Model B", "Model C"]
  const data = riskClasses.flatMap((riskClass) =>
    models.map((model) => ({
      name: `${model} - ${riskClass}`,
      "SAR Alerts": Math.floor(Math.random() * 30) + 1,
      "Effective Alerts": Math.floor(Math.random() * 50) + 1,
      "Ineffective Alerts": Math.floor(Math.random() * 20) + 1,
    })),
  )

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="SAR Alerts" fill={colors[0]} />
        <Bar dataKey="Effective Alerts" fill={colors[1]} />
        <Bar dataKey="Ineffective Alerts" fill={colors[2]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

// Update the AboveLineTesting component
const AboveLineTesting = () => {
  const generateModelData = (versions: number) => {
    return Array.from({ length: versions }, (_, i) => ({
      version: `v${i + 1}`,
      "SAR Alerts": Math.floor(Math.random() * 50) + 10,
      "Effective Alerts": Math.floor(Math.random() * 100) + 20,
      "Ineffective Alerts": Math.floor(Math.random() * 30) + 5,
      accuracy: Math.random() * 0.2 + 0.7,
      precision: Math.random() * 0.2 + 0.7,
      recall: Math.random() * 0.2 + 0.7,
    }))
  }

  const modelAData = generateModelData(5)
  const modelBData = generateModelData(5)
  const modelCData = generateModelData(5)

  const alertTypes = ["SAR Alerts", "Effective Alerts", "Ineffective Alerts"]
  const alertColors = ["#f59e0b", "#10b981", "#ef4444"] // amber, emerald, red

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Model A - Above Line Testing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={modelAData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="version" />
              <YAxis label={{ value: "Number of Alerts", angle: -90, position: "insideLeft" }} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const total = payload.reduce((sum, entry) => sum + (entry.value as number), 0)
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <p className="font-medium mb-2">{`Version ${label}`}</p>
                        {payload.map((entry, index) => (
                          <p key={index} style={{ color: entry.color }} className="text-sm">
                            {`${entry.name}: ${entry.value} (${(((entry.value as number) / total) * 100).toFixed(1)}%)`}
                          </p>
                        ))}
                        <p className="text-sm font-medium mt-2 border-t pt-2">{`Total: ${total}`}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              {alertTypes.map((type, index) => (
                <Bar key={type} dataKey={type} stackId="a" fill={alertColors[index]} name={type} />
              ))}
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={modelAData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="version" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="accuracy" stroke="#2563eb" name="Accuracy" />
              <Line type="monotone" dataKey="precision" stroke="#16a34a" name="Precision" />
              <Line type="monotone" dataKey="recall" stroke="#9333ea" name="Recall" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Model B - Above Line Testing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={modelBData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="version" />
              <YAxis label={{ value: "Number of Alerts", angle: -90, position: "insideLeft" }} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const total = payload.reduce((sum, entry) => sum + (entry.value as number), 0)
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <p className="font-medium mb-2">{`Version ${label}`}</p>
                        {payload.map((entry, index) => (
                          <p key={index} style={{ color: entry.color }} className="text-sm">
                            {`${entry.name}: ${entry.value} (${(((entry.value as number) / total) * 100).toFixed(1)}%)`}
                          </p>
                        ))}
                        <p className="text-sm font-medium mt-2 border-t pt-2">{`Total: ${total}`}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              {alertTypes.map((type, index) => (
                <Bar key={type} dataKey={type} stackId="a" fill={alertColors[index]} name={type} />
              ))}
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={modelBData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="version" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="accuracy" stroke="#2563eb" name="Accuracy" />
              <Line type="monotone" dataKey="precision" stroke="#16a34a" name="Precision" />
              <Line type="monotone" dataKey="recall" stroke="#9333ea" name="Recall" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Model C - Above Line Testing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={modelCData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="version" />
              <YAxis label={{ value: "Number of Alerts", angle: -90, position: "insideLeft" }} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const total = payload.reduce((sum, entry) => sum + (entry.value as number), 0)
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <p className="font-medium mb-2">{`Version ${label}`}</p>
                        {payload.map((entry, index) => (
                          <p key={index} style={{ color: entry.color }} className="text-sm">
                            {`${entry.name}: ${entry.value} (${(((entry.value as number) / total) * 100).toFixed(1)}%)`}
                          </p>
                        ))}
                        <p className="text-sm font-medium mt-2 border-t pt-2">{`Total: ${total}`}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              {alertTypes.map((type, index) => (
                <Bar key={type} dataKey={type} stackId="a" fill={alertColors[index]} name={type} />
              ))}
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={modelCData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="version" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="accuracy" stroke="#2563eb" name="Accuracy" />
              <Line type="monotone" dataKey="precision" stroke="#16a34a" name="Precision" />
              <Line type="monotone" dataKey="recall" stroke="#9333ea" name="Recall" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

// Update the BelowLineTesting component
const BelowLineTesting = () => {
  const generateModelData = (versions: number) => {
    return Array.from({ length: versions }, (_, i) => ({
      version: `v${i + 1}`,
      "SAR Alerts": Math.floor(Math.random() * 50) + 10,
      "Effective Alerts": Math.floor(Math.random() * 100) + 20,
      "Ineffective Alerts": Math.floor(Math.random() * 30) + 5,
      falsePositiveRate: Math.random() * 0.1,
      falseNegativeRate: Math.random() * 0.1,
      f1Score: Math.random() * 0.2 + 0.7,
    }))
  }

  const modelAData = generateModelData(5)
  const modelBData = generateModelData(5)
  const modelCData = generateModelData(5)

  const alertTypes = ["SAR Alerts", "Effective Alerts", "Ineffective Alerts"]
  const alertColors = ["#f59e0b", "#10b981", "#ef4444"] // amber, emerald, red

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Model A - Below Line Testing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={modelAData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="version" />
              <YAxis label={{ value: "Number of Alerts", angle: -90, position: "insideLeft" }} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const total = payload.reduce((sum, entry) => sum + (entry.value as number), 0)
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <p className="font-medium mb-2">{`Version ${label}`}</p>
                        {payload.map((entry, index) => (
                          <p key={index} style={{ color: entry.color }} className="text-sm">
                            {`${entry.name}: ${entry.value} (${(((entry.value as number) / total) * 100).toFixed(1)}%)`}
                          </p>
                        ))}
                        <p className="text-sm font-medium mt-2 border-t pt-2">{`Total: ${total}`}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              {alertTypes.map((type, index) => (
                <Bar key={type} dataKey={type} stackId="a" fill={alertColors[index]} name={type} />
              ))}
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={modelAData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="version" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="falsePositiveRate" stroke="#ef4444" name="False Positive Rate" />
              <Line type="monotone" dataKey="falseNegativeRate" stroke="#f59e0b" name="False Negative Rate" />
              <Line type="monotone" dataKey="f1Score" stroke="#2563eb" name="F1 Score" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Model B - Below Line Testing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={modelBData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="version" />
              <YAxis label={{ value: "Number of Alerts", angle: -90, position: "insideLeft" }} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const total = payload.reduce((sum, entry) => sum + (entry.value as number), 0)
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <p className="font-medium mb-2">{`Version ${label}`}</p>
                        {payload.map((entry, index) => (
                          <p key={index} style={{ color: entry.color }} className="text-sm">
                            {`${entry.name}: ${entry.value} (${(((entry.value as number) / total) * 100).toFixed(1)}%)`}
                          </p>
                        ))}
                        <p className="text-sm font-medium mt-2 border-t pt-2">{`Total: ${total}`}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              {alertTypes.map((type, index) => (
                <Bar key={type} dataKey={type} stackId="a" fill={alertColors[index]} name={type} />
              ))}
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={modelBData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="version" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="falsePositiveRate" stroke="#ef4444" name="False Positive Rate" />
              <Line type="monotone" dataKey="falseNegativeRate" stroke="#f59e0b" name="False Negative Rate" />
              <Line type="monotone" dataKey="f1Score" stroke="#2563eb" name="F1 Score" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Model C - Below Line Testing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={modelCData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="version" />
              <YAxis label={{ value: "Number of Alerts", angle: -90, position: "insideLeft" }} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const total = payload.reduce((sum, entry) => sum + (entry.value as number), 0)
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <p className="font-medium mb-2">{`Version ${label}`}</p>
                        {payload.map((entry, index) => (
                          <p key={index} style={{ color: entry.color }} className="text-sm">
                            {`${entry.name}: ${entry.value} (${(((entry.value as number) / total) * 100).toFixed(1)}%)`}
                          </p>
                        ))}
                        <p className="text-sm font-medium mt-2 border-t pt-2">{`Total: ${total}`}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              {alertTypes.map((type, index) => (
                <Bar key={type} dataKey={type} stackId="a" fill={alertColors[index]} name={type} />
              ))}
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={modelCData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="version" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="falsePositiveRate" stroke="#ef4444" name="False Positive Rate" />
              <Line type="monotone" dataKey="falseNegativeRate" stroke="#f59e0b" name="False Negative Rate" />
              <Line type="monotone" dataKey="f1Score" stroke="#2563eb" name="F1 Score" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <header className="border-b bg-card" role="banner">
        <div className="container flex items-center h-14 gap-4">
          <Button variant="ghost" size="icon" aria-label="Go back">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <span className="text-muted-foreground">Max K.</span>
          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon" aria-label="Help">
              <HelpCircle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Notifications">
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

      <main id="main-content" className="container py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Dashboard Overview</h2>
          <p className="text-sm text-muted-foreground">Key metrics and visualizations</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="above-line">Above Line Testing</TabsTrigger>
            <TabsTrigger value="below-line">Below Line Testing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Parties by Risk Class</CardTitle>
                </CardHeader>
                <CardContent>
                  <PartiesByRiskClass />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alerts by Risk Class</CardTitle>
                </CardHeader>
                <CardContent>
                  <AlertsByCaseChart title="Alerts" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cases by Risk Class</CardTitle>
                </CardHeader>
                <CardContent>
                  <AlertsByCaseChart title="Cases" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SARs by Risk Class</CardTitle>
                </CardHeader>
                <CardContent>
                  <SARsByRiskClass />
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Model Performance by Risk Class</CardTitle>
                </CardHeader>
                <CardContent>
                  <ModelPerformanceByRiskClass />
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Rule Performance by Risk Class</CardTitle>
                </CardHeader>
                <CardContent>
                  <RulePerformanceByRiskClass />
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>ML Model Performance by Risk Class</CardTitle>
                </CardHeader>
                <CardContent>
                  <MLModelPerformanceByRiskClass />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="above-line">
            <AboveLineTesting />
          </TabsContent>

          <TabsContent value="below-line">
            <BelowLineTesting />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

