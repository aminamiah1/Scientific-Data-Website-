"use client";
import AuthContext from "@/app/utils/authContext";
import SignInComponent from "@/app/components/signInComponent";

export default function SignIn() {
  return (
    <AuthContext>
      <SignInComponent />
    </AuthContext>
  );
}
