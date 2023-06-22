import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-full mt-24  max-w-lg flex-col justify-center sm:w-2/4 ">
      <div className="bg-white py-12 px-10 shadow sm:rounded-lg">
        <LoginForm />
      </div>
    </div>
  );
}
