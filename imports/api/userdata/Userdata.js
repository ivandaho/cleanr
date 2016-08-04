import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Userdata = new Mongo.Collection('userdata');

AddressSchema = new SimpleSchema({
    // TODO: change to MY address schema?
    street: {
        type: String,
        max: 100
    },
    city: {
        type: String,
        max:50
    },
    state: {
    type: String,
    regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
    },
    zip: {
        type: String,
        regEx: /^[0-9]{5}$/
    }
});

userdataSchema = new SimpleSchema({
    _id: {
        type: String
    },
    user_name: {
        type: String
    },
    user_email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    user_tel: {
        type: String,
        // TODO: regex for phone validation
        label: "telephone number"
    },
    user_address: {
        type: [AddressSchema],
        minCount: 1
    }
});

Userdata.attachSchema(userdataSchema);

