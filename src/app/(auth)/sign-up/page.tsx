import { Card,Form,TextField,Label,Input,Button,Checkbox,FieldError,Description } from "@heroui/react";


const SignUp = () => {
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
          <Form className="flex flex-col gap-4">
            {/* Full Name Field */}
            <TextField
              isRequired
              value=''
              
            >
              <Label>Full Name</Label>
              <Input placeholder="Name..." autoComplete="name" />
              <FieldError />
            </TextField>

            {/* Email Field */}
            <TextField
              isRequired
              type="email"
              value=''
              
            >
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="@email.com"
                autoComplete="email"
              />
              <FieldError />
            </TextField>

            {/* Password Field */}
            <TextField
              isRequired
              type="password"
              value=''
             
            >
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
              />
              <Description>Must be at least 8 characters long</Description>
              <FieldError />
            </TextField>

            {/* Terms and Conditions */}
            <Checkbox
              isRequired
              
             
              className="mt-1"
            >
              <Checkbox.Content>
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <span className="text-sm">
                  I agree to the{" "}
                  <a href="#terms" className="text-accent underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#privacy" className="text-accent underline">
                    Privacy Policy
                  </a>
                </span>
              </Checkbox.Content>
              <FieldError />
            </Checkbox>

            {/* Submit Button */}
            <Button type="submit" variant="primary" className="mt-2 w-full">
              Create Account
            </Button>
          </Form>
        </Card.Content>

        <Card.Footer className="pt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-accent underline">
            Sign in
          </a>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default SignUp;
