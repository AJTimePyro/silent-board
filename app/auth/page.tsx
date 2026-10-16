"use client";

import { useRouter } from "next/navigation";
import { type SubmitEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

export default function AuthPage() {
	const router = useRouter();
	const [mode, setMode] = useState<"signin" | "signup">("signin");
	const [loading, setLoading] = useState(false);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		try {
			if (mode === "signup") {
				const { error } = await authClient.signUp.email({
					name,
					email,
					password,
				});

				if (error) {
					toast.error(error.message || "Failed to create account");
					return;
				}

				toast.success("Account created successfully!");
				router.push("/");
			} else {
				const { error } = await authClient.signIn.email({
					email,
					password,
				});

				if (error) {
					toast.error(error.message || "Failed to sign in");
					return;
				}

				toast.success("Signed in successfully!");
				router.push("/");
			}
		} catch {
			toast.error("An unexpected error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen w-full items-center justify-center p-4">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>
						{mode === "signin" ? "Sign In" : "Create an Account"}
					</CardTitle>

					<CardDescription>
						{mode === "signin"
							? "Enter your email and password to access your account"
							: "Enter your information below to create a new account"}
					</CardDescription>
				</CardHeader>

				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-4">
						{mode === "signup" && (
							<div className="space-y-2">
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									type="text"
									placeholder="John Doe"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</div>
						)}

						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="example@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="********"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
					</CardContent>

					<CardFooter className="flex flex-col gap-3 pt-6">
						<Button type="submit" className="w-full" disabled={loading}>
							{loading
								? mode === "signin"
									? "Signing in..."
									: "Creating account..."
								: mode === "signin"
									? "Sign In"
									: "Sign Up"}
						</Button>

						<Button
							type="button"
							variant="link"
							className="text-xs"
							onClick={() => {
								setMode(mode === "signin" ? "signup" : "signin");
							}}
						>
							{mode === "signin"
								? "Don't have an account? Sign up"
								: "Already have an account? Sign in"}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
