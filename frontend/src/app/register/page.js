import PublicLayout from "@/components/layout/PublicLayout";
import AuthForm from "@/components/auth/AuthForm";

export default function RegisterPage() {
  return (
    <PublicLayout>
      <AuthForm mode="register" />
    </PublicLayout>
  );
}
