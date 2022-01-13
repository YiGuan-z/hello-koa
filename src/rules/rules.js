class CreateMenu {
	constructor() {
		this.$Fail = {
			code: 404,
			msg: 'Not Found',
			data: null
		}
		this.$SUCCESS = {
			code: 200,
			msg: 'Success',
			data: null
		}
	}
	
	Success(data) {
		this.$SUCCESS.data = data;
		console.log(this.$SUCCESS)
		return this.$SUCCESS
	}
	
	Fail(data) {
		this.$Fail.data = data;
		console.log(this.$Fail)
		return this.$Fail
	}
	
	static getInstance() {
		if (!CreateMenu.instance) {
			CreateMenu.instance = new CreateMenu();
		}
		return CreateMenu.instance;
	}
}
module.exports = {
	CreateMenu
}
