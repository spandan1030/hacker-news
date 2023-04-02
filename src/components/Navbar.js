import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#ff782b" }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src="../logo.png" alt="Logo" height="26" className="d-inline-block align-text-top mx-1 border" />
                    <strong>Hacker News</strong>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link " to="/welcome">Welcome</Link>
                        </li>
                        
                    </ul>
                    <form className="d-flex" role="search">
                        <Link className="btn btn-danger" to={"/search/"} style={{width:"200px"}}>Search Page</Link>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
