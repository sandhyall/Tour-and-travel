import React from 'react'
import Hero from './Hero'
import TrustedPartner from '../Component/Common/TrustedPartener'
import Aced from '../Component/Common/Aced'
import WhyAce from '../Component/Common/WhyAce'
import FAQ from '../Component/Common/Frequent'
import Everest from '../Component/Feature/Everest'
import PopularTreks from '../Component/Feature/PopularTreks'
import GalleryPage from './GalleryPage '
import PopularBhutan from './PopularBhutan'

const Landing=()=> {
  return (
    <div>
      <Hero/>
      <Everest/>
      <TrustedPartner/>
      <PopularBhutan/>
      <Aced/>
      <WhyAce/>
      <PopularTreks/>
      <GalleryPage/>
      <FAQ/>
    </div>
  )
}

export default Landing