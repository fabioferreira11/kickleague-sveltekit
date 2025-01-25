<script>
    import '../../styles/global.css';  // Importation des styles globaux

    let activeClub = 'slb'; // Définir 'slb' (Benfica) comme le club par défaut actif

    // Fonction pour définir le club actif sélectionné par l'utilisateur
    function setActive(club) {
        activeClub = club;
    }

    // Fonction pour envoyer une requête POST pour mettre à jour le club de l'utilisateur
    async function submitClub() {
        console.log('Sending POST request with club:', activeClub);  
        const response = await fetch('/api/updateclub', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ club: activeClub })  
        });

        // Vérification de la réponse de la requête
        if (response.ok) {
            console.log('Club update successful, navigating to /pack');  
            window.location.href = '/club';  
        } else {
            const error = await response.text();
            console.error('Failed to update club:', error);  
        }
    }

    // Définir la liste des clubs disponibles avec leurs ID, noms et images correspondantes
    const clubs = [
        { id: 'slb', name: 'Benfica', imgSrc: 'slblogo.png' },
        { id: 'scp', name: 'Sporting', imgSrc: 'scplogo.png' },
        { id: 'fcp', name: 'Porto', imgSrc: 'fcplogo.png' },
        { id: 'scb', name: 'Braga', imgSrc: 'bragalogo.png' },
        { id: 'fca', name: 'Arouca', imgSrc: 'aroucalogo.png' },
        { id: 'bfc', name: 'Boavista', imgSrc: 'boavistalogo.png' },
        { id: 'epf', name: 'Estoril', imgSrc: 'estorillogo.png' },
        { id: 'cpac', name: 'Casa pia', imgSrc: 'casapialogo.png' },
        { id: 'nac', name: 'Nacional', imgSrc: 'nacionallogo.png' },
        { id: 'scf', name: 'Farense', imgSrc: 'farenselogo.png' },
        { id: 'cfea', name: 'Estrela', imgSrc: 'estrelalogo.png' },
        { id: 'fcf', name: 'Famalicão', imgSrc: 'famalicaologo.png' },
        { id: 'mfc', name: 'Moreirense', imgSrc: 'moreirenselogo.png' },
        { id: 'san', name: 'Santa Clara', imgSrc: 'santaClaralogo.png' },
        { id: 'gvfc', name: 'Gil Vicente', imgSrc: 'gilvicentelogo.png' },
        { id: 'rafc', name: 'Rio Ave', imgSrc: 'rioavelogo.png' },
        { id: 'vsc', name: 'Guimaraes', imgSrc: 'vitorialogo.png' },
        { id: 'avs', name: 'Avs', imgSrc: 'avslogo.png' }
    ];
</script>


<a href="/"><img src="/img/kl-logo.png" alt="Logo Kick League" class="logo"></a>

<section class="choixclub-text">
    <h2>Choix du club</h2>
    <p>Le club que tu choisis aura une importance pour le premier pack que tu ouvriras sur ton compte. Ce pack contiendra une star de ce club.</p>
</section>

<div class="choixclub">
    {#each clubs as club}
        <button class="bg-pays-club {club.id}" on:click={() => setActive(club.id)} class:active={activeClub === club.id}>
            <img src={`/img/${club.imgSrc}`} alt={club.name}>
            <p>{club.name}</p>
        </button>
    {/each}
</div>

<div class="button">
    <button type="button" class="submit-button" on:click={submitClub}>Créer votre compte</button>
</div>


<style>
    .choixclub-text{
        text-align: center;
        padding: 0 5vw;
    }

    h2{
        margin-top: 10vh;
        margin-bottom: 2vh;
    }

    .choixclub-text p{
        margin-top: 0%;
        width: 100%;
    }

    .choixclub{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        margin: 5vh 0 2vh 0;
    }

    .bg-pays-club{
        width: calc(85% / 3);
        height: 18vh;
        background-color: var(--gris);
        padding: 10px;
        border: 5px solid var(--gris);
        border-radius: 15px;
        transition: background-color 0.5s ease, border-color 0.5s ease;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .bg-pays-club img {
        width: auto; 
        height: 70%;
    }

    .bg-pays-club p{
        font-weight: 600;
        font-family: "Manrope", sans-serif;
    }

    .bg-pays-club.active {
        background-color: var(--green);
        border: 5px solid var(--green);
    }

    .bg-pays-club.active p{
        color: var(--white);
    }

    .button{
        width: 100%;
        padding: 0 10vw 2vh 10vw;
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
    .choixclub-text{
        text-align: left;
        padding: 3vh 0 0vh 3vw;
    }

    .choixclub-text p{
        /* margin: 0 auto; */
        width: 40%;
        margin-bottom: 7vh;
    }

    .choixclub{
        gap: 25px;
    }

    .bg-pays-club{
        width: calc(100% / 7);
        height: 35vh;
        border: 20px solid var(--gris);
        border-radius: 15px;
        display: flex;
        justify-content: center;
    }

    .bg-pays-club img {
        width: auto; 
        height: 70%;
    }

    .bg-pays-club:hover{
        background-color: var(--green);
        border: 20px solid var(--green);
    }

    .bg-pays-club.active {
        border: 20px solid var(--green);
    }

    .button{
        justify-content: flex-end;
        padding-right: 3vw;
    }

    .submit-button{
        font-size: var(--text);
    }
    }
  </style>