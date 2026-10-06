"use client";

import { useRouter } from "next/navigation";
import { Link, Button, Avatar, Dropdown, Label } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const links = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

const Logo = () => (
  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-sm">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  </div>
);

const Navbar = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
    router.refresh();
  };

  const handleMenuAction = (key: React.Key) => {
    if (key === "profile") router.push("/profile");
    if (key === "signout") handleSignOut();
  };

  const initials = session?.user.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Left: logo */}
        <div
          className="flex cursor-pointer items-center gap-3"
          onClick={() => router.push("/")}
        >
          <Logo />
          <p className="text-lg font-bold tracking-tight">ACME</p>
        </div>

        {/* Center: links (mobile-e hide hoy) */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: auth actions */}
        <ul className="flex items-center gap-2">
          {isPending ? null : session ? (
            <li>
              <Dropdown>
                <Dropdown.Trigger className="rounded-full outline-none">
                  <Avatar>
                    <Avatar.Image
                      alt={session.user.name}
                      src={session.user.image ?? undefined}
                    />
                    <Avatar.Fallback>{initials}</Avatar.Fallback>
                  </Avatar>
                </Dropdown.Trigger>
                <Dropdown.Popover>
                  <div className="px-3 pb-2 pt-3">
                    <p className="text-sm font-semibold">{session.user.name}</p>
                    <p className="text-xs text-muted">{session.user.email}</p>
                  </div>
                  <Dropdown.Menu onAction={handleMenuAction}>
                    <Dropdown.Item id="profile" textValue="Profile">
                      <Label>Profile</Label>
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="signout"
                      textValue="Sign Out"
                      variant="danger"
                    >
                      <Label>Sign Out</Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </li>
          ) : (
            <>
              <li>
                <Button variant="ghost" onPress={() => router.push("/sign-in")}>
                  Sign In
                </Button>
              </li>
              <li>
                <Button variant="primary" onPress={() => router.push("/sign-up")}>
                  Get Started
                </Button>
              </li>
            </>
          )}
        </ul>
      </header>
    </nav>
  );
};

export default Navbar;