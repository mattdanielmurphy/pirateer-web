const { search, checkIsUp, proxies } = require('piratebay-search')
const { download } = require('./DownloadTorrents')

class Series {
	getEpisodes(info) {
		let { title, season, firstEp, lastEp } = info
		if (!title) title = this.title
		new Promise((resolve) => {
			this.searchEpisode(title, Number(season), Number(firstEp), Number(lastEp), resolve)
		}).then((result) => {
			if (result.length > 0) download.series(result)
		})
	}
	searchEpisode(title, season, episode, lastEpisode, resolve, magnetLinks = []) {
		const leadingZero = (n) => (String(n).length < 2 ? 0 + String(n) : n)

		let searchQuery = `${title} s${leadingZero(season)}e${leadingZero(episode)}`

		process.stdout.write(`Searching for episode ${episode}...`)
		search(searchQuery, {
			link: 'https://thehiddenbay.com'
		})
			.then((res) => {
				let result = res[0]

				if (result) {
					magnetLinks.push(result.file)
					if (result.seeds < 1) process.stdout.write(` Found, but no seeds :(\n`)
					else process.stdout.write(` Found! Seeds: ${result.seeds}\n`)
				} else process.stdout.write(` Couldn't find it :(\n`)

				if (episode < lastEpisode) {
					this.searchEpisode(title, season, episode + 1, lastEpisode, resolve, magnetLinks)
				} else {
					resolve(magnetLinks)
				}
			})
			.catch(console.error)
	}
}

module.exports = { Series }
