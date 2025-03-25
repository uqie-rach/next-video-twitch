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
      <div className="bg-white rounded-full p-1">
        <BrandLogo size={size} className={`${cn("text-black")} ${className}`} />
      </div>
      <div className="flex flex-col">
        <h3 className="font-semibold text-white">StreamIT</h3>
        <p className="text-sm text-muted-foreground">Creator Dashboard</p>
      </div>
    </Link>
  );
};


const BrandLogo = ({ size, className }) => {
  return (
    <svg
      className={cn(logoVariants({ size, className }))}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L2 7L12 12L22 7L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 17L12 22L22 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12L12 17L22 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
