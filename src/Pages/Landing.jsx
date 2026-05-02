import React from 'react'
import Hero from './Hero'
import TrustedPartner from '../Component/Common/TrustedPartener'
import Aced from '../Component/Common/Aced'
import WhyAce from '../Component/Common/WhyAce'
import FAQ from '../Component/Common/Frequent'

const Landing=()=> {
  return (
    <div>
      <Hero/>
      <TrustedPartner/>
      <Aced/>
      <WhyAce/>
      <FAQ/>
    </div>
  )
}

export default Landing