import React from 'react'
import { Link } from 'react-router-dom';

function Pagination({postsPerPage , totalPosts, paginate}) {
    const pgNumber = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pgNumber.push(i);
    }
    return (
        <nav >
            <ul className='pagination mt-4 d-flex justify-content-center' >
                {pgNumber.map(number => (
                    <li key={number} className="page-item" style={{color:"#fff8c4"}}>
                        <Link onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination
