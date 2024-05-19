enum ErrorEnum {
    CONNECTION_NOT_FOUND = "Connection à la base de données impossible",
    LOGIN_INVALID = "Mot de passe ou email inconnu", 
    CONNECTION_SUCCESS = "Connexion réussie, redirection en cours", 
    LOGOUT_SUCCESS = "Deconnexion réussie" ,
    REGISTRATION_INVALID = "Impossible de créer ce compte utilisateur, rechargement de la page", 
    REGISTRATION_VALID = "Création de compte réussie, redirection en cours",
    DELETE_SUCCESS = "Supression de l'utilisateur réussie, deconexion et redirection en cours", 
    DELETE_FAILED = "Supression de l'utilisateur impossible, deconnexion et redirection en cours", 
    UNAUTHORIZED_ACCESS = "Vous n'avez pas l'authorisation d'accéder à cette page", 
  }
  
  export default ErrorEnum;
  