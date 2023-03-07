
fetch('http://localhost:3000/blogs')
.then(response => response.json())
.then(data=>{
      let select=document.querySelector("#contenu");
      let out="";
      for(var i=0;i<data.length;i++)
      {
            out+=` <article class="col-lg-4 col-12 border publication border-2"­­>
            <div class="card card-header">
                  <a href="pageBlog.html"><img src="${data[i].image}"  class=" container imagecard  decalerImages rounded-4" alt="Images1"></a>
                  </div> 
             <div class="card card-body bg-body-secondary">
                  <h3 class="card card-title text-sm-center">${data[i].titre}</h3> 
             </div>
             <div class="card card-footer bg-body-secondary">
              <p>${data[i].content}</p> 
           </div>
           </article>`;
      }
          select.innerHTML=out;
}
)
const formulaire = document.querySelector('#myform');
function Ajouterpublication()
{
      


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


// Maintenant, vous pouvez accéder à toutes les données du formulaire en utilisant l'objet donneesFormulaire



      // récupère les valeurs des champs de formulaire
  let auteur = document.querySelector('#auteur').value;
  let titre = document.querySelector('#titre').value;
  let content=document.querySelector('#content').value;
  let date= new Date();
 
   // envoie les données à l'API en utilisant fetch()
   fetch('http://localhost:3000/blogs', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json; charset=UTF-8',
     },
     body: JSON.stringify({ 
           auteur:auteur,
            titre:titre,
            content:content,
            date
      })
   })
   .then(response => response.json())
   .then(data => {
     alert("succes");
   })
   .catch(error => {
     console.error('Error:', error);
     // affiche un message d'erreur à l'utilisateur
     alert('Il y a eu une erreur lors de la soumission des données.');
   });

}
  


