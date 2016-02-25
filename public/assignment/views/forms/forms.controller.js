(function(){
    angular.module('FormBuilderApp').controller('FormController', FormController);

    function FormController($scope, $location, $rootScope, FormService) {
        // We have a logged-in user.
        if ($rootScope.user.loggedIn) {
            // Populate the forms
            var callbackForms = function(forms) {
                $scope.forms = forms;
            };
            FormService.findAllFormsForUser($scope.user._id, callbackForms);

            // Handlers
            $scope.addForm = function (formTitle) {
                var form = {'title': formTitle},
                    userId = $scope.user._id,
                    callback = function() {
                        FormService.findAllFormsForUser($scope.user._id, callbackForms);
                        $scope.form.title = '';  // Reset the input text
                        $scope.currentForm = undefined;

                    };
                FormService.createFormForUser(userId, form, callback);
            };
            $scope.updateForm = function (formTitle) {
                if ($scope.currentForm !== null && $scope.currentForm !== undefined) {
                    var form = {'title': formTitle},
                        formId = $scope.currentForm._id,
                        callback = function() {
                            FormService.findAllFormsForUser($scope.user._id, callbackForms);
                        };
                    FormService.updateFormById(formId, form, callback);
                }
            };
            $scope.deleteForm = function (index) {
                var formId = $scope.forms[index]._id,
                    callback = function() {
                        FormService.findAllFormsForUser($scope.user._id, callbackForms);
                        $scope.currentForm = undefined;
                    };
                FormService.deleteFormById(formId, callback);
            };
            $scope.selectForm = function (index) {
                $scope.currentForm = $scope.forms[index];
                // In case the form obj has not been instantiated.
                if ($scope.form !== undefined && $scope.form !== null) {
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