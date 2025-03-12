import { DogWalkingSchedule } from "@/components/dog-walking-schedule"

export default function Home() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">Dog Walking Schedule</h1>
      <DogWalkingSchedule />
    </main>
  )
}

