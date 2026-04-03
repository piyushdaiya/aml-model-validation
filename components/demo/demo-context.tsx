"use client"

import * as React from "react"

import { clientEngagements } from "@/lib/demo-data/clients"
import { getModelsForClient, validationModels } from "@/lib/demo-data/models"
import { demoPersonas } from "@/lib/demo-data/personas"
import type { ClientEngagement, DemoPersonaId, ValidationModel } from "@/lib/demo-data/types"

const STORAGE_KEY = "aml-demo-shell-state"

const legacyPersonaIdMap = {
  "compliance-officer": "client-compliance-sponsor",
  "risk-manager": "engagement-lead",
  "model-owner": "client-model-sponsor",
  validator: "validation-lead",
  admin: "platform-admin",
} as const

type DemoShellState = {
  selectedClientId: string
  personaId: DemoPersonaId
  selectedModelId: string
}

type DemoContextValue = DemoShellState & {
  activeClient: ClientEngagement
  activeModel: ValidationModel
  clientModels: ValidationModel[]
  setSelectedClientId: (clientId: string) => void
  setPersonaId: (personaId: DemoPersonaId) => void
  setSelectedModelId: (modelId: string) => void
}

const defaultClient = clientEngagements[0]
const defaultModel = getModelsForClient(defaultClient.id)[0] ?? validationModels[0]

const DemoContext = React.createContext<DemoContextValue | null>(null)

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [selectedClientId, setSelectedClientIdState] = React.useState(defaultClient.id)
  const [personaId, setPersonaIdState] = React.useState<DemoPersonaId>("consulting-partner")
  const [selectedModelId, setSelectedModelIdState] = React.useState(defaultModel.id)

  React.useEffect(() => {
    const rawState = window.localStorage.getItem(STORAGE_KEY)
    if (!rawState) {
      return
    }

    try {
      const parsed = JSON.parse(rawState) as Partial<DemoShellState>

      if (parsed.selectedClientId && clientEngagements.some((client) => client.id === parsed.selectedClientId)) {
        setSelectedClientIdState(parsed.selectedClientId)
      }

      const remappedPersonaId =
        parsed.personaId && parsed.personaId in legacyPersonaIdMap
          ? legacyPersonaIdMap[parsed.personaId as keyof typeof legacyPersonaIdMap]
          : parsed.personaId

      if (remappedPersonaId && demoPersonas.some((persona) => persona.id === remappedPersonaId)) {
        setPersonaIdState(remappedPersonaId)
      }

      if (parsed.selectedModelId && validationModels.some((model) => model.id === parsed.selectedModelId)) {
        setSelectedModelIdState(parsed.selectedModelId)
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const clientModels = React.useMemo(() => {
    const items = getModelsForClient(selectedClientId)
    return items.length > 0 ? items : getModelsForClient(defaultClient.id)
  }, [selectedClientId])

  const activeClient = React.useMemo(
    () => clientEngagements.find((client) => client.id === selectedClientId) ?? defaultClient,
    [selectedClientId]
  )

  const activeModel = React.useMemo(() => {
    return clientModels.find((model) => model.id === selectedModelId) ?? clientModels[0] ?? defaultModel
  }, [clientModels, selectedModelId])

  React.useEffect(() => {
    if (!clientModels.some((model) => model.id === selectedModelId) && clientModels[0]) {
      setSelectedModelIdState(clientModels[0].id)
    }
  }, [clientModels, selectedModelId])

  const persistState = React.useCallback((state: DemoShellState) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [])

  const setSelectedClientId = React.useCallback(
    (clientId: string) => {
      const nextModels = getModelsForClient(clientId)
      const nextModelId = nextModels[0]?.id ?? defaultModel.id
      setSelectedClientIdState(clientId)
      setSelectedModelIdState(nextModelId)
      persistState({
        selectedClientId: clientId,
        personaId,
        selectedModelId: nextModelId,
      })
    },
    [personaId, persistState]
  )

  const setPersonaId = React.useCallback(
    (nextPersonaId: DemoPersonaId) => {
      setPersonaIdState(nextPersonaId)
      persistState({
        selectedClientId,
        personaId: nextPersonaId,
        selectedModelId: activeModel.id,
      })
    },
    [activeModel.id, persistState, selectedClientId]
  )

  const setSelectedModelId = React.useCallback(
    (modelId: string) => {
      setSelectedModelIdState(modelId)
      persistState({
        selectedClientId,
        personaId,
        selectedModelId: modelId,
      })
    },
    [persistState, personaId, selectedClientId]
  )

  const value = React.useMemo<DemoContextValue>(
    () => ({
      selectedClientId,
      personaId,
      selectedModelId: activeModel.id,
      activeClient,
      activeModel,
      clientModels,
      setSelectedClientId,
      setPersonaId,
      setSelectedModelId,
    }),
    [
      activeClient,
      activeModel,
      clientModels,
      personaId,
      selectedClientId,
      setPersonaId,
      setSelectedClientId,
      setSelectedModelId,
    ]
  )

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export function useDemoContext(): DemoContextValue {
  const value = React.useContext(DemoContext)

  if (!value) {
    throw new Error("useDemoContext must be used inside DemoProvider")
  }

  return value
}
