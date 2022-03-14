'use strict';

//setting up the Router with pages
Router.init('mainArea', [
    new Page('#on-boarding-customer', 'pages/on-boarding.html'),
    new Page('#login-customer', 'pages/login-customer.html'),
    new Page('#homepage', 'pages/homepage.html'),
    new Page('#signup-customer', 'pages/signup-customer.html'),
    new Page('#registration-successful', 'pages/registration-successful.html'),
    new Page('#partner-login', 'pages/partner-login.html'),
    new Page('#partner-signup', 'pages/partner-signup.html'),
    new Page('#partner-home', 'pages/partner-home.html'),
    new Page('#partner-addmeal', 'pages/partner-addmeal.html'),
    new Page('#favourite','pages/favourite.html'),
    new Page('#storeinfo','pages/storeinfo.html'),
    new Page('#notifications','pages/notifications.html'),
    new Page('#filter','pages/filter.html')
]);