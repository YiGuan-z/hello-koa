class CreateMenu {
	constructor() {
		this.$isPrint = false
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
		if (this.$isPrint) {
			console.log(this.$SUCCESS)
		}
		return this.$SUCCESS
	}
	
	Fail(data) {
		this.$Fail.data = data;
		if (this.$isPrint) {
			console.log(this.$Fail)
		}
		console.log(this.$Fail)
		return this.$Fail
	}
	
	/**
	 * Whether to turn on debug mode
	 * @param option boolean
	 */
	isDeBug(option) {
		if (typeof option!="boolean"){
			throw new Error('true or false');
		}
		this.$isPrint = option;
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
