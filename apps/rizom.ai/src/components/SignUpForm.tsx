type Props = {
  cta: string
}
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "firstName must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "lastName must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
})

export function SignUpForm({ cta }: Props) {
  const [registrationStatus, setRegistrationStatus]  = useState({ success: false, message: ""});
  const { success, message } = registrationStatus;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: ""
    }

  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
       const response = await fetch('/signup.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const status = await response.json();
      setRegistrationStatus(status);
    } catch(e) {
      console.log(e);
    }
  }

  return (
      <Form {...form}>
      { success && <p>{message}</p>}
      {!success &&  
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-grow">
          <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
              <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
              <Input placeholder="enter your first name" {...field} />
              </FormControl>
              <FormMessage />
              </FormItem>
              )}
          />
          <FormField
          control={form.control}
          name="lastName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                <Input placeholder="enter your last name" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
                )}
          />
            <FormField
            control={form.control}
          name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                <Input placeholder="enter your email address" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
                )}
          />
            <Button className="border border-secondary bg-secondary my-4 px-5 py-3 w-auto text-white font-bold" type="submit">
            {cta}
          </Button>
        </form>
      }
      </Form>
  )
}
