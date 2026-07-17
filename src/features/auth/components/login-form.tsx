"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isPending = form.formState.isSubmitting;

  const signInGoogle = async () => {
    form.clearErrors();

    await authClient.signIn.social(
      {
        provider: "google",
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }
    );
  };

  const signInGithub = async () => {
    form.clearErrors();

    await authClient.signIn.social(
      {
        provider: "github",
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }
    );
  };

  const onSubmit = async (values: LoginFormValues) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (err) => {
          toast.error(err.error.message);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#E9D8FD] relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-2">
          <Image src="/icons/logo.png" alt="quiver" width={32} height={32} />
          <h1 className="text-2xl font-bold text-gray-800">Quiver</h1>
        </div>
      </div>

      {/* Login Card */}
      <div className="flex flex-1 items-center justify-center px-4 relative z-10">
        <Card className="w-full max-w-md bg-white shadow-xl rounded-2xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold text-gray-800">
              Welcome Back!
            </CardTitle>
            <CardDescription className="text-gray-600">
              Hey, Enter your details to sign in to your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 mt-5 px-3"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your email"
                          className="rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter your password"
                          className="rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] rounded-xl"
                  disabled={isPending}
                >
                  Sign In
                </Button>

                <div className="flex items-center justify-center text-sm text-gray-900">
                  Or Sign in with
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={signInGoogle}
                  disabled={isPending}
                >
                  <Image
                    src="/icons/google.png"
                    alt="Google"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Login with Google
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={signInGithub}
                  disabled={isPending}
                >
                  <Image
                    src="/icons/github.svg"
                    alt="Github"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Login with Github
                </Button>

                <p className="text-center text-sm text-gray-700">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-[#7C3AED] font-semibold hover:underline"
                  >
                    Register Now
                  </Link>
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};