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
  search: z.string().trim().min(1, {
    message: 'Digite algo para buscar.',
  }),
})

type FormSearchSchema = z.infer<typeof formSearchSchema>

export function Search() {
  const form = useForm<FormSearchSchema>({
    resolver: zodResolver(formSearchSchema),
    defaultValues: {
      search: '',
    },
  })

  const router = useRouter()

  function handleSearch({ search }: FormSearchSchema) {
    router.push(`/barbershops?search=${search}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSearch)} className="flex gap-2">
        <FormField
          control={form.control}
          name="search"
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
