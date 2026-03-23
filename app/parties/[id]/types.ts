// Update the PartyRelationship type to include more relationship types
type PartyRelationshipType =
  | "Parent Company"
  | "Subsidiary"
  | "Affiliate"
  | "Ultimate Beneficial Owner"
  | "Director"
  | "Shareholder"
  | "Primary Owner"
  | "Secondary Owner"
  | "Beneficiary"
  | "Trustee"
  | "Executor"

// Update the PartyRelationship interface
interface PartyRelationship {
  partyId: string
  partyName: string
  type: PartyRelationshipType
  description?: string
  ownershipPercentage?: number
  startDate: string
  status: "Active" | "Inactive"
}

