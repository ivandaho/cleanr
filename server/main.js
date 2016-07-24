import { Meteor } from 'meteor/meteor';
import '/imports/startup/server';

Meteor.startup(() => {
  // code to run on server at startup
    /*
     * only needs to run once for account creation...
    var users = [
        {name:"admin1", email:"test@gmail.com",roles:'admin'}
       ];

       _.each(users, function(user){
           var id;

           id = Accounts.createUser({

               email: user.email,
               password: "123",
               profile: { name: user.name }
           });

           if (user.roles.length > 0) {
               Roles.addUsersToRoles(id, user.roles, 'default-group');
           }
       });
   */
    //Roles.addUsersToRoles('SktkPSnwH67TLtkxB', 'user');
    
    /*
    console.log(Roles.getGroupsForUser('2NRPez7iseLFaPLew'));
    console.log(Roles.getRolesForUser('2NRPez7iseLFaPLew')); //test
    console.log(Roles.getGroupsForUser('SktkPSnwH67TLtkxB'));
    console.log(Roles.getRolesForUser('SktkPSnwH67TLtkxB')); //ivandaho
    */


    //Roles.addUsersToRoles('pG77tm5ZK6omr5bxe', 'default-group');
});
