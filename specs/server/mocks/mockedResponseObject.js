module.exports = function(){
	
	var self = this;
	this.render = function(view, options){
		this.view = view;
		this.options = options;
	};

	this.json = function(data){
		this.jsonData = data;
	};

	this.status = function(status){
		this.currentStatus = status;
		return this;
	}

	this.send = function(){
		this.isSend = true;
	}
};