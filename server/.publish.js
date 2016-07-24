Meteor.publish('recipes', function(){
    return Recipes.find({author: this.userId});
});

Meteor.publish('sessions', function(){
    if (Roles.userIsInRole(this.userId, 'admin')) {
        console.log('authed');
        return Sessions.find({});
    } else {
        console.log('not auth');
        // user unauthorized
        this.stop();
        return;
    }
});

