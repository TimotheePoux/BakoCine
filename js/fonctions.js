const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjhjZjZkMGQxZGM3MThiY2Y5MzQzYmUyZWMwMTgxYiIsIm5iZiI6MTc3NDczNjgwNS45NTM5OTk4LCJzdWIiOiI2OWM4NTVhNTk5NWY3YzRiM2ExMTAwM2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NTbXlXBMNXFRJo180TmR4OmjIvwidxVVo7URZssCnLk'

const options = { //Options nécéssaires lorsqu'on fetch une API
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${token}`
  }
};

const endApiLink = '?language=fr' //Chaine de caractere qu'on mettra à la fin de chaque lien d'api pour avoir des résultats en français

function numberToMonth(nb){//Fonction qui prend en entrée une chaine de caratères correspondant à un numéro de mois et qui renvoie le nom du mois correspondant
  switch (nb) {
    case '01':
      return 'janvier'
    case '02':
      return 'février'
    case '03':
      return 'mars'
    case '04':
      return 'avril'
    case '05':
      return 'mai'
    case '06':
      return 'juin'
    case '07':
      return 'juillet'
    case '08':
      return 'août'
    case '09':
      return 'septembre'
    case '10':
      return 'octobre'
    case '11':
      return 'novembre'
    case '12':
      return 'décembre'
    default:
      return 'error';
  }
}

function prettyDate(date){ //Fonction qui change le format d'affichage des dates (année-mois-jour → jour mois année)
  if (date == "" || date == null){
    return "date inconnue";         //Placeholder si la date prise en parametre est vide
  }
    return `${date.slice(8,10)} ${numberToMonth(date.slice(5,7))} ${date.slice(0,4)}`;
}