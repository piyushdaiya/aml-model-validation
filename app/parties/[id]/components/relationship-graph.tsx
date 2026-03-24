"use client"

import { useCallback, useRef, useState } from "react"
import ForceGraph2D from "react-force-graph-2d"
import type { ForceGraphMethods } from "react-force-graph-2d"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Node = {
  id: string
  name: string
  type: "party" | "account"
  subType?: string
  status: string
  x?: number
  y?: number
  __indexColor?: string
  vx?: number
  vy?: number
  index?: number
}

type Link = {
  source: string | Node
  target: string | Node
  type: string
  description?: string
}

type GraphData = {
  nodes: Node[]
  links: Link[]
}

const NODE_COLORS = {
  party: "#2563eb", // blue-600
  account: "#16a34a", // green-600
}

const RELATIONSHIP_COLORS = {
  "Parent Company": "#f97316", // orange-500
  Subsidiary: "#8b5cf6", // violet-500
  Affiliate: "#06b6d4", // cyan-500
  "Ultimate Beneficial Owner": "#ef4444", // red-500
  Director: "#f59e0b", // amber-500
  Shareholder: "#10b981", // emerald-500
  "Primary Owner": "#6366f1", // indigo-500
  "Secondary Owner": "#8b5cf6", // violet-500
  Beneficiary: "#ec4899", // pink-500
  Trustee: "#14b8a6", // teal-500
  Executor: "#8b5cf6", // violet-500
}

export function RelationshipGraph({ data }: { data: GraphData }) {
  const [highlightNodes, setHighlightNodes] = useState(new Set<string>())
  const [highlightLinks, setHighlightLinks] = useState(new Set<string>())
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const graphRef = useRef<ForceGraphMethods<Node, Link> | undefined>(undefined)

  const updateHighlight = useCallback(() => {
    setHighlightNodes(new Set(selectedNode ? [selectedNode.id] : []))
    setHighlightLinks(new Set())
  }, [selectedNode])

  const handleNodeClick = useCallback((node: Node) => {
    setSelectedNode(node)
    if (graphRef.current) {
      const distance = 200
      graphRef.current.centerAt(node.x, node.y, 1000)
      graphRef.current.zoom(2, 1000)
    }
  }, [])

  // Generate unique relationship types for legend
  const relationshipTypes = Array.from(new Set(data.links.map((link) => link.type)))

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge variant="outline" className="bg-blue-100">
                Parties
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Party nodes in the network</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge variant="outline" className="bg-green-100">
                Accounts
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Account nodes in the network</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex flex-wrap gap-2">
        {relationshipTypes.map((type) => (
          <TooltipProvider key={type}>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant="outline"
                  style={{
                    backgroundColor: `${RELATIONSHIP_COLORS[type as keyof typeof RELATIONSHIP_COLORS]}20`,
                    color: RELATIONSHIP_COLORS[type as keyof typeof RELATIONSHIP_COLORS],
                  }}
                >
                  {type}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{type} relationship</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>

      <Card className="relative h-[600px] overflow-hidden">
        <div className="h-full w-full">
          <ForceGraph2D
            ref={graphRef}
            graphData={data}
            nodeId="id"
            nodeLabel="name"
            nodeCanvasObject={(node: Node, ctx: CanvasRenderingContext2D, globalScale: number) => {
              const label = node.name
              const fontSize = 12 / globalScale
              ctx.font = `${fontSize}px Inter`
              ctx.textAlign = "center"
              ctx.textBaseline = "middle"

              // Draw node circle
              ctx.beginPath()
              ctx.arc(node.x!, node.y!, 4, 0, 2 * Math.PI)
              ctx.fillStyle = NODE_COLORS[node.type as keyof typeof NODE_COLORS]
              ctx.fill()

              // Draw text background for better readability
              const textWidth = ctx.measureText(label).width
              ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
              ctx.fillRect(node.x! - textWidth / 2 - 2, node.y! + 6, textWidth + 4, fontSize + 2)

              // Draw text
              ctx.fillStyle = node.type === "party" ? "#1e40af" : "#166534" // blue-800 : green-800
              ctx.fillText(label, node.x!, node.y! + fontSize)
            }}
            nodePointerAreaPaint={(node: Node, color: string, ctx: CanvasRenderingContext2D) => {
              ctx.beginPath()
              ctx.arc(node.x!, node.y!, 6, 0, 2 * Math.PI)
              ctx.fillStyle = color
              ctx.fill()
            }}
            linkLabel={(link: Link) => link.type}
            linkCanvasObject={(link: Link, ctx: CanvasRenderingContext2D, globalScale: number) => {
              const start = link.source
              const end = link.target

              if (typeof start === "string" || typeof end === "string") {
                return
              }

              // Calculate the middle point of the link
              const startX = start.x ?? 0
              const startY = start.y ?? 0
              const endX = end.x ?? 0
              const endY = end.y ?? 0
              const middleX = startX + (endX - startX) / 2
              const middleY = startY + (endY - startY) / 2

              // Draw the relationship type text
              const label = link.type
              const fontSize = 10 / globalScale
              ctx.font = `${fontSize}px Inter`
              ctx.textAlign = "center"
              ctx.textBaseline = "middle"

              // Draw text background
              const textWidth = ctx.measureText(label).width
              ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
              ctx.fillRect(middleX - textWidth / 2 - 2, middleY - fontSize / 2 - 1, textWidth + 4, fontSize + 2)

              // Draw text
              ctx.fillStyle = RELATIONSHIP_COLORS[link.type as keyof typeof RELATIONSHIP_COLORS]
              ctx.fillText(label, middleX, middleY)
            }}
            linkDirectionalArrowLength={3.5}
            linkDirectionalArrowRelPos={1}
            linkCurvature={0.25}
            nodeRelSize={6}
            linkWidth={2}
            onNodeClick={handleNodeClick}
            cooldownTicks={100}
            onEngineStop={() => {
              if (graphRef.current) {
                graphRef.current.zoomToFit(400, 50)
              }
            }}
            backgroundColor="rgba(255, 255, 255, 0)"
            dagMode="radialout"
            dagLevelDistance={100}
          />
        </div>
        {selectedNode && (
          <div className="absolute bottom-4 right-4 p-4 bg-background/95 border rounded-lg shadow-lg max-w-xs">
            <h4 className="font-semibold mb-2">{selectedNode.name}</h4>
            <div className="space-y-1">
              <p className="text-sm">
                Type: <Badge variant="outline">{selectedNode.type}</Badge>
              </p>
              {selectedNode.subType && (
                <p className="text-sm">
                  Sub-type: <Badge variant="outline">{selectedNode.subType}</Badge>
                </p>
              )}
              <p className="text-sm">
                Status: <Badge>{selectedNode.status}</Badge>
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
