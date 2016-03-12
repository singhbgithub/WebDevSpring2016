(function() {
    'use strict';
    angular.module('FormBuilderApp').factory('FormService', FormService);

    function FormService() {
        var _forms = [
            {'_id': '000', 'title': 'Contacts', 'userId': 123},
            {'_id': '010', 'title': 'ToDo',     'userId': 123},
            {'_id': '020', 'title': 'CDs',      'userId': 234}
        ];

        var service = {};

        service.findAllFormsForUser = function(userId, callback) {
            var userForms = [];
            for (var i = 0; i < _forms.length; i++) {
                var form = _forms[i];
                if (form.userId === userId) {
                    userForms.push(form);
                }
            }
            callback(userForms);
        };

        service.createFormForUser = function(userId, form, callback) {
            form._id = new Date().getTime();
            form.userId = userId;
            _forms.push(form);
            callback(form);
        };

        service.deleteFormById = function(formId, callback) {
            for (var i = 0; i < _forms.length; i++) {
                var form = _forms[i];
                if (form._id === formId) {
                    Array.remove(_forms, i);
                    callback(_forms);
                    break; // keeps the stack frame since the break hasn't happened TODO(bobby)
                }
            }
        };

        service.updateFormById = function(formId, newForm, callback) {
            for (var i = 0; i < _forms.length; i++) {
                var form = _forms[i];
                if (form._id === formId) { // can abstract this loop w/ a callback for diff actions. TODO(bobby)
                    _forms[i] = newForm;
                    _forms[i]._id = form._id;
                    _forms[i].userId = form.userId;
                    callback(form);
                    break; // keeps the stack frame since the break hasn't happened TODO(bobby)
                }
            }
        };

        return service;
    }
})();