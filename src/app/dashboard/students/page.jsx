"use client"

import React, { useState, useEffect } from "react"
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
// import { StudentsTable } from "./StudentsTable"
import { StudentsTable } from "@/app/dashboard/students/StudentTable"

export default function StudentsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <StudentsTable />
    </div>
  )
}