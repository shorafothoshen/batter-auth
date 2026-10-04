"use client";

import { FormEvent } from "react";
import Link from "next/link";
import {
  Card, Form, TextField, Label, Input, Button,
  FieldError, Description,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";

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