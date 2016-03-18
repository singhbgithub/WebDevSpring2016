(function() {
    'use strict';
    angular.module('FormBuilderApp').controller('FieldController', FieldController);

    function FieldController($scope, $location, $rootScope, $routeParams, $uibModal, FormService,
                             FieldService) {
        // We have a logged-in user.
        if ($rootScope.user.loggedIn) {
            $scope.formId = $routeParams.formId;

            // Populate the fields
            var findFieldsForFormAndSetScope = function() {
                FieldService.getFieldsForForm($scope.formId)
                    .then(function (response) {
                            $scope.fields = response;
                        });
            };
            findFieldsForFormAndSetScope();

            $scope.editField = function(field) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'fieldModal.html',
                    controller: 'ModalInstanceController',
                    resolve: {
                        field: function () {
                            return field;
                        }
                    }
                });
                modalInstance.result.then(function (field) {
                    FieldService.updateField($scope.formId, field._id, field)
                        .then(function() {
                            findFieldsForFormAndSetScope();
                        });
                });
            };

            $scope.cloneField = function(field) {
                FieldService.createFieldForForm($scope.formId, field)
                    .then(function() {
                        findFieldsForFormAndSetScope();
                    });
            };

            $scope.removeField = function(field) {
                FieldService.deleteFieldFromForm($scope.formId, field._id)
                    .then(function() {
                        findFieldsForFormAndSetScope();
                    });
            };

            /* Used for drag and drop ordering. */
            $scope.sortableOptions = {
                handle: '.sortableHandle',
                update: function(e, ui) {
                    FormService.updateFormById($scope.formId, {'fields': $scope.fields})
                        .then(function(form) {
                            console.log('Form Updated', form);
                            findFieldsForFormAndSetScope();
                        });
                }
            };

            $scope.addField = function(newFieldType) {
                FieldService.createFieldForForm($scope.formId, {'type': newFieldType})
                    .then(function() {
                        findFieldsForFormAndSetScope();
                });
            };
        } else {
            $scope.$location = $location.path('/register');
        }
    }

    angular.module('FormBuilderApp').controller('ModalInstanceController', ModalInstanceController);
    function ModalInstanceController($scope, $uibModalInstance, field) {

        $scope.fieldToEdit = angular.copy(field);
        $scope.hasPlaceholder = field.type === 'TEXT' || field.type === 'TEXTAREA' ||
            field.type === 'EMAIL';
        $scope.hasOptions = field.type === 'OPTIONS' || field.type === 'CHECKBOXES' ||
            field.type === 'RADIOS';

        $scope.fieldToEdit.optionsText = '';
        angular.forEach($scope.fieldToEdit.options || [], function(option) {
           $scope.fieldToEdit.optionsText += option.label + ';' + option.value + '\n';
        });

        $scope.update = function () {
            var optionsTextFragments = $scope.fieldToEdit.optionsText.split('\n'),
                options = [];
            angular.forEach(optionsTextFragments, function(optionTextFragment) {
                var tokens = optionTextFragment.trim().split(';');
                if (tokens.length === 2) {
                    options.push({'label': tokens[0], 'value': tokens[1]});
                }
            });
            $scope.fieldToEdit.options = options;
            $uibModalInstance.close($scope.fieldToEdit);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();