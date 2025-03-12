"use client"

import { useState } from "react"
import { Clock, Plus, Save, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type WalkingTime = {
  id: string
  day: string
  time: string
  duration: string
  notes: string
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export function DogWalkingSchedule() {
  const [schedule, setSchedule] = useState<WalkingTime[]>([
    {
      id: "1",
      day: "Monday",
      time: "07:30",
      duration: "30",
      notes: "Morning walk in the park",
    },
    {
      id: "2",
      day: "Monday",
      time: "18:00",
      duration: "45",
      notes: "Evening walk around the neighborhood",
    },
    {
      id: "3",
      day: "Wednesday",
      time: "07:30",
      duration: "30",
      notes: "Morning walk in the park",
    },
    {
      id: "4",
      day: "Wednesday",
      time: "18:00",
      duration: "45",
      notes: "Evening walk around the neighborhood",
    },
    {
      id: "5",
      day: "Friday",
      time: "07:30",
      duration: "30",
      notes: "Morning walk in the park",
    },
    {
      id: "6",
      day: "Friday",
      time: "18:00",
      duration: "45",
      notes: "Evening walk around the neighborhood",
    },
    {
      id: "7",
      day: "Saturday",
      time: "10:00",
      duration: "60",
      notes: "Long walk at the dog park",
    },
    {
      id: "8",
      day: "Sunday",
      time: "10:00",
      duration: "60",
      notes: "Long walk at the dog park",
    },
  ])

  const [open, setOpen] = useState(false)
  const [currentWalk, setCurrentWalk] = useState<WalkingTime>({
    id: "",
    day: "",
    time: "",
    duration: "",
    notes: "",
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleAddWalk = () => {
    setIsEditing(false)
    setCurrentWalk({
      id: Math.random().toString(36).substring(2, 9),
      day: "",
      time: "",
      duration: "",
      notes: "",
    })
    setOpen(true)
  }

  const handleEditWalk = (walk: WalkingTime) => {
    setIsEditing(true)
    setCurrentWalk(walk)
    setOpen(true)
  }

  const handleDeleteWalk = (id: string) => {
    setSchedule(schedule.filter((walk) => walk.id !== id))
  }

  const handleSaveWalk = () => {
    if (isEditing) {
      setSchedule(schedule.map((walk) => (walk.id === currentWalk.id ? currentWalk : walk)))
    } else {
      setSchedule([...schedule, currentWalk])
    }
    setOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Weekly Schedule</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddWalk}>
              <Plus className="mr-2 h-4 w-4" />
              Add Walk
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Walk" : "Add New Walk"}</DialogTitle>
              <DialogDescription>
                {isEditing ? "Make changes to your scheduled walk." : "Add a new walking time to your schedule."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="day" className="text-right">
                  Day
                </Label>
                <Select
                  value={currentWalk.day}
                  onValueChange={(value) => setCurrentWalk({ ...currentWalk, day: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {daysOfWeek.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={currentWalk.time}
                  onChange={(e) => setCurrentWalk({ ...currentWalk, time: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duration (min)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min="5"
                  max="180"
                  value={currentWalk.duration}
                  onChange={(e) => setCurrentWalk({ ...currentWalk, duration: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Input
                  id="notes"
                  value={currentWalk.notes}
                  onChange={(e) => setCurrentWalk({ ...currentWalk, notes: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSaveWalk}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {daysOfWeek.map((day) => (
          <Card key={day} className="h-full">
            <CardHeader>
              <CardTitle>{day}</CardTitle>
              <CardDescription>{schedule.filter((walk) => walk.day === day).length} walks scheduled</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedule
                  .filter((walk) => walk.day === day)
                  .sort((a, b) => (a.time > b.time ? 1 : -1))
                  .map((walk) => (
                    <div key={walk.id} className="flex flex-col p-3 border rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-primary" />
                          <span className="font-medium">
                            {walk.time} ({walk.duration} min)
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEditWalk(walk)} className="h-7 w-7">
                            <Save className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteWalk(walk.id)}
                            className="h-7 w-7 text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                      {walk.notes && <p className="text-sm text-muted-foreground">{walk.notes}</p>}
                    </div>
                  ))}
                {schedule.filter((walk) => walk.day === day).length === 0 && (
                  <div className="flex flex-col items-center justify-center h-24 text-center text-muted-foreground">
                    <p>No walks scheduled</p>
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => {
                        setIsEditing(false)
                        setCurrentWalk({
                          id: Math.random().toString(36).substring(2, 9),
                          day: day,
                          time: "",
                          duration: "",
                          notes: "",
                        })
                        setOpen(true)
                      }}
                      className="mt-2"
                    >
                      Add walk
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

