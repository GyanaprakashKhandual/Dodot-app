import React from 'react'
import DooDotNavbar from '../components/Navbar'
import KanbanBoard from '../pages/Kanban'
import CardViewPage from '../pages/Card'

function page() {
  return (
    <div>
        <DooDotNavbar/>
        <CardViewPage/>
    </div>
  )
}

export default page