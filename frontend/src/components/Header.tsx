import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header style={{display:'flex', justifyContent:'space-between', padding:'1rem', borderBottom:'1px solid #ccc'}}>
      <div><strong>Timesheet</strong></div>
      <nav>
        <Link to="/" style={{marginRight:'1rem'}}>Home</Link>
        <Link to="/history">History</Link>
      </nav>
    </header>
  )
}
