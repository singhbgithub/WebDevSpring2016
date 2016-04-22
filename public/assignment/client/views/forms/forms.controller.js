(function() {
    'use strict';
    angular.module('FormBuilderApp').controller('FormController', FormController);

    function FormController($rootScope, FormService) {
        var formVm = this;

        // Event Handlers
        formVm.addForm = addForm;
        formVm.updateForm = updateForm;
        formVm.deleteForm = deleteForm;
        formVm.selectForm = selectForm;
        
        findFormsForUserAndSetScope();

        // Populate the forms
        function findFormsForUserAndSetScope () {
            FormService.findAllFormsForUserId($rootScope.user.obj._id)
                .then(function(forms) {
                    formVm.forms = forms;
                });
        }

        // Handlers
        function addForm(formTitle) {
            var form = {'title': formTitle},
                userId = $rootScope.user.obj._id;
            FormService.createFormForUser(userId, form)
                .then(function() {
                    findFormsForUserAndSetScope();
                    // Clear the current form and input text.
                    formVm.form.title = '';
                    formVm.currentForm = undefined;
                });
        }

        function updateForm(formTitle) {
            if (formVm.currentForm !== null && formVm.currentForm !== undefined) {
                var form = {'title': formTitle},
                    formId = formVm.currentForm._id;
                FormService.updateFormById(formId, form)
                    .then(function() {
                        findFormsForUserAndSetScope();
                    });
            }
        }

        function deleteForm(index) {
            var formId = formVm.forms[index]._id;
            FormService.deleteFormById(formId)
                .then(function() {
                    findFormsForUserAndSetScope();
                    formVm.currentForm = undefined;
                });
        }

        function selectForm(index) {
            formVm.currentForm = formVm.forms[index];
            // In case the form obj has not been instantiated.
            if (formVm.form == undefined || formVm.form == null) {
                formVm.form = {};
            }
            formVm.form.title = formVm.currentForm.title;
        }
    }
})();