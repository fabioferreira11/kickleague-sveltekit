<script>
    export let text = "continuer"; // Texte par défaut du bouton
    export let url = "/club"; // URL par défaut
    export let buttonStyle = "default"; // default, alternative, etc.
</script>

<a href={url} class="button {buttonStyle}">
  {text}
</a>
  
  <style>
    .button {
      display: inline-block;
      padding: 10px 20px;
      color:var(--white) ;
      background-color: var(--green);
      border: solid 2px var(--green);
      text-decoration: none;
      border-radius: 20px;
      text-align: center;
      transition: background-color 0.3s;
      font-size: var(--textmobil);
    }

    .button.alternative {
      background-color: var(--white);
      color: var(--green);
      border: solid 2px var(--green);
    }
    @media (min-width: 768px) {
    .button {
      font-size: var(--text);
    }

    .button.default:hover {
      background-color: var(--white);
      color: var(--green);
      border: solid 2px var(--green);
    }

    .button.alternative:hover {
      background-color: var(--green);
      color: var(--white);
      border: solid 2px var(--green);
    }
    }
  </style>
  