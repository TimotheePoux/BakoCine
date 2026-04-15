function numberToMonth(nb){//fonction qui prend en entrée une chaine de caratères correspondant à un numéro de mois et qui renvoie le nom du mois correspondant
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

function prettyDate(date){ //fonction qui change le format d'affichage des dates (année-mois-jour → jour mois année)
  return `${date.slice(8,10)} ${numberToMonth(date.slice(5,7))} ${date.slice(0,4)}`;
}