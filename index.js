'use strict';

const got = require('got');

module.exports = async (username, exclude) => {
	const url = `https://api.storiesig.com/stories/${username}`;

	const obx = {
		image: 'jpg',
		video: 'mp4'
	};

	return got(url, {json: true}).then(res => {
		const base = res.body.items;
		let stories = [];
		for (let i = 0; i < base.length; i++) {
			base[i].video_versions === undefined ? 
			stories.push([{
				"url": base[i].image_versions2.candidates[0].url, 
				"shortcode": base[i].code,
				"expiring_at": base[i].expiring_at
				}]) : 
			stories.push([{
				"url": base[i].video_versions[0].url, 
				"shortcode": base[i].code,
				"expiring_at": base[i].expiring_at
				}]);
		}
		return exclude !== undefined ? stories.story.filter(urls => urls.indexOf(obx[exclude]) === -1) : stories;
	});
};
