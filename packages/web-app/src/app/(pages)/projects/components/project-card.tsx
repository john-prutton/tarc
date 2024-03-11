"use client"

import { Loader2Icon, XIcon } from "lucide-react"
import { useFormStatus } from "react-dom"

import { Project } from "@repo/domain/entities"

import { Button } from "@/components/ui/button"

import type { tryDeleteProject } from "../actions"

export function ProjectCard({
  project,
  deleteAction
}: {
  project: Project.Entity
  deleteAction: typeof tryDeleteProject
}) {
  return (
    <div className="item-center flex w-full flex-row gap-2">
      <div className="grid flex-1 place-items-center rounded-md border bg-white">
        <span className="">{project.name}</span>
      </div>

      <form action={() => deleteAction(project.id)}>
        <SubmitButton />
      </form>
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button variant={"destructive"} disabled={pending}>
      {!pending ? <XIcon /> : <Loader2Icon className="animate-spin" />}
    </Button>
  )
}
