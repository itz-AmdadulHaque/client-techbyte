import LoginForm from "./LoginForm";
export const metadata = {
  title: "Login | TechByte",
  description: "Login to your TechByte account using email, password, or Google.",
};

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-muted">
      <LoginForm />
    </div>
  );
}
