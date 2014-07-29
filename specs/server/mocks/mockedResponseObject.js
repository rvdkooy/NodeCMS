module.exports = function(){
	this.render = function(view, options){
		this.view = view;
		this.options = options;
	};

	this.json = function(data){
		this.jsonData = data;
	}
};