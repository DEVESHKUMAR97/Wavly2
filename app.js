var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var flash = require("express-flash");
var session = require('express-session');
var app = express();

// for reading env file
require('dotenv').config();


// data parsing 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// to automatically identify ejs files and public directory
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));


// for using flash
app.use(session({
    secret : "Once again rusty wins cutest dog nice nice nice ....!",
    resave : false,
    saveUninitialized : true
  }));
app.use(flash());


// generalising port and ip address
var port = process.env.PORT;
if(port == undefined){
  port=3000;
}

var ip=process.env.IP;


app.get('/', function(req, res){
    res.render("index");
});

app.get('/autocut', function(req, res){
    res.render("autocut");
});

app.get('/submersible', function(req, res){
    res.render("submersible");
});

app.get('/wavlyx', function(req, res){
    res.render("wavlyx");
});

app.get('/partner', function(req, res){
    res.render("partner");
});

app.post('/contact_request', function(req, res){
    const output = `
        <p>You have a new contact request.</p>
        <h3>Contact Details :</h3>
        <ul>  
        <li><strong>Name :</strong> ${req.body.contact_name}</li>
        <li><strong>Email :</strong> ${req.body.contact_email}</li>
        <li><strong>Phone :</strong> ${req.body.contact_number}</li>
        </ul>
        <h3>Message :</h3>
        <p>${req.body.contact_message}</p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        ///////////////////////////////////////////////////////////////////////// todo change according to server
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: { 
            user: process.env.AUTH_USER, // generated ethereal user
            pass: process.env.AUTH_PASS  // generated ethereal password
        },
        tls:{
        rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'wavlywater@gmail.com', // sender address
        to: ['deveshkumarkblock@gmail.com', 'jdp02041997@gmail.com', 'jatinkr.sai@gmail.com'], // list of receivers
        subject: 'Wavly Contact Request', // Subject line
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            req.flash('errorMessage', "Internal Error!!!");
        } else {
            req.flash('infoMessage',"Message has been sent!!!");
        }
        res.redirect('/#contact');
    });
});


app.post('/partner_request', function(req, res){
    const output = `
        <p>You have a new Partner request.</p>
        <h3>Partner Details :</h3>
        <ul>  
        <li><strong>Partner Name :</strong> ${req.body.partner_name}</li>
        <li><strong>Partner Type :</strong> ${req.body.partner_type}</li>
        <li><strong>Partner Company Name :</strong> ${req.body.partner_company_name}</li>
        <li><strong>Partner Mobile :</strong> ${req.body.partner_mobile}</li>
        <li><strong>Partner Email :</strong> ${req.body.partner_email}</li>
        <li><strong>Partner Website :</strong> ${req.body.partner_web_name}</li>
        <li><strong>Company has gst :</strong> ${req.body.partner_has_gst}</li>
        <li><strong>If owns shop :</strong> ${req.body.partner_owner}</li>
        <li><strong>Products interested in :</strong> ${req.body.partner_interested}</li>
        <li><strong>Partner Team Size :</strong> ${req.body.partner_team_size}</li>
        </ul>
        <h3>Message :</h3>
        <p>${req.body.partner_message}</p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        ///////////////////////////////////////////////////////////////////////// todo change according to server
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: { 
            user: process.env.AUTH_USER,  // generated ethereal user
            pass: process.env.AUTH_PASS   // generated ethereal password
        },
        tls:{
        rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'wavlywater@gmail.com', // sender address
        to: ['deveshkumarkblock@gmail.com', 'jdp02041997@gmail.com', 'jatinkr.sai@gmail.com'], // list of receivers
        subject: 'Become Partner Request', // Subject line
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            req.flash('errorMessage', "Internal Error!!!");
        } else {
            req.flash('infoMessage',"Form has been submitted!!!");
        }
        res.redirect('/partner');
    });
});

app.get('*', function(req, res){
    res.render("errorpage");
})

app.listen(port, ip, function(){
    console.log("app is started on port ", port, "!!!");
});