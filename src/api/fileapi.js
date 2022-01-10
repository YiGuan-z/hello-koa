const fs = require('fs');
/**
 * 异步读取文件夹，使用Promise封装
 * @param page
 * @return {Promise<unknown>}
 */
const renderFileList = async (page) => {
	return new Promise(((resolve, reject) => {
		const viewUrl = `${page}`
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
		const viewUrl = `${filePath}`
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
	const viewUrl = `/${url}`
	const data = await renderFileList(viewUrl).catch(() => {
		return renderFile(viewUrl).catch(() => {
			return {
				code: 404,
				msg: 'Not Found'
			}
		});
	})
	return data
}
// export default route
module.exports = {
	route
};
