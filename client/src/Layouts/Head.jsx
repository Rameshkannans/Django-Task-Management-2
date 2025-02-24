import React from 'react'
import Footer from './Footer'
import { Outlet, Link } from 'react-router-dom'

const Head = () => {
    return (
        <>
            <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/">Task</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link class="nav-link" to="/tasks">Show Tasks</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
            <Footer />
        </>
    )
}

export default Head