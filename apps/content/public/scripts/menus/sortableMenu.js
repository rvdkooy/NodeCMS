angular.module('cms.sortableMenu', [])

    .directive('sortableMenu', function () {

        var _scope, menu;

        // this method is used to find the original nested array of an item
        // it can be used to remove the item from that array
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

        // whenever the nested sortable is updated with a drag event
        // we rebuild the complete hierarchy for angular to draw the nested menu again.
        // after that we reinit the nested menu again
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

        // this method is building up the new children nested array based on the 
        // hierarchy and the previous values of the menu
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

        // recursively loop through the previous menu to find an item
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

                menu = $('#nestedMenu')
                
                initNestedSortable();
            }
        };
    });