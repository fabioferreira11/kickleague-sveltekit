<script>
    // Propriété exportée pour contrôler l'affichage du modal
    export let showModal = false;

    // Fonction pour fermer le modal en mettant à jour la valeur de showModal
    export function close() {
        showModal = false;
    }
</script>

{#if showModal}
<button class="modal-background" on:click={close}>
    <button class="modal-rank-info" on:click|stopPropagation>
        <p>Vous êtes ici dans la mine d'informations sur les points des joueurs ! Découvrez précisément combien de points sont attribués au joueur en fonction des actions qu’ils réalisent pendant le match.</p>
         <h2> points positifs :</h2>
         <section class="points-positif">
            <div class="collone-1-positif">
                <div class="maniere">
                    <img src="../static/img/buts.png" alt="">
                    <h3>buts : 30 points</h3>
                </div>
                <div class="maniere">
                    <img src="../static/img/passed.png" alt="">
                    <h3>passe désicive : 20 points</h3>
                </div>
                <div class="maniere">
                    <img src="../static/img/tir-cadre.png" alt="">
                    <h3>tirs cadrés : 3 points</h3>
                </div>
                <div class="maniere">
                    <img src="../static/img/tir.png" alt="">
                    <h3>tir : 1 points</h3>
                </div>
                <div class="maniere">
                    <img src="../static/img/arbitre.png" alt="">
                    <h3>faute : 2 points</h3>
                </div>
            </div>
            <div class="collone-2-positif">
                <div class="maniere">
                    <img src="../static/img/interception.png" alt="">
                    <h3>interception : 2 points</h3>
                </div>
                <div class="maniere">
                    <img src="../static/img/tacle.png" alt="">
                    <h3>tacle décisif : 10 points</h3>
                </div>
                <div class="maniere">
                    <img src="../static/img/penalty.png" alt="">
                    <h3>penalty obtenu : 10 points</h3>
                </div>
                <div class="maniere">
                    <img src="../static/img/arret-peno.png" alt="">
                    <h3>arreter un penalty : 30 points</h3>
                </div>
                <div class="maniere">
                    <img src="../static/img/clean-sheet.png" alt="">
                    <h3>clean sheet : 15 points</h3>
                </div>
            </div>
         </section>
         <h2 class="titre-negatif">points négatifs :</h2>
         <section class="points-negatif">
            <div class="collone-1-negatif">
                <div class="maniere">
                    <img src="../static/img/arbitre.png" alt="">
                    <h3>faute : 2 points</h3>
                </div>
                <div class="maniere">
                    <img src="../static/img/carte-jaune.png" alt="">
                    <h3>carton jaune : 10 points</h3>
                </div>
                <div class="maniere">
                    <img src="../static/img/carte-jaune.png" alt="">
                    <h3>carton rouge : 25 points</h3>
                </div>
                <div class="maniere">
                    <img src="../static/img/penalty-commis.png" alt="">
                    <h3>penalty commis : 10 points</h3>
                </div>
            </div>
            <div class="collone-2-negatif">
                <div class="maniere">
                    <img src="../static/img/penalty-rate.png" alt="">
                    <h3>penalty raté : 15 points</h3>
                </div>
                <div class="maniere">
                    <img src="../static/img/goal-concede.png" alt="">
                    <h3>goal concédé : 8 points</h3>
                </div>
                <div class="maniere">
                    <img src="../static/img/faute-grave.png" alt="">
                    <h3>Erreur importante : 15 points</h3>
                </div>
            </div>
         </section>
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
        max-width: 90vw;
        height: 80vh;
        padding: 3vh 3vw;
        border-radius: 10px;
        background-color: var(--white);
        overflow: scroll;
    }

    .modal-rank-info p {
        padding: 0 2vw;
        margin: 0 0 2vh 0;
        width: 100%; 
        font-weight: 300;
    }

    .modal-rank-info h2{
        margin: 3vh 0 2vh 0;
        text-align: center;
    }

    .titre-negatif{
        background: linear-gradient(-180deg,rgb(228, 31, 26) 0%, rgb(102, 15, 13) 100%);
		background-clip: text;
    }

    .points-positif{
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .maniere img{
        width: 9vw;
        height: 4vh;
        margin-right: 3vw;
    }

    .collone-1-positif,.collone-2-positif,.collone-1-negatif,.collone-2-negatif{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .maniere{
        display: flex;
        align-items: center;
        height: 5vh;
    }

    .maniere h3{
        font-family: "freiburgin_line_personal_use", sans-serif;	
		font-weight: 400;
        font-size: 24px;
    }
    @media (min-width: 768px) {
    .modal-rank-info {
        max-width: 65vw;
        height: 97vh;
        overflow: hidden;
    }

    .modal-rank-info p {
        font-size: var(--soustitre2);
    }

    .modal-rank-info h2{
        margin: 2vh 0 2vh 3vw;
        text-align: left;
    }

    .points-positif,.points-negatif{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .collone-1-positif,.collone-2-positif,.collone-1-negatif,.collone-2-negatif{
        align-items: flex-start;
    }

    .collone-1-positif,.collone-1-negatif{
        margin-right: 5vw;
    }

    .maniere{
        height: 7vh;
    }

    .maniere img{
        height: 6vh;
        width: 3vw;
        margin-right: 1vw;
    }

    .maniere h3{
        font-size: 35px;
        text-align: left;
    }
    }
</style>
