
import Link from "next/link";

import BrandLogo from "@/components/brand-logo";

export const Logo = () => {
  return (
    <Link href='/' className="hidden lg:flex items-center gap-x-4 hover:opacity-75 transition-opacity duration-300 ease-in-out">
      <BrandLogo />
      <div className="flex flex-col">
        <h3 className="font-semibold text-white">Stream<span className="text-blue-500">IT</span></h3>
        <p className="text-sm text-muted-foreground">Let&apos;s Play!</p>
      </div>
    </Link >
  );
};
