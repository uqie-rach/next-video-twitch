import BrandLogo from "@/components/brand-logo";

export const Logo = () => {
  return (
    <div className="flex items-center gap-x-2">
      <BrandLogo />
      <div className="flex flex-col">
        <h3 className="font-semibold text-white">Stream<span className="text-blue-500">IT</span></h3>
        <p className="text-sm text-muted-foreground">Let&apos;s Play!</p>
      </div>
    </div>
  );
};
