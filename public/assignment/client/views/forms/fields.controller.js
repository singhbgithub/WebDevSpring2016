(function() {
    'use strict';
    angular.module('FormBuilderApp').controller('FieldController', FieldController);

    function FieldController($location, $rootScope, $routeParams, $uibModal, FormService,
                             FieldService) {
        var fieldVm = this;

        // Event Handlers
        fieldVm.editField = editField;
        fieldVm.cloneField = cloneField;
        fieldVm.removeField = removeField;
        fieldVm.addField = addField;

        // Scope Variables
        fieldVm.sortableOptions = sortableOptionsGenerator();

        fieldVm.formId = $routeParams.formId;
        findFieldsForFormAndSetScope();

        // Populate the fields
        function findFieldsForFormAndSetScope() {
            FieldService.getFieldsForForm(fieldVm.formId)
                .then(function (response) {
                    fieldVm.fields = response;
                });
        }

        function editField(field) {
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
        }

        function cloneField(field) {
            FieldService.createFieldForForm(fieldVm.formId, field)
                .then(function() {
                    findFieldsForFormAndSetScope();
                });
        }

        function removeField(field) {
            FieldService.deleteFieldFromForm(fieldVm.formId, field._id)
                .then(function() {
                    findFieldsForFormAndSetScope();
                });
        }

        /* Used for drag and drop ordering. Made to be a function to allow for declaration
        * of the VM events at the top w/out linting errors. */
        function sortableOptionsGenerator() {
            return {
                handle: '.sortableHandle',
                update: function (e, ui) {
                    FormService.updateFormById(fieldVm.formId, {'fields': fieldVm.fields})
                        .then(function (form) {
                            console.log('Form Updated', form);
                            findFieldsForFormAndSetScope();
                        });
                }
            };
        }

        function addField(newFieldType) {
            FieldService.createFieldForForm(fieldVm.formId, {'type': newFieldType})
                .then(function() {
                    findFieldsForFormAndSetScope();
                });
        }
    }

    angular.module('FormBuilderApp').controller('ModalInstanceController', ModalInstanceController);
    function ModalInstanceController($scope, $uibModalInstance, field) {
        // TODO(bobby): vm style is funky with nested controllers
        var modalVm = $scope,
            optionDelimiter = ':';

        // Event Handlers
        modalVm.update = update;
        modalVm.cancel = cancel;

        // Scope Variables
        modalVm.fieldToEdit = angular.copy(field);
        modalVm.hasPlaceholder = field.type === 'TEXT' || field.type === 'TEXTAREA' ||
            field.type === 'EMAIL' || field.type === 'PASSWORD';
        modalVm.hasOptions = field.type === 'OPTIONS' || field.type === 'CHECKBOXES' ||
            field.type === 'RADIOS';
        modalVm.fieldToEdit.optionsText = '';

        // Add the options as text
        angular.forEach(modalVm.fieldToEdit.options || [], function(option) {
            modalVm.fieldToEdit.optionsText += option.label + optionDelimiter + option.value + '\n';
        });

        function update() {
            var optionsTextFragments = modalVm.fieldToEdit.optionsText.split('\n'),
                options = [];
            angular.forEach(optionsTextFragments, function(optionTextFragment) {
                var tokens = optionTextFragment.trim().split(optionDelimiter);
                if (tokens.length === 2) {
                    options.push({'label': tokens[0], 'value': tokens[1]});
                }
            });
            modalVm.fieldToEdit.options = options;
            $uibModalInstance.close(modalVm.fieldToEdit);
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
