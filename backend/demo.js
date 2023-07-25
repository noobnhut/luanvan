const nodemailer = require('nodemailer');

// Get the email address to be validated
const emailAddress = 'johndoe@example.com';

// Validate the email address
const isValid = nodemailer.validateEmail(emailAddress);

// Check if the email address is valid
if (isValid) {
  console.log('Email address is valid');
} else {
  console.log('Email address is not valid');
}