"use client"

import { Button } from "@/components/ui/button"

import type React from "react"

import { useMutation } from "@/hooks/use-mutation"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

interface PartyFormData {
  name: string
  type: string
  // ... other fields
}

export default function PartyForm() {
  const router = useRouter()
  const { mutate, loading } = useMutation<{ id: string }, PartyFormData>("/api/parties", {
    onSuccess: ({ id }) => {
      toast({
        title: "Success",
        description: "Party created successfully",
      })
      router.push(`/parties/${id}`)
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    },
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    await mutate({
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      // ... other fields
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Party"}
      </Button>
    </form>
  )
}

