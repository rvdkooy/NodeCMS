var _ = require('underscore');

module.exports = function(contentpagesrepository, logger){

	this.findContentPage = function(req, res, next){
		
		var mainTemplate = 'frontend'; // This should come from some config setting

		if(req.url === '/'){
			// for now just render the default home page!!!
			res.render('apps/'+ mainTemplate +'/server/views/home/index', { 
				layout: 'apps/'+ mainTemplate +'/server/views/layout.ejs',
				model: { name: 'home' } }); 
		}
		else{
			contentpagesrepository.findByUrl( req.url, function(result){
				if(result){
					
					result.template = result.template || 'home';

					res.render('apps/'+ mainTemplate +'/server/views/' + result.template.toLowerCase() + '/index', { 
						layout: 'apps/'+ mainTemplate +'/server/views/layout.ejs',
						model: result }); 
				}
				else{
					next();
				}
			});
		}
	};

	this.index = function(req, res){
		res.render('apps/content/server/views/contentpages/index', {
			layout: 'system/views/shared/layout'
		});
	};
	
	this.ApiContentPages = function(req, res){

		contentpagesrepository.find({}, function(results){
			res.json(results);
		});
	}

	this.ApiGetContentPage = function(req, res){

		contentpagesrepository.findOne( req.params.id, function(result){
			res.json(result);
		});
	}

	this.ApiAddContentPage = function(req, res){

		contentpagesrepository.findByUrl( req.body.url, function(result){

			if(!result){

				var page = { 
					name: req.body.name,
					url: req.body.url,
					published: req.body.published,
					content: req.body.content,
					template: req.body.template,
					published: req.body.published,
					keywords: req.body.keywords,
					description: req.body.description
				};

				logger.info('Adding a new page with name: %s', page.name);

				contentpagesrepository.add(page, function(){
					res.status(200).send();
				}) ;
			}
			else{
				res.status(400)
					.json( {
						'RuleViolationExceptions': ['The url of the page is already in use']
					})
					.send();
			}
		});
	}

	this.ApiUpdateContentPage = function(req, res){
		
		contentpagesrepository.findByUrl( req.body.url, function(result){

			if(!result || result._id === req.params.id){
				logger.info('Updating the page with id: %s', req.params.id);

				contentpagesrepository.update(
					{ _id: req.params.id },
					{ $set: {
						name: req.body.name,
						url: req.body.url,
						content: req.body.content,
						template: req.body.template,
						published: req.body.published,
						keywords: req.body.keywords,
						description: req.body.description
						}
					},
					function(){
						res.status(200).send();
					});
			}
			else{
				res.status(400)
					.json( {
						'RuleViolationExceptions': ['The url of the page is already in use']
					})
					.send();
			}
		});
	}

	this.ApiDeleteContentPage = function(req, res){
				
		logger.info('Removing the page with id: %s', req.params.id);
		contentpagesrepository.remove({ _id: req.params.id }, { multi: false }, function(){
			res.status(200).send();
		});		
	}

	this.ApiLatestChanged = function(req, res){

		contentpagesrepository.find( {}, function(results){
			console.log(results);
			var mappedResult = _.map(results, function(page){ return { name: page.name }; });
			res.json(mappedResult);
		});			
	}
};
