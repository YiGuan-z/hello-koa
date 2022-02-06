const fs = require('fs');
// const os=require('os');
const shell = require('child_process');
const {CreateMenu} = require('../rules/rules');
const menu = CreateMenu.getInstance();
menu.isDeBug(false)
/**
 * 异步读取文件夹，使用Promise封装
 * @param page
 * @return {Promise<unknown>}
 */
const renderFileList = async (page) => {
	return new Promise(((resolve, reject) => {
		const viewUrl = `${page}`
		fs.readdir(viewUrl, 'utf8', ((err, data) => {
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
		const viewUrl = `${filePath}`
		fs.readFile(viewUrl, 'utf8', ((err, data) => {
			if (err) {
				reject(err)
			} else {
				resolve(data)
			}
		}))
	}))
}
const Execution = async (command) => {
	return new Promise(((resolve, reject) => {
		shell.exec(command, ((err, data) => {
			if (err) {
				reject(err);
			} else {
				reject(data);
			}
		}));
	}))
}
const route = async (url) => {
	const viewUrl = `/${url}`
	const data = await renderFileList(viewUrl)
		.then((v) => {
			return menu.Success(v)
			// return {
			// code: 200,
			// msg: 'success',
			// data: v
			
			// }
		})
		.catch(() => {
			return renderFile(viewUrl)
				.then((v) => {
					return menu.Success(v)
					// return {
					// 	code: 200,
					// 	msg: 'success',
					// 	data: v
					// }
				})
				.catch((v) => {
					return menu.Fail(v)
					// return {
					// 	code: 404,
					// 	msg: 'Not Found'
					// }
				});
		})
	return data
}
// export default route
module.exports = {
	route
};
