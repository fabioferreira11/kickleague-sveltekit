import { c as create_ssr_component, b as each, e as escape, d as add_attribute } from "../../../chunks/ssr.js";
/* empty css                     */
const css = {
  code: '.choixclub-text.svelte-15eizjc.svelte-15eizjc{text-align:center;padding:0 5vw}h2.svelte-15eizjc.svelte-15eizjc{margin-top:10vh;margin-bottom:2vh}.choixclub-text.svelte-15eizjc p.svelte-15eizjc{margin-top:0%;width:100%}.choixclub.svelte-15eizjc.svelte-15eizjc{width:100%;display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:10px;margin:5vh 0 2vh 0}.bg-pays-club.svelte-15eizjc.svelte-15eizjc{width:calc(85% / 3);height:18vh;background-color:var(--gris);padding:10px;border:5px solid var(--gris);border-radius:15px;transition:background-color 0.5s ease, border-color 0.5s ease;display:flex;flex-direction:column;justify-content:flex-start;align-items:center}.bg-pays-club.svelte-15eizjc img.svelte-15eizjc{width:auto;height:70%}.bg-pays-club.svelte-15eizjc p.svelte-15eizjc{font-weight:600;font-family:"Manrope", sans-serif}.bg-pays-club.active.svelte-15eizjc.svelte-15eizjc{background-color:var(--green);border:5px solid var(--green)}.bg-pays-club.active.svelte-15eizjc p.svelte-15eizjc{color:var(--white)}.button.svelte-15eizjc.svelte-15eizjc{width:100%;padding:0 10vw 2vh 10vw;display:flex;justify-content:center}.submit-button.svelte-15eizjc.svelte-15eizjc{display:inline-block;padding:10px 20px;color:var(--white) ;background-color:var(--green);border:solid 2px var(--green);text-decoration:none;border-radius:20px;text-align:center;transition:background-color 0.3s;font-size:var(--textmobil)}@media(min-width: 768px){.choixclub-text.svelte-15eizjc.svelte-15eizjc{text-align:left;padding:3vh 0 3vh 3vw}.choixclub-text.svelte-15eizjc p.svelte-15eizjc{width:40%}.choixclub.svelte-15eizjc.svelte-15eizjc{gap:25px}.bg-pays-club.svelte-15eizjc.svelte-15eizjc{width:calc(100% / 7);height:35vh;border:20px solid var(--gris);border-radius:15px;display:flex;justify-content:center}.bg-pays-club.svelte-15eizjc img.svelte-15eizjc{width:auto;height:70%}.bg-pays-club.svelte-15eizjc.svelte-15eizjc:hover{background-color:var(--green);border:20px solid var(--green)}.bg-pays-club.active.svelte-15eizjc.svelte-15eizjc{border:20px solid var(--green)}.button.svelte-15eizjc.svelte-15eizjc{justify-content:flex-end;padding-right:3vw}.submit-button.svelte-15eizjc.svelte-15eizjc{font-size:var(--text)}}',
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\r\\n    import '../../styles/global.css';  // Importation des styles globaux\\r\\n\\r\\n    let activeClub = 'slb'; // Définir 'slb' (Benfica) comme le club par défaut actif\\r\\n\\r\\n    // Fonction pour définir le club actif sélectionné par l'utilisateur\\r\\n    function setActive(club) {\\r\\n        activeClub = club;\\r\\n    }\\r\\n\\r\\n    // Fonction pour envoyer une requête POST pour mettre à jour le club de l'utilisateur\\r\\n    async function submitClub() {\\r\\n        console.log('Sending POST request with club:', activeClub);  \\r\\n        const response = await fetch('/api/updateclub', {\\r\\n            method: 'POST',\\r\\n            headers: {\\r\\n                'Content-Type': 'application/json'\\r\\n            },\\r\\n            body: JSON.stringify({ club: activeClub })  \\r\\n        });\\r\\n\\r\\n        // Vérification de la réponse de la requête\\r\\n        if (response.ok) {\\r\\n            console.log('Club update successful, navigating to /pack');  \\r\\n            window.location.href = '/club';  \\r\\n        } else {\\r\\n            const error = await response.text();\\r\\n            console.error('Failed to update club:', error);  \\r\\n        }\\r\\n    }\\r\\n\\r\\n    // Définir la liste des clubs disponibles avec leurs ID, noms et images correspondantes\\r\\n    const clubs = [\\r\\n        { id: 'slb', name: 'Benfica', imgSrc: 'slblogo.png' },\\r\\n        { id: 'scp', name: 'Sporting', imgSrc: 'scplogo.png' },\\r\\n        { id: 'fcp', name: 'Porto', imgSrc: 'fcplogo.png' },\\r\\n        { id: 'scb', name: 'Braga', imgSrc: 'bragalogo.png' },\\r\\n        { id: 'fca', name: 'Arouca', imgSrc: 'aroucalogo.png' },\\r\\n        { id: 'bfc', name: 'Boavista', imgSrc: 'boavistalogo.png' },\\r\\n        { id: 'epf', name: 'Estoril', imgSrc: 'estorillogo.png' },\\r\\n        { id: 'cpac', name: 'Casa pia', imgSrc: 'casapialogo.png' },\\r\\n        { id: 'gdc', name: 'Chaves', imgSrc: 'chaveslogo.png' },\\r\\n        { id: 'scf', name: 'Farense', imgSrc: 'farenselogo.png' },\\r\\n        { id: 'cfea', name: 'Estrela', imgSrc: 'estrelalogo.png' },\\r\\n        { id: 'fcf', name: 'Famalicão', imgSrc: 'famalicaologo.png' },\\r\\n        { id: 'mfc', name: 'Moreirense', imgSrc: 'moreirenselogo.png' },\\r\\n        { id: 'psc', name: 'Portimonense', imgSrc: 'portimonenselogo.png' },\\r\\n        { id: 'gvfc', name: 'Gil Vicente', imgSrc: 'gilvicentelogo.png' },\\r\\n        { id: 'rafc', name: 'Rio Ave', imgSrc: 'rioavelogo.png' },\\r\\n        { id: 'vsc', name: 'Vitoria de Guimaraes', imgSrc: 'vitorialogo.png' },\\r\\n        { id: 'fcv', name: 'Vizela', imgSrc: 'vizelalogo.png' }\\r\\n    ];\\r\\n<\/script>\\r\\n\\r\\n\\r\\n<a href=\\"/\\"><img src=\\"/img/kl-logo.png\\" alt=\\"Logo Kick League\\" class=\\"logo\\"></a>\\r\\n\\r\\n<section class=\\"choixclub-text\\">\\r\\n    <h2>Choix du club</h2>\\r\\n    <p>Le club que tu choisis aura une importance pour le premier pack que tu ouvriras sur ton compte. Ce pack contiendra une star de ce club.</p>\\r\\n</section>\\r\\n\\r\\n<div class=\\"choixclub\\">\\r\\n    {#each clubs as club}\\r\\n        <button class=\\"bg-pays-club {club.id}\\" on:click={() => setActive(club.id)} class:active={activeClub === club.id}>\\r\\n            <img src={\`/img/\${club.imgSrc}\`} alt={club.name}>\\r\\n            <p>{club.name}</p>\\r\\n        </button>\\r\\n    {/each}\\r\\n</div>\\r\\n\\r\\n<div class=\\"button\\">\\r\\n    <button type=\\"button\\" class=\\"submit-button\\" on:click={submitClub}>Créer votre compte</button>\\r\\n</div>\\r\\n\\r\\n\\r\\n<style>\\r\\n    .choixclub-text{\\r\\n        text-align: center;\\r\\n        padding: 0 5vw;\\r\\n    }\\r\\n\\r\\n    h2{\\r\\n        margin-top: 10vh;\\r\\n        margin-bottom: 2vh;\\r\\n    }\\r\\n\\r\\n    .choixclub-text p{\\r\\n        margin-top: 0%;\\r\\n        width: 100%;\\r\\n    }\\r\\n\\r\\n    .choixclub{\\r\\n        width: 100%;\\r\\n        display: flex;\\r\\n        justify-content: center;\\r\\n        align-items: center;\\r\\n        flex-wrap: wrap;\\r\\n        gap: 10px;\\r\\n        margin: 5vh 0 2vh 0;\\r\\n    }\\r\\n\\r\\n    .bg-pays-club{\\r\\n        width: calc(85% / 3);\\r\\n        height: 18vh;\\r\\n        background-color: var(--gris);\\r\\n        padding: 10px;\\r\\n        border: 5px solid var(--gris);\\r\\n        border-radius: 15px;\\r\\n        transition: background-color 0.5s ease, border-color 0.5s ease;\\r\\n        display: flex;\\r\\n        flex-direction: column;\\r\\n        justify-content: flex-start;\\r\\n        align-items: center;\\r\\n    }\\r\\n\\r\\n    .bg-pays-club img {\\r\\n        width: auto; \\r\\n        height: 70%;\\r\\n    }\\r\\n\\r\\n    .bg-pays-club p{\\r\\n        font-weight: 600;\\r\\n        font-family: \\"Manrope\\", sans-serif;\\r\\n    }\\r\\n\\r\\n    .bg-pays-club.active {\\r\\n        background-color: var(--green);\\r\\n        border: 5px solid var(--green);\\r\\n    }\\r\\n\\r\\n    .bg-pays-club.active p{\\r\\n        color: var(--white);\\r\\n    }\\r\\n\\r\\n    .button{\\r\\n        width: 100%;\\r\\n        padding: 0 10vw 2vh 10vw;\\r\\n        display: flex;\\r\\n        justify-content: center;\\r\\n    }\\r\\n\\r\\n    .submit-button {\\r\\n      display: inline-block;\\r\\n      padding: 10px 20px;\\r\\n      color:var(--white) ;\\r\\n      background-color: var(--green);\\r\\n      border: solid 2px var(--green);\\r\\n      text-decoration: none;\\r\\n      border-radius: 20px;\\r\\n      text-align: center;\\r\\n      transition: background-color 0.3s;\\r\\n      font-size: var(--textmobil);\\r\\n    }\\r\\n    @media (min-width: 768px) {\\r\\n    .choixclub-text{\\r\\n        text-align: left;\\r\\n        padding: 3vh 0 3vh 3vw;\\r\\n    }\\r\\n\\r\\n    .choixclub-text p{\\r\\n        /* margin: 0 auto; */\\r\\n        width: 40%;\\r\\n    }\\r\\n\\r\\n    .choixclub{\\r\\n        gap: 25px;\\r\\n    }\\r\\n\\r\\n    .bg-pays-club{\\r\\n        width: calc(100% / 7);\\r\\n        height: 35vh;\\r\\n        border: 20px solid var(--gris);\\r\\n        border-radius: 15px;\\r\\n        display: flex;\\r\\n        justify-content: center;\\r\\n    }\\r\\n\\r\\n    .bg-pays-club img {\\r\\n        width: auto; \\r\\n        height: 70%;\\r\\n    }\\r\\n\\r\\n    .bg-pays-club:hover{\\r\\n        background-color: var(--green);\\r\\n        border: 20px solid var(--green);\\r\\n    }\\r\\n\\r\\n    .bg-pays-club.active {\\r\\n        border: 20px solid var(--green);\\r\\n    }\\r\\n\\r\\n    .button{\\r\\n        justify-content: flex-end;\\r\\n        padding-right: 3vw;\\r\\n    }\\r\\n\\r\\n    .submit-button{\\r\\n        font-size: var(--text);\\r\\n    }\\r\\n    }\\r\\n  </style>"],"names":[],"mappings":"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"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let activeClub = "slb";
  const clubs = [
    {
      id: "slb",
      name: "Benfica",
      imgSrc: "slblogo.png"
    },
    {
      id: "scp",
      name: "Sporting",
      imgSrc: "scplogo.png"
    },
    {
      id: "fcp",
      name: "Porto",
      imgSrc: "fcplogo.png"
    },
    {
      id: "scb",
      name: "Braga",
      imgSrc: "bragalogo.png"
    },
    {
      id: "fca",
      name: "Arouca",
      imgSrc: "aroucalogo.png"
    },
    {
      id: "bfc",
      name: "Boavista",
      imgSrc: "boavistalogo.png"
    },
    {
      id: "epf",
      name: "Estoril",
      imgSrc: "estorillogo.png"
    },
    {
      id: "cpac",
      name: "Casa pia",
      imgSrc: "casapialogo.png"
    },
    {
      id: "gdc",
      name: "Chaves",
      imgSrc: "chaveslogo.png"
    },
    {
      id: "scf",
      name: "Farense",
      imgSrc: "farenselogo.png"
    },
    {
      id: "cfea",
      name: "Estrela",
      imgSrc: "estrelalogo.png"
    },
    {
      id: "fcf",
      name: "Famalicão",
      imgSrc: "famalicaologo.png"
    },
    {
      id: "mfc",
      name: "Moreirense",
      imgSrc: "moreirenselogo.png"
    },
    {
      id: "psc",
      name: "Portimonense",
      imgSrc: "portimonenselogo.png"
    },
    {
      id: "gvfc",
      name: "Gil Vicente",
      imgSrc: "gilvicentelogo.png"
    },
    {
      id: "rafc",
      name: "Rio Ave",
      imgSrc: "rioavelogo.png"
    },
    {
      id: "vsc",
      name: "Vitoria de Guimaraes",
      imgSrc: "vitorialogo.png"
    },
    {
      id: "fcv",
      name: "Vizela",
      imgSrc: "vizelalogo.png"
    }
  ];
  $$result.css.add(css);
  return `<a href="/" data-svelte-h="svelte-lqk2ui"><img src="/img/kl-logo.png" alt="Logo Kick League" class="logo"></a> <section class="choixclub-text svelte-15eizjc" data-svelte-h="svelte-10rg7gx"><h2 class="svelte-15eizjc">Choix du club</h2> <p class="svelte-15eizjc">Le club que tu choisis aura une importance pour le premier pack que tu ouvriras sur ton compte. Ce pack contiendra une star de ce club.</p></section> <div class="choixclub svelte-15eizjc">${each(clubs, (club) => {
    return `<button class="${[
      "bg-pays-club " + escape(club.id, true) + " svelte-15eizjc",
      activeClub === club.id ? "active" : ""
    ].join(" ").trim()}"><img${add_attribute("src", `/img/${club.imgSrc}`, 0)}${add_attribute("alt", club.name, 0)} class="svelte-15eizjc"> <p class="svelte-15eizjc">${escape(club.name)}</p> </button>`;
  })}</div> <div class="button svelte-15eizjc"><button type="button" class="submit-button svelte-15eizjc" data-svelte-h="svelte-1hfrvs">Créer votre compte</button> </div>`;
});
export {
  Page as default
};
