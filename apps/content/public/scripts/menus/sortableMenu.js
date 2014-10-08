angular.module('cms.sortableMenu', [])
    //
    // This directive is needed to to show the sortable menu
    //
    .directive('sortableMenu', function () {

        var expandText = cms.adminResources.get('ADMIN_MENUS_LABEL_EXPAND');
        var collapseText = cms.adminResources.get('ADMIN_MENUS_LABEL_COLLAPSE');
        var optionsText = cms.adminResources.get('ADMIN_MENUS_LABEL_OPTIONS');
        var placeholderNameText = cms.adminResources.get('ADMIN_MENUS_LABEL_PLACEHOLDER_NAME');
        var placeholderUrlText = cms.adminResources.get('ADMIN_MENUS_LABEL_PLACEHOLDER_URL');
        var removeText = cms.adminResources.get('ADMIN_MENUS_LABEL_REMOVE');

        var template = "<div class='panel panel-default'>" +
                            "<div class='panel-heading'>" +
                                "<span class='title'>{1}</span>" +
                                "<div class='pull-right'>" +
                                "<div class='btn-group'>" +
                                    "<button type='button' class='btn btn-default btn-xs dropdown-toggle' " +
                                    "data-toggle='dropdown'>" + optionsText + "<span class='caret'></span></button>" +
                                    "<ul class='dropdown-menu pull-right' role='menu'>" +
                                        "<li class='expandbutton'><a href='#'>" + expandText + "</a></li>" +
                                        "<li class='collapsebutton hidden'><a href='#'>" + collapseText + "</a></li>" +
                                        "<li class='deletebutton'><a href='#'>" + removeText + "</a></li>" +
                                    "</ul>" +
                                "</div>" +
                            "</div>" +
                            "</div>" +
                            "<div style='display:none' class='panel-body'>" +
                                "<div class='form-group'>" +
                                    "<input class='form-control' type='text' name='name_{0}' value='{1}' placeholder='" + placeholderNameText + "' />" +
                                "</div>" +
                                "<div class='form-group'>" +
                                    "<input class='form-control' type='text' name='url_{0}' value='{2}' placeholder='" + placeholderUrlText + "' />" +
                                "</div>" +
                            "</div>" +
                        "</div>";


        function toggleClassOnElement(element, className) {
            if (element.hasClass(className)) {
                element.removeClass(className);
            } else {
                element.addClass(className);
            }
        }

        function initToggleButtons(elm) {

            $(elm).find('.expandbutton a, .collapsebutton a').on("click", function () {

                $(this).closest('.panel').find('.panel-body').slideToggle();

                toggleClassOnElement($(this).closest('.panel-heading').find('li.collapsebutton'), 'hidden');
                toggleClassOnElement($(this).closest('.panel-heading').find('li.expandbutton'), 'hidden');
                toggleClassOnElement($(this).closest('.btn-group'), 'open');
                
                return false;
            });

            $(elm).find('.deletebutton').on('click', function () {
                $(this).closest('li.listitem').remove();
                return false;
            });
        }
        


        function addListItemsToNode(node, children) {
            for (var i = 0; i < children.length; i++) {
                var child = children[i];

                if(!child.id){
                    child.id = Math.floor((Math.random() * 1000000) + 1).toString();
                }

                var li = $("<li class='listitem' id='list_" + child.id + "'>");

                var replacedTemplate = template.format(child.id, child.name, child.url);

                li.html(replacedTemplate);
                node.append(li);

                initToggleButtons(li);

                if (child.children && child.children.length > 0) {

                    var orderedList = $("<ol>");
                    li.append(orderedList);

                    addListItemsToNode(orderedList, child.children);
                }
            }
        }

        return {
            restrict: 'A',
            link: function (scope, elm) {

                var childrenInMenu = [];
                
                scope.$watch('menu.children', function (newChildren, oldChildren) {
                    updateMenu(newChildren);
                }, true);

                function updateMenu(children) {

                    var childrenToAddToMenu = _.difference(children, childrenInMenu);
                    
                    for (var i = 0; i < childrenToAddToMenu.length; i++) {
                        childrenInMenu.push(childrenToAddToMenu[i]);
                    }

                    addListItemsToNode(elm, childrenToAddToMenu);
                }
                
                $(elm).nestedSortable({
                    forcePlaceholderSize: true,
                    helper: 'clone',
                    items: 'li.listitem',
                    maxLevels: 4,
                    opacity: .6,
                    revert: 250
                }).disableSelection();
            }
        };
    });