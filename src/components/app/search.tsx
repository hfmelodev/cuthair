'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

const formSearchSchema = z.object({
  title: z.string().trim().min(1, {
    message: 'Digite algo para buscar.',
  }),
})

type FormSearchSchema = z.infer<typeof formSearchSchema>

export function Search() {
  const form = useForm<FormSearchSchema>({
    resolver: zodResolver(formSearchSchema),
    defaultValues: {
      title: '',
    },
  })

  const router = useRouter()

  function handleSearch({ title }: FormSearchSchema) {
    router.push(`/barbershops?title=${title}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSearch)} className="flex gap-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Faça sua busca..." {...field} />
              </FormControl>

              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        <Button type="submit">
          <SearchIcon />
        </Button>
      </form>
    </Form>
  )
}
