import BrandLogo from "@/components/brand-logo";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import Link from "next/link";

const logoVariants = cva(
  "text-white relative transition-all duration-300 ease-in-out",
  {
    variants: {
      size: {
        default: "h-8 w-8",
        sm: "h-6 w-6",
        lg: "h-10 w-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface LogoProps extends VariantProps<typeof logoVariants> {
  className?: string;
}

export const Logo = ({ size, className }: LogoProps) => {
  return (
    <Link href='/' className="hidden lg:flex items-center gap-x-4 hover:opacity-75 transition-opacity duration-300 ease-in-out">
      <BrandLogo />
      <div className="flex flex-col">
        <h3 className="font-semibold text-white">Stream<span className="text-blue-500">IT</span></h3>
        <p className="text-sm text-muted-foreground">Creator Dashboard</p>
      </div>
    </Link >
  );
};
