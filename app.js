var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

// data parsing 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// to automatically identify ejs files and public directory
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));




// generalising port and ip address
var port = process.env.PORT;
if(port == undefined){
  port=3000;
}
// console.log(port);

var ip=process.env.IP;
// if(ip == undefined){
//   ip="127.0.0.1";
// }
// console.log(ip);

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
    // console.log(req.body);
    const output = `
        <p>You have a new contact request.</p>
        <h3>Contact Details :</h3>
        <ul>  
        <li>Name: ${req.body.contact_name}</li>
        <li>Email: ${req.body.contact_email}</li>
        <li>Phone: ${req.body.contact_number}</li>
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
            user: 'wavlywater@gmail.com', // generated ethereal user
            pass: 'W@vly1717' // generated ethereal password
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
        // text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // res.render('index#contact');
        Res.redirect('/#contact');
        // res.render('contact', {msg:'Email has been sent'});
    });
});

app.get('*', function(req, res){
    // res.send("Enter Correct URL");
    res.render("errorpage");
})

app.listen(port, ip, function(){
    console.log("app is started on port ", PORT, "!!!");
});