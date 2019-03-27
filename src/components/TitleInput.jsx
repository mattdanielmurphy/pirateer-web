import React, { Component } from 'react'

class TitleInput extends Component {
	state = {
		title: ''
	}

	handleSubmit(e) {
		e.preventDefault()
		this.props.conductSearch(e.target.elements.title.value.trim())
		e.target.elements.title.value = ''
	}

	render() {
		return (
			<div id="title-input">
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<input name="title" autoFocus placeholder="Title" />
					<button type="submit">Search</button>
				</form>
			</div>
		)
	}
}

export default TitleInput
