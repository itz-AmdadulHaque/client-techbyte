"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem,  FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";


const formSchema = z.object({
    name: z.string().optional(),
    category: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ServicesFilterForm({ categories }: { categories: { slug: string; title: string }[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initialize form with searchParams values
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: searchParams.get("name") || "",
            category: searchParams.get("category") || "all",
        },
    });

    // Handle submit → update URL with query params
    const onSubmit = (values: FormValues) => {
        const params = new URLSearchParams();

        if (values.name) params.set("name", values.name);
        if (values.category && values.category !== "all") params.set("category", values.category);

        router.push(`/services?${params.toString()}`);
    };

    // Handle clear
    const onClear = () => {
        form.reset({
            name: "",
            category: "all",
        });
        router.push("/services");
    };

    return (
        <div className="flex justify-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 items-center flex-wrap">
                    {/* Name field */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Search by name..." {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    

                    {/* Category filter */}
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="All Categories" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.slug} value={cat.slug}>
                                                {cat.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    {/* Buttons */}
                    <Button type="submit">Search</Button>
                    <Button type="button" variant="outline" onClick={onClear}>
                        Clear
                    </Button>
                </form>
            </Form>
        </div>
    );
}
