<script>
    import'../../styles/global.css';  // Importation des styles globaux

    // Variables pour stocker les données utilisateur et les messages d'erreur
    let email = '';
    let mdp = '';
    let erreurEmail = '';
    let erreurMdp = '';
    let erreurDb = '';

    // Fonction pour valider les champs de saisie
    function validateFields() {
        erreurEmail = email ? '' : 'Veuillez introduire une adresse email.';
        erreurMdp = mdp ? '' : 'Veuillez introduire un mot de passe.';

        // Retourne true si tous les champs sont valides
        return !erreurEmail && !erreurMdp;
    }

    // Fonction pour gérer la soumission du formulaire de connexion
    async function submitLogin(event) {
        event.preventDefault();  // Empêche le rechargement de la page par défaut
        if (!validateFields()) {
            return;  // Arrête la fonction si un champ est vide
        }

        // Envoie une requête POST pour tenter la connexion
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, mdp })
        });

        // Gestion de la réponse de la requête
        if (response.ok) {
            console.log('Login successful, navigating to /club');
            window.location.href = '/club';  // Redirige l'utilisateur vers la page "club" en cas de succès
        } else {
            const error = await response.json();
            console.error('Login failed:', error.message);
            erreurDb = 'L\'email ou le mot de passe sont invalide';  // Affiche un message d'erreur si la connexion échoue
        }
    }
</script>
  
<a href="/"><img src="/img/kl-logo.png" alt="Logo Kick League" class="logo"></a>
<div class="connexion">
    <section class="formulaire-connexion">
        <div class="connexion-text">
            <h2>Connexion</h2>
            <p>Heureux de vous revoir sur Kick League ! Connectez-vous avec vos identifiants pour retrouver votre équipe et reprendre votre quête de gloire. Votre prochaine grande victoire vous attend peut-être juste au prochain match. Entrez vos informations de connexion et replongez dans l'action sans plus attendre. Que le jeu continue !</p>    
        </div>
        
        <form on:submit={submitLogin}>
            <div class="champ">
                <label for="email">Email</label>
                <input type="email" id="email" bind:value={email} class:invalid={erreurEmail !== ''}>
                {#if erreurEmail}<span class="error-message">{erreurEmail}</span>{/if}
            </div>
            <div class="champ">
                <label for="mdp">Mot de passe</label>
                <input type="password" id="mdp" bind:value={mdp} class:invalid={erreurMdp !== ''}>
                {#if erreurMdp}<span class="error-message">{erreurMdp}</span>{/if}
            </div>
            {#if erreurDb}<span class="error-message-db">{erreurDb}</span>{/if}
            <div class="button">
                <button type="submit" class="submit-button">Se connecter</button>
            </div>
        </form>
    </section>
    <section class="img-connexion">
        <div class="bento-1-connexion"></div>
        <div class="bento-ligne-2">
            <div class="bento-2-connexion"></div>
            <div class="bento-3-connexion"></div>
        </div>
    </section>
</div>


    <style>
    .connexion-text{
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

    input:focus {
        outline: none; 
    }

    #mdp.invalid,#email.invalid{
        border: 2px solid red;
    }

    .error-message,span.error-message-db {
        display: block;
        width: 80vw;
        margin: 0vh auto 1vh auto;
        color: red;
        font-size: 0.9rem;
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

    .img-connexion{
        display: none;
    }
    @media (min-width: 768px) {
    .connexion{
        display: flex; 
    }

    .formulaire-connexion{
        width: 40vw;
    }

    .connexion-text{
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

    .error-message,span.error-message-db {
        display: block;
        width: 20vw;
        margin: 0vh auto 2vh auto;
        color: red;
        font-size: 0.9rem;
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

    .img-connexion{
        display: block;
        width: 60vw;
        margin: 2vh 1vw 0 0;
    }

    .bento-1-connexion{
        width: 100%;
        height: 60vh;
        background-image: url(/img/joueurenrang.webp);
        margin-bottom: 1vh;
    }

    .bento-ligne-2{
        width: 100%;
        display: flex;
        gap: 1vw;
    }

    .bento-2-connexion{
        width: 40%;
        height: 35vh;
        background-image: url(/img/arbitre.webp);
    }

    .bento-3-connexion{
        width: 60%;
        height: 35vh;
        background-image: url(/img/supporter.webp);
    }

    .bento-1-connexion, .bento-2-connexion, .bento-3-connexion{
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        border-radius: 20px;
    }

    }
    
    </style>
    
  