const
	command = ' & echo: & echo Npm initializing... & echo: & npm init -y & echo Installing router, finalhandler, sync-mysql, formidable, node-session ... & echo: & npm i router finalhandler sync-mysql formidable node-session & start cmd /k node server'
	appname = process.argv[2],
	fs = require('fs'),
	{ execSync } = require('child_process'),
	blueprints = require('./blueprints.js'),
	writefile = (appname, path, data) => {
		if (!fs.existsSync(appname + '/' + path)) {
			if (path.includes('/')) { // it's mean, the file we will write is in sub-folder
				
				/* creating folders */ var parent_folder = '/'
				path.split('/').slice(0, -1).forEach( folder => {
					if (!fs.existsSync(appname + "/" + parent_folder + folder)) fs.mkdirSync(appname + '/' + parent_folder + folder)
					parent_folder += folder + '/'
				})/* creating folders finished */

				fs.writeFileSync(appname + "/" + path, data) /* writing file inside of sub-folder */
				console.log('Writing : sub-folder : ' + appname + "/" + path)
			}
			else {
				fs.writeFileSync(appname + '/' + path, data) /* writing file in this directory */
				console.log('Writing : non-folder : ' + appname + '/' + path)
			}
		}
	}
	
if (!fs.existsSync(appname)) {
	console.log('\nCreating new project ...')
	fs.mkdirSync('./' + appname)
	blueprints.dirname.forEach( (dirname, i) => {
		writefile(appname, dirname, blueprints.data[i])
	})
	console.log('All files written successfully!')
	fs.copyFileSync('./node_modules/bencoolen-framework/bengkulu.jpg', './' + appname + '/public/asset/images/bengkulu.jpg')
	execSync(`cd ${appname + command}`, { stdio: 'inherit' })
	console.log('\nReady to work! New project created successfully!')
}
else throw `${appname} already exist!`
