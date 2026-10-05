"use client";

import { FormEvent } from "react";
import Link from "next/link";
import {
  Card, Form, TextField, Label, Input, Button,
  FieldError, Description,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.67l-3.56-2.76c-.98.66-2.24 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.17v2.84A11 11 0 0 0 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.17A11 11 0 0 0 1 12c0 1.77.43 3.45 1.17 4.94l3.67-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.17 7.06l3.67 2.84C6.71 7.31 9.14 5.38 12 5.38z"
    />
  </svg>
);

const SignUp = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (error) {
      console.log(error.message);
    }
  };

  const google_sign_up = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    console.log(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-6 sm:p-8">
        <Card.Header className="flex flex-col gap-1 pb-6 text-center">
          <Card.Title className="text-2xl font-bold tracking-tight">
            Create an account
          </Card.Title>
          <Card.Description className="text-sm text-muted">
            Enter your details below to get started
          </Card.Description>
        </Card.Header>

        <Card.Content>
          <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextField isRequired name="name">
              <Label>Full Name</Label>
              <Input placeholder="Name..." autoComplete="name" />
              <FieldError />
            </TextField>

            <TextField isRequired name="email" type="email">
              <Label>Email</Label>
              <Input type="email" placeholder="@email.com" autoComplete="email" />
              <FieldError />
            </TextField>

            <TextField isRequired name="password" type="password" minLength={8}>
              <Label>Password</Label>
              <Input type="password" placeholder="••••••••" autoComplete="new-password" />
              <Description>Must be at least 8 characters long</Description>
              <FieldError />
            </TextField>

            <Button type="submit" variant="primary" className="mt-2 w-full">
              Create Account
            </Button>
          </Form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-separator" />
            <span className="text-xs uppercase tracking-wide text-muted">
              Or continue with
            </span>
            <div className="h-px flex-1 bg-separator" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full gap-2"
            onPress={google_sign_up}
          >
            <GoogleIcon />
            Continue with Google
          </Button>
        </Card.Content>

        <Card.Footer className="pt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium text-accent underline">
            Sign in
          </Link>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default SignUp;