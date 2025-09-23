import React, { Suspense } from 'react'
import ResetPasswordForm from './ResetPasswordPage'
import { LoadingOverlay } from '@/components/custom/LoadingOverlay/LoadingOverlay'

const ResetPassword = () => {
  return (
    <Suspense fallback={<LoadingOverlay visible blur />}>
        <ResetPasswordForm />
    </Suspense>
  )
}

export default ResetPassword