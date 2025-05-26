// components/StartupForm.tsx

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const formSchema = z.object({
  title: z
    .string()
    .min(3, "Startup name is required and must be at least 3 character(s)"),
  description: z
    .string()
    .min(
      3,
      "Startup description is required and must be at least 3 character(s)"
    ),
  category: z
    .string()
    .min(3, "Startup category is required and must be at least 3 character(s)"),
  link: z
    .string()
    .url("Must be a valid URL")
    .refine((url) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url), {
      message: "Must be a valid image URL (e.g., .jpg, .png)",
    }),
  pitch: z.string().min(10, "Pitch must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function StartupForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, isValid, isSubmitted },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      pitch: "",
      link: "",
      description: "",
      category: "",
    },
  });

  // Controlled state for MDEditor
  const [pitch, setPitch] = useState("");
  const [loading, setLoading] = useState(false);

  // Keep RHF and MDEditor in sync
  const handlePitchChange = (value: string | undefined) => {
    const val = value || "";
    setPitch(val);
    setValue("pitch", val);
  };
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const res = await fetch("/api/startup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("Raw response:", res);

    const text = await res.text(); // get raw response
    console.log("Response text:", text); // log what you actually got

    try {
      JSON.parse(text);
      if (isSubmitted) {
        reset();
        setPitch("");
      }
    } catch (err) {
      console.error("Failed to parse JSON:", err);
      return toast.error("Server returned invalid response.");
    } finally {
      setLoading(false);
      router.push("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-xl mx-auto p-4"
    >
      <div>
        <label htmlFor="title" className="block font-medium">
          TITLE
        </label>
        <Input
          id="title"
          autoFocus
          {...register("title")}
          placeholder="   Startup Title"
          className="startup-form-input"
        />
        {errors.title && (
          <p className="text-red-600 text-sm">{errors.title.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="description" className="block font-medium">
          DESCRIPTION
        </label>
        <Textarea
          id="description"
          placeholder="   Startup description"
          {...register("description")}
          className="startup-form-input resize-none"
        />
        {errors.description && (
          <p className="text-red-600 text-sm">{errors.description.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="category" className="block font-medium">
          CATEGOTY
        </label>
        <Input
          id="category"
          {...register("category")}
          placeholder="   Startup category (Tech, Health, Education...)"
          className="startup-form-input"
        />
        {errors.category && (
          <p className="text-red-600 text-sm">{errors.category.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="link" className="block font-medium">
          IMAGE URL
        </label>
        <Input
          id="link"
          placeholder=" Startup Image URL"
          {...register("link")}
          className="startup-form-input"
        />
        {errors.link && (
          <p className="text-red-600 text-sm">{errors.link.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="pitch" className="block font-medium">
          Your Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={handlePitchChange}
          preview="edit"
          height={200}
          textareaProps={{
            placeholder: "Describe your idea and what problem it solves...",
          }}
        />
        {errors.pitch && (
          <p className="text-red-600 text-sm">{errors.pitch.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || loading || !isValid}
        className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-900 w-full"
      >
        {isSubmitting || loading ? "Submiting..." : "Submit Your Pitch"}
        <Send />
      </Button>
      {isSubmitted && !isSubmitting && isValid && (
        <p className="text-green-600 text-sm text-center">
          Pitch submitted successfully!
        </p>
      )}
    </form>
  );
}
