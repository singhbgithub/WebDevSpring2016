(function() {
    'use strict';
    angular.module('FormBuilderApp').controller('FormController', FormController);

    function FormController($scope, $location, $rootScope, FormService) {
        // We have a logged-in user.
        if ($rootScope.user.loggedIn) {

            // Populate the forms
            var findFormsForUserAndSetScope = function() {
                FormService.findAllFormsForUserId($rootScope.user._id)
                    .then(function(forms) {
                        $scope.forms = forms;
                    });
            };
            findFormsForUserAndSetScope();

            // Handlers
            $scope.addForm = function (formTitle) {
                var form = {'title': formTitle},
                    userId = $rootScope.user._id;
                FormService.createFormForUser(userId, form)
                    .then(function() {
                        findFormsForUserAndSetScope();
                        // Clear the current form and input text.
                        $scope.form.title = '';
                        $scope.currentForm = undefined;
                    });
            };

            $scope.updateForm = function (formTitle) {
                if ($scope.currentForm !== null && $scope.currentForm !== undefined) {
                    var form = {'title': formTitle},
                        formId = $scope.currentForm._id;
                    FormService.updateFormById(formId, form)
                        .then(function() {
                            findFormsForUserAndSetScope();
                        });
                }
            };

            $scope.deleteForm = function (index) {
                var formId = $scope.forms[index]._id;
                FormService.deleteFormById(formId)
                    .then(function() {
                        findFormsForUserAndSetScope();
                        $scope.currentForm = undefined;
                    });
            };

            $scope.selectForm = function (index) {
                $scope.currentForm = $scope.forms[index];
                // In case the form obj has not been instantiated.
                if ($scope.form == undefined || $scope.form == null) {
                    $scope.form = {};
                }
                $scope.form.title = $scope.currentForm.title;
            };

        }
        else {
            $scope.$location = $location.path('/register');
        }
    }
})();