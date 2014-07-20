module.exports = function(){
	this.render = function(view, options){
		this.view = view;
		this.options = options;
	};
};