import { headers } from "next/headers";
import { Card, Avatar } from "@heroui/react";
import { auth } from "@/lib/auth";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const name = user?.name ?? "Guest User";
  const email = user?.email ?? "Not signed in";

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const details = [
    { label: "Full Name", value: name },
    { label: "Email", value: email },
    {
      label: "Email Status",
      value: user ? (user.emailVerified ? "Verified" : "Not verified") : "N/A",
    },
    {
      label: "Member Since",
      value: user
        ? new Date(user.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "N/A",
    },
  ];

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-2xl items-center px-4 py-12">
      <Card className="w-full p-6 sm:p-8">
        <Card.Header className="flex flex-col items-center gap-3 pb-6 text-center">
          <Avatar className="h-20 w-20">
            <Avatar.Image alt={name} src={user?.image ?? undefined} />
            <Avatar.Fallback className="text-xl">{initials}</Avatar.Fallback>
          </Avatar>
          <div>
            <Card.Title className="text-2xl font-bold tracking-tight">
              {name}
            </Card.Title>
            <Card.Description className="text-sm text-muted">
              {email}
            </Card.Description>
          </div>
        </Card.Header>

        <Card.Content>
          <dl className="divide-y divide-separator rounded-xl border border-separator">
            {details.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-4 px-4 py-3"
              >
                <dt className="text-sm text-muted">{item.label}</dt>
                <dd className="text-sm font-medium">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ProfilePage;