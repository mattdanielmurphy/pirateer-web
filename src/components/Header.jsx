import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => (
	<header>
		<NavLink className="nav-link" to="/">
			Movies
		</NavLink>
		<NavLink className="nav-link" to="/tv">
			TV Shows
		</NavLink>
	</header>
)

export default Header
