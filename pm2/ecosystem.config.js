module.exports = {
	apps: [{
		name: "api-fitzvrh",
		script: "./../server/dist/src/index.js",
		node_args: "--experimental-specifier-resolution=node"
	}]
}
