<script>
    export let rank = "standard"; // Rank par défaut du bouton
    export let numero = "20"; // numero par défaut
</script>
  
    <section class="tournoi">
        <div class="type-tournoi">
            <div class="type-tournoi-info">
                <p><b>Match Week {numero}</b></p>
                <p><b>Rank :</b>{rank}</p>
            </div>
            <a class="btn-tournoi" href="/compo">composer équipe</a>
        </div>
    </section>
    

    <style>
    .tournoi{
        width: 100%;
        margin: 0 5vw;
        display: flex ;
        justify-content: center;
        align-items: flex-start;
        
    }

    .type-tournoi{
        width: 90%;
        padding-right: 15px;
        margin-bottom: 20px;
        height: 68px;
        background-color: var(--black);
        border-radius: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .type-tournoi-info{
        width: 60%;
        display: flex;
        flex-direction: column;
        text-align: left;
        padding-left: 5vw;
    }

    .type-tournoi-info p{
        color: var(--white);
        margin-block: 2px;
    }

    .type-tournoi-info :first-child{
        margin-right: 5%;
    }

    .btn-tournoi{
      padding: 0 2vw;
      color:var(--white) ;
      background-color: var(--green);
      border: solid 2px var(--green);
      text-decoration: none;
      border-radius: 20px;
      transition: background-color 0.3s;
    }
    @media (min-width: 768px) {
    .tournoi{
        width: 96%;
        margin: 15px auto 0 3%;  
    }

    .type-tournoi{
        width: 100%;
        height: 10vh;
        margin:0 auto 0 auto;
        padding-right: 0px;
        display: flex;
        justify-content: space-evenly;
    }

    .type-tournoi-info{
        width: 50% ;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding-left: 0;
    }

    .type-tournoi-info :first-child{
        margin-right: 1%;
    }

    .btn-tournoi{
        padding: 1vh 1vw;
        font-size: var(--text);
    }

    .btn-tournoi:hover{
        color:var(--green) ;
        background-color: var(--white);
        border: solid 2px var(--green);
    }
    }
    </style>