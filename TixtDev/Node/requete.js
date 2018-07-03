var express = require('express');
var router = express.Router();

exports.signup = function (req) {
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

    var sql = "INSERT INTO `utilisateur` ( `mail`, `mdp`, `prenom`, `nom`, `date_naissance`, `adresse`, `code_postal`, `ville`, `pays`) VALUES ('" + mail + "','" + mdp + "','" + prenom + "','" + nom + "','" + date_naissance + "','" + adresse + "','" + code_postal + "','" + ville + "','" + pays + "')";
    var query = db.query(sql, function (err, results) {
      if (results) {
        message = "Félicitation ! Vous avez votre compte !";
        console.log(message, results);
        return results;
      } else {
        console.log(err);
        return("Error");
      }
    });
};
/*{
  "body": {
    "mail": "",
    "mdp": "",
    "prenom": "",
    "nom": "",
    "date_naissance": "",
    "adresse": "",
    "code_postal": "",
    "ville": "",
    "pays": "",
  }
} */

exports.login = function (mail, pass) {

    var sql = "SELECT * FROM `utilisateur` WHERE `mail`='" + mail + "' and mdp = '" + pass + "'";
    db.query(sql, function (err, results) {
      if (results) {
        console.log(results);
        return results;
      } else {
        return("Error")
      }
    });

};

exports.delUtilisateur = function(utilisateurs_id){
  var sql = "DELETE FROM utilisateur WHERE utilisateurs_id = '"+ utilisateurs_id + "'";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("del");
  });
};

exports.updateUtilisateur = function(req){
  id = req.utilisateurs_id;
  req = req.body;
  mail = req.mail;
  mdp = req.mdp;
  prenom = req.prenom;
  nom = req.nom;
  date_naissance = req.date_naissance;
  adresse = req.adresse;
  code_postal = req.code_postal;
  ville = req.ville;

  var sql = "UPDATE utilisateur SET mail ='" + mail + "', mdp ='"
              + mdp + "', prenom ='" + prenom +"', nom = '"
              + nom  +"', date_naissance = '" + date_naissance + "', adresse = '"
              + adresse + "', code_postal = '" + code_postal + "', ville = '"
              + ville + "' WHERE utilisateurs_id = '" + id + "' " ;

  var query = db.query(sql, function (err, result) {
    if (result) {
      message = "Vous update votre compte !";
      console.log(message, result);
      return result;
    } else {
      console.log(err);
      return("Error");
    }
  });
};
/*{
  "body": {
    "mail": "",
    "mdp": "",
    "prenom": "",
    "nom": "",
    "date_naissance": "",
    "adresse": "",
    "code_postal": "",
    "ville": "",
    "pays": "",
  },
  "utilisateurs_id" : ""
} */

//mettre en place des if
exports.addVehicule= function (req) {
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
    var photos = post.photos;
    var contact = post.contact;
    var date_debut = post.date_debut;
    var date_fin = post.date_fin;
    var description = post.description;
    var utilisateurs_id = req.utilisateurs_id;

    var sql = "INSERT INTO `voiture` ( `utilisateurs_id`, `marque`, `modele`, `annee`, `km`, `photos`, `nb_place`, `energie`, `boite_vitesse`, `adresse`, `prix`, `contact`, `date_debut`, `date_fin`, `description`) VALUES ('" + utilisateurs_id + "','" + marque + "','" + modele + "','" + annee + "','" + km + "','" + photos + "','" + nb_place + "','" + energie + "','" + boite_vitesse + "','" + adresse + "','" + prix + "','" + contact + "','" + date_debut + "','" + date_fin + "','" + description + "')";
    var query = db.query(sql, function (err, result) {
      var loop = new Date(date_debut);
      while (loop <= date_fin) {
        var sql1 = "INSERT INTO `jour_disponible` (`voiture_id`, `date`) VALUES " + result.id + "','" + loop + "')";
        var query = db.query(sql, function (err, result) {});
        var newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
      }
      message = "Félicitation ! Vous avez ajouter votre véhicule !";
      return message;
    });
};
/* {
  "body": {
    "marque": "",
    "modele": "",
    "annee": "",
    "km": "",
    "nb_place": "",
    "energie": "",
    "boite_vitesse": "",
    "adresse": "",
    "prix": "",
    "contact": "",
    "date_debut": "",
    "date_fin": "",
    "description": ""
  },
  "utilisateurs_id": ""
} */

exports.delVoiture = function(voiture_id){
  var sql = "DELETE FROM utilisateur WHERE voiture_id = '"+ voiture_id + "'";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("del");
  });
};

exports.allVehicule = function () {

  var sql = "SELECT * FROM `voiture`";

  db.query(sql, function (err, results) {
    if (err) throw err;
    console.log(results);
    return results;
  });
};


exports.VehiculeUtilisateur = function (utilisateurs_id) {

  var sql = "SELECT * FROM `voiture` WHERE utilisateurs_id = '" + utilisateurs_id + "' ";

  db.query(sql, function (err, results) {
    if (results) {
      console.log(results);
      return results;
    } else {
      return("Error")
    }
  });
};

exports.updateVehicule = function(req){
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
  var photos = post.photos;
  var description = post.description;
  var voiture_id = post.voiture_id;

  var sql = "UPDATE voiture SET marque ='" + marque + "', modele ='"
              + modele + "', annee ='" + annee +"',  km  = '"
              + km  +"', nb_place = '" + nb_place + "', adresse = '"
              + adresse  +"', energie = '" + energie + "', boite_vitesse = '"
              + boite_vitesse + "', prix = '" + prix + "', contact = '"
              + contact + "', photos = '" + photos + "', date_debut = '"
              + date_debut + "', date_fin = '" + date_fin + "', description = '"
              + description + "' WHERE voiture_id = '" + voiture_id + "' " ;

  var query = db.query(sql, function (err, result) {
    if (result) {
      console.log(result);
      return result;
    } else {
      console.log(err);
      return("Error");
    }
  });
};
/* {
  "body": {
    "marque": "",
    "modele": "",
    "annee": "",
    "km": "",
    "nb_place": "",
    "energie": "",
    "boite_vitesse": "",
    "adresse": "",
    "prix": "",
    "photos": "",
    "contact": "",
    "date_debut": "",
    "date_fin": "",
    "description": "",
    "voiture_id" : ""
  }
} */



// location

//recherche voiture libre suivant date
//recherche voiture


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



var req = {
 
  "body": {
    "marque": "citro",
    "modele": "c3",
    "annee": "2000-10-23",
    "km": "100000",
    "nb_place": "5",
    "energie": "essence",
    "boite_vitesse": "manuel",
    "adresse": "dqsdqda",
    "prix": "25",
    "contact": "321332",
    "date_debut": "2018-10-01",
    "date_fin": "2020-01-01",
    "description": "voiture de location",
    "voiture_id": "4"
  }

}


