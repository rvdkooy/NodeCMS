module.exports = function(name, children){
	
	var self = this;
	this.name = name;
	this.children = children || [];

	this.numberOfItems = function(){
		
		return countMenuItems(self.children);
	};

	function countMenuItems(children){
		var counter = 0;
		
		for (var i = 0; i < children.length; i++) {
			counter++;
			
			if(children[i].children.length > 0){
				counter += countMenuItems(children[i].children);
			}
		};

		return counter;
	}
}

