import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom'

import Header from '../components/Header'
import Movies from '../components/Movies'
import TVShows from '../components/TVShows'
import NotFound from '../components/NotFound'

const AppRouter = () => (
	<Router>
		<div>
			<Header />
			<Switch>
				<Route exact path="/" component={Movies} />
				<Route exact path="/tv" component={TVShows} />
				<Route component={NotFound} />
			</Switch>
		</div>
	</Router>
)

export default AppRouter
