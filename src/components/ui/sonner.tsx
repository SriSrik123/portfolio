import React from "react";
import { Toaster as SonnerToaster } from "sonner";

export function Toaster(props: React.ComponentProps<typeof SonnerToaster>) {
  return <SonnerToaster {...props} richColors theme="dark" />;
}

export { toast } from "sonner";
