import React from 'react'
import CardViewPage from '../pages/Card'
import KanbanBoard from '../pages/Kanban'
import Navbar from '../components/Navbar'

function page() {
  return (
    <div>
      <Navbar/>
      <KanbanBoard/>
    </div>
  )
}

export default page