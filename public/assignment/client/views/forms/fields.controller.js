(function() {
    'use strict';
    angular.module('FormBuilderApp').controller('FieldController', FieldController);

    function FieldController($location, $rootScope, $routeParams, $uibModal, FormService,
                             FieldService) {
        var fieldVm = this;
        // We have a logged-in user.
        if ($rootScope.user.loggedIn) {
            fieldVm.formId = $routeParams.formId;

            // Populate the fields
            var findFieldsForFormAndSetScope = function() {
                FieldService.getFieldsForForm(fieldVm.formId)
                    .then(function (response) {
                            fieldVm.fields = response;
                        });
            };
            findFieldsForFormAndSetScope();

            fieldVm.editField = function(field) {
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
                    FieldService.updateField(fieldVm.formId, field._id, field)
                        .then(function() {
                            findFieldsForFormAndSetScope();
                        });
                });
            };

            fieldVm.cloneField = function(field) {
                FieldService.createFieldForForm(fieldVm.formId, field)
                    .then(function() {
                        findFieldsForFormAndSetScope();
                    });
            };

            fieldVm.removeField = function(field) {
                FieldService.deleteFieldFromForm(fieldVm.formId, field._id)
                    .then(function() {
                        findFieldsForFormAndSetScope();
                    });
            };

            /* Used for drag and drop ordering. */
            fieldVm.sortableOptions = {
                handle: '.sortableHandle',
                update: function(e, ui) {
                    FormService.updateFormById(fieldVm.formId, {'fields': fieldVm.fields})
                        .then(function(form) {
                            console.log('Form Updated', form);
                            findFieldsForFormAndSetScope();
                        });
                }
            };

            fieldVm.addField = function(newFieldType) {
                FieldService.createFieldForForm(fieldVm.formId, {'type': newFieldType})
                    .then(function() {
                        findFieldsForFormAndSetScope();
                });
            };
        } else {
            fieldVm.$location = $location.path('/register');
        }
    }

    angular.module('FormBuilderApp').controller('ModalInstanceController', ModalInstanceController);
    function ModalInstanceController($scope, $uibModalInstance, field) {
        // TODO(bobby): vm style is funky with uiModal... figure out later
        var modalVm = $scope;
        modalVm.fieldToEdit = angular.copy(field);
        modalVm.hasPlaceholder = field.type === 'TEXT' || field.type === 'TEXTAREA' ||
            field.type === 'EMAIL';
        modalVm.hasOptions = field.type === 'OPTIONS' || field.type === 'CHECKBOXES' ||
            field.type === 'RADIOS';

        modalVm.fieldToEdit.optionsText = '';
        angular.forEach(modalVm.fieldToEdit.options || [], function(option) {
           modalVm.fieldToEdit.optionsText += option.label + ';' + option.value + '\n';
        });

        modalVm.update = function () {
            var optionsTextFragments = modalVm.fieldToEdit.optionsText.split('\n'),
                options = [];
            angular.forEach(optionsTextFragments, function(optionTextFragment) {
                var tokens = optionTextFragment.trim().split(';');
                if (tokens.length === 2) {
                    options.push({'label': tokens[0], 'value': tokens[1]});
                }
            });
            modalVm.fieldToEdit.options = options;
            $uibModalInstance.close(modalVm.fieldToEdit);
        };

        modalVm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();