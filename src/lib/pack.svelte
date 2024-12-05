<script>
    import { onMount } from 'svelte';
    import CarteJoueur from '$lib/carte-joueur.svelte';
    import { fly, fade } from 'svelte/transition';
    import { preparePlayerPack, generatePlayerList, assignPlayerPack } from '$lib/api';

    // Variables d'état pour gérer l'affichage du pack, le statut d'ouverture, et les joueurs récupérés
    let players = [];
    let isOpened = false;
    let currentIndex = 0;
    let showingPackImage = true;
    let packOpened = false;
    let userId;
    let showPackOnDarkBackground = false;

    // Fonction pour récupérer le pack de joueurs pour l'utilisateur
    async function fetchPlayerPack() {
    const checkResponse = await fetch('/api/checkPackStatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
    });

    const checkData = await checkResponse.json();
    packOpened = checkData.packOpened;

    if (!packOpened) {
        try {
            // Étape 1 : Préparation des données utilisateur
            await preparePlayerPack(userId);

            // Étape 2 : Génération de la liste des joueurs
            await generatePlayerList(userId);

            // Étape 3 : Attribution du pack de joueurs
            const playerPack = await assignPlayerPack(userId);

            players = playerPack.selectedPlayers; // Charger les joueurs assignés
        } catch (error) {
            console.error("Error during player pack process:", error);
        }
    }
}

    // Marque le pack comme ouvert et déclenche l'affichage des cartes
    async function markPackAsOpened() {
        const response = await fetch('/api/openPack', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, packId: 1 })
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                packOpened = true;
                showPackOnDarkBackground = false;
                isOpened = true;
            }
        }
    }

    // Récupère les informations de session et charge le pack de l'utilisateur au montage du composant
    onMount(async () => {
        const response = await fetch('/api/session', {
            method: 'GET',
            credentials: 'include'
        });
        const data = await response.json();
        if (response.ok && data.userid) {
            userId = data.userid;
            fetchPlayerPack();
        } else {
            console.error("Failed to retrieve user ID:", response.statusText);
        }
    });

    // Prépare l'ouverture du pack avec un fond noir si non ouvert
    function openPack() {
        if (!packOpened && showingPackImage) {
            showPackOnDarkBackground = true;
        }
    }

    // Active les cartes des joueurs une fois le pack ouvert
    function activateCards() {
        if (showPackOnDarkBackground) {
            markPackAsOpened();
        }
    }

    // Gère le clic sur une carte de joueur, passe à la suivante ou termine l'affichage
    function handleCardClick() {
        if (currentIndex < players.length - 1) {
            currentIndex++;
        } else {
            isOpened = false;
        }
    }
</script>

{#if !packOpened}
    {#if showPackOnDarkBackground}
        <!-- Affichage de l'image du pack sur fond noir -->
        <div class="dark-background" on:click={activateCards} transition:fade>
            <img src="/img/pack.png" class="centered-pack" alt="Pack de bienvenue">
        </div>
    {:else}
        <!-- Affichage de l'image du pack normale -->
        <div on:click={openPack} class="pack-image">
            <img src="/img/pack.png" alt="Pack de bienvenue">
            <h3>Pack de bienvenue</h3>
        </div>
    {/if}
{:else if isOpened}
    <!-- Affichage des cartes des joueurs après ouverture du pack -->
    <div class="dark-background">
        <div class="player-cards">
            {#each players as player, index (player.id)}
                {#if index === currentIndex}
                    <div on:click={handleCardClick} in:fade={{ delay: 500, duration: 500 }} out:fly={{ x: -200, duration: 1000 }}>
                        <CarteJoueur {player} fullWidth={true}/> <!-- Affichage de la carte du joueur avec animation -->
                    </div>
                {/if}
            {/each}
        </div>
    </div>
{/if}

<style>

    .pack-image, .centered-pack {
        cursor: pointer;
        transition: transform 0.5s ease;
        z-index: 10;
    }
    .pack-image h3 {
        margin: 10px auto;
        font-weight: 400;
    }
    .pack-image img, .centered-pack {
        width: 50vw;
    }
    .centered-pack {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(1.5);
    }
    .dark-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .player-cards {
        display: flex;
        justify-content: center;
        width: 100%;
    }
    @media (min-width: 768px) {
    .pack-image img, .centered-pack {
        width: 15vw;
    }
    }
</style>