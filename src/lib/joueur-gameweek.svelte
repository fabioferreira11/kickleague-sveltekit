<script>
    import { totalPoints } from '../store.js';  // Importation du store pour gérer les points totaux
    export let moyennedepoint = 30;  // Valeur par défaut de la moyenne de points pour le joueur
    export let playerId; // Identifiant du joueur reçu en prop
    import CarteJoueur from '$lib/carte-joueur.svelte'; // Importation du composant carte-joueur pour afficher les détails du joueur
    import { onMount, createEventDispatcher } from 'svelte';
    import { getPlayerData } from '$lib/api'; // Importation de la fonction pour récupérer les données du joueur depuis l'API

    // Variable pour stocker les données du joueur, les informations de l'équipe du joueur et Création d'un dispatcher pour émettre des événements personnalisés
    let playerData = null; 
    let teamInfo = null; 
    const dispatch = createEventDispatcher();  

    // Fonction exécutée lors du montage du composant
    onMount(async () => {
        if (playerId) {
            try {
                // Récupérer les données du joueur via l'API
                const fetchedData = await getPlayerData(playerId, new Date().getFullYear());
                
                if (fetchedData && fetchedData.player) {
                    playerData = fetchedData.player;

                    // Vérifier si les informations de l'équipe et les statistiques de jeu sont disponibles
                    if (fetchedData.team && fetchedData.games) {
                        teamInfo = fetchedData.team; // Extraire les informations de l'équipe

                        // Émettre un événement avec les informations de l'équipe
                        dispatch('teaminfo', teamInfo);
                    }
                }
            } catch (error) {
                console.error("Error fetching player data:", error); // Gestion des erreurs de récupération des données
            }
        }

        // Log pour vérifier le contenu des données du joueur
        console.log("Player Data:", playerData);

        // Mise à jour des points totaux avec la moyenne de points du joueur
        totalPoints.update(total => total + moyennedepoint);
    });
</script>

<div class="joueur">
    {#if playerData}
        <!-- Affichage de la carte du joueur si les données sont disponibles -->
        <CarteJoueur player={playerData} fullWidth={true}/>
    {:else}
        <!-- Message de chargement si les données du joueur ne sont pas encore disponibles -->
        <p>Chargement du joueur...</p>
    {/if}
    <div class="moyenne-joueur">
        <h2>{moyennedepoint}</h2> 
    </div>
</div>
  
<style>
    .joueur {
        width: calc((100% / 2) - 4vw);
        display: flex;
        flex-direction: column;
        align-items: center;
        column-gap: 15px;
    }

    .moyenne-joueur {
        width: 100%;
        margin-block: 2vh;
    }

    .moyenne-joueur h2 {
        width: 40px;
        height: 40px;
        background: var(--white);
        color: var(--green);
        border-radius: 10px;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media (min-width: 768px) {
        .joueur {
            width: 20%;
            align-items: flex-start;
        }

        .moyenne-joueur h2 {
            width: 55px;
            height: 55px;
        }
    }
</style>
