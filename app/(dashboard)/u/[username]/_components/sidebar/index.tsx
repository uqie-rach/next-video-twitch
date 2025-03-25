import React from 'react'
import { Wrapper } from './wrapper'
import Toggle from './Toggle'
import { Navigation } from './navigation'

const CreatorSidebar = () => {
  return (
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  )
}

export default CreatorSidebar
