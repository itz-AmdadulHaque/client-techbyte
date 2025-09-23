import React, { Suspense } from 'react'
import ProfileComponent from './ProfileEdit'
import { LoadingOverlay } from '@/components/custom/LoadingOverlay/LoadingOverlay'

const Profile = () => {
  return (
    <Suspense fallback={<LoadingOverlay visible blur />}>
        <ProfileComponent />
    </Suspense>
  )
}

export default Profile