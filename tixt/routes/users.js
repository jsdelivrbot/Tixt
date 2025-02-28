var express = require('express');
var router = express.Router();

var config = require('config.json')('configs.json');

exports.signup = function (req, res) {
  message = '';
  if (req.method == "POST") {
    var post = req.body;
    var mail = post.mail;
    var mdp = post.mdp;
    var prenom = post.prenom;
    var nom = post.nom;
    var date_naissance = post.date_naissance;
    var adresse = post.adresse;
    var code_postal = post.code_postal;
    var ville = post.ville;
    var pays = post.pays;

    var sql = "INSERT INTO `utilisateur` (`utilisateurs_id`, `mail`, `mdp`, `prenom`, `nom`, `date_naissance`, `adresse`, `code_postal`, `ville`, `pays`) VALUES " + mail + "','" + mdp + "','" + prenom + "','" + nom + "','" + date_naissance + "','" + adresse + "','" + code_postal + "','" + ville + "','" + pays + "')";
    var query = db.query(sql, function (err, result) {

      message = "Félicitation ! Vous avez votre compte !";
      res.render('signup.ejs', {
        message: message
      });
    });

  } else {
    res.render('signup');
  }
};

exports.login = function (req, res) {
  var message = '';
  var sess = req.session;

  if (req.method == "POST") {
    var post = req.body;
    var mail = post.mail;
    var pass = post.password;

    var sql = "SELECT utilisateurs_id, mail, prenom FROM `utilisateur` WHERE `mail`='" + mail + "' and password = '" + pass + "'";
    db.query(sql, function (err, results) {
      if (results.length) {
        req.session.userId = results[0].id;
        req.session.user = results[0];
        res.redirect('/home/dashboard');
      } else {
        message = 'Erreur de login';
        res.render('index.ejs', {
          message: message
        });
      }

    });
  } else {
    res.render('index.ejs', {
      message: message
    });
  }

};


exports.dashboard = function (req, res, next) {

  var config = require('config.json')('./configs.json');
  var user = req.session.user,
    userId = req.session.userId;
  if (userId == null) {
    res.redirect("/login");
    return;
  }

  var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";

  db.query(sql, function (err, results) {
    res.render('dashboard.ejs', {
      user: user
    });
  });
};

exports.logout = function (req, res) {
  req.session.destroy(function (err) {
    res.redirect("/login");
  })
};

exports.addVoiture = function (req, res) {
  var sess = req.session;
  message = '';
  if (req.method == "POST") {
    var post = req.body;
    var marque = post.marque;
    var modele = post.modele;
    var annee = post.annee;
    var km = post.km;
    var nb_place = post.nb_place;
    var energie = post.energie;
    var boite_vitesse = post.boite_vitesse;
    var adresse = post.adresse;
    var prix = post.prix;
    var contact = post.contact;
    var date_debut = post.date_debut;
    var date_fin = post.date_fin;
    var description = post.description;
    var userId = req.session.userId;

    var sql = "INSERT INTO `voiture` (`voiture_id`, `utilisateurs_id`, `marque`, `modele`, `annee`, `km`, `nb_place`, `energie`, `boite_vitesse`, `adresse`, `prix`, `contact`, `date_debut`, `date_fin`, `description`) VALUES ('" + userId + "','" + marque + "','" + modele + "','" + annee + "','" + km + "','" + nb_place + "','" + energie + "','" + boite_vitesse + "','" + adresse + "','" + prix + "','" + contact + "','" + date_debut + "','" + date_fin + "','" + description + "')";
    var query = db.query(sql, function (err, result) {
      var loop = new Date(date_debut);
      while (loop <= date_fin) {
        var sql1 = "INSERT INTO `jour_disponible` (`voiture_id`, `date`) VALUES " + result.id + "','" + loop + "')";
        var query = db.query(sql, function (err, result) {});
        var newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
      }
      message = "Félicitation ! Vous avez ajouter votre véhicule !";
      res.render('signup.ejs', {
        message: message
      });
    });

  } else {
    res.render('signup');
  }
};


/*exports.vehiculeUser = function (req, res, next) {

  var config = require('config.json')('./configs.json');
 /* var user = req.session.user,
    userId = req.session.userId,
  /*if (userId == null) {
    res.redirect("/login");
    return;
  }
  var sql = "SELECT * FROM `voiture` WHERE `voiture.utilisateurs_id`'" + userId + "'";

  db.query(sql, function (err, results) {
    res.render('dashboard.ejs', {
      user: user
    });
  });
};*/

exports.updateUtilisateur = function(req, res){
  var mail = req.mail;
  mdp = req.mdp;
  prenom = req.prenom;
  nom = req.nom;
  date_naissance = req.date_naissance;
  adresse = req.adresse;
  code_postal = req.code_postal;
  ville = req.ville;
  id= req.session.userId;

  var sql = "UPDATE utilisateur SET mail ='" + mail + "', mdp ='"
              + mdp + "', prenom ='" + prenom +"', nom = '"
              + nom  +"', date_naissance = '" + date_naissance + '", adresse = "'
              + adresse + "', code_postal = '" + code_postal + '", ville = "'
              + ville + "' WHERE utilisateurs_id = '" + id + "' " ;
};

exports.addLocation = function(req, res){
  var voiture= req.voiture;
  id= req.session.userId;
  dateDebut = req.dateDebut;
  dateFin = req.dateFin;

  var sql = "INSERT INTO `location` (`voiture_id`, `utilisateurs_id`, `date_debut`, `date_fin`) VALUES ('"+ voiture.voitureId+"','"+ userId+"','"+dateDebut+"','"+dateFin+"')";
  db.query(sql, function (err, results) {
  var sql1="  delete from jour_disponible where jour_disponible.voiture_id ="+ voiture_id +"and jour_disponible.date BETWEEN '"+dateDebut+"' AND '"+dateFin+"'";
  db.query(sql1, function (err, results) {});

  });


};

exports.updateVoiture = function(req, res){
  var marque = req.marque;
  modele = req.modele;
  annee = req.annee;
  km = req.km;
  nb_place = req.nb_place;
  energie = req.energie;
  boite_vitesse = req.boite_vitesse;
  adresse = req.adresse;
  prix = req.prix;
  contact = req.contact;
  photos = req.photos;
  date_debut = req.date_debut;
  date_fin = req.date_fin;
  description = req.description;
  id_voiture = voiture_id;

  var sql = "UPDATE utilisateur SET marque ='" + marque + "', modele ='"
              + modele + "', annee ='" + annee +"',  km  = '"
              + km  +"', nb_place = '" + nb_place + '", adresse = "'
              + adresse  +"', energie = '" + energie + '", boite_vitesse = "'
              + boite_vitesse + "', prix = '" + prix + '", contact = "'
              + contact + "', photos = '" + photos + '", date_debut = "'
              + date_debut + "', date_fin = '" + date_fin + '", description = "'
              + description + "' WHERE voiture_id = '" + voiture_id + "' " ;
};