import { SignIn } from '@clerk/nextjs'
import { Logo } from '../../_components/Logo'

export default function Page() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Logo />
      <SignIn />
    </div>
  )
}
