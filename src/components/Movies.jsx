import React, { Component } from 'react'
import TitleInput from './TitleInput'
const { result } = require('../backend/components/Result')
const { filter } = require('../backend/components/Filter')

var socket = require('socket.io-client')('http://99.230.162.252:3000')

class Result extends Component {
	render() {
		return <div>{this.props.resultName}</div>
	}
}

const Results = (props) => (
	<div id="results">{props.results.map((result, i) => <Result resultName={result} key={i} />)}</div>
)

class Movies extends Component {
	state = {
		results: [],
		filters: {
			sortBy: 'fileSizeSeeders',
			minSeeders: 2,
			minFileSize: 0.1,
			maxFileSize: 30
		}
	}
	displayResults = (results) => {
		results = results.map((r) => (
			<div className="result">
				<a href={r.file}>
					<div className="name">{r.name.trim()}</div>
					<div className="seeds">{r.seeds}s</div>
					<div className="file-size">{result.getFileSizeString(r).join(' ')}</div>
					<div className="date">{result.getUploadDateString(r)}</div>
				</a>
				<div className="link">
					<a href={`https://thepiratebay.org/${r.link}`} target="_blank">
						Open page on TPB
					</a>
				</div>
			</div>
		))
		this.setState({ results })
	}
	conductSearch = (query) => {
		socket.emit('search', query)
		socket.on('results', (results) => {
			filter.filterResults(results, this.state.filters).then((results) => {
				this.displayResults(results)
				const noResults = <div id="no-results">No results :(</div>
				if (results.length === 0) this.setState({ noResults })
				else this.setState({ noResults: false })
			})
		})
	}
	render() {
		return (
			<div>
				<h2>Movies</h2>
				<TitleInput conductSearch={this.conductSearch} />
				{this.state.noResults || <Results id="results" results={this.state.results} />}
			</div>
		)
	}
}

export default Movies

// socket.on('connect', () => {
// 	this.displayResults([
// 		{
// 			name: 'TPB AFK: The Pirate Bay Away from Keyboard (2013) 720p h264 581m',
// 			link: '/torrent/8188870/TPB_AFK__The_Pirate_Bay_Away_from_Keyboard_(2013)_720p_h264_581m',
// 			seeds: '1',
// 			peers: '1',
// 			description: 'Uploaded 02-25 2013, Size 589.1 MiB, ULed by Anonymous',
// 			file: 'magnet:asdf'
// 		},
// 		{
// 			name: 'TPB AFK: The Pirate Bay Away From Keyboard (2013) Documentary',
// 			link: '/torrent/23525387/TPB_AFK__The_Pirate_Bay_Away_From_Keyboard_(2013)_Documentary',
// 			seeds: '1',
// 			peers: '1',
// 			description: 'Uploaded 07-26 2018, Size 379.38 MiB, ULed by roflcopter2110',
// 			file: 'magnet:asdf'
// 		},
// 		{
// 			name: 'TPB AFK Pirate Bay Documentary Cam',
// 			link: '/torrent/4847395/TPB_AFK_Pirate_Bay_Documentary_Cam',
// 			seeds: '0',
// 			peers: '0',
// 			description: 'Uploaded 04-14 2009, Size 5.91 MiB, ULed by ooooowee',
// 			file: 'magnet:asdf'
// 		},
// 		{
// 			name: 'TPB AFK Documentary Trailer Ogg Theora',
// 			link: '/torrent/4865172/TPB_AFK_Documentary_Trailer_Ogg_Theora',
// 			seeds: '0',
// 			peers: '0',
// 			description: 'Uploaded 04-23 2009, Size 11.58 MiB, ULed by Quadduc',
// 			file: 'magnet:asdf'
// 		}
// 	])
// })
