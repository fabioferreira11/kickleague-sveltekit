<script>
    import { points, rank } from '$lib/rankStore.js';  // Importation des stores pour les points et le rang
    import RankInfoModal from '$lib/RankInfoModal.svelte';  // Importation du composant modal d'information sur les rangs

    let showModal = false;  // État pour contrôler l'affichage du modal

    // Calcul de l'image du rang en fonction de la valeur actuelle du rang
    $: rankImage = getRankImage($rank);

    // Calcul du pourcentage pour la barre de progression
    $: percentage = $points % 100;

    // Fonction pour ouvrir le modal d'information
    function openModal() {
        showModal = true;
    }

    // Fonction pour obtenir l'image du rang correspondant au rang actuel
    function getRankImage(rank) {
        switch(rank) {
            case 'Réserve': return '/img/reserve.png';
            case 'Remplaçant': return '/img/remplacant.png';
            case 'Titulaire': return '/img/titulaire.png';
            case 'Pro': return '/img/pro.png';
            case 'Star': return '/img/star.png';
            case 'Prime': return '/img/prime.png';
            case 'G.O.A.T': return '/img/goat.png';
            default: return '/img/reserve.png'; // Image par défaut si le rang est inconnu
        }
    }
</script>

<section class="rank">
    <section class="rank-text">
        <h2>Rank</h2>
        <p>Sur votre page Rank, voyez où vous en êtes et combien vous êtes proche du prochain niveau grâce à la barre de progression sous votre rank actuel. Cliquez sur l'icône d'information pour en savoir plus sur les ranks et comment gravir les échelons vers la gloire !</p>
    </section>

    <section class="rank-evo">
        <h2>{$rank}</h2>
        <img src={rankImage} alt={`Image de ${$rank}`}>
        <div>
            <div class="barreevobg">
                <div class="barreevo" style="width: {percentage}%;"></div>
            </div>
        </div>
        <h2>{$points} pt</h2>
    </section>

    <div class="rank-info">
        <h3 on:click={openModal}>i</h3>
    </div>
    <RankInfoModal bind:showModal={showModal} />
</section>

<style>
    .rank-text{
        width: 100%; 
        padding: 0 5vw;
    }

    .rank-text h2,.rank-text p {
        text-align: center;
        margin: 2vh auto;
    }

    .rank-text p{
        color: var(--white);
    }

    .rank-evo{
        width: 90vw;
        height: 60vh;
        margin: auto;
        background: linear-gradient(-180deg,rgba(97, 197, 62, 1) 0%, rgba(25, 127, 60, 1) 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 3vh;
        border-radius: 20px;
    }

    .rank-evo h2{
        margin-top: 3vh;
        font-size: var(--titre);
        color: var(--white);
    }

    .rank-evo img{
        width: 80%;
    }

    .barreevobg{
        width: 80vw;
        height: 2vh;
        background-color: var(--white);
        border-radius: 20px;
        margin-top: 10%;
    }

    .barreevo{
        height: 2vh;
        background-color: var(--green);
        border-radius: 20px;
    }

    .rank-info{
        position: absolute;
        top: 9vh;
        left: 85vw;
        z-index: 1;
    }

    .rank-info h3{
        height: 35px;
        width: 35px;
        background-color: var(--gris);
        color: var(--green);
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 12%;
        cursor: pointer;
        font-family: "freiburgin_line_personal_use", sans-serif;
        font-size: var(--titremobil);
        font-weight: 300;
    }

    @media (min-width: 768px) {
    .rank{
        display: flex;
        width: 100vw;
        padding: 0 3vw;
    }

    .rank-text{
         width: 30%;
         padding: 0;
    }

    .rank-text h2,.rank-text p {
        text-align: left;
        margin: 0;
        padding-right: 3vw;
    }

    .rank-text h2{
        padding: 5vh 0 2vh 0;
    }

    .rank-evo{
        width: 30%;
        height: 65vh;
        margin: 5vh auto 0 5vw;
    }

    .rank-evo img{
        width: 60%;
    }

    .barreevobg{
        width: 20vw;
    }

    .rank-info{
        top: 16.6vh;
        left: 94.2vw;
    }

    .rank-info h3{
        height: 45px;
        width: 45px;
    }
    }
</style>