<script>
    import '../../styles/global.css';  // Importation des styles globaux
    import { onMount, onDestroy } from 'svelte';  // Importation des hooks de cycle de vie de Svelte
    import Header from '$lib/header.svelte';  // Importation du composant Header
    import Button from '$lib/button.svelte';  // Importation du composant Button
    import Choixjoueur from '$lib/choix-joueur.svelte';  // Importation du composant ChoixJoueur
    import MenuBurger from '$lib/MenuBurger.svelte';  // Importation du composant MenuBurger pour les mobiles

    // Variables pour gérer l'état de la page et la sélection des joueurs
    let isMobile = false;
    let activePosition = 5;
    let userId = null;

    let selectedPlayers = {
        1: null, // Position "Tous"
        2: null, // Position "Attaquant"
        3: null, // Position "Milieu"
        4: null, // Position "Défenseur"
        5: null  // Position "Gardien"
    };

    // Variables dérivées pour la liste des joueurs sélectionnés et l'état des positions remplies
    $: selectedPlayersList = Object.values(selectedPlayers).filter(player => player !== null);
    $: allPositionsFilled = Object.values(selectedPlayers).every(player => player !== null);

    const positionTranslation = {
        'Goalkeeper': 'Gardien',
        'Defender': 'Défenseur',
        'Midfielder': 'Milieu',
        'Attacker': 'Attaquant'
    };

    // Vérifie la taille de l'écran pour déterminer si l'appareil est mobile
    function checkScreenSize() {
        if (typeof window !== 'undefined') {
            isMobile = window.innerWidth <= 768;
        }
    }

    // Récupère les joueurs de l'utilisateur via une requête API
    async function fetchUserPlayers() {
        try {
            const response = await fetch('/api/getPlayersCompo?position=Tous');
            if (response.ok) {
                const data = await response.json();
                userId = data.userId;

                // Sauvegarde l'ID utilisateur dans le localStorage pour une utilisation ultérieure
                if (userId) {
                    localStorage.setItem('userSession', JSON.stringify({ userId }));
                }

                return data.players;
            } else {
                console.error('Failed to fetch players');
            }
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    }

    // Met à jour la position active sélectionnée
    function setActive(position) {
        activePosition = position;
    }

    // Sauvegarde la composition actuelle des joueurs sélectionnés dans le localStorage
    function saveComposition() {
        if (typeof window !== 'undefined' && userId !== null && userId !== undefined) {
            const selectedPlayerIds = Object.keys(selectedPlayers).reduce((acc, key) => {
                if (selectedPlayers[key]) {
                    acc[key] = { id: selectedPlayers[key].id };
                }
                return acc;
            }, {});

            localStorage.setItem('userSession', JSON.stringify({ userId }));
            const compositions = JSON.parse(localStorage.getItem('userCompositions') || '{}');
            compositions[userId] = selectedPlayerIds;
            localStorage.setItem('userCompositions', JSON.stringify(compositions));
        } else {
            console.error("No valid userId found to save the composition.");
        }
    }

    // Gère la sélection d'un joueur dans la composition
    function handlePlayerSelect(event) {
        const player = event.detail;
        selectedPlayers[activePosition] = player;
        selectedPlayersList = Object.values(selectedPlayers).filter(player => player !== null); // Mise à jour de la liste des joueurs sélectionnés
        saveComposition();  // Sauvegarde de la composition mise à jour
    }

    // Charge la composition des joueurs à partir du localStorage
    async function loadComposition() {
        if (typeof window !== 'undefined' && userId) {
            const compositions = JSON.parse(localStorage.getItem('userCompositions') || '{}');
            if (compositions[userId]) {
                const savedPlayerIds = compositions[userId];
                const allPlayers = await fetchUserPlayers();  // Récupère tous les joueurs pour cet utilisateur

                const loadedPlayers = {};
                for (const position in savedPlayerIds) {
                    const playerId = savedPlayerIds[position].id;
                    const playerDetails = allPlayers.find(player => player.id === playerId);
                    if (playerDetails) {
                        loadedPlayers[position] = playerDetails;
                    }
                }

                selectedPlayers = loadedPlayers;
                selectedPlayersList = Object.values(selectedPlayers).filter(player => player !== null);
            }
        }
    }

    // Exécution au montage du composant
    onMount(async () => {
        await fetchUserPlayers();  // Récupère les joueurs de l'utilisateur
        if (userId) {
            await loadComposition();  // Charge la composition des joueurs si un userId est trouvé
        } else {
            console.error("User ID not found");
        }
        if (typeof window !== 'undefined') {
            checkScreenSize();  // Vérifie la taille de l'écran
            window.addEventListener('resize', checkScreenSize);  // Ajoute un écouteur pour gérer le redimensionnement de la fenêtre
        }
    });

    // Nettoyage au démontage du composant
    onDestroy(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', checkScreenSize);
        }
    });
</script>

{#if isMobile}
    <MenuBurger />
{:else}
    <Header style="margin-top: 2vh;"/>
{/if}

<section class="compo">
    <section class="terrain">
        <div class="position">
            <button class={activePosition === 1 ? "emplacement-position active" : "emplacement-position"}
                 on:click={() => setActive(1)}>
                {#if selectedPlayers[1]}
                    <div class="joueur-info">
                        <img src={selectedPlayers[1].photo_url} alt={`Photo de ${selectedPlayers[1].nom}`} class="joueur-photo"/>
                        <p>{selectedPlayers[1].nom}</p>
                        <p>{positionTranslation[selectedPlayers[1].position] || selectedPlayers[1].position}</p>
                    </div>
                {:else}
                    <img src="/img/plus.png" alt="icone plus">
                {/if}
            </button>
            <button class={activePosition === 2 ? "emplacement-position active" : "emplacement-position"}
                 on:click={() => setActive(2)}>
                {#if selectedPlayers[2]}
                    <div class="joueur-info">
                        <img src={selectedPlayers[2].photo_url} alt={`Photo de ${selectedPlayers[2].nom}`} class="joueur-photo"/>
                        <p>{selectedPlayers[2].nom}</p>
                        <p>{positionTranslation[selectedPlayers[2].position] || selectedPlayers[2].position}</p>
                    </div>
                {:else}
                    <img src="/img/plus.png" alt="icone plus">
                {/if}
            </button>
        </div>
        <div class="position milieuterrain">
            <button class={activePosition === 3 ? "emplacement-position active" : "emplacement-position"}
                 on:click={() => setActive(3)}>
                {#if selectedPlayers[3]}
                    <div class="joueur-info">
                        <img src={selectedPlayers[3].photo_url} alt={`Photo de ${selectedPlayers[3].nom}`} class="joueur-photo"/>
                        <p>{selectedPlayers[3].nom}</p>
                        <p>{positionTranslation[selectedPlayers[3].position] || selectedPlayers[3].position}</p>
                    </div>
                {:else}
                    <img src="/img/plus.png" alt="icone plus">
                {/if}
            </button>
            <button class={activePosition === 4 ? "emplacement-position active" : "emplacement-position"}
                 on:click={() => setActive(4)}>
                {#if selectedPlayers[4]}
                    <div class="joueur-info">
                        <img src={selectedPlayers[4].photo_url} alt={`Photo de ${selectedPlayers[4].nom}`} class="joueur-photo"/>
                        <p>{selectedPlayers[4].nom}</p>
                        <p>{positionTranslation[selectedPlayers[4].position] || selectedPlayers[4].position}</p>
                    </div>
                {:else}
                    <img src="/img/plus.png" alt="icone plus">
                {/if}
            </button>
        </div>
        <button class={activePosition === 5 ? "position emplacement-position2 active" : "position emplacement-position2"}
             on:click={() => setActive(5)}>
            {#if selectedPlayers[5]}
                <div class="joueur-info">
                    <img src={selectedPlayers[5].photo_url} alt={`Photo de ${selectedPlayers[5].nom}`} class="joueur-photo"/>
                    <p>{selectedPlayers[5].nom}</p>
                    <p>{positionTranslation[selectedPlayers[5].position] || selectedPlayers[5].position}</p>
                </div>
            {:else}
                <img src="/img/plus.png" alt="icone plus">
            {/if}
        </button>
    </section>
    <section class="option">
        <div class="option-joueur">
            <Choixjoueur {activePosition} selectedPlayer={selectedPlayers[activePosition]} selectedPlayersList={selectedPlayersList} on:playerSelect={handlePlayerSelect}/>
        </div>
        {#if allPositionsFilled}
            <div class="button">
                <Button text="valider" url="/gameweek" />
            </div>
        {/if}
    </section>
</section>

<style>
    .compo {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .terrain {
        width: 94vw;
        height: 70vh;
        margin: 1vh auto;
        background-color: #197F3C;
        background-image: url(/img/terrain.png);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .position {
        width: 80%;
        height: 30%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .emplacement-position {
        width: 35%;
        height: 20vh;
        background-color: var(--gris);
        border: 2px solid var(--black);
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
    }

    .emplacement-position2 {
        width: 28%;
        height: 20vh;
        background-color: var(--gris);
        border: 2px solid var(--black);
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
    }

    .emplacement-position img,
    .emplacement-position2 img {
        width: 10%;
    }

    .joueur-info {
        width: 100%;
        background-color: var(--white);
        height: 100%;
        text-align: center;
        border-radius: 20px;
    }

    .joueur-info img{
        width: 100%;
        border-radius: 20px 20px 0 0;
    }

    .joueur-info p{
        margin: 5px 0;
    }

    .option {
        width: 94vw;
        margin: auto;
        background-color: var(--gris);
        border-radius: 20px;
    }

    .option-joueur {
        display: flex;
        gap: 10px;
        margin-inline: 2%;
        overflow-y: none;
        overflow-x: auto;
    }

    .active {
        background-color: var(--greencompo);
    }

    .button {
        display: flex;
        justify-content: center;
        margin-bottom: 3vh;
    }

    @media (min-width: 768px) {
        .compo {
            display: flex;
            flex-direction: row;
            padding: 2vh 3vw;
        }

        .terrain {
            width: 75%;
            height: 85vh;
            margin-top: 0;
            background-size: contain;
        }

        .position {
            width: 50%;
            display: flex;
            justify-content: space-evenly;
            padding: 0;
        }

        .milieuterrain{
            justify-content: space-between;
            margin-top: 4vh;
        }

        .emplacement-position {
            width: 26%;
            height: 28vh;
        }

        .emplacement-position2 {
            width: 13%;
            height: 28vh;
            margin-top: -6vh;
        }

        .option {
            width: 25%;
            height: 85vh;
            margin-left: 1vw;
            padding: 10px;
            display: flex;
            flex-direction: column;
        }

        .option-joueur {
            display: flex;
            flex-direction: column;
            overflow-y: auto;
        }
    }
</style>