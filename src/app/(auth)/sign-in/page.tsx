import {
  Card,
  Form,
  TextField,
  Label,
  Input,
  Button,
  Checkbox,
} from "@heroui/react";

const SignIn = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-sm p-6 sm:p-8">
        <Card.Header className="flex flex-col gap-1 pb-6 text-center">
          <Card.Title className="text-2xl font-bold tracking-tight">
            Sign In
          </Card.Title>
          <Card.Description className="text-sm text-muted">
            Enter your email and password to access your account
          </Card.Description>
        </Card.Header>

        <Card.Content>
          {/* Static HTML form submission without dynamic React state */}
          <Form
            action="/api/auth/login"
            method="post"
            className="flex flex-col gap-4"
          >
            {/* Email Field */}
            <TextField isRequired name="email" type="email">
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="@email.com"
                autoComplete="email"
              />
            </TextField>

            {/* Password Field */}
            <TextField isRequired name="password" type="password">
              <div className="flex items-center justify-between">
                <Label>Password</Label>
                <a
                  href="/forgot-password"
                  className="text-xs text-accent underline hover:opacity-80"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </TextField>

            {/* Remember Me */}
            <Checkbox name="remember" defaultSelected={false}>
              <Checkbox.Content>
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <span className="text-sm">Remember me</span>
              </Checkbox.Content>
            </Checkbox>

            {/* Submit Button */}
            <Button type="submit" variant="primary" className="mt-2 w-full">
              Sign In
            </Button>
          </Form>
        </Card.Content>

        <Card.Footer className="pt-6 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-accent underline hover:opacity-80"
          >
            Sign up
          </a>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default SignIn;
