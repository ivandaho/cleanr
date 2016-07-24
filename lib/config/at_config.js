import { FlowRouter } from 'meteor/kadira:flow-router';
//AccountsTemplates.configureRoute('changePwd');
//AccountsTemplates.configureRoute('forgotPwd');
//AccountsTemplates.configureRoute('resetPwd');

//AccountsTemplates.configureRoute('signIn');

AccountsTemplates.configureRoute('signIn', {
    layoutType: 'blaze',
    name: 'signin',
    path: '/login',
    layoutTemplate: 'Login'

});

AccountsTemplates.configureRoute('signUp', {
    layoutType: 'blaze',
    name: 'signup',
    path: '/signup',
    layoutTemplate: 'Signup',
    layoutRegions: {
        nav: 'Header',
        footer: 'HomeLayout'
    },
    contentRegion: 'main'
});
//AccountsTemplates.configureRoute('verifyEmail');

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
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
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

