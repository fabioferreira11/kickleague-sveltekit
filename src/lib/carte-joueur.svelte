<script>
    import { onMount } from 'svelte';
    import { getPlayerData } from '$lib/api';
    import { getCode } from 'country-list';
    import { clubs } from '$lib/clubs';

    // Propriétés exportées permettant de passer des données au composant
    export let player; 
    console.log('Player data:', player);
    export let fullWidth = false;

    // Variables pour stocker les informations du joueur, de l'équipe et du jeu
    let playerInfo = null;
    let teamInfo = null;
    let gameInfo = null; 
    let clubShortName = "";

    // Fonction pour abréger les positions des joueurs
    function traductionPosition(position) {
        const traduction = {
            'Attacker': 'Attaquant',
            'Midfielder': 'Milieu',
            'Defender': 'Défenseur',
            'Goalkeeper': 'Gardien'
        };
        return traduction[position] || position;
    }

    // Fonction pour obtenir l'abréviation du club en fonction de son nom
    function getClubAbbreviation(clubName) {
        const club = clubs.find(c => c.name === clubName);
        console.log(`Searching for: ${clubName}, Found: `, club);
        return club ? club.shortName : "N/A";  // Retourne "N/A" si le club n'est pas trouvé
    }

    // Fonction pour récupérer les données du joueur à partir de l'API
    async function fetchData() {
        if (player && player.id) {
            const data = await getPlayerData(player.id, new Date().getFullYear());

            // Vérification des données retournées par l'API
            if (!data) {
                console.error(`No data returned for player ID: ${player.id}`);
                return; 
            }

            // Attribution des informations de joueur, d'équipe et de jeu
            playerInfo = data.player;

            if (data.team) {
                teamInfo = data.team;
                clubShortName = getClubAbbreviation(teamInfo.name);
            } else {
                teamInfo = { name: 'N/A', logo: '' };
                clubShortName = 'N/A';
            }

            if (data.games) {
                gameInfo = data.games;
                gameInfo.position = traductionPosition(gameInfo.position);
            } else {
                gameInfo = { position: 'N/A' };
            }

            // Ajout du code ISO du pays du joueur pour l'affichage du drapeau
            playerInfo.isoCode = getCode(playerInfo.nationality);
        }
    }

    // Appel de la fonction fetchData() au montage du composant
    onMount(() => {
        fetchData();
    });
</script>

<!-- Condition pour afficher la carte du joueur si les informations de l'équipe sont disponibles -->
{#if teamInfo && teamInfo.logo}
<div class="background-carte" class:bg-c-compo-mobile={fullWidth} data-team={teamInfo.name}>
    <div class="carte-joueur">
        <img src={playerInfo.photo} alt={`Photo de ${playerInfo.name}`} class="photo-joueur"/>
        <h3 class="nom-joueur">{playerInfo.name}</h3>
        <div class="footer-carte">
            <div class="info-joueur">
                <p class="position-joueur">{gameInfo.position}</p>
                <p class="age-joueur">{playerInfo.age} ans</p>
                <p class="nom-club">{clubShortName}</p>
            </div>
            <div class="info-club">
                <img src={teamInfo.logo} alt={`Logo de ${playerInfo.club}`} class="logo-equipe"/>
                {#if playerInfo.isoCode}
                <img src={`https://flagsapi.com/${playerInfo.isoCode}/flat/64.png`} alt={`Drapeau du ${playerInfo.pays}`} class="drapeau-pays"/>
                {/if}
            </div>
        </div>
    </div>
</div>
{:else}
<p>Loading player information...</p>
{/if}

<style>
    .background-carte{
        display: flex;
        flex-direction: column;
        width: calc((100% / 2) - 2vw);
        background-image: url(../../static/img/background-carte.jpg);
        /* background-image: linear-gradient(135deg, #046d3f 0%, #fdfffe 20%, #fdfffe 60%, #046d3f 100%); */
        /* background-color: transparent;
        backdrop-filter: blur(20px);
        background-image: linear-gradient(120deg, rgba(10, 10, 10, 0.7), rgba(255, 255, 255, 0.3));
        background-size: 30px 30px; */
        background-size: cover; 
        background-position: center;
        border-radius: 10px; 
    }

    .carte-joueur {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 2px solid var(--black);
        backdrop-filter: blur(20px);
        border-radius: 10px; 
    }

    .bg-c-compo-mobile{
        width: calc((100% / 1) - 2vw);
    }

    .full-width{
        width: 100%;
    }

    .min-height{
        height: 10%;
    }

    
    .photo-joueur{
        width: 85%;
        height: auto;
        margin-block: 12px;
        border-radius: 10px;
    }

    .nom-joueur{
        font-family: "Raleway", sans-serif;
        font-weight: 800;
        font-size: 18px;
        text-transform: uppercase;
        margin: 0 auto 2vh auto;
    }

    .footer-carte{
        width: 100%;
        padding: 5px 2vw;
        display: flex;
        justify-content: space-between;
        z-index: 1;
    }

    .info-joueur{
        width: 40%;
        text-align: left;
    }

    .info-club{
        width: 20%;
    }

    .position-joueur{
        margin: 0;
        font-weight: 600;
    }

    .age-joueur{
        margin: 0;
        font-weight: 600;
    }

    .drapeau-pays{
        width: 30px;
        margin: 0;
    }

    .logo-equipe{
        width: 30px;
        height: auto;
        margin: 0;
    }

    .nom-club{
        margin: 0;
        font-weight: 600;
    }

    @media (min-width: 768px) {
        .background-carte{
            width: calc((100% / 3.6) - 4vw);
            border-radius: 15px; 
    }

        .carte-joueur {
            border: 3px solid var(--black);
            background-color: rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(20px);
            border-radius: 15px; 
        }

        .bg-c-compo-mobile{
            width: 16vw;
            margin: auto;
        }

        .full-width {
            width: 16vw;
        }

        .photo-joueur{
            width: 85%;
            border-radius: 15px;
            margin-block: 15px;
        }

        .nom-joueur{
            font-size: 24px;
        }

        .footer-carte{
            padding: 5px 1vw;
        }

        .position-joueur{
            font-size: 18px
        }

        .age-joueur{
            font-size: 18px
        }

        .drapeau-pays{
            width: 40px;
        }

        .logo-equipe{
            width: 40px;
        }

        .nom-club{
            font-size: 18px
        }
    }

    @media (min-width: 1200px) {
        .background-carte{
            width: calc((100% / 5) - 4vw);
            border-radius: 15px; 
        }

        .bg-c-compo-mobile{
            width: 16vw;
            margin: auto;
        }

        .full-width {
            width: 16vw;
        }
    }

</style>