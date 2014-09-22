module.exports = function(contentpagesrepository, logger){

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
					selectedTemplate: req.body.selectedTemplate,
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
						selectedTemplate: req.body.selectedTemplate,
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
};
