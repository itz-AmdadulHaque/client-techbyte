import { Suspense } from "react";
import LoginForm from "./LoginForm";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
export const metadata = {
  title: "Login | TechVibe",
  description: "Login to your TechVibe account using email, password, or Google.",
};

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-muted">
      <Suspense fallback={<Loader2 className={cn("h-5 w-5 animate-spin text-muted-foreground", "mr-2 h-24 w-24 animate-spin")} />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
