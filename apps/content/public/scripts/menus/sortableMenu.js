angular.module('cms.sortableMenu', [])

    .directive('sortableMenu', function ($rootScope, $modal) {

        // var expandText = cms.adminResources.get('ADMIN_MENUS_LABEL_EXPAND');
        // var collapseText = cms.adminResources.get('ADMIN_MENUS_LABEL_COLLAPSE');
        // var optionsText = cms.adminResources.get('ADMIN_MENUS_LABEL_OPTIONS');
        // var placeholderNameText = cms.adminResources.get('ADMIN_MENUS_LABEL_PLACEHOLDER_NAME');
        // var placeholderUrlText = cms.adminResources.get('ADMIN_MENUS_LABEL_PLACEHOLDER_URL');
        // var removeText = cms.adminResources.get('ADMIN_MENUS_LABEL_REMOVE');
        var _scope;

        function findArray(array, item){
            for (var i = 0; i < array.length; i++) {
                if(array[i] === item){
                    return array;
                }
                if(item.children){
                    return findArray(item.children, item);
                }
            }
        }

        function rebuildMenuHierarchy(){
            var hierarchy = $('#nestedMenu').nestedSortable('toHierarchy');
            
            $('#nestedMenu').sortable("destroy");

            var newChildren = [];

            for (var i = 0; i < hierarchy.length; i++) {
                buildupNewChildren(hierarchy[i], _scope.menu.children, newChildren);
            };
            _scope.menu.children = newChildren;

            if (!_scope.$$phase) {
              _scope.$apply();
            }

            $('#nestedMenu').sortable();
        }

        function buildupNewChildren(hierarchyItem, originalMenu, newChildren){
            
            var originalItem = findInOriginalMenu(originalMenu, hierarchyItem.id);
            if(originalItem){
                originalItem.children = null;
                newChildren.push(originalItem);
            }
            if(hierarchyItem.children){
                
                originalItem.children = [];
                for (var i = 0; i < hierarchyItem.children.length; i++) {
                    buildupNewChildren(hierarchyItem.children[i], originalMenu, originalItem.children);
                };
            }
        }

        function searchRecursiveInChildren(item, id){
                        
            if(item.id === id){
                return item;
            }   
            else{
                if(item.children){
                    for (var i = 0; i < item.children.length; i++) {
                        return searchRecursiveInChildren(item.children[i], id);
                    }
                }
            }
        }

        function findInOriginalMenu(children, id){
           for (var i = 0; i < children.length; i++) {
                
                var searchResult = searchRecursiveInChildren(children[i], id);
                if(searchResult){
                    return searchResult;
                }
            };
        }

        return {
            restrict: 'E',
            templateUrl: '/assets/content/templates/menus/sortablemenu.html',
            link: function (scope, elm) {
                _scope = scope;

                _scope.toggle = function(el){
                    $(el.target).closest('.panel').find('.panel-body').slideToggle();
                };

                 _scope.remove = function(item){
                        var array = findArray(_scope.menu.children,item);
                        if(array){
                            array.splice(array.indexOf(item), 1);
                    };
                };

                $rootScope.$on('createNewMenuItem', function (event, data) {
                  var modalInstance = $modal.open({
                        templateUrl: 'newMenuItem',
                        controller: function($scope, $modalInstance) {

                            $scope.saveAndClose = function (name, url) {
                                $modalInstance.close({name: name, url: url});
                            };

                            $scope.closeModal = function() {
                                $modalInstance.close();
                            }
                        }
                    });

                    modalInstance.result.then(function(data) {

                        if (data) {
                            _scope.menu.children.push({ 
                                id: Math.floor((Math.random() * 1000000) + 1).toString(),
                                name: data.name, 
                                url: data.url,
                                children: [] 
                            });
                        }
                    });
                });

                setTimeout(function() {
                    $('#nestedMenu').nestedSortable({
                    forcePlaceholderSize: true,
                    helper: 'clone',
                    items: 'li.listitem',
                    maxLevels: 3,
                    opacity: .6,
                    revert: 250,
                    update: function(){
                        rebuildMenuHierarchy();
                    }
                    }).disableSelection();
                });
            }
        };
    });