(function(){
    angular.module('FormBuilderApp').factory('FormService', FormService);

    function FormService() {
        // Array Remove - By John Resig (MIT Licensed)
        Array.prototype.remove = function(from, to) {
            var rest = this.slice((to || from) + 1 || this.length);
            this.length = from < 0 ? this.length + from : from;
            return this.push.apply(this, rest);
        };
        var _forms = []; // Declare empty array as required in assignment, though seems extraneous
        _forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        var service = {};

        service.findAllFormsForUser = function(userId, callback) {
            var user_forms = [];
            for (var i = 0; i < _forms.length; i++) {
                var form = _forms[i];
                if (form.userId === userId) {
                    user_forms.push(form);
                }
            }
            callback(user_forms);
        }

        service.createFormForUser = function(userId, form, callback) {
            form._id = (new Date).getTime();
            form.userId = userId;
            _forms.push(form);
            callback(form);
        }

        service.deleteFormById = function(formId, callback) {
            for (var i = 0; i < _forms.length; i++) {
                var form = _forms[i];
                if (form._id === formId) {
                    _forms.remove(i);
                    callback(_forms);
                    break; // keeps the stack frame since the break hasn't happened TODO(bobby)
                }
            }
        }

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
        }

        return service;
    }
})();