const Koa = require('koa');
const fs = require('fs');
const app = new Koa();
/**
 * 异步读取文件夹，使用Promise封装
 * @param page
 * @return {Promise<unknown>}
 */
const render = async (page) => {
	return new Promise(((resolve, reject) => {
		let viewUrl = `${page}`
		fs.readdir(viewUrl, ((err, data) => {
			if (err) {
				reject(err)
			} else {
				resolve(data)
			}
		}))
	}))
}
/**
 * 异步读取文件，使用Promise封装
 * @param filePath
 * @return {Promise<unknown>}
 */
const renderFile = async (filePath) => {
	return new Promise(((resolve, reject) => {
		let viewUrl = `${filePath}`
		fs.readFile(viewUrl, ((err, data) => {
			if (err) {
				reject(err)
			} else {
				resolve(data)
			}
		}))
	}))
}

const route = async (url) => {
	let viewUrl = `/${url}`
	let data = await render(viewUrl).catch(()=>{
		return renderFile(viewUrl);
	})
	return data
}

app.use(async (ctx) => {
	let url = ctx.request.url;
	ctx.body = await route(url);
	ctx.set('Content-Type', 'application/json');
	ctx.set('Access-Control-Allow-Origin', '*');
	console.log(`[demo] koa was visited ip is ${ctx.request.ip} time:${new Date().toLocaleString()} browsed ${ctx.request.url}`);
});
app.listen(3000);
console.log('[demo] koa started at port 3000');
