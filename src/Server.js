const Koa = require('koa');
const app = new Koa();
const {route} = require("./api/fileapi");
const {CreateMenu}=require('./rules/rules');
const menu=CreateMenu.getInstance()

//Start Application ...
app.use(async (ctx) => {
	ctx.set('Content-Type', 'application/json');
	ctx.set('Access-Control-Allow-Origin', '*');
	const url = ctx.request.url;
	const fileList = await route(url);
	if (fileList.code === 404) {
		// ctx.body=menu.Fail(fileList);
		ctx.body = {
			code: 404,
			msg: 'Not Found'
		}
	}else {
		// ctx.body=menu.Success(fileList);
		ctx.body = {
			code: 200,
			msg: 'success',
			data: fileList
		}
	}
	console.log(`[demo] koa was visited ip is ${ctx.request.ip} time:${new Date().toLocaleString()} browsed ${ctx.request.url}`);
});
app.listen(3000);
console.log('[demo] http://localhost:3000')
console.log('[demo] koa started at port 3000');
