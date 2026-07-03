import PublicLayout from "@/components/layout/PublicLayout";
import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <PublicLayout>
      <AuthForm mode="login" />
    </PublicLayout>
  );
}
