"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/shared/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import {
  createWorkspaceSchema,
  slugify,
  type CreateWorkspaceValues,
} from "./create-wsp-schema"
import { Spinner } from "../myui/spinner"
import { CircularSpinner } from "../myui/circular-spinner"

function CreateWorkspaceDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  // Tracks whether the user has manually edited the slug. Once they have, we
  // stop auto-generating it from the name.
  const [slugEdited, setSlugEdited] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateWorkspaceValues>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: { name: "", slug: "" },
  })

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      reset()
      setSlugEdited(false)
    }
    onOpenChange(next)
  }

  const onSubmit = (values: CreateWorkspaceValues) => {
    // No backend yet. The created workspace is just logged for now.
    console.log("Create workspace", values)
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="data-open:zoom-in-150! data-closed:zoom-out-150 duration-300 [[data-slot=dialog-overlay]:has(~_&)]:duration-300">
        <DialogHeader>
          <DialogTitle>Create workspace</DialogTitle>
          <DialogDescription>
            Workspaces group your applications and team.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          noValidate
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="wsp-name">Name</Label>
            <Input
              id="wsp-name"
              placeholder="Acme Inc"
              aria-invalid={!!errors.name}
              {...register("name", {
                onChange: (event) => {
                  // Auto-generate the slug until the user edits it themselves.
                  if (!slugEdited) {
                    setValue("slug", slugify(event.target.value), {
                      shouldValidate: false,
                    })
                  }
                },
              })}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="wsp-slug">Slug</Label>
            <Input
              id="wsp-slug"
              placeholder="acme-inc"
              aria-invalid={!!errors.slug}
              {...register("slug", {
                onChange: () => {
                  setSlugEdited(true)
                },
              })}
            />
            {errors.slug && (
              <p className="text-xs text-destructive">{errors.slug.message}</p>
            )}
          </div>

          <DialogFooter>
            <DialogClose
              render={<Button type="button" variant="outline" />}
            >
              Cancel
            </DialogClose>
            <Button type="submit" disabled={true}>
              Create workspace
              {/* <CircularSpinner size={'xs'}/> Creating... */}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { CreateWorkspaceDialog }
