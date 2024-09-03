"use client"

import { useUser } from '@/hooks/auth.hook'

function EntryPage() {
  const { isAuthenticated } = useUser()

  if(isAuthenticated){
    return window.location.replace('/dashboard')
  }else{
    return window.location.replace('/auth/signin')
  }
}

export default EntryPage
