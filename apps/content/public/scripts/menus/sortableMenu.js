angular.module('cms.sortableMenu', [])

    .directive('sortableMenu', function ($rootScope, $modal) {

        var _scope, firstrun = true, menu;

        function findArray(array, item){
            for (var i = 0; i < array.length; i++) {
                if(array[i] === item){
                    return array;
                }
                if(item.children){
                    var result = findArray(item.children, item);
                    if(result){
                        return result;
                    }
                }
            }
        }

        function rebuildMenuHierarchy(){
            var hierarchy = menu.nestedSortable('toHierarchy');
            menu.nestedSortable("destroy");
            var newChildren = [];

            for (var i = 0; i < hierarchy.length; i++) {
                buildupNewChildren(hierarchy[i], _scope.menu.children, newChildren);
            };
            _scope.menu.children = newChildren;

            if (!_scope.$$phase) {
              _scope.$apply();
            }

            initNestedSortable();
        }

        function buildupNewChildren(hierarchyItem, originalMenu, newChildren){
            
            var originalItem = searchInOriginalMenu(originalMenu, hierarchyItem.id);
            
            if(originalItem){
                
                var newItem = angular.copy(originalItem);
                newItem.children = [];
                newChildren.push(newItem);

                if(hierarchyItem.children){
                
                    for (var i = 0; i < hierarchyItem.children.length; i++) {
                        buildupNewChildren(hierarchyItem.children[i], originalMenu, newItem.children);
                    };
                }
            }
        }

        function searchInOriginalMenu(children, id){
                        
            for (var i = 0; i < children.length; i++) {
                
                if(children[i].id === id){
                    return children[i];
                } 
                if(children[i].children){
                    var result = searchInOriginalMenu(children[i].children, id);
                    if(result){
                        return result;
                    }
                } 
            }
        }

        function initNestedSortable(){

            setTimeout(function() {
                menu.nestedSortable({
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

        return {
            restrict: 'E',
            templateUrl: '/assets/content/templates/menus/sortablemenu.html',
            link: function (scope, elm) {
                _scope = scope;

                _scope.toggle = function(el){
                    $(el.target).closest('.panel').find('.panel-body').slideToggle();
                };

                 _scope.remove = function(item){
                        var array = findArray(_scope.menu.children, item);
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
                
                menu = $('#nestedMenu')
                
                initNestedSortable();
            }
        };
    });