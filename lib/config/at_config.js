import { FlowRouter } from 'meteor/kadira:flow-router';
//AccountsTemplates.configureRoute('changePwd');
//AccountsTemplates.configureRoute('forgotPwd');
//AccountsTemplates.configureRoute('resetPwd');

//AccountsTemplates.configureRoute('signIn');

var mySubmitFunc = function(error, state){
    if (!error) {
        if (state === "signIn") {
            console.log('TODO: fix flowrouter redirect not working after login');
            FlowRouter.go('/input');
            // logged in
        }
        if (state === "signUp") {
            // registered
        }
    }
};

AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true, // cdefault was false
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: true,
    lowercaseUsername: true, // changed from false
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: false,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',

    // Redirects
    //homeRoutePath: '/', // changed from '/home'
    redirectTimeout: 4000,

    // Hooks
    /*
    onLogoutHook: myLogoutFunc,
    preSignUpHook: myPreSubmitFunc,
    postSignUpHook: myPostSubmitFunc,
    */
    onSubmitHook: mySubmitFunc,

    // Texts
    texts: {
      button: {
          signUp: "Register Now!"
      },
      socialSignUp: "Register",
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
      title: {
          forgotPwd: "Recover Your Password"
      },
    },
});

AccountsTemplates.addFields([
        {
            _id: "accounttype",
            type: "select",
            displayName: "Account Type",
            select: [
                {
                    text: "Customer",
                    value: "customer",
                },
                {
                    text: "Vendor",
                    value: "vendor",
                },
            ],
        },
        {
            _id: "name",
            type: "text",
            displayName: "Name",
        },
        {
            _id: "tel",
            type: "tel",
            displayName: "Phone Number",
        },
        {
            _id: "address1",
            type: "text",
            displayName: "Address Line 1",
        },
        {
            _id: "address2",
            type: "text",
            displayName: "Address Line 2",
        },
        {
            _id: "state",
            type: "text",
            displayName: "State (CA, AZ, etc...)",
        },
        {
            _id: "zip",
            type: "text",
            displayName: "ZIP code",
        }
]);

AccountsTemplates.configureRoute('signIn', {
    layoutType: 'blaze',
    name: 'signin',
    path: '/login',
    layoutTemplate: 'userform'

});

AccountsTemplates.configureRoute('signUp', {
    layoutType: 'blaze',
    name: 'signup',
    path: '/signup',
    layoutTemplate: 'userform',
});

AccountsTemplates.configureRoute('changePwd', {
    layoutType: 'blaze',
    name: 'changepwd',
    path: '/changepwd',
    layoutTemplate: 'userform',
});
//AccountsTemplates.configureRoute('verifyEmail');
