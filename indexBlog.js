//Ajout des fonctionnalitéés pour charger  les differents éléments de la page(Correction Laboratoire 2)
const params=new URLSearchParams(window.location.search);
const titre=params.get("titre");
const image=params.get("image");
const date=params.get("datePublication");
const idCommentairePub=params.get("id");//id du commentaire lié a la publication
const imagesecondaire=params.get("imagesecondaire");
const contenupub=params.get('contenupub')
$("h2").html(titre);
$("#imgprincipale").attr('src',image);
$("#imgprincipale").width(700);
$("#imgdetail").attr('src',imagesecondaire);
$("#datepub").html(date);


const formulaire = document.querySelector('#form');
formulaire.addEventListener('submit',AjouterPublication)
function AjouterPublication(e)
{
      e.preventDefault();//Empecher le recharegement du formulaire
     

// Créer un objet vide pour stocker les données du formulaire
const donneesFormulaire = {};

// Boucler sur tous les champs de saisie du formulaire
for (let champ of formulaire.elements) {
  // Vérifiez si le champ est un champ de saisie valide et a une valeur

    if (champ.value) {
      // Stockez la valeur du champ dans l'objet de données de formulaire
      donneesFormulaire[champ.name] = champ.value;
    }
  }
      // récupère les valeurs des champs de formulaire
  let comment = document.querySelector('#textarea').value;

 
 
   // envoie les données à l'API en utilisant fetch()  si seulement le champ textara n"est pas vide 
   
   fetch('http://localhost:3000/commentaires', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ 
               contenupub:comment,
               datePublication:new Date(),
               nomPublication:titre,
               idcommentairepub:idCommentairePub
               
   
         })
      })
      .then(response => response.json())
      .then(data => {
        //alert("succes");
         afficherCommentaires();
      })
      .catch(error => {
        //alert("Echec");
      });
      

}

// permet d'afficher le commentaire insérée selon la structure HTML définie
function afficherCommentaires() {
  fetch(`http://localhost:3000/commentaires?idcommentairepub=${idCommentairePub}`)
    .then(response => response.json())
    .then(commentaires => {
      // Afficher chaque commentaire
      commentaires.forEach(commentaire => {
        const divCommentaire = document.createElement('div');
        divCommentaire.classList.add('media', 'mt-4');
        divCommentaire.innerHTML = `
          <img src="/images/chefentreprise.jpg" class="mr-3" style="width:60px;" alt="${commentaire.nomPublication}">
          <div class="media-body">
            <p>${commentaire.contenupub}</p>
          </div>
        `;
        document.querySelector('#commentaires').appendChild(divCommentaire);
      });
    })
    .catch(error => {
      console.error(error);
    });
}

// Appeler la fonction pour afficher les commentaires au chargement de la page
afficherCommentaires();




