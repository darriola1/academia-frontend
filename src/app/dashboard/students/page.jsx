"use client"

import React, { useState, useEffect, Fragment } from "react"
// import { StudentsTable } from "./StudentsTable"
import { StudentsTable } from "@/app/dashboard/students/StudentTable"
import DashboardHeader from "@/components/DashboardHeader";

export default function StudentsPage() {
  return (
    <>
      {/* <DashboardHeader titulo="Estudiantes" /> */}
      <StudentsTable />
    </>

  )
}