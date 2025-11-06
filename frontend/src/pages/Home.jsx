import React from 'react'
import Hero from '../components/Home/Hero'
import RecentGames from '../components/Home/RecentGames'

const Home = () => {
  return (
    <div className='bg-zinc-900 text-white px-10 py-8'>
        <Hero/>
        <RecentGames/>
    </div>
  )
}

export default Home