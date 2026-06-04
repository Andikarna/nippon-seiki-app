import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "NPMS" }] }),
  component: () => <Navigate to="/dashboard" />,
});
