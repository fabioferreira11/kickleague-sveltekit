<script>
    import'../../styles/global.css'; // Importation des styles globaux
    import { onMount, onDestroy } from 'svelte';
    import Header from '$lib/header.svelte';
    import MenuBurger from '$lib/MenuBurger.svelte';

    // Gestion de l'état de la page
    let isMobile = false;
    let isSubmitted = false; // État de la soumission du formulaire

    // Variables pour stocker les données du formulaire et les messages d'erreur
    let prenom = '';
    let nom = '';
    let email = '';
    let message = '';
    let erreurPrenom = '';
    let erreurNom = '';
    let erreurEmail = '';
    let erreurMessage = '';

    // Fonction pour vérifier la taille de l'écran et mettre à jour isMobile
    function checkScreenSize() {
        if (typeof window !== 'undefined') {
            isMobile = window.innerWidth <= 768;
        }
    }

    // Fonction pour valider les champs du formulaire
    function validateField(field, fieldType, setErreur) {
        if (field.trim() === '') {
            setErreur('Veuillez remplir ce champ');
            return false;
        }

        if (fieldType === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validation de l'email
            if (!emailRegex.test(field)) {
                setErreur('Veuillez entrer une adresse email valide');
                return false;
            }
        } if (fieldType === 'prenom' || fieldType === 'nom') {
            const nameRegex = /^[A-Za-z\séèàêûçôäëïöü-]+$/; // Validation des noms sans chiffres
            if (!nameRegex.test(field)) {
                setErreur(`${fieldType === 'prenom' ? 'Le prénom' : 'Le nom'} ne doit pas contenir de chiffres`);
                return false;
            }
        }

        setErreur('');
        return true;
    }

    // Gérer les montées et descentes de la page
    onMount(() => {
        if (typeof window !== 'undefined') {
            checkScreenSize();
            window.addEventListener('resize', checkScreenSize);
        }
    });

    onDestroy(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', checkScreenSize);
        }
    });

    // Gestion de la soumission du formulaire
    function handleSubmit() {
        const isPrenomValid = validateField(prenom, 'prenom', v => erreurPrenom = v);
        const isNomValid = validateField(nom, 'nom', v => erreurNom = v);
        const isEmailValid = validateField(email, 'email', v => erreurEmail = v);
        const isMessageValid = validateField(message, null, v => erreurMessage = v);

        if (isPrenomValid && isNomValid && isEmailValid && isMessageValid) {
            const formData = { prenom, nom, email, message };
            fetch('/api', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then(data => {
                isSubmitted = true; // Indiquer que le formulaire a été soumis avec succès
                console.log('Success:', data);
            }).catch(error => {
                console.error('Error:', error);
            });
        }
    }
</script>
  
    {#if isMobile}
    <MenuBurger />
    {:else}
    <Header style="margin-top: 2vh;"/>
    {/if}
    <section class="contact">
        <div class="contact-text">
            <h2>Contact</h2>
            <p>Sur la page contact, vous avez accès à toutes les informations nécessaires pour nous contacter en cas de problème ou si vous avez une question à laquelle vous n'avez pas de réponse.</p>
        </div>
        <section class="form-info">
            {#if !isSubmitted}
            <form>
                <h2>Quel est votrer question ?</h2>
                <div class="champ-2">
                    <div class="champ-3">
                        <label for="prenom">Prénom</label>
                        <input type="text" id="prenom" bind:value={prenom} class:erreur={erreurPrenom !== ''}>
                        {#if erreurPrenom}<span class="erreur-message">{erreurPrenom}</span>{/if}
                    </div>
                    <div class="champ-3">
                        <label for="nom">Nom</label>
                        <input type="text" id="nom" bind:value={nom} class:erreur={erreurNom !== ''}>
                        {#if erreurNom}<span class="erreur-message">{erreurNom}</span>{/if}
                    </div>
                </div>
                <div class="champ">
                    <label for="email">Email</label>
                    <input type="email" id="email" bind:value={email} class:erreur={erreurEmail !== ''}>
                    {#if erreurEmail}<span class="erreur-message">{erreurEmail}</span>{/if}
                </div>
                <div class="champ">
                    <label for="message">Message</label>
                    <textarea id="message" bind:value={message} class:erreur={erreurMessage !== ''}></textarea>
                    {#if erreurMessage}<span class="erreur-message">{erreurMessage}</span>{/if}
                </div>
                <div class="button">
                    <button type="button" class="submit-button" on:click={handleSubmit}>Envoyer</button>
                </div>
            </form>
            {:else}
            <form>
                <h2 class="remerciement">Merci pour votre message !</h2>
            </form>
            {/if}
            <div class="info-contact">
                <div class="info-ligne1">
                    <div class="info">
                        <div class="bg-iconinfo"><img src="/img/enveloppe.png" alt=""></div>
                            <h4>Kickleague-ff@gmail.com</h4>
                            <p>Si vous avez un probléme avec le formulaire, vous pouvez nous contactez directement par mail</p>
                    </div>
                    <div class="info">
                        <div class="bg-iconinfo"><img src="/img/mobile.png" alt=""></div>
                            <h4>04 118 09 50</h4>
                            <p>Si vous préférez parler directement avec quelqu'un, vous pouvez appeler notre numéro</p>
                    </div>
                </div>
                <div class="info-ligne2">
                    <div class="info">
                        <div class="bg-iconinfo"><img src="/img/instagram.png" alt=""></div>
                            <h4>@Kickleague-ff</h4>
                            <p>Suivez-nous sur Instagam pour être à jour sur les dernières nouveautés du site</p>
                    </div>
                    <div class="info">
                        <div class="bg-iconinfo"><img src="/img/facebook.png" alt=""></div>
                            <h4>@Kickleague-ff</h4>
                            <p>Suivez-nous sur Facebook pour être à jour sur les dernières nouveautés du site</p>
                    </div>
                </div>
            </div>
        </section>
    </section>
       
    <style>
    .contact-text{
        width: 100%;
        padding: 0 5vw;
    }

    .contact-text h2,.contact-text p{
        text-align: center;
        margin-bottom: 2vh;
    }

    .contact-text p{
        margin-bottom: 40px;
        margin:2vh auto;
    }

    form{
        width: 90vw;
        margin: 2vh auto 0 auto;
        border: 2px solid var(--green);
        border-radius: 20px;
        padding: 3vh 0;
    }

    .champ, textarea{
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

    input.erreur, textarea.erreur{
        margin-bottom: 0.5vh;
    }

    textarea{
        width: 100%;
        height: 10vh;
        padding: 3%;
        margin-bottom: 2vh;
        border: 2px solid var(--green);
        border-radius: 20px;
    }

    .champ-3 input{
        padding: 6%;
    }

    input:focus {
        outline: none; 
    }

    .button{
        width: 100%;
        padding: 2vh 10vw 0 10vw;
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

    .erreur {
        border-color: red;
    }

    .erreur-message {
        color: red;
        font-size: 0.8rem;
        margin-top: 0.5vh;
        padding-left: 3%;
    }

    .remerciement{
        text-align: center;
    }

    .info-contact{
        display: flex;
        flex-direction: column;
        margin-bottom: 2vh;
    }

    .info{
        width: 80vw;
        height: 30vh;
        margin: 2vh auto 0 auto;
        background: linear-gradient(-180deg,rgba(97, 197, 62, 1) 0%, rgba(25, 127, 60, 1) 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 20px;
    }

    .info p, .info h4{
        color: var(--white);
        margin-bottom: 0;
        padding: 0 10vw;
    }

    .bg-iconinfo{
        width: 20vw;
        height: 9vh;
        margin-top: 3vh;
        background-color: var(--white);
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .bg-iconinfo img{
        width: 50%;
    }
    @media (min-width: 768px) {
    .contact{
        width: 100%;
        padding: 0 3vw;
        display: flex;
        flex-direction: column;
    }

    .contact-text{
        width: 40%;
        padding: 5vh 0 0 0;
    }

    .contact-text h2,.contact-text p{
        text-align: left;
        margin-top: 0;
    }

    .form-info{
        display: flex;
        padding: 2vh 0 5vh 0 ;
    }

    form{
        width: 50vw;
        margin: 2vh 0 0 0;
        border: 2px solid var(--green);
        border-radius: 20px;
        padding: 3vh 0;
    }

    form h2{
        text-align: left;
        padding: 0 2vw;
        margin-bottom: 3vh;
    }

    .champ{
        width: 90%;
    }

    .champ-2{
        width: 90%;
    }

    textarea{
        height: 15vh;
    }

    .button{
        width: 100%;
        padding: 0;
        margin: auto;
        justify-content: flex-end;
        padding-right: 2vw;
    }

    .submit-button{
        font-size: var(--text);
    }

    .submit-button:hover {
      background-color: var(--white);
      color: var(--green);
      border: solid 2px var(--green);
    }

    .info-contact{
        width: 50vw;
        display: flex;
        flex-direction: column;
        gap: 2vh;
        margin-bottom: 0;
    }

    .info-ligne1, .info-ligne2{
        width: 100%;
        display: flex;
        gap: 2vw;
        padding: 0 0 0 2vw;
    }

    .info-ligne1{
        padding-top: 2vh;
    }

    .info{
        width: 26vw;
        height: 32vh;
        margin: 0;
        padding: 3vh 0;
        background: linear-gradient(-180deg,rgba(97, 197, 62, 1) 0%, rgba(25, 127, 60, 1) 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
    }

    .info p, .info h4{
        color: var(--white);
        margin: 1vh 0 1vh 0;
        padding: 0 2vw;
    }

    .bg-iconinfo{
        width: 4vw;
        height: 8vh;
        margin-top: 0vh;
        background-color: var(--white);
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .bg-iconinfo img{
        width: 50%;
    }
    }
    </style>