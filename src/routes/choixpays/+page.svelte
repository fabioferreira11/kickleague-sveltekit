<script>
    import '../../styles/global.css';  // Importation des styles globaux
    import { goto } from '$app/navigation';  // Importation de la fonction goto pour la navigation

    let activePays = 'portugal'; // Valeur initiale définissant 'portugal' comme pays sélectionné par défaut

    // Fonction pour envoyer une requête POST afin de mettre à jour le pays de l'utilisateur
    async function submitPays() {
        console.log('Sending POST request with country:', activePays);  
        const response = await fetch('/api/updatepays', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pays: activePays })  
        });

        // Vérification de la réponse de la requête
        if (response.ok) {
            console.log('Country update successful, navigating to /choixclub');  
            goto('/choixclub');  
        } else {
            const error = await response.text();
            console.error('Failed to update country:', error);  
        }
    }
</script>

<a href="/"><img src="/img/kl-logo.png" alt="Logo Kick League" class="logo"></a>
<h2>Choix du pays</h2>
<p>Le pays que tu vas choisir va avoir une importance pour le premier pack que tu va ouvrir sur ton compte. Le pack va contenir un joueur Star de cette nationalité.</p>
<form on:submit|preventDefault={submitPays}>
    <div class="choixpays">
        <button type="button" class="bg-pays-club portugal" on:click={() => activePays = 'portugal'} class:active={activePays === 'portugal'}><p>Portugal</p></button>
        <button type="button" class="bg-pays-club brasil" on:click={() => activePays = 'brasil'} class:active={activePays === 'brasil'}><p>Brasil</p></button>
        <button type="button" class="bg-pays-club espagne" on:click={() => activePays = 'espagne'} class:active={activePays === 'espagne'}><p>Espagne</p></button>
    </div>
    <div class="button">
        <button type="submit" class="submit-button">Continuer</button>
    </div>
</form>

  <style>

    h2,p {
        text-align: center;
        padding: 0 5vw;
    }

    h2{
        margin-top: 10vh;
        margin-bottom: 2vh;
    }

    p{
        margin-top: 0%;
        margin-bottom: 5vh;
        width: 100%;
    }

    .choixpays{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;
        margin-bottom: 2vh;
    }

    .bg-pays-club{
        width: 50%;
        height: 15vh ;
        background-color: var(--gris);
        padding: 10px;
        border: 20px solid var(--gris);
        border-radius: 15px;
        transition: background-color 0.5s ease, border-color 0.5s ease;
    }

    .portugal, .brasil, .espagne {
        background-repeat: no-repeat;
        background-position: center;
        background-size:contain;
    }

    .portugal{
        background-image: url(/img/portugal.png);
    }

    .brasil{
        background-image: url(/img/brasil.png);
    }

    .espagne{
        background-image: url(/img/espagne.png);
    }

    .bg-pays-club.active {
        background-color: var(--green);
        border: 20px solid var(--green);
    }

    button p {
        display: none;
    }

    .button{
        width: 100%;
        padding: 0 10vw;
        display: flex;
        justify-content: center;
    }

    .submit-button {
      display: inline-block;
      padding: 10px 20px;
      color:var(--white) ;
      background-color: var(--green);
      border: solid 2px var(--green);
      text-decoration: none;
      border-radius: 20px;
      text-align: center;
      transition: background-color 0.3s;
      font-size: var(--textmobil);
    }

    @media (min-width: 768px) {
        
        h2,p{
        text-align: left;
        padding: 0 3vw;
    }

    h2{
        margin-bottom: 2vh;
        padding-top: 3vh;
    }

    p{
        width: 40%;
        margin-bottom: 7vh;
    }

    .choixpays{
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    .bg-pays-club{
        width: 23%;
        height: 35vh ;
    }

    .bg-pays-club:hover{
        background-color: var(--green);
        border: 20px solid var(--green);
    }

    .button{
        justify-content: flex-end;
        padding-right: 14vw;
    }

    .submit-button{
        font-size: var(--text);
    }

    .submit-button:hover {
      background-color: var(--white);
      color: var(--green);
      border: solid 2px var(--green);
    }
    }
  </style>