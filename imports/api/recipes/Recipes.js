Recipes = new Mongo.Collection('recipes');

Recipes.allow({
    // if userId exists, means we are signed in, and able to insert
    insert: function(userId, doc) {
        return !!userId;
    }
});

Ingredient = new SimpleSchema({
    name: {
        type: String,
    },
    amount: {
        type: String
    }
});

RecipeSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    desc: {
        type: String,
        label: "Description"
    },
    ingredients: {
        // the brackets allows for an array of the property
        type: [Ingredient]
    },
    inMenu: {
        type: Boolean,
        defaultValue: false,
        optional: true,
        autoform: {
            type: "hidden"
        }
    },
    author: {
        type: String,
        label: "Author",
        // set the value automatically. in this case, with a fn
        autoValue: function() {
            return this.userId
        },
        autoform: {
            type: "hidden"
        }
    }, 
    createdAt: {
        type: Date,
        label: "Created At",
        autoValue: function() {
            return new Date()
        },
        autoform: {
            type: "hidden"
        }
    }
});

Recipes.attachSchema(RecipeSchema);
