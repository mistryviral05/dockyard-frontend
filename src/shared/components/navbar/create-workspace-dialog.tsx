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
import { CircularSpinner } from "../myui/circular-spinner"
import { workspaceQueries } from "@/features/workspace/useWorkspaceQueries"
import { useSnackbar } from "notistack"
import { useQueryClient } from "@tanstack/react-query"

function CreateWorkspaceDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {

  const [slugEdited, setSlugEdited] = useState(false)
  const qc = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  const { mutate: create, isPending } = workspaceQueries.useCreateWorkspace()

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
    create(values, {
      onSuccess: () => {
        enqueueSnackbar(`Workspace "${values.name}" created successfully!`, {
          variant: 'success',
          autoHideDuration: 3000,

        })
        qc.invalidateQueries({ queryKey: ['workspaces'] })
        handleOpenChange(false)
      },
      onError: (err) => {
        enqueueSnackbar(`Failed to create workspace`, {
          variant: 'error',
          autoHideDuration: 3000,
        })
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="data-open:zoom-in-150! data-closed:zoom-out-150 duration-300 [[data-slot=dialog-overlay]:has(~_&)]:duration-300 ">
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
            <Button type="submit" disabled={isPending}>
              {
                isPending ? <>
                  <CircularSpinner size={'xs'} /> Creating...

                </> : "Create workspace"
              }

            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { CreateWorkspaceDialog }
