'use server'

import { z } from 'zod'
import prisma from './db'

const catalogueSchema = z.object({
  title: z.string().min(1, "El título es requerido").max(100, "El título no puede tener más de 100 caracteres"),
  description: z.string().min(1, "La descripción es requerida").max(500, "La descripción no puede tener más de 500 caracteres"),
})

export async function createCatalogue(formData: FormData) {
  const validatedFields = catalogueSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
  })

  if (!validatedFields.success) {
    return { error: 'Validation failed', issues: validatedFields.error.issues }
  }

  // Here you would typically save the data to your database
  // For this example, we'll just simulate a delay and return the data
  // await new Promise(resolve => setTimeout(resolve, 1000))

  await prisma.catalogue.create({
    data: {
      title: validatedFields.data.title,
      description: validatedFields.data.description,
    }
  })

  return { success: true, data: validatedFields.data }
}