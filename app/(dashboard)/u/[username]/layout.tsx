import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Navbar from "./_components/navbar";
import CreatorSidebar from "./_components/sidebar";
import Container from "./_components/container";

interface CreatorLayoutProps {
  params: Promise<{ username: string }>,
  children: ReactNode
}

export default async function CreatorLayout({ params, children }: CreatorLayoutProps) {
  const self = await getSelfByUsername((await params).username);

  if (!self) {
    redirect('/');
  }
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Container>
          <CreatorSidebar />
          {children}
        </Container>
      </div>
    </>
  );
}
