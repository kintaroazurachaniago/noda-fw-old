module.exports = {
	dirname : [
		'private/controllers/spacontroller.js',
		'public/views/pages/test-spa.kint',
		'public/views/pages/test-spa-page-1.kint',
		'public/views/pages/test-spa-page-2.kint',
		'private/controllers/usercontroller.js',
		'private/models/usermodel.js',
		'private/routes.js',
		'private/template.js',
		'private/controllers/homecontroller.js',
		'private/controllers/testcontroller.js',
		'server.js',
		'setting.json',
		'ben.bat',
		'local-database.json',
		'private/ben.js',
		'private/models/base_model.js',
		'public/views/master.kint',
		'public/views/pages/home.kint',
		'public/views/pages/test-index.kint',
		'public/views/pages/test-auth-index.kint',
		'public/views/pages/test-auth-list.kint',
		'public/views/pages/test-auth-register.kint',
		'public/views/pages/test-auth-login.kint',
		'public/asset/css/style.css',
		'public/asset/images/note.txt',
		'public/asset/js/script.js',
	],
	data : [
	/* spacontroller.js */ `/* Filename : spacontroller.js */
/* Filename : spacontroller.js */
const
	/* Models */
	modelpath = '../models/'
	/* -=[models]=- */ // Don't remove this comment

module.exports = {

	index : (req, res) => {
		// Code here
		res.view('master', { title : 'SPA-TEST', page : 'pages/test-spa' })
	},
	spa_start : (req, res) => {
		console.log('spa active')
		req.session.put('spa', true)
		res.end('spa active')
	},
	spa_end : (req, res) => {
		console.log('spa ended')
		req.session.forget('spa')
		res.end('spa ended')
	},
	page_1 : (req, res) => {
		res.view('pages/test-spa-page-1')
	},
	page_2 : (req, res) => {
		res.view('pages/test-spa-page-2')
	}
	/* -=[method]=- */ // Don't remove this comment

}`,
	/* test-spa.kint */ `<!-- Filename : test-spa.kint -->
<h1>NODA-SPA</h1>
<center>
	<button class="btn btn-primary my-3" onclick="page_1()">Page 1</button>
	<button class="btn btn-primary my-3" onclick="page_2()">Page 2</button>
	<div class="spa">
		-=[ include('pages/test-spa-page-1') ]=-
	</div>
</center>`,
	/* test-spa-page-1.kint */ `<!-- Filename : test-spa-page-1.kint -->
<h1>Page 1</h1>`,
	/* test-spa-page-2.kint */ `<!-- Filename : test-spa-page-2.kint -->
<h1>Page 2</h1>`,
	/* usercontroller.js */ `/* Filename : usercontroller.js */
const
	modelpath = '../models/'
	// usermodel = require(modelpath + 'usermodel')

module.exports = {

	index : (req, res) => {
		const result = usermodel.get()
		console.log(result)
		res.end("I'ts work!")
	}

}`,
	/* usermodel.js */ `/* Filename : usermodel.js */
const base_model = require('./base_model')

class Usermodel extends base_model {

	constructor() {
		super('users')
	}

}

module.exports = new Usermodel()`,
/* routes.js */ `/* Filename : routes.js */
const
	Route = require('router')(),
	/* Controllers */
	spacontroller = require('./controllers/spacontroller'),
	homecontroller = require('./controllers/homecontroller'),
	testcontroller = require('./controllers/testcontroller'),
	usercontroller = require('./controllers/usercontroller')
	/* -=[controllers]=- */ // Don't remove this comment

/* Routes */
Route.get('/spa', spacontroller.index)
Route.get('/spa-start', spacontroller.spa_start) /* Spa state : true */
Route.get('/spa-end', spacontroller.spa_end) /* Spa state : undefined */
Route.get('/spa-page-1', spacontroller.page_1)
Route.get('/spa-page-2', spacontroller.page_2)

Route.get('/', homecontroller.index)
Route.get('/test', testcontroller.index)
Route.get('/test-auth', testcontroller.auth)
Route.get('/test-auth-login', testcontroller.auth_login)
Route.post('/test-auth-login-action', testcontroller.auth_login_action)
Route.get('/test-auth-register', testcontroller.auth_register)
Route.post('/test-auth-register-action', testcontroller.auth_register_action)
Route.get('/test-auth-list', testcontroller.auth_list)
Route.get('/test-auth-logout', testcontroller.auth_logout)
Route.get('/test-parameter/:username', testcontroller.parameter)
Route.get('/user', usercontroller.index)
/* -=[routes]=- */ // Don't remove this comment

module.exports = Route`,
/* template.js */ `/* Filename : template.js */
/*

	* Extention =======================

		.kint
		Example :
			index.kint
			home.kint

	* Syntax ==========================

		-=[]=- // Scripting tag
		-={}=- and echo() // Writing tag
		include() // Including another view source

		Note :
			-={}=- can only used outside of scripting tag
			write() and include() can only used inside of scripting tag

		Example :
			+ Correct syntax ++++++++++++++++++++++
				-=[
					include('views/partials/navbar')
					const text = 'Hello world'
					write(text); // Correct
				]=-
				-={ text }=-
			+ Wrong syntax ++++++++++++++++++++++++
				include('views/partials/navbar')
				-=[
					const text = 'Hello world'
					-={ text }=-
				]=-
				echo(text)

	* Usage ===========================

		res.ben('master', { title : 'Home', content : 'views/pages/home', another_data }) // another data will be the variable name in the view source file

	* Setting =========================

		const
			http = require('http'), // http module
			ben = require('ben') // ben module

		http.createServer( (req, res) => { // create new server
			res.ben = (master, data) => ben(res, master, data) // inserting method ben into http response object
			if (req.url === '/') res.ben('master', { title : 'Home', content : 'views/pages/home', another_data }) // call ben method if the route url = '/'
		}).listen(4120, _ => console.log('Server started!')) // running the server

*/

const fs = require('fs'), setting = JSON.parse(fs.readFileSync('./setting.json'))

class Ben {

	script = {
		text : \`const write = data => this.script.output += data, include = (path, data) => this.script.output += new Ben(path, data).script.output\`,
		output : \`<!--\nFilename\t: -={filename}=-\nExtention\t: -={extention}=-\nFolder\t\t: -={folder}=-\n-->\`
	}

	constructor(master, data={}) {
		console.log('Template data : ', data)
		this.script.output = this.script.output
			.replace('-={filename}=-', master.split('/').pop())
			.replace('-={extention}=-', '.kint')
			.replace('-={folder}=-', master.split('/').slice(0, -1).join('/') + '/')

		master = fs.readFileSync(\`\${setting.views + master}.kint\`, 'utf8')

		Object.keys(data).forEach( backend_data_key => {
			if (typeof data[backend_data_key] === 'object') this.script.text += \`, \${backend_data_key} = \${JSON.stringify(data[backend_data_key])}\`
			else this.script.text += \`, \${backend_data_key} = '\${data[backend_data_key]}'\`
		})

		this.script.text += ';\\nwrite(\`' + master.replace(/-=\\[/g, '\`);\\n').replace(/-={/g, '\`);\\nwrite(').replace(/}=-/g, ');\\nwrite(\`').replace(/\\]=-/g, '\\nwrite(\`') + '\`);'
		eval(this.script.text)
	}

}

module.exports = (res, master, data) => res.end(new Ben(master, data).script.output)`,
/* homecontroller.js */ `/* Filename : homecontroller.js */
module.exports = {

	index : (req, res) => {
		res.view('master', { title : 'Home', page : 'pages/home', user : { name : 'kintaro', age : 20 } })
	}

}`,
/* testcontroller.js */ `/* Filename : testcontroller.js */
const
	fs = require('fs'),
	{ execSync } = require('child_process')

var local_database = JSON.parse(fs.readFileSync(process.cwd()+'/local-database.json'))

module.exports = {

	index : (req, res) => {
		res.view('master', { title : 'Tester', page : 'pages/test-index', data : { url : req.url, auth : req.session.get('auth') ?? false } })
	},
	auth : (req, res) => {
		console.log('Database : ', local_database)
		console.log('Auth registered : ', req.session.get('auth') ?? false)
		res.view('master', { title : 'Tester-auth', page : 'pages/test-auth-index', data : { url : req.url, auth : req.session.get('auth') ?? false } })
	},
	auth_login : (req, res) => {
		res.view('master', { title : 'Tester-auth-login', page : 'pages/test-auth-login' })
	},
	auth_login_action : (req, res) => {
		var found = false
		local_database.forEach( localdb => {
			console.log('Trying : ', localdb)
			if (req.form.username === localdb.username && req.form.password === localdb.password) {
				found = localdb
			}
		})
		if (found) {
			req.session.put('auth', req.form)
			res.redirect('/test-auth')
		} else {
			res.redirect('/test-auth-login', req.form.username + ' not found!')
		}
	},
	auth_register : (req, res) => {
		res.view('master', { title : 'Tester-auth-register', page : 'pages/test-auth-register' })
	},
	auth_register_action : (req, res) => {
		var localdb = local_database
		localdb.push(req.form)
		local_database = localdb
		fs.writeFileSync(process.cwd()+'/local-database.json', JSON.stringify(localdb))
		req.session.put('auth', req.form)
		console.log('New user registered : ', req.form)
		res.redirect('/test-auth')
	},
	auth_list : (req, res) => {
		res.view('master', { title : 'Tester-auth-list', page : 'pages/test-auth-list', data : { users : local_database }})
	},
	auth_logout : (req, res) => {
		req.session.forget('auth')
		res.redirect('/test-auth')
	},
	parameter : (req, res) => {
		var found = {}
		local_database.forEach( localdb => {
			if (localdb.username === req.params.username) found = localdb
		})
		res.redirect('/test-auth-list', 'Username : ' + found.username + ' | Password : ' + found.password)
	}

}`,
/* server.js */ `/* Filename : server.js */
const
	fs = require('fs'),
	http = require('http'),
	finalhandler = require('finalhandler'),
	formidable = require('formidable'),
	session = require('node-session'),

	readysession = new session({secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'}),
	form = formidable({ multiples : true }),
	setting = JSON.parse(fs.readFileSync('./setting.json')),
	routes = require('./private/routes'),
	template = require('./private/template'),
	static = (req, res) => {
		const file = fs.readFileSync('.'+req.url)
		res.writeHead(200)
		res.end(file)
	}

http.createServer( (req, res) => {
	readysession.startSession(req, res, _ => {
		res.view = (master, data) => template(res, master, data) /* appending ben to the response object */
		res.redirect = (url='/', message) => res.end('<script>(_ => { ' + (message ? 'alert("'+message+'")' : '') + '; window.location.href = "' + url + '"; })()</script>')
		if (req.url.split('/')[1] === 'public') static(req, res)
		form.parse(req, (err, fields, files) => {
			req.form = fields /* appending form fields into request object */
			req.files = files /* appending form files into request object */
			routes(req, res, finalhandler(req, res)) /* throw the request and response object into routes */
		})
	})
}).listen(setting.port, console.log('Server started!'))`,
/* setting.json */ `{
	"comment" : "Filename : setting.json",
	"port" : 4120,
	"views" : "./public/views/",
	"database" : {
		"host" : "localhost",
		"user" : "kintaro",
		"password" : "azurachaniago",
		"database_name" : "bencoolen-framework"
	}
}`,
/* ben.bat */ `
@echo off
rem Filename : ben.bat
cd private
node ben.js %*
cd ..`,
/* local-database.json */ `[]`,
/* ben.js */ `/* Filename : ben.js */
const
	fs        	= require('fs'),
	action    	= process.argv.slice(2),
	warning   	= { route_exist : '\\nRoute already exist!' },
	CONTROLLER	= \`/* Filename : usercontroller.js */
const
	/* Models */
	modelpath = '../models/'
	/* -=[models]=- */ // Don't remove this comment

module.exports = {

	index : (req, res) => {
		// Code here
		res.end("{controller_name}.{controller_method} working!")
	}
	/* -=[method]=- */ // Don't remove this comment

}\`,
	MODEL				= \`/* Filename : usermodel.js */
const base_model = require('./base_model')

class Usermodel extends base_model {

	constructor() {
		super('users')
	}

}

module.exports = new Usermodel()\`
	add_route 	= data => {
		/* Route.method(url, controller) */
		data = data.split('@')
		const
			routes            	= fs.readFileSync('./routes.js', 'utf8').split('/* -=[routes]=- */'),
			route_url         	= data[0],
			route_method      	= data[1],
			controller_name   	= data[2].split('.')[0],
			controller_method 	= data[2].split('.')[1],
			new_route         	= \`Route.\${route_method}('\${route_url}', \${controller_name+'.'+controller_method})\`,
			controllers       	= routes[0].split('/* -=[controllers]=- */'),
			new_controller 			= ',\\n\\t' + controller_name.split('.')[0] + " = require('./controllers/" + controller_name.split('.')[0] + "')\\n\\t/* -=[controllers]=- */"

		if (!controllers[0].includes(controller_name)) {
			routes[0] = controllers[0].trim() + new_controller + controllers[1]
			console.log('\\nController added! : ', controller_name+'.'+controller_method)
			fs.writeFileSync('./controllers/'+controller_name+'.js', CONTROLLER.replace('{controller_name}', controller_name).replace('{controller_method}', controller_method).replace('usercontroller', controller_name))
		} else {
			const
				controller_exist = fs.readFileSync('./controllers/'+controller_name+'.js', 'utf8').split('/* -=[method]=- */'),
				new_method = ',\\n\\t' + controller_method + ' : (req, res) => {\\n\\t\\t// Code here\\n\\t\\tres.end("' + controller_name + '.' + controller_method + ' working!' + '")\\n\\t}\\n\\t/* -=[method]=- */'
			if (controller_exist[0].includes(controller_method+' : (req, res) => {')) console.log('\\nController method exist!')
			else fs.writeFileSync('./controllers/'+controller_name+'.js', controller_exist[0].trim() + new_method + controller_exist[1])
		}

		if (!routes.join('/* -=[routes]=- */').includes(new_route)) {
			fs.writeFileSync('./routes.js', routes[0].trim() + '\\n' + new_route + '\\n/* -=[routes]=- */' + routes[1])
			console.log('Route added! : ', { route_url, route_method, controller_name, controller_method });
		} else {
			fs.readFileSync('./routes.js', 'utf8').split('\\n').forEach( (lines, i) => {
				if (lines.includes(new_route)) console.log(warning.route_exist + ' check in the routes.js file on line ' + (i+1))
			})
		}
	},
	call_model = data => {
		data = data.split('@')
		console.log('Calling ' + data[0] + ' from ' + data[1])
		/* Model */
		if (!fs.existsSync('./models/' + data[0] + '.js')) {
			console.log(data[0] + " doesn't exist!")
			console.log('Creating new model "' + data[0] + '"')
			fs.writeFileSync('./models/' + data[0] + '.js', MODEL.replace('users', '/* table name */'))
			console.log('New model created successfully!')
		}
		/* Controller */
		if (!fs.existsSync('./controllers/' + data[1] + '.js')) {
			console.log(data[1] + " doesn't exist!")
			console.log('Creating new controller "' + data[1] + '"')
			fs.writeFileSync('./controllers/' + data[1] + '.js', CONTROLLER.replace('{controller_name}', 'new_controller').replace('{controller_method}', 'new_method').replace('usercontroller', 'new_controller'))
			console.log('New controller created successfully!')
		}
		const
			caller = fs.readFileSync('./controllers/' + data[1] + '.js', 'utf8').split('/* -=[models]=- */')
			result = caller[0].trim() + ',\\n\\t' + data[0] + ' = ' + "require(modelpath + '" + data[0] + "')\\n\\t/* -=[models]=- */" + caller[1]
		fs.writeFileSync('./controllers/' + data[1] + '.js', result)
		console.log(data[0] + ' called by ' + data[1])
	},
	fix_route = _ => {
		console.log('\\nFixing routes order ... \\n')
		const
			routes = fs.readFileSync('./routes.js', 'utf8') /* routes data before fixed */
		var
			wp = {/* routes "with parameters" */},
			wop = {/* routes "without parameters" */},
			fixed = '' /* routes fixed */

		routes.split('Route.').forEach( (route, i) => {
			if (i > 0) { /* first array's element is not a route */
				route = route.split('\\n')[0] /* splitting by new line */
				const folders_count = route.split('/').length /* how much / inside url */
				if (route.includes(':')) { /* is it using params */
					var x = 0 /* counter for checking params position */
					route.split('/').forEach( r => {
						if (!r.includes(':')) x++
						else wp[x] = route /* adding route into "with params" group */
					})
				} else {
					if (!wop[folders_count]) wop[folders_count] = []
					wop[folders_count].push(route) /* adding route into "without params" group */
				}
			}
		})

		for ( let[key, value] of Object.entries(wop) ) { /* looping for routes "without params" */
			value.forEach( v => {
				fixed += 'Route.' + v + '\\n' /* adding fixed value */
			})
		}
		/* just for convert wp object into an array */
		var wp_arr = [] 
		for ( let[key, value] of Object.entries(wp) ) {
			wp_arr.push(value)
		}
		wp_arr.reverse().forEach( wparr_reversed => {
			fixed += 'Route.' + wparr_reversed + '\\n' /* adding fixed value by "with params" value */
		})
		var
			counter = 0,
			routes_count = fixed.split('\\n').length
			interval_showing = setInterval(_ => {
				console.log(fixed.split('\\n')[counter])
				counter++
				if (counter === routes_count) finishing()
			}, 50)
			finishing = _ => {
				clearInterval(interval_showing)
				fixed = routes.split('/* Routes */')[0] + '/* Routes */\\n' + fixed + '/* -=[routes]=- */' + routes.split('/* -=[routes]=- */')[1] /* combining all routes component */
				fs.writeFileSync('./routes.js', fixed) /* rewrite routes file */
				console.log('Routes order fixed successfully!')
			}

	},
	create_controller = controller_name => {
		if (!fs.existsSync(controller_name)) {
			fs.writeFileSync('./controllers/'+controller_name+'.js', CONTROLLER.replace(/{controller_name}/g, controller_name).replace(/{controller_method}/g, 'index').replace('usercontroller', controller_name))
		} else {
			throw controller_name + ' already exist!'
		}
	}

switch (action[0]) {
	/*
		* ben add-route /test@get@testcontroller.index
		* "/test"          	= route url
		* "get"            	= http method
		* "testcontroller" 	= controller name
		* "index"          	= controller's method name
	*/
	case 'add-route' : add_route(action[1]); break
	/*
		* ben call-model usermodel@usercontroller
		* "usermodel"      	= called
		* "usercontroller" 	= caller
	*/
	case 'call-model' : call_model(action[1]); break
	/*
		* ben fix-route // Fixing routes order
	*/
	case 'fix-route' : fix_route(); break
	/*
		* ben create-controller testcontroller
	*/
	case 'create-controller' : create_controller(action[1]); break
	default : throw 'Invalid action!'; break
}`,
/* base_model.js */ `/* Filename : base_model.js */
/*
	.wheregroup({
		or : [
			{ and : ['sender = me', 'receiver = her'] },
			{ and : ['sender = her', 'receiver = me'] }
		]
	}
	.innerjoin('id', { chat : 'user_id' })
*/

const
	fs     	= require('fs'),
	mysql  	= require('sync-mysql'),
	setting	= JSON.parse(fs.readFileSync(process.cwd() + '\\\\setting.json'))

class DB {

	host         	= setting.database.host
	user         	= setting.database.user
	password     	= setting.database.password
	database_name	= setting.database.database_name
	table_name   	= ''
	sql          	= ''
	where_state  	= 0

	constructor(table) {
		this.table_name = table
		this.connection = new mysql({
			host    	: this.host,
			user    	: this.user,
			password	: this.password,
			database	: this.database_name
		})
	}

	is_integer(data) {
		const number	= '0123456789'
		var integer 	= 1
		data        	= data.toString()
		for ( let i = 0; i < data.length; i++ ) {
			if (!number.includes(data[i])) integer = 0
		}
		return integer ? data : "'" + data + "'"
	}

	error_message(text, splitter) {
		throw 'Error : ' + text + \`
\${__filename.replace(process.cwd(), 'Base::')} ON LINE \${fs.readFileSync(__filename, 'utf8').split(splitter).shift().split('\\n').length}
		\`
	}

	create(data) {
		var columns = [], values = []
		for ( let[key, value] of Object.entries(data) ) {
			columns.push(key); values.push(this.is_integer(value))
		}
		this.sql += 'INSERT INTO ' + this.table_name + ' (' + columns.join(', ') + ') VALUES (' + values.join(', ') + ')'
		return this.connection.query(this.sql)
	}

	clause_helper(clause, data) {
		const colval = data.split(' ') /* column and value */
		this.sql += " " + clause.toUpperCase() + " " + colval.shift() + " " + colval.shift() + " " + this.is_integer(colval.join(' '))
		return this
	}

	where(clause) {
		if(this.where_state) this.error_message('.where() called after .where()', '-=[1]=-')
		this.clause_helper('where', clause)
		this.where_state = 1;
		return this
	}
	or(clause) { this.clause_helper('or', clause); return this }
	and(clause) { this.clause_helper('and', clause); return this }

	wheregroup(clause) {
		if(this.where_state) this.error_message('.wheregroup() called after .where()', '-=[2]=-')
		var sql = " WHERE "
		Object.keys(clause).forEach( key => {
			clause[key].forEach( between => {
				Object.keys(between).forEach( between_key => {
					between[between_key].forEach( (between_data, i) => {
						var colval = between_data.split(' ') /* column and value */
						if (i === 0) sql += "(" + colval.shift() + " " + colval.shift() + " " + this.is_integer(colval.join(' ')) + " " + between_key.toUpperCase() + " "
						if (i === 1) sql += colval.shift() + " " + colval.shift() + " " + this.is_integer(colval.join(' ')) + ") " + key.toUpperCase() + " "
					})
				})
			})
		})
		this.sql += sql.split(' ').slice(0, -2).join(' ')
		this.where_state = 1
		return this
	}

	innerjoin(tb1_column, tb2) {
		if (this.where_state) this.error_message('.where() or .wheregroup() called before .innerjoin()', '-=[4]=-')
		var tb2_key = Object.keys(tb2).shift()
		this.sql += " INNER JOIN " + tb2_key + " ON " + this.table_name + "." + tb1_column + " = " + tb2_key + "." + tb2[tb2_key]
		return this
	}

	get(field='*') { this.sql = "SELECT " + field + " FROM " + this.table_name + this.sql; return this.connection.query(this.sql); }
	first(field='*') { return this.get(field).shift() }
	latest(field='*') { return this.get(field).pop() }

	update(data) {
		var sql = "UPDATE " + this.table_name + " SET "
		for ( let[key, value] of Object.entries(data) ) {
			sql += key + ' = ' + this.is_integer(value) + ', '
		}
		this.sql = sql.split(', ').slice(0, -1).join(', ') + this.sql
		return this.connection.query(this.sql)
	}

	delete() {
		this.sql = "DELETE FROM " + this.table_name + this.sql
		return this.connection.query(this.sql)
	}

	nativesql(sql) { return this.connection.query(sql) }

}

module.exports = DB`,
/* master.kint */ `<!-- Filename : master.kint -->
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" href="public/asset/css/style.css">
	<title>-={ title }=-</title>
</head>
<body>
	-=[ include(page, data) ]=-
	<script src="public/asset/js/script.js"></script>
</body>
</html>`,
/* home.kint */ `<!-- Filename : home.kint -->
<h1 class="shadow">Noda</h1>
<img class="shadow shadow-lg rounded" src="public/asset/images/bengkulu.jpg" alt="test image">
<div class="tester">
	<p>Start testing this framework</p>
	<button class="btn btn-primary" onclick="window.open('/test', '_self')">Start</button>
	<button class="btn btn-primary" onclick="window.open('/spa', '_self')">Try SPA</button>
</div>`,
/* test-index.kint */ `<!-- Filename : test-index.kint -->
<div class="tester">
	<div class="tester-header">Welcome to route tester</div>
	<div class="tester-body">Now you are visiting -={ url }=- url. let's try to test the authentication</div>
	<div class="tester-footer">
		<button class="btn btn-primary" onclick="window.open('/test-auth', '_self')">Let's go</button>
	</div>
</div>`,
/* test-auth-index.kint */ `<!-- Filename : test-auth-index.kint -->
<div class="tester">
	<div class="tester-header">Nice!</div>
	<div class="tester-body">Now you are visiting -={ url }=- url as -={ eval(auth) ? auth.username + '. Logout button will destroy auth session' : 'guest. let\\'s try to login or register to be authenticated' }=-</div>
	<div class="tester-footer">
		<div -={ eval(auth) ? 'hidden' : '' }=->
			<button class="btn btn-primary" onclick="window.open('/test-auth-login', '_self')">Login</button>
			<button class="btn btn-primary" onclick="window.open('/test-auth-register', '_self')">Register</button>
		</div>
		<div -={ !eval(auth) ? 'hidden' : '' }=->
			<button class="btn btn-primary" onclick="window.open('/test-auth-list', '_self')">List</button>
			<button class="btn btn-danger" onclick="window.open('/test-auth-logout', '_self')">Logout</button>
		</div>
	</div>
</div>`,
/* test-auth-list.kint */ `<!-- Filename : test-auth-list.kint -->
<div class="tester">
	<div class="tester-header">List users</div>
	<div class="tester-body">These all users in the local database, try to click one</div>
	<div class="tester-footer">
		-=[
			users.forEach( user => {
				var link = '/test-parameter/' + user.username
				write('<button class="btn btn-primary mx-2 my-2" onclick="window.open(\\'' + link + '\\', \\'_self\\')">' + user.username + '</button>')
			})
		]=-
	</div>
</div>`,
/* test-auth-register.kint */ `<!-- Filename : test-auth-register.kint -->
<div class="tester">
	<div class="tester-header">Register test</div>
	<div class="tester-body">Here, we will try to register. which is we will use forms and post method inside it.</div>
	<div class="tester-footer">
		<form action="/test-auth-register-action" method="post">
			<div class="row">
				<div class="col-md-5">
					<input class="form-control" type="text" name="username" placeholder="Username">
				</div>
				<div class="col-md-5">
					<input class="form-control" type="password" name="password" placeholder="Password">
				</div>
				<div class="col-md-2">
					<button class="btn btn-primary">Register</button>
				</div>
			</div>
		</form>
		<hr>
		<button class="btn btn-success" onclick="window.open('/test-auth-login', '_self')">Login</button>
	</div>
</div>`,
/* test-auth-login.kint */ `<!-- test-auth-login.kint -->
<div class="tester">
	<div class="tester-header">Login test</div>
	<div class="tester-body">Here, we will try to login. which is we will working with forms, session, and post method inside it.</div>
	<div class="tester-footer">
		<form action="/test-auth-login-action" method="post">
			<div class="row">
				<div class="col-md-5">
					<input class="form-control" type="text" name="username" placeholder="Username">
				</div>
				<div class="col-md-5">
					<input class="form-control" type="password" name="password" placeholder="Password">
				</div>
				<div class="col-md-2">
					<button class="btn btn-primary">Login</button>
				</div>
			</div>
		</form>
		<hr>
		<button class="btn btn-success" onclick="window.open('/test-auth-register', '_self')">Register</button>
	</div>
</div>`,
/* style.css */ `/* Filename : style.css */
* { margin: 0; font-family: monospace; }
body { padding-top: 150px; }
h1 {
	background: red;
	color: white; padding: 20px 10px; text-align: center;
	margin: auto; width: 420px; position: relative; top: 10px;
	border-radius: 6px 6px 6px 6px;
	z-index: 2;
}
img {
	width: 400px; margin: auto; display: block;
	border-radius: 0 0 6px 6px;
	z-index: 1;
}
.tester {
	max-width: 600px; margin: auto; text-align: center; margin-top: 25px; color: #bababa;
}
.tester-header {
	font-size: 40px;
	border-bottom: 1px solid #ddd;
}
.tester-body { padding: 10px 0; }
.tester-footer { padding: 10px 0; }`,
'Put images in this directory',
/* script.js */ `/* Filename : script.js */
console.log('script loaded!')

const
spa = async url => {
	console.log('visiting ' + url)
	await fetch('/spa-start')
	const res = await fetch(url)
	document.querySelector('.spa').innerHTML = await res.text()
	await fetch('/spa-end')
}
page_1 = async _ => {
	spa('/spa-page-1')
},
page_2 = async _ => {
	spa('/spa-page-2')
}`
	]
}
