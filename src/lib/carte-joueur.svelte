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
    function abbreviatePosition(position) {
        const abbreviations = {
            'Attacker': 'ATT',
            'Midfielder': 'MIL',
            'Defender': 'DEF',
            'Goalkeeper': 'GR'
        };
        return abbreviations[position] || position;
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
                gameInfo.position = abbreviatePosition(gameInfo.position);
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
<div class="carte-joueur" class:full-width={fullWidth} data-team={teamInfo.name}>
        <div class="header-carte">
            <div class="info-joueur">
                <p class="age-joueur">{playerInfo.age}</p>
                <p class="position-joueur">{gameInfo.position}</p>
                {#if playerInfo.isoCode}
                <img src={`https://flagsapi.com/${playerInfo.isoCode}/flat/64.png`} alt={`Drapeau du ${playerInfo.pays}`} class="drapeau-pays"/>
                {/if}
            </div>
            <div class="info-club">
                <p class="nom-club">{clubShortName}</p>
                <img src={teamInfo.logo} alt={`Logo de ${playerInfo.club}`} class="logo-equipe"/>
            </div>
        </div>
        <img src={playerInfo.photo} alt={`Photo de ${playerInfo.name}`} class="photo-joueur"/>
        <div class="barre">
            <div class="barre1"></div>
            <div class="barre2"></div>
            <div class="barre3"></div>
        </div>
        <div class="footer-carte">
            <p class="carte-rarete">standard</p>
            <h3 class="nom-joueur">{playerInfo.name}</h3>
        </div>
</div>
{:else}
<p>Loading player information...</p>
{/if}

<style>
    .carte-joueur {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: calc((100% / 2) - 2vw);
        border: 2px solid var(--black);
        background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 77%, var(--gris) 77%, var(--gris) 100%);
        border-radius: 10px; 
    }

    .full-width{
        width: 100%;
    }

    .min-height{
        height: 10%;
    }

    .header-carte{
        width: 100%;
        padding: 5px 2vw;
        display: flex;
        justify-content: space-between;
        z-index: 1;
    }

    .info-joueur{
        width: 20%;
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

    .photo-joueur{
        width: 80%;
        height: auto;
        margin-top: -30px;
    }

    .barre{
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .barre div{
        margin-top: 0;
        height: 2px;
        width: 100%;
        background-color: var(--black);
        margin-bottom: 2px;
    }

    .footer-carte{
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .carte-rarete{
        margin: auto;
    }

    .nom-joueur{
        font-family: "Raleway", sans-serif;
        font-weight: 800;
        font-size: 16px;
        text-transform: uppercase;
        margin: 0 auto 2vh auto;
    }

    @media (min-width: 768px) {
        .carte-joueur {
            width: calc((100% / 5) - 4vw);
            border: 3px solid var(--black);
            background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 79%, var(--gris) 79%, var(--gris) 100%);
            border-radius: 15px; 
        }

        .full-width {
            width: 16vw;
        }

        .header-carte{
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
        
        .photo-joueur{
            width: 100%;
        }

        .nom-joueur{
            font-size: 24px;
            margin-top: 1vh;
        }
    }
</style>