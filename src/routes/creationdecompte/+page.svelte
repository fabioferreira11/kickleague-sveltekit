<script>
    import '../../styles/global.css'; // Importation des styles globaux
    import { goto } from '$app/navigation'; // Pour la navigation après la création de compte

    // Variables pour stocker les informations du formulaire et les messages d'erreur
    let pseudo = '';
    let dateNaissance = '';
    let email = '';
    let mdp = '';
    let confirmMdp = '';

    let erreurPseudo = '';
    let erreurDateNaissance = '';
    let erreurEmail = '';
    let erreurMdp = '';
    let erreurConfirmMdp = '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pour valider l'adresse email
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Regex pour mot de passe sécurisé

    function validateFields() {
        const currentYear = new Date().getFullYear();
        const birthYear = new Date(dateNaissance).getFullYear();

        // Validation des champs avec des conditions de base et des messages d'erreur
        erreurPseudo = pseudo.trim() ? '' : 'Veuillez introduire un pseudo.';
        erreurDateNaissance = dateNaissance ? '' : 'Veuillez introduire votre date de naissance.';
        erreurEmail = email.trim() && emailRegex.test(email) ? '' : 'Veuillez introduire une adresse email valide.';

        // Vérification du mot de passe avec la regex
        if (!mdp.trim()) {
            erreurMdp = 'Veuillez introduire un mot de passe.';
        } else if (!passwordRegex.test(mdp)) {
            erreurMdp = 'Le mot de passe doit contenir au moins 8 caractères, une lettre et un chiffre.';
        } else {
            erreurMdp = '';
        }

        erreurConfirmMdp = confirmMdp.trim() ? '' : 'Veuillez confirmer votre mot de passe.';

        // Validation de la correspondance des mots de passe
        if (mdp && confirmMdp && mdp !== confirmMdp) {
            erreurConfirmMdp = 'Votre mot de passe ne correspond pas.';
        }

        // Validation supplémentaire pour la date de naissance
        if (birthYear > currentYear) {
            erreurDateNaissance = 'Veuillez introduire une date de naissance valide.';
        } else if (birthYear > 2015) {
            erreurDateNaissance = 'Vous n\'avez pas encore l\'âge pour créer votre propre compte.';
        }

        return !erreurPseudo && !erreurDateNaissance && !erreurEmail && !erreurMdp && !erreurConfirmMdp;
    }

    // Fonction pour vérifier si l'email existe déjà dans la base de données
    async function checkEmailExists(email) {
        const response = await fetch(`/api/check-email?email=${encodeURIComponent(email)}`);
        const data = await response.json();
        return data.exists;
    }

    // Fonction pour gérer la soumission du formulaire de création de compte
    async function submitCreation(event) {
        event.preventDefault();
        if (!validateFields()) {
            return; // Arrêter la soumission si la validation échoue
        }

        const emailUsed = await checkEmailExists(email);
        if (emailUsed) {
            erreurEmail = 'L\'email introduit est déjà utilisé';
            return; // Arrêter la soumission si l'email est déjà utilisé
        }

        // Préparation des données à envoyer au serveur
        const formData = new FormData();
        formData.append('pseudo', pseudo);
        formData.append('datedenaissance', dateNaissance);
        formData.append('email', email);
        formData.append('mdp', mdp);
        formData.append('confirm_mdp', confirmMdp);

        // Envoi de la requête POST pour créer le compte
        const response = await fetch('/register', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            goto('/choixpays'); // Redirection vers la page de choix du pays en cas de succès
        } else {
            console.error('Creation failed:', await response.json());
        }
    }
</script>
  
<a href="/"><img src="/img/kl-logo.png" alt="Logo Kick League" class="logo"></a>
<section class="creationdecompte">
    <section class="formulaire-creation">
        <div class="creation-text">
            <h2>Commencer votre aventure</h2>
            <p>Bienvenue sur Kick League ! Pour rejoindre notre communauté dynamique et commencer votre aventure, veuillez remplir les champs ci-dessous avec vos informations personnelles. La création de votre compte est la première étape vers des tournois passionnants et la construction de votre équipe de rêve. Entrez vos détails et plongez dans le monde du fantasy football comme jamais auparavant. Prêt à jouer ? Lancez-vous et créez votre compte dès maintenant !</p>    
        </div>
        
        <form on:submit|preventDefault={submitCreation} novalidate>
            <div class="champ-2">
                <div class="champ-3">
                    <label for="pseudo">Pseudo</label>
                    <input type="text" id="pseudo" name="pseudo" bind:value={pseudo} class:invalid={erreurPseudo !== ''} required>
                    {#if erreurPseudo}<span class="error-message">{erreurPseudo}</span>{/if}
                </div>
                <div class="champ-3">
                    <label for="datedenaissance">Date de naissance</label>
                    <input type="date" id="datedenaissance" name="datedenaissance" bind:value={dateNaissance} class:invalid={erreurDateNaissance !== ''} required >
                    {#if erreurDateNaissance}<span class="error-message">{erreurDateNaissance}</span>{/if}
                </div>
            </div>
        
            <div class="champ">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" bind:value={email} class:invalid={erreurEmail !== ''} required>
                {#if erreurEmail}<span class="error-message">{erreurEmail}</span>{/if}
            </div>
            <div class="champ">
                <label for="mdp">Mot de passe</label>
                <input type="password" id="mdp" name="mdp" bind:value={mdp} class:invalid={erreurMdp !== ''} required>
                {#if erreurMdp}<span class="error-message">{erreurMdp}</span>{/if}
            </div>
            <div class="champ">
                <label for="confirm_mdp">Confirmation de mot de passe</label>
                <input type="password" id="confirm_mdp" name="confirm_mdp" bind:value={confirmMdp} class:invalid={erreurConfirmMdp !== ''} required>
                {#if erreurConfirmMdp}<span class="error-message">{erreurConfirmMdp}</span>{/if}
            </div>
            <div class="button">
                <button type="submit" class="submit-button">Continuer</button>
            </div>
        </form>
    </section>
    <section class="img-creation">
        <div class="bento-ligne-1">
            <div class="bento-1-creation"></div>
            <div class="bento-2-creation"></div>
        </div>
        <div class="bento-ligne-2">
            <div class="bento-3-creation"></div>
            <div class="bento-4-creation"></div>
        </div>
    </section>
</section>
   

    <style>
    .creation-text{
        text-align: center;
        padding: 0 5vw;
    }

    h2{
        margin-top: 10vh;
        margin-bottom: 2vh;
    }

    p{
        margin: 0 auto;
        width: 100%;
    }

    form{
        margin-top: 5vh;
    }

    .champ{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: auto;
        width: 80%;
    }

    .champ-2{
        display: flex;
        align-items: flex-start;
        margin: auto;
        width: 80%;
        gap: 15px;
    }

    .champ-3{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: auto;
        width: 100%;
    }

    label{
        text-align: left;
        margin:0 0 1vh 1vw;
        font-weight: 700;
    }

    input{
        width: 100%;
        height: 3vh;
        padding: 3%;
        margin-bottom: 2vh;
        border: 2px solid var(--green);
        border-radius: 20px;
    }

    .champ-3 input{
        width: 100%;
        height: 3vh;
        padding: 6%;
        margin-bottom: 2vh;
        border: 2px solid var(--green);
        border-radius: 20px;
    }

    input:focus {
        outline: none; 
    }

    input.invalid {
        border-color: red;
    }

    .error-message {
        color: red;
        font-size: 0.8rem;
        margin: -1vh 0 1vh 0;
        padding-left: 3%;
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

    .img-creation{
        display: none;
    }
    @media (min-width: 768px) {
    .creationdecompte{
        display: flex; 
    }

    .formulaire-creation{
        width: 40vw;
    }

    .creation-text{
        width: 100%;
        margin: auto;
    }

    h2{
        margin-top: 12vh;
    }


    p{
        width: 90%;
    }

    .champ{
        width: 60%;
    }

    .champ-2{
        width: 60%;
    }

    .button{
        width: 60%;
        padding: 0;
        margin: auto;
        justify-content: flex-end;
    }

    .submit-button{
        font-size: var(--text);
    }

    .submit-button:hover {
      background-color: var(--white);
      color: var(--green);
      border: solid 2px var(--green);
    }

    .img-creation{
        display: flex;
        flex-direction: row;
        width: 60vw;
        margin: 2vh 1vw 0 0;
        gap: 1vw;
    }

    .bento-ligne-1{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1vw;
    }

    .bento-1-creation{
        width: 100%;
        height: 38vh;
        background-image: url(/img/sauvetagesurlaligne.webp);
        background-position: top 35% right 50%;
    }

    .bento-2-creation{
        width: 100%;
        height: 56vh;
        background-image: url(/img/celebration.webp);
        background-position: center 40%;
    }

    .bento-ligne-2{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1vw;
    }

    .bento-3-creation{
        width: 100%;
        height: 50vh;
        background-image: url(/img/coach.webp);
    }

    .bento-4-creation{
        width: 100%;
        height: 44vh;
        background-image: url(/img/img-connexion.webp);
        background-position: center 20%;
    }

    .bento-1-creation, .bento-2-creation, .bento-3-creation, .bento-4-creation{
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 20px;
    }
    }
    </style>
    
  