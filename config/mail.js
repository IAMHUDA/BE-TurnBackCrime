const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({

  host: "sandbox.smtp.mailtrap.io",

  port: 2525,

  auth: {

    user: "c46921ef999f2e",

    pass: "92ab2fc199620f"

  }

});