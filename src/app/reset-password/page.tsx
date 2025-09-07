import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import React, { Suspense } from 'react'
import ResetPasswordForm from './ResetPasswordPage'

const ResetPassword = () => {
  return (
    <Suspense fallback={<Loader2 className={cn("h-5 w-5 animate-spin text-muted-foreground", "mr-2 h-24 w-24 animate-spin")} />}>
        <ResetPasswordForm />
    </Suspense>
  )
}

export default ResetPassword