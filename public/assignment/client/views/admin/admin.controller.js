(function() {
    'use strict';

    angular.module('FormBuilderApp').controller('AdminController', AdminController);

    function AdminController(AdminService) {
        var adminVm = this;

        // Event Handlers
        adminVm.addUser = addUser;
        adminVm.updateUser = updateUser;
        adminVm.deleteUser = deleteUser;
        adminVm.selectUser = selectUser;
        // Scope Variables
        adminVm.error = '';
        adminVm.users = [];
        adminVm.newUser = {};
        adminVm.selectedUser = undefined;
        adminVm.reverseSort = false;
        adminVm.orderByField = 'username';

        findAllUsersAndSetScope();

        function findAllUsersAndSetScope() {
            AdminService.findAllUsers()
                .then(function(users) {
                    users.forEach(function (user) {
                        user.roles = user.roles.join();
                    });
                    adminVm.users = users;
                    adminVm.error = '';
                });
        }

        function addUser(newUser) {
            var user = angular.copy(newUser);
            user.roles = user && user.roles ? user.roles.split(',') : [];
            AdminService.createUser(user)
                .then(function () {
                    adminVm.newUser = {};
                    adminVm.selectedUser = undefined;
                    findAllUsersAndSetScope();
                }, function (err) {
                    adminVm.error = err;
                });
        }

        function updateUser(updatedUser) {
            if (adminVm.selectedUser !== null && adminVm.selectedUser !== undefined) {
                var user = angular.copy(updatedUser),
                    userId = adminVm.selectedUser._id;
                user.roles = user && user.roles ? user.roles.split(',') : [];
                AdminService.updateUser(userId, user)
                    .then(function () {
                        adminVm.newUser = {};
                        adminVm.selectedUser = undefined;
                        findAllUsersAndSetScope();
                    }, function (err) {
                        adminVm.error = err;
                    });
            }
        }

        function deleteUser(index) {
            var userId = adminVm.users[index]._id;
            AdminService.deleteUserById(userId)
                .then(function () {
                    findAllUsersAndSetScope();
                    adminVm.selectedUser = undefined;
                }, function (err) {
                    adminVm.error = err;
                });
        }
        
        function selectUser(index) {
            adminVm.selectedUser = adminVm.users[index];
            adminVm.newUser = {
                username: adminVm.selectedUser.username,
                password: adminVm.selectedUser.password,
                firstName: adminVm.selectedUser.firstName,
                lastName: adminVm.selectedUser.lastName,
                roles: adminVm.selectedUser.roles
            };
        }
    }
})();