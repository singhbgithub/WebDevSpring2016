(function() {
    'use strict';
    angular.module('FormBuilderApp').controller('FormController', FormController);

    function FormController($location, $rootScope, FormService) {
        var formVm = this;
        // We have a logged-in user.
        if ($rootScope.user.loggedIn) {

            // Populate the forms
            var findFormsForUserAndSetScope = function() {
                FormService.findAllFormsForUserId($rootScope.user._id)
                    .then(function(forms) {
                        formVm.forms = forms;
                    });
            };
            findFormsForUserAndSetScope();

            // Handlers
            formVm.addForm = function (formTitle) {
                var form = {'title': formTitle},
                    userId = $rootScope.user._id;
                FormService.createFormForUser(userId, form)
                    .then(function() {
                        findFormsForUserAndSetScope();
                        // Clear the current form and input text.
                        formVm.form.title = '';
                        formVm.currentForm = undefined;
                    });
            };

            formVm.updateForm = function (formTitle) {
                if (formVm.currentForm !== null && formVm.currentForm !== undefined) {
                    var form = {'title': formTitle},
                        formId = formVm.currentForm._id;
                    FormService.updateFormById(formId, form)
                        .then(function() {
                            findFormsForUserAndSetScope();
                        });
                }
            };

            formVm.deleteForm = function (index) {
                var formId = formVm.forms[index]._id;
                FormService.deleteFormById(formId)
                    .then(function() {
                        findFormsForUserAndSetScope();
                        formVm.currentForm = undefined;
                    });
            };

            formVm.selectForm = function (index) {
                formVm.currentForm = formVm.forms[index];
                // In case the form obj has not been instantiated.
                if (formVm.form == undefined || formVm.form == null) {
                    formVm.form = {};
                }
                formVm.form.title = formVm.currentForm.title;
            };

        }
        else {
            formVm.$location = $location.path('/register');
        }
    }
})();