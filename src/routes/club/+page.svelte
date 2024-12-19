<script>
    import'../../styles/global.css';  // Importation des styles globaux
    import { onMount, onDestroy } from 'svelte';  // Importation des hooks de cycle de vie de Svelte
    import Header from '$lib/header.svelte';  // Importation du composant Header
    import CarteJoueur from '$lib/carte-joueur.svelte';  // Importation du composant CarteJoueur
    import MenuBurger from '$lib/MenuBurger.svelte';  // Importation du composant MenuBurger pour les mobiles
    import { loadPlayers } from '$lib/playerLoader.js';  // Importation de la fonction pour charger les joueurs

    // Variables pour gérer l'état de la page : détection mobile, liste des joueurs, etc.
    let isMobile = false;
    let isDropdownOpen = false;
    let players = [];
    let userId;
    let sortAscending = true;
    let basActive = false;
    let isAscending = true;
    let buttonText = 'ASC';

    // Gestion des messages d'information
    let showInfoMessage = false;  // Affiche le message au début
    let infoMessage = '';  // Contenu du message

    // Fonction pour vérifier la taille de l'écran
    function checkScreenSize() {
        if (typeof window !== 'undefined') {
            isMobile = window.innerWidth <= 768;
        }
    }

    // Fonction pour ajuster la largeur du bouton de filtre d'équipe
    function adjustButtonWidth() {
        const filterButton = document.getElementById('filter-team');
        const optionsContainer = document.querySelector('[data-filter-group="team"]');
        if (optionsContainer.offsetWidth > filterButton.offsetWidth) {
            filterButton.style.width = `${optionsContainer.offsetWidth}px`;
        }
    }

    // Fonction pour afficher les attributs de données pour chaque carte de joueur (pour débogage)
    function checkDataTeamAttributes() {
        const cards = document.querySelectorAll('.carte-joueur');
        cards.forEach(card => {
            console.log(card.dataset.team);
        });
    }

    // Code exécuté au montage du composant
    onMount(async () => {
        const hasSeenMessage = localStorage.getItem('hasSeenInfoMessage');

        // Toujours afficher le message au premier chargement
        if (!hasSeenMessage) {
            showInfoMessage = true;
            infoMessage = "Information importante : Vos premiers joueurs sont en train de vous être attribués, veuillez rester sur la page club en attendant la fin de l'attribution.";
        }

        try {
            // Récupération des informations de session
            const sessionResponse = await fetch('/api/session', { method: 'GET', credentials: 'include' });
            const sessionData = await sessionResponse.json();

            if (sessionResponse.ok) {
                userId = sessionData.userid;

                // Déclenchement du processus d'attribution
                const backgroundResponse = await fetch('/.netlify/functions/assign-welcome-pack-background', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId })
                });

                if (backgroundResponse.ok) {
                    const result = await backgroundResponse.json();

                    // Succès de l'attribution
                    if (result.message?.toLowerCase().includes("success")) {
                        infoMessage = "Fin de l'attribution de joueur : Vos joueurs vous ont été attribués, vous pouvez aller ouvrir votre pack dans la page pack.";
                    } else {
                        // Message d'échec si résultat inattendu
                        infoMessage = "Erreur : L'attribution des joueurs a échoué. Veuillez réessayer.";
                    }
                } else {
                    // Si le serveur retourne un statut d'erreur
                    infoMessage = "Erreur : L'attribution des joueurs a échoué. Veuillez réessayer.";
                }

                // Mise à jour des joueurs
                players = await loadPlayers(userId);

                // Cacher le message après 10 secondes seulement si tout a fonctionné
                setTimeout(() => {
                    showInfoMessage = false;
                    localStorage.setItem('hasSeenInfoMessage', 'true');
                }, 10000);
            }
        } catch (error) {
            console.error("Une erreur est survenue :", error);
            infoMessage = "Erreur : Une erreur inattendue est survenue. Veuillez actualiser la page.";

            updateTeamFilters();  // Mise à jour des filtres d'équipe
            checkDataTeamAttributes();  // Vérification des attributs des cartes
        }

        if (typeof window !== 'undefined') {
            checkScreenSize();  // Vérification de la taille de l'écran au chargement
            window.addEventListener('resize', checkScreenSize);  // Ecouteur pour le redimensionnement de l'écran

            document.querySelectorAll('.filter-dropdown button').forEach(button => {
                button.addEventListener('click', function() {
                    const options = this.nextElementSibling;
                    options.style.display = options.style.display === 'block' ? 'none' : 'block';
                    if (this.id === 'filter-team') {
                        updateTeamFilters();
                    }
                    isDropdownOpen = !isDropdownOpen;
                    if (isDropdownOpen) {
                        adjustButtonWidth();
                    }
                });
            });

            document.querySelector('[data-filter-group="team"]').addEventListener('click', event => {
                if (event.target.tagName === 'BUTTON') {
                    handleFilterClick(event.target);
                }
            });
        }
    }); 

    // Code exécuté lorsque le composant est détruit
    onDestroy(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', checkScreenSize);
        }
    });

    // Fonction pour gérer les clics sur les boutons de filtre
    function handleFilterClick(button) {
        const filterValue = button.getAttribute('data-filter');
        const mainTeamButton = document.getElementById('filter-team');
        const teamFilterContainer = document.querySelector('[data-filter-group="team"]');
        const fleche = mainTeamButton.querySelector('.fleche');

        // Mettre à jour l'affichage des cartes en fonction du filtre
        document.querySelectorAll('.background-carte').forEach(card => {
            card.style.display = (filterValue === '*' || card.dataset.team === filterValue) ? 'flex' : 'none';
        });

        // Mise à jour du texte du bouton principal et fermeture du menu déroulant
        mainTeamButton.textContent = filterValue === '*' ? 'Équipe' : button.textContent;
        mainTeamButton.appendChild(fleche);
        teamFilterContainer.style.display = 'none';
        isDropdownOpen = false;
        fleche.classList.remove('bas');
    }

    // Appliquer des styles personnalisés aux boutons de filtre
    function applyButtonStyles(button) {
        button.style.backgroundColor = 'var(--white)';
        button.style.padding = '1vh 2vw';
        button.style.color = 'var(--green)';
        button.style.border = '0';
        button.style.fontSize = 'var(--text)';
    }

    // Fonction pour mettre à jour les filtres d'équipe
    function updateTeamFilters() {
        const teams = new Set(Array.from(document.querySelectorAll('.background-carte')).map(card => card.dataset.team));
        const container = document.querySelector('[data-filter-group="team"]');
        container.innerHTML = '';

        const allButton = document.createElement('button');
        allButton.textContent = "Tous";
        allButton.setAttribute('data-filter', '*');
        applyButtonStyles(allButton);
        container.appendChild(allButton);

        teams.forEach(team => {
            const button = document.createElement('button');
            button.textContent = team;
            button.setAttribute('data-filter', team);
            applyButtonStyles(button);
            container.appendChild(button);
        });
    }

    // Fonction pour trier les cartes par ordre croissant ou décroissant
    function sortCards() {
        sortAscending = !sortAscending;
        players = players.sort((a, b) => sortAscending ? a.order - b.order : b.order - a.order);
    }

    // Fonction pour basculer l'état de la flèche dans l'interface
    function toggleBas() {
        basActive = !basActive;
    }

    // Fonction pour basculer l'ordre de tri et mettre à jour le texte du bouton
    function toggleSortOrder() {
        isAscending = !isAscending;
        buttonText = isAscending ? 'ASC' : 'DSC';
        sortCards();
        toggleBas();
    }
</script>

{#if isMobile}
    <MenuBurger />
{:else}
    <Header style="margin-top: 2vh;"/>
{/if}

{#if showInfoMessage}
    <div class="info-message">
        <p>{infoMessage}</p>
    </div>
{/if}
<section class="club-text">
    <h2>Club</h2>
    <p>Bienvenue dans votre club, où toutes vos cartes sont à portée de main. Filtrer facilement vos cartes par équipe, rareté ou anciénneté pour visualiser les différentes cartes que vous possédez.</p>
</section>
<div id="filters">
    <div class="filter-dropdown">
        <button id="filter-team" class="btn-filtre {isDropdownOpen ? 'open' : ''}">Équipe <div class="fleche" class:bas={isDropdownOpen}></div></button>
        <div class="filter-options" data-filter-group="team"></div>
    </div>
    <button class="btn-filtre" on:click={toggleSortOrder}> {buttonText} <div class="fleche" class:bas={!isAscending}></div></button>
</div>      
<section class="carte-club">
    {#each players as player (player.id)}
        <CarteJoueur {player} fullWidth={false}/>
    {/each}
</section>

<style>
    .club-text{
        width: 100%;
        padding: 0 5vw;
    }

    .club-text h2, .club-text p {
        text-align: center;
        margin:2vh auto;
    }

    .info-message {
        position: fixed;
        top: 2vh;
        right: 2vw;
        background-color: rgba(0, 128, 0, 0.9);
        color: white;
        padding: 1vh 2vw;
        border-radius: 10px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
        z-index: 100;
        font-size: var(--textmobil);
        text-align: center;
        max-width: 300px;
        animation: fadeIn 0.5s ease-in-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    #filters{
        text-align: left;
        padding: 2vh 3vw;
        display: flex;
    }

    .btn-filtre {
        background-color: var(--white);
        padding: 1vh 2vw;
        color: var(--green);
        border: 1px solid var(--green);
        border-radius: 20px; /* Radius par défaut */
        font-size: var(--textmobil);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: border-radius 0.3s ease, width 0.3s ease;
    }
    
    .btn-filtre.open {
        border-radius: 20px 20px 0 0; /* Modifier lorsque le dropdown est ouvert */
        border-bottom: 0px;
    }

    .filter-dropdown {
      position: relative;
      display: inline-block;
      margin-right: 2vw;
      z-index: 10;
    }

    .filter-options {
        display: none; 
        position: absolute; 
        text-align: center;
        padding: 1vh 2vw;
        background-color: var(--white);
        border: 1px solid var(--green);
        border-top: 0px;
        border-radius: 0 0 20px 20px;
        box-shadow: 0px 15px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    .fleche{
        margin-left: 3vw ;
        height: 12px;
        width: 12px;
        border-top: 2px solid var(--green);
        border-left: 2px solid var(--green);
        transform: rotate(225deg);
        transition: transform 0.3s ease;
    }

    .bas{
        transform: rotate(45deg);
    }

    .carte-club{
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding-inline: 3vw;
        gap: 15px;
    }

    @media (min-width: 768px) {
        .club-text{
            width: 40%;
            padding: 0 3vw;
        }

        .club-text h2, .club-text p {
            text-align: left;
            margin: 0 0 3vh 0 ;
        }

        .club-text h2{
            margin: 5vh 0 2vh 0 ;
        }

        .btn-filtre{
            font-size: var(--text);
        }

        .filter-dropdown{
            margin-right: 1vw;
        }

        .filter-options {
            padding: 1vh 1vw;
        }

        .fleche{
            margin-left: 1vw ;
        }
    }
</style>
