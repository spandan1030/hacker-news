import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className="my-0" style={{backgroundColor:"#fffad7"}}>
      <div  style={{color:"#ff782b" ,borderTop:"5px solid"}}></div>
      <div className="container d-flex justify-content-center my-2" style={{fontSize:"14px" }}>
        <Link className='text-muted mx-1' to="/" style={{textDecoration:"none" , color:'black'}}>Guidelines</Link>
        <p> | </p>
        <Link className='text-muted mx-1' to="/" style={{textDecoration:"none" , color:'black'}}>FAQ</Link><p> | </p>
        <Link className='text-muted mx-1' to="/" style={{textDecoration:"none" , color:'black'}}>Lists</Link><p> | </p>
        <Link className='text-muted mx-1' to="/" style={{textDecoration:"none" , color:'black'}}>API</Link><p> | </p>
        <Link className='text-muted mx-1' to="/" style={{textDecoration:"none" , color:'black'}}>Security</Link><p> | </p>
        <Link className='text-muted mx-1' to="/" style={{textDecoration:"none" , color:'black'}}>Legal</Link><p> | </p>
        <Link className='text-muted mx-1' to="/" style={{textDecoration:"none" , color:'black'}}>Apply to YC</Link><p> | </p>
        <Link className='text-muted mx-1' to="/" style={{textDecoration:"none" , color:'black'}}>Contact</Link>
      </div>
    </div>
  )
}

export default Footer
