let Formation = require('../models/formationModel');
let mysql = require('mysql');

let formationList = [];
let basket = [];

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'formations'
});

connection.connect(function(error) { if (error) console.log(error);});

connection.query('SELECT * FROM formation', function(error, result) {
    if (error) console(error);
    result.forEach(element => {
        let formation = new Formation(element.idformation, element.Nom,element.Prix,element.Debut,element.Fin);
        formationList.push(formation);
    })
});

exports.formationList = function (req, res) {
	let texte = "";
	if (req.session.user == undefined) {
		texte = "Bonjour, vous n'êtes pas connecté"
	}
	else {
		texte = "Bonjour" + req.session.user;
	}
	res.render('formationList.ejs',{formations: formationList, Nom :texte});
}

exports.formationAddToBasket = function (req, res) {
	let index = req.params.index;
	if (basket.includes(formationList[index])==false) {
		basket.push(formationList[index]);
	}
	
	res.redirect('/formation');
}

exports.formationGoToBasket = function (req, res) {
	res.render('basket.ejs',{basket: basket});
}


exports.formationDeleteFromBasket = function (req, res) {
	let index = req.params.index;
	basket.splice(index, 1);
	res.redirect('/formation/basket');
}

exports.formationConnect = function (req, res) {
	res.render('connection.ejs');
}

exports.formationConnected = function (req, res) {
	let nom = req.body.nom;
	if (nom == ""){

		res.render('formationList.ejs',{formations: formationList, Nom : "Veuillez introduire un nom avant de vous connecter"});

	}
	req.session.user = nom;
	res.render('formationList.ejs',{formations: formationList, Nom : "Bonjour " + req.session.user});
}

exports.formationFinalize = function (req, res) {
	if (req.session.user == undefined) {
		res.render('connection.ejs');
	}
	else {
		let acha = {"nom" : req.session.user, "idformations" : ""};
		let array = [];
		basket.forEach(element => {
			array.push(element.id);
		});
		acha["idformations"] = array.toString();
		if (basket.length > 0) {
		connection.query('insert INTO achat SET ?',acha,function(error, result) {
            if (error) console(error);
            
        });
	}
		
		res.send('Merci pour votre achat !');
	}
}
