// This component is a client-side component, indicated by "use client".
"use client";

// Import necessary React and form-related libraries.
import React from "react";
import { z } from "zod"; // Zod for schema validation.
import { zodResolver } from "@hookform/resolvers/zod"; // Resolver for Zod with React Hook Form.
import { useForm } from "react-hook-form"; // React Hook Form for form management.

// Import UI components from the project's UI library.
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { subjects } from "@/constants"; // Import predefined subjects.
import { Textarea } from "./ui/textarea";

// Import server-side actions for creating a companion and Next.js navigation.
import { createCompanion } from "@/lib/actions/companion.actions";
import { redirect } from "next/navigation";

// Define the schema for the companion form using Zod.
// This schema validates the input fields for creating a new companion.
const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Companion name is required" })
    .max(30, { message: "Companion name must be less than 30 characters" })
    .trim(),
  subject: z
    .string()
    .min(1, { message: "Subject is required" })
    .max(50, { message: "Subject must be less than 50 characters" })
    .trim(),
  topic: z.string().min(1, { message: "Topic is required" }).trim(),
  voice: z.string().min(1, { message: "Voice is required" }).trim(),
  style: z.string().min(1, { message: "Style is required" }).trim(),
  duration: z.coerce.number().min(1, { message: "Duration is required" }),
});

// Define the CompanionForm functional component.
const CompanionForm = () => {
  // Initialize the form with React Hook Form, applying Zod for validation.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15,
    },
  });

  // Handle form submission.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Call the server action to create a companion.
    const companion = await createCompanion(values);

    // Redirect based on the success of companion creation.
    if (companion) {
      redirect(`/companions/${companion.id}`); // Redirect to the new companion's page.
    } else {
      console.log("Failed to create companion");
      redirect("/"); // Redirect to the home page on failure.
    }
  };

  // Render the form.
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Form field for Companion Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Companion name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the companion name"
                  {...field}
                  className="input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form field for Subject (using a Select component) */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="input capitalize">
                    <SelectValue placeholder="Select the subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem
                        value={subject}
                        key={subject}
                        className="capitalize"
                      >
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form field for Topic (using a Textarea component) */}
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What should the companion help with?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ex. Derivates & Integrals"
                  {...field}
                  className="input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form field for Voice (using a Select component) */}
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="input">
                    <SelectValue placeholder="Select the voice" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form field for Style (using a Select component) */}
        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="input">
                    <SelectValue placeholder="Select the style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form field for Duration (using an Input component for number) */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated session duration in minutes</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="15"
                  {...field}
                  className="input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit button for the form */}
        <Button type="submit" className="w-full cursor-pointer">
          Build Your Companion
        </Button>
      </form>
    </Form>
  );
};

// Export the CompanionForm component as the default export.
export default CompanionForm;
