import Link from "next/link"
// Update references to entity in the Alert type and UI
type Alert = {
  id: string
  name: string
  type: string
  status: "Open" | "In Progress" | "Closed"
  priority: "Low" | "Medium" | "High"
  assignee: string
  createdAt: string
  description: string
  partyId: string // Changed from entityId
  partyName: string // Changed from entityName
  createdBy: CreationType
  creationInfo: {
    userName?: string
    ruleName?: string
    modelName?: string
  }
}

type CreationType = "User" | "Rule" | "Model"

// Update the link in the component
;<Link href={`/parties/${alert.partyId}`} className="text-primary hover:underline">
  {alert.partyName}
</Link>

