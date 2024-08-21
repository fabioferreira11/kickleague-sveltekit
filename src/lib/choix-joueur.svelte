<script>
    import { createEventDispatcher, onMount } from 'svelte';
    
    // Propriétés exportées permettant de passer des données au composant
    export let activePosition;
    export let selectedPlayer;
    export let selectedPlayersList = []; // Liste de tous les joueurs sélectionnés

    let players = [];
    const dispatch = createEventDispatcher(); // Crée un dispatcher d'événements pour communiquer avec d'autres composants

    // Mappage des positions avec leurs noms en anglais
    const positionMapping = {
        5: 'Goalkeeper',
        4: 'Defender',
        3: 'Midfielder',
        2: 'Attacker',
        1: 'Tous' // "Tous" signifie tous les joueurs, indépendamment de leur position
    };

    // Traduction des noms de positions en français
    const positionTranslation = {
        'Goalkeeper': 'Gardien',
        'Defender': 'Défenseur',
        'Midfielder': 'Milieu',
        'Attacker': 'Attaquant'
    };

    // Fonction pour charger les joueurs en fonction de la position active
    async function loadPlayers() {
        const position = positionMapping[activePosition];
        if (position) {
            try {
                const response = await fetch(`/api/getPlayersCompo?position=${position}`);
                const data = await response.json();

                if (data && Array.isArray(data.players)) {
                    // Filtrer les joueurs si la position est "Tous", en excluant ceux déjà sélectionnés
                    players = position === 'Tous'
                        ? data.players.filter(player => !selectedPlayersList.some(selected => selected?.id === player.id))
                        : data.players;
                } else {
                    console.error("Invalid data format:", data);
                    players = [];
                }
            } catch (error) {
                console.error("Failed to load players:", error);
                players = [];
            }
        }
    }

    // Charge les joueurs au montage du composant
    onMount(() => {
        loadPlayers();
    });

    // Recharge les joueurs chaque fois que la position active change
    $: if (activePosition && typeof window !== 'undefined') {
        loadPlayers();
    }

    // Fonction pour sélectionner un joueur et émettre un événement
    function selectPlayer(player) {
        if (selectedPlayersList.some(selected => selected?.id === player.id && selected !== selectedPlayer)) {
            return;
        }
        dispatch('playerSelect', player); // Émet un événement 'playerSelect' avec le joueur sélectionné
    }
</script>

<!-- Affichage de chaque joueur dans la liste, avec un style différent si le joueur est sélectionné -->
{#each players as player (player.id)}
<div class="choix-joueur {selectedPlayer?.id === player.id ? 'selected' : ''}" on:click={() => selectPlayer(player)}>
    <div class="joueur-img">
        <img src={player.photo_url} alt={`Photo de ${player.nom}`} style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;" />
    </div>
    <div class="choix-joueur-info">
        <p>{player.nom}</p>
        <p>{positionTranslation[player.position] || player.position}</p> 
        <p>{player.club}</p>
    </div>
    <div class="moyenne-joueur">
        <p>{player.moyenne || '30'}</p>
    </div>
</div>
{/each}

<style>
.choix-joueur {
    width: 20%;
    margin: 2vh auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.choix-joueur.selected {
    background-color: var(--white);
    padding: 1vh 2vw 1vh 1vw;
    border-radius: 20px;
}

.joueur-img {
    width: 50px;
    height: 50px;
    border: 2px solid var(--green);
    border-radius: 10px;
    background-color: var(--white);
}

.choix-joueur-info {
    display: none;
}

.moyenne-joueur {
    width: 100%;
}

.moyenne-joueur p {
    width: 40px;
    height: 40px;
    border: 2px solid var(--green);
    background-color: var(--white);
    border-radius: 10px;
    margin: 10px auto 10px auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media (min-width: 768px) {
    .choix-joueur {
        width: 90%;
        margin: 1vh 0;
        display: flex;
        flex-direction: row;
    }

    .choix-joueur-info {
        width: 60%;
        display: block; 
    }

    .choix-joueur-info p {
        margin: 2px;
    }

    .moyenne-joueur {
        width: 20%;
    }

    .moyenne-joueur p {
        width: 55px;
        height: 55px;
        margin: auto;
    }
}
</style>