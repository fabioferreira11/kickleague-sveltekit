<script>
    // Propriété exportée pour contrôler l'affichage du modal
    export let showModal = false;

    // Fonction pour fermer le modal en modifiant la valeur de showModal
    export function close() {
        showModal = false;
    }
</script>

{#if showModal}
<button class="modal-background" on:click={close}>
    <button class="modal-rank-info" on:click|stopPropagation>
        <p>Vous êtes ici dans la mine d'informations sur les ranks ! Découvrez précisément combien de points sont requis pour passer au niveau supérieur et planifiez votre montée vers la gloire.</p>
        <img class="illu-rank" src="../static/img/illu-modalrank.png" alt="">
    </button>
</button>
{/if}

<style>
    .modal-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
    }

    .modal-rank-info {
        padding: 3vh 3vw;
        border-radius: 10px;
        max-width: 90vw;
        background-color: var(--white);
    }

    .modal-rank-info p {
        padding: 0 2vw;
        margin: 0 0 2vh 0;
        width: 100%; 
        font-weight: 300;
    }

    .illu-rank{
        width: 75vw;
    }
    @media (min-width: 768px) {
    .modal-rank-info {
        max-width: 50%;
    }

    .modal-rank-info p {
        font-size: var(--soustitre2);
    }

    .illu-rank{
        width: 75%;
    }
    }
</style>
