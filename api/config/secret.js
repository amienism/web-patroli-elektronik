const env = 'production'

//insert your API Key & Secret for each environment, keep this file local and never push it to a public repo for security purposes.
const config = {
	production:{	
		APISecret: 'patrole-apps',
		RefreshSecret: 'refresh-patrole-apps'
	}
};

module.exports = config[env]
