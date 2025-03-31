'use client'

import Link from "next/link"

import { Button } from "@/components/ui/button"

const ErrorPage = () => {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <h1 className="text-4xl">500</h1>
      <p>
        Something went wrong. Please try again later or contact support.
      </p>
      <Button variant='secondary' asChild>
        <Link href='/'>Go back home</Link>
      </Button>
    </div>
  )
}

export default ErrorPage;
