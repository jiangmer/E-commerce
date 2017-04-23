const
	Koa         =  require('koa')
  session     =  require('koa-session2'),
  renderer    =  require('koa-views'),
  bodyParser  =  require('koa-bodyparser'),
  Router      =  require('koa-router'),
  static      =  require('koa-static2')
	mongoose    =  require('mongoose')

const config = require('./config.js')
const app = new Koa()

const router = new Router()
const render = renderer('./app/view', {
	map: { html: 'pug' },
	extension: 'pug'
})

mongoose.connect(config.db.url, () => {
	console.log('connect to mongoDB success!')
})

require('./router/router.js')(router)

app
	.use(static('/static', './dist'))
	.use(render)
	.use(bodyParser())
	.use(router.routes())
	.use(router.allowedMethods())

app.listen(config.serverConfig.port, () => {
	console.log(`server running at http://localhost:${ config.port }`)
})

