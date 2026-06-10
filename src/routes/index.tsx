import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '../components/home/Hero'
import { WeeklySchedule } from '../components/home/WeeklySchedule'
import { NextEvents } from '../components/home/NextEvents'
import { About } from '../components/home/About'
import { InstaWall } from '../components/home/InstaWall'
import { CtaSection } from '../components/home/CtaSection'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <WeeklySchedule />
      <NextEvents />
      <About />
      <InstaWall />
      <CtaSection />
    </div>
  )
}
