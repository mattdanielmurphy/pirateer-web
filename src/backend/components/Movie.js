const { search, checkIsUp, proxies } = require('piratebay-search')
const { result } = require('./Result')
const { Filter } = require('./Filter')

class Movie {
	constructor() {
		this.filters = {
			minSeeders: 2,
			minFileSize: 0.1,
			maxFileSize: 30
		}
		this.sortOrder = 'descending'
		this.resultsPageLength = 26
	}
	async search(title, sortBySeeders, clipboardMagnetLinks) {
		this.title = title
		this.clipboardMagnetLinks = clipboardMagnetLinks
		this.sortBy = sortBySeeders ? 'seeders' : null
		let results = []
		await this.searchTorrents().then((res) => (results = res))
		return results
	}
	async searchTorrents() {
		let title = this.title
		let minSeeders = this.filters.minSeeders
		let results = []

		await new Promise((resolve) => {
			function searchPage(pageN = 0) {
				console.log(`Searching page ${pageN + 1}...`)
				search(title, {
					baseURL: 'https://thepiratebay.org',
					page: pageN
				}).then((res) => {
					if (res.length > 0 && res[0].seeds >= minSeeders) {
						results.push(...res)
						// only continue if last item is at or above minSeeders
						const lastResultHasMinSeeds = res[res.length - 1].seeds >= minSeeders

						if (lastResultHasMinSeeds) searchPage(pageN + 1)
						else resolve()
					} else resolve()
				})
			}
			searchPage()
		})
		return results
	}
}

const movie = new Movie()

module.exports = { movie }
