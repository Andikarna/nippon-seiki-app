import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NPMS — Nippon Production Monitoring System" },
      { name: "description", content: "Enterprise manufacturing production monitoring, FIFO control, and reporting." },
    ],
  }),
  component: () => <Navigate to="/dashboard" />,
});
