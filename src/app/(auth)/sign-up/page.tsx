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

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.04 11.04 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
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

  const github_sign_up = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
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

          <div className="flex flex-col gap-3">
            <Button
              type="button"
              variant="outline"
              className="w-full gap-2"
              onPress={google_sign_up}
            >
              <GoogleIcon />
              Continue with Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full gap-2"
              onPress={github_sign_up}
            >
              <GithubIcon />
              Continue with GitHub
            </Button>
          </div>
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