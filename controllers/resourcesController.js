var fs = require('fs');

exports.getResources = function(req, res){

	fs.readFile(__dirname + '/../locales/en.js', 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}

		data = JSON.parse(data);

		var keyvalues = "";

		for(var property in data){

			if(data.hasOwnProperty(property)){
		    	keyvalues += '{ key: "' + property + '", value: "' + data[property] + '" },'
			}
		}
		keyvalues = keyvalues.slice(0, - 1);

		var script = "(function (cms) {" +
                                    
            "var globalResources = [" + keyvalues + "]; " +

            "function get(key, context) { " +
                "var value = 'Unknown Resource!'; " +
                
                "for(var i = 0; i<globalResources.length; i++){ " +
                        
                    "if(globalResources[i].key === key){ " +
                        "value = globalResources[i].value; " +
                        "if(context){ value = value.format(context); } "+
                    "}" +
                "}" +

                "return value; " +
            "}; "+

            "cms.adminResources = { " +
                "get: get " +
            "}; " +
            "}(window.cms = window.cms || {}));";

		res.set({
		  'Content-Type': 'application/x-javascript',
		  'Content-Length': Buffer.byteLength(script, 'utf8')
		});
		
		res.send(script);
	});
};