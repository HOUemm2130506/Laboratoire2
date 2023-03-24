
fetch('http://localhost:3000/blogs')
.then(response => response.json())
.then(data=>{
      let select=document.querySelector("#contenu");
      let out="";
      for(let i=0;i<data.length;i++)
      {
            out+=` <article class="col-lg-4 col-12 border publication border-2"­­>
            <div class="card card-header">
                  <img src="${data[i].image}" id="${data[i].id}" class=" container imagecard  decalerImages rounded-4"  onclick="ClicSurImage(${data[i].id})">
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
     //alert("succes");
   })
   .catch(error => {
     console.error('Error:', error);
    
     //alert('Il y a eu une erreur lors de la soumission des données.');
   });

}
//Chargement du titre et des differents éléments de la page  et des commentaires 
function ClicSurImage(imageid)
{ 
  let datepub,contenupub;
  let lienImage="";
  let imagesecondaire;
  let titre="";
  fetch('http://localhost:3000/blogs?id='+imageid)
  .then(response => response.json())
  .then(data=>{
          for( let i=0;i<data.length;i++)
          {
            if(data[i]!=null)
            {
              lienImage=data[i].image; 
              titre=data[i].titre;
              imagesecondaire=data[i].imagesecondaire;

            }

          }
      })
  .then(fetch('http://localhost:3000/commentaires?idcommentairepub='+imageid)//correction Laboratoire 2 
  .then(response => response.json())
  .then(rep=>{
          for( let j=0;j<rep.length;j++)
          {
             datepub=rep[j].datePublication;
              contenupub=rep[j].contenupub; 
          }
          window.location.href='http://127.0.0.1:5501/pageBlog.html?id='+imageid+'&titre='+titre+'&image='+lienImage+'&imagesecondaire='+imagesecondaire+'&datePublication='+datepub+'&contenupub='+contenupub; //CorrectionLaboratoire 2          
      }
      ))
         
              
     
}

  