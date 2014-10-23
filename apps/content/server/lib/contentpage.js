module.exports = function(name, url, template){
	
	var self = this;
	this.name = name;
	this.url = url || '/' + name;
	this.published = true,
	this.content = '',
	this.template = template || 'Home',
	this.keywords = '',
	this.description = '',
	this.changed = new Date();
}