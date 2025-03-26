'use client';

import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";

interface CopyClientButton {
  value?: string;
};

const CopyButton = (
  {
    value
  }: CopyClientButton
) => {
  const [isCopied, setIsCopied] = useState(false);

  function onCopy() {
    if (!value) return;
    setIsCopied(true);

    navigator.clipboard.writeText(value);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }

  const Icon = isCopied ? CheckCheck : Copy;

  return (
    <Button
      onClick={onCopy}
      disabled={!value || isCopied}
      variant='ghost'
      size='sm'
      >
      <Icon className="h-4 w-4" />
    </Button>
  )
}

export default CopyButton
