import { redirect } from "next/navigation";
import { Suspense } from "react";

import { Results, ResultsSkeleton } from "./_components/results";

interface SearchPageProps {
  searchParams: Promise<{ term?: string }>
};

export const SearchPage = async (
  { searchParams }: SearchPageProps
) => {
  const params = await searchParams;

  if (!params.term) {
    redirect('/')
  }


  return (
    <div className="h-full p-8 max-w-screen mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results term={params.term} />
      </Suspense>
    </div>
  )
}
