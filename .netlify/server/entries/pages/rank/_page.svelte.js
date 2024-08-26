import { c as create_ssr_component, a as subscribe, e as escape, d as add_attribute, v as validate_component, o as onDestroy } from "../../../chunks/ssr.js";
/* empty css                     */
import { H as Header, M as MenuBurger } from "../../../chunks/MenuBurger.js";
import { p as points, r as rank } from "../../../chunks/rankStore.js";
const css$2 = {
  code: ".modal-background.svelte-kanqc5.svelte-kanqc5{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:rgba(0, 0, 0, 0.6);display:flex;align-items:center;justify-content:center;z-index:2}.modal-rank-info.svelte-kanqc5.svelte-kanqc5{padding:3vh 3vw;border-radius:10px;max-width:90vw;background-color:var(--white)}.modal-rank-info.svelte-kanqc5 p.svelte-kanqc5{padding:0 2vw;margin:0 0 2vh 0;width:100%;font-weight:300}.illu-rank.svelte-kanqc5.svelte-kanqc5{width:75vw}@media(min-width: 768px){.modal-rank-info.svelte-kanqc5.svelte-kanqc5{max-width:50%}.modal-rank-info.svelte-kanqc5 p.svelte-kanqc5{font-size:var(--soustitre2)}.illu-rank.svelte-kanqc5.svelte-kanqc5{width:75%}}",
  map: `{"version":3,"file":"RankInfoModal.svelte","sources":["RankInfoModal.svelte"],"sourcesContent":["<script>\\r\\n    // Propriété exportée pour contrôler l'affichage du modal\\r\\n    export let showModal = false;\\r\\n\\r\\n    // Fonction pour fermer le modal en modifiant la valeur de showModal\\r\\n    export function close() {\\r\\n        showModal = false;\\r\\n    }\\r\\n<\/script>\\r\\n\\r\\n{#if showModal}\\r\\n<button class=\\"modal-background\\" on:click={close}>\\r\\n    <button class=\\"modal-rank-info\\" on:click|stopPropagation>\\r\\n        <p>Vous êtes ici dans la mine d'informations sur les ranks ! Découvrez précisément combien de points sont requis pour passer au niveau supérieur et planifiez votre montée vers la gloire.</p>\\r\\n        <img class=\\"illu-rank\\" src=\\"../static/img/illu-modalrank.png\\" alt=\\"\\">\\r\\n    </button>\\r\\n</button>\\r\\n{/if}\\r\\n\\r\\n<style>\\r\\n    .modal-background {\\r\\n        position: fixed;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n        width: 100vw;\\r\\n        height: 100vh;\\r\\n        background-color: rgba(0, 0, 0, 0.6);\\r\\n        display: flex;\\r\\n        align-items: center;\\r\\n        justify-content: center;\\r\\n        z-index: 2;\\r\\n    }\\r\\n\\r\\n    .modal-rank-info {\\r\\n        padding: 3vh 3vw;\\r\\n        border-radius: 10px;\\r\\n        max-width: 90vw;\\r\\n        background-color: var(--white);\\r\\n    }\\r\\n\\r\\n    .modal-rank-info p {\\r\\n        padding: 0 2vw;\\r\\n        margin: 0 0 2vh 0;\\r\\n        width: 100%; \\r\\n        font-weight: 300;\\r\\n    }\\r\\n\\r\\n    .illu-rank{\\r\\n        width: 75vw;\\r\\n    }\\r\\n    @media (min-width: 768px) {\\r\\n    .modal-rank-info {\\r\\n        max-width: 50%;\\r\\n    }\\r\\n\\r\\n    .modal-rank-info p {\\r\\n        font-size: var(--soustitre2);\\r\\n    }\\r\\n\\r\\n    .illu-rank{\\r\\n        width: 75%;\\r\\n    }\\r\\n    }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAoBI,6CAAkB,CACd,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,gBAAgB,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACpC,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,OAAO,CAAE,CACb,CAEA,4CAAiB,CACb,OAAO,CAAE,GAAG,CAAC,GAAG,CAChB,aAAa,CAAE,IAAI,CACnB,SAAS,CAAE,IAAI,CACf,gBAAgB,CAAE,IAAI,OAAO,CACjC,CAEA,8BAAgB,CAAC,eAAE,CACf,OAAO,CAAE,CAAC,CAAC,GAAG,CACd,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CACjB,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,GACjB,CAEA,sCAAU,CACN,KAAK,CAAE,IACX,CACA,MAAO,YAAY,KAAK,CAAE,CAC1B,4CAAiB,CACb,SAAS,CAAE,GACf,CAEA,8BAAgB,CAAC,eAAE,CACf,SAAS,CAAE,IAAI,YAAY,CAC/B,CAEA,sCAAU,CACN,KAAK,CAAE,GACX,CACA"}`
};
const RankInfoModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { showModal = false } = $$props;
  function close() {
    showModal = false;
  }
  if ($$props.showModal === void 0 && $$bindings.showModal && showModal !== void 0) $$bindings.showModal(showModal);
  if ($$props.close === void 0 && $$bindings.close && close !== void 0) $$bindings.close(close);
  $$result.css.add(css$2);
  return `${showModal ? `<button class="modal-background svelte-kanqc5"><button class="modal-rank-info svelte-kanqc5" data-svelte-h="svelte-1jd2t9f"><p class="svelte-kanqc5">Vous êtes ici dans la mine d&#39;informations sur les ranks ! Découvrez précisément combien de points sont requis pour passer au niveau supérieur et planifiez votre montée vers la gloire.</p> <img class="illu-rank svelte-kanqc5" src="../static/img/illu-modalrank.png" alt=""></button></button>` : ``}`;
});
const css$1 = {
  code: '.rank-text.svelte-2bwhy9.svelte-2bwhy9{width:100%;padding:0 5vw}.rank-text.svelte-2bwhy9 h2.svelte-2bwhy9,.rank-text.svelte-2bwhy9 p.svelte-2bwhy9{text-align:center;margin:2vh auto}.rank-text.svelte-2bwhy9 p.svelte-2bwhy9{color:var(--white)}.rank-evo.svelte-2bwhy9.svelte-2bwhy9{width:90vw;height:60vh;margin:auto;background:linear-gradient(-180deg,rgba(97, 197, 62, 1) 0%, rgba(25, 127, 60, 1) 100%);display:flex;flex-direction:column;justify-content:center;align-items:center;padding-top:3vh;border-radius:20px}.rank-evo.svelte-2bwhy9 h2.svelte-2bwhy9{margin-top:3vh;font-size:var(--titre);color:var(--white)}.rank-evo.svelte-2bwhy9 img.svelte-2bwhy9{width:80%}.barreevobg.svelte-2bwhy9.svelte-2bwhy9{width:80vw;height:2vh;background-color:var(--white);border-radius:20px;margin-top:10%}.barreevo.svelte-2bwhy9.svelte-2bwhy9{height:2vh;background-color:var(--green);border-radius:20px}.rank-info.svelte-2bwhy9.svelte-2bwhy9{position:absolute;top:9vh;left:85vw;z-index:1}.rank-info.svelte-2bwhy9 h3.svelte-2bwhy9{height:35px;width:35px;background-color:var(--gris);color:var(--green);border-radius:10px;display:flex;justify-content:center;align-items:center;margin-top:12%;cursor:pointer;font-family:"freiburgin_line_personal_use", sans-serif;font-size:var(--titremobil);font-weight:300}@media(min-width: 768px){.rank.svelte-2bwhy9.svelte-2bwhy9{display:flex;width:100vw;padding:0 3vw}.rank-text.svelte-2bwhy9.svelte-2bwhy9{width:30%;padding:0}.rank-text.svelte-2bwhy9 h2.svelte-2bwhy9,.rank-text.svelte-2bwhy9 p.svelte-2bwhy9{text-align:left;margin:0;padding-right:3vw}.rank-text.svelte-2bwhy9 h2.svelte-2bwhy9{padding:5vh 0 2vh 0}.rank-evo.svelte-2bwhy9.svelte-2bwhy9{width:30%;height:65vh;margin:5vh auto 0 5vw}.rank-evo.svelte-2bwhy9 img.svelte-2bwhy9{width:60%}.barreevobg.svelte-2bwhy9.svelte-2bwhy9{width:20vw}.rank-info.svelte-2bwhy9.svelte-2bwhy9{top:16.6vh;left:94.2vw}.rank-info.svelte-2bwhy9 h3.svelte-2bwhy9{height:45px;width:45px}}',
  map: `{"version":3,"file":"Rank.svelte","sources":["Rank.svelte"],"sourcesContent":["<script>\\r\\n    import { points, rank } from '$lib/rankStore.js';  // Importation des stores pour les points et le rang\\r\\n    import RankInfoModal from '$lib/RankInfoModal.svelte';  // Importation du composant modal d'information sur les rangs\\r\\n\\r\\n    let showModal = false;  // État pour contrôler l'affichage du modal\\r\\n\\r\\n    // Calcul de l'image du rang en fonction de la valeur actuelle du rang\\r\\n    $: rankImage = getRankImage($rank);\\r\\n\\r\\n    // Calcul du pourcentage pour la barre de progression\\r\\n    $: percentage = $points % 100;\\r\\n\\r\\n    // Fonction pour ouvrir le modal d'information\\r\\n    function openModal() {\\r\\n        showModal = true;\\r\\n    }\\r\\n\\r\\n    // Fonction pour obtenir l'image du rang correspondant au rang actuel\\r\\n    function getRankImage(rank) {\\r\\n        switch(rank) {\\r\\n            case 'Réserve': return '/img/reserve.png';\\r\\n            case 'Remplaçant': return '/img/remplacant.png';\\r\\n            case 'Titulaire': return '/img/titulaire.png';\\r\\n            case 'Pro': return '/img/pro.png';\\r\\n            case 'Star': return '/img/star.png';\\r\\n            case 'Prime': return '/img/prime.png';\\r\\n            case 'G.O.A.T': return '/img/goat.png';\\r\\n            default: return '/img/reserve.png'; // Image par défaut si le rang est inconnu\\r\\n        }\\r\\n    }\\r\\n<\/script>\\r\\n\\r\\n<section class=\\"rank\\">\\r\\n    <section class=\\"rank-text\\">\\r\\n        <h2>Rank</h2>\\r\\n        <p>Sur votre page Rank, voyez où vous en êtes et combien vous êtes proche du prochain niveau grâce à la barre de progression sous votre rank actuel. Cliquez sur l'icône d'information pour en savoir plus sur les ranks et comment gravir les échelons vers la gloire !</p>\\r\\n    </section>\\r\\n\\r\\n    <section class=\\"rank-evo\\">\\r\\n        <h2>{$rank}</h2>\\r\\n        <img src={rankImage} alt={\`Image de \${$rank}\`}>\\r\\n        <div>\\r\\n            <div class=\\"barreevobg\\">\\r\\n                <div class=\\"barreevo\\" style=\\"width: {percentage}%;\\"></div>\\r\\n            </div>\\r\\n        </div>\\r\\n        <h2>{$points} pt</h2>\\r\\n    </section>\\r\\n\\r\\n    <div class=\\"rank-info\\">\\r\\n        <h3 on:click={openModal}>i</h3>\\r\\n    </div>\\r\\n    <RankInfoModal bind:showModal={showModal} />\\r\\n</section>\\r\\n\\r\\n<style>\\r\\n    .rank-text{\\r\\n        width: 100%; \\r\\n        padding: 0 5vw;\\r\\n    }\\r\\n\\r\\n    .rank-text h2,.rank-text p {\\r\\n        text-align: center;\\r\\n        margin: 2vh auto;\\r\\n    }\\r\\n\\r\\n    .rank-text p{\\r\\n        color: var(--white);\\r\\n    }\\r\\n\\r\\n    .rank-evo{\\r\\n        width: 90vw;\\r\\n        height: 60vh;\\r\\n        margin: auto;\\r\\n        background: linear-gradient(-180deg,rgba(97, 197, 62, 1) 0%, rgba(25, 127, 60, 1) 100%);\\r\\n        display: flex;\\r\\n        flex-direction: column;\\r\\n        justify-content: center;\\r\\n        align-items: center;\\r\\n        padding-top: 3vh;\\r\\n        border-radius: 20px;\\r\\n    }\\r\\n\\r\\n    .rank-evo h2{\\r\\n        margin-top: 3vh;\\r\\n        font-size: var(--titre);\\r\\n        color: var(--white);\\r\\n    }\\r\\n\\r\\n    .rank-evo img{\\r\\n        width: 80%;\\r\\n    }\\r\\n\\r\\n    .barreevobg{\\r\\n        width: 80vw;\\r\\n        height: 2vh;\\r\\n        background-color: var(--white);\\r\\n        border-radius: 20px;\\r\\n        margin-top: 10%;\\r\\n    }\\r\\n\\r\\n    .barreevo{\\r\\n        height: 2vh;\\r\\n        background-color: var(--green);\\r\\n        border-radius: 20px;\\r\\n    }\\r\\n\\r\\n    .rank-info{\\r\\n        position: absolute;\\r\\n        top: 9vh;\\r\\n        left: 85vw;\\r\\n        z-index: 1;\\r\\n    }\\r\\n\\r\\n    .rank-info h3{\\r\\n        height: 35px;\\r\\n        width: 35px;\\r\\n        background-color: var(--gris);\\r\\n        color: var(--green);\\r\\n        border-radius: 10px;\\r\\n        display: flex;\\r\\n        justify-content: center;\\r\\n        align-items: center;\\r\\n        margin-top: 12%;\\r\\n        cursor: pointer;\\r\\n        font-family: \\"freiburgin_line_personal_use\\", sans-serif;\\r\\n        font-size: var(--titremobil);\\r\\n        font-weight: 300;\\r\\n    }\\r\\n\\r\\n    @media (min-width: 768px) {\\r\\n    .rank{\\r\\n        display: flex;\\r\\n        width: 100vw;\\r\\n        padding: 0 3vw;\\r\\n    }\\r\\n\\r\\n    .rank-text{\\r\\n         width: 30%;\\r\\n         padding: 0;\\r\\n    }\\r\\n\\r\\n    .rank-text h2,.rank-text p {\\r\\n        text-align: left;\\r\\n        margin: 0;\\r\\n        padding-right: 3vw;\\r\\n    }\\r\\n\\r\\n    .rank-text h2{\\r\\n        padding: 5vh 0 2vh 0;\\r\\n    }\\r\\n\\r\\n    .rank-evo{\\r\\n        width: 30%;\\r\\n        height: 65vh;\\r\\n        margin: 5vh auto 0 5vw;\\r\\n    }\\r\\n\\r\\n    .rank-evo img{\\r\\n        width: 60%;\\r\\n    }\\r\\n\\r\\n    .barreevobg{\\r\\n        width: 20vw;\\r\\n    }\\r\\n\\r\\n    .rank-info{\\r\\n        top: 16.6vh;\\r\\n        left: 94.2vw;\\r\\n    }\\r\\n\\r\\n    .rank-info h3{\\r\\n        height: 45px;\\r\\n        width: 45px;\\r\\n    }\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"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"}`
};
function getRankImage(rank2) {
  switch (rank2) {
    case "Réserve":
      return "/img/reserve.png";
    case "Remplaçant":
      return "/img/remplacant.png";
    case "Titulaire":
      return "/img/titulaire.png";
    case "Pro":
      return "/img/pro.png";
    case "Star":
      return "/img/star.png";
    case "Prime":
      return "/img/prime.png";
    case "G.O.A.T":
      return "/img/goat.png";
    default:
      return "/img/reserve.png";
  }
}
const Rank = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let rankImage;
  let percentage;
  let $points, $$unsubscribe_points;
  let $rank, $$unsubscribe_rank;
  $$unsubscribe_points = subscribe(points, (value) => $points = value);
  $$unsubscribe_rank = subscribe(rank, (value) => $rank = value);
  let showModal = false;
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    rankImage = getRankImage($rank);
    percentage = $points % 100;
    $$rendered = `<section class="rank svelte-2bwhy9"><section class="rank-text svelte-2bwhy9" data-svelte-h="svelte-ck7q6e"><h2 class="svelte-2bwhy9">Rank</h2> <p class="svelte-2bwhy9">Sur votre page Rank, voyez où vous en êtes et combien vous êtes proche du prochain niveau grâce à la barre de progression sous votre rank actuel. Cliquez sur l&#39;icône d&#39;information pour en savoir plus sur les ranks et comment gravir les échelons vers la gloire !</p></section> <section class="rank-evo svelte-2bwhy9"><h2 class="svelte-2bwhy9">${escape($rank)}</h2> <img${add_attribute("src", rankImage, 0)}${add_attribute("alt", `Image de ${$rank}`, 0)} class="svelte-2bwhy9"> <div><div class="barreevobg svelte-2bwhy9"><div class="barreevo svelte-2bwhy9" style="${"width: " + escape(percentage, true) + "%;"}"></div></div></div> <h2 class="svelte-2bwhy9">${escape($points)} pt</h2></section> <div class="rank-info svelte-2bwhy9"><h3 class="svelte-2bwhy9" data-svelte-h="svelte-93oi5w">i</h3></div> ${validate_component(RankInfoModal, "RankInfoModal").$$render(
      $$result,
      { showModal },
      {
        showModal: ($$value) => {
          showModal = $$value;
          $$settled = false;
        }
      },
      {}
    )} </section>`;
  } while (!$$settled);
  $$unsubscribe_points();
  $$unsubscribe_rank();
  return $$rendered;
});
const css = {
  code: "main.svelte-1qsq0ci{background-color:var(--black);color:var(--white);height:100vh;padding-top:0}@media(min-width: 768px){main.svelte-1qsq0ci{padding-top:2vh}}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\r\\n    import '../../styles/global.css';\\r\\n    import { onMount, onDestroy } from 'svelte';\\r\\n    import Header from '$lib/header.svelte';\\r\\n    import Rank from '$lib/Rank.svelte';\\r\\n    import MenuBurger from '$lib/MenuBurger.svelte';\\r\\n    \\r\\n    let couleurbarre = 'var(--white)'; // Variable pour définir la couleur de la barre du MenuBurger\\r\\n    let isMobile = false; // Gère l'état mobile ou non de la page\\r\\n\\r\\n    // Vérifie la taille de l'écran et met à jour l'état isMobile en conséquence\\r\\n    function checkScreenSize() {\\r\\n        if (typeof window !== 'undefined') {\\r\\n            isMobile = window.innerWidth <= 768;\\r\\n        }\\r\\n    }\\r\\n\\r\\n    // Initialise les gestionnaires d'événements au montage du composant\\r\\n    onMount(() => {\\r\\n        if (typeof window !== 'undefined') {\\r\\n            checkScreenSize();\\r\\n            window.addEventListener('resize', checkScreenSize);\\r\\n        }\\r\\n    });\\r\\n\\r\\n    // Nettoie les gestionnaires d'événements au démontage du composant\\r\\n    onDestroy(() => {\\r\\n        if (typeof window !== 'undefined') {\\r\\n            window.removeEventListener('resize', checkScreenSize);\\r\\n        }\\r\\n    });\\r\\n<\/script>\\r\\n  \\r\\n  <main>\\r\\n    {#if isMobile}\\r\\n        <MenuBurger couleur={couleurbarre}/>\\r\\n    {:else}\\r\\n        <Header />\\r\\n    {/if}\\r\\n    <Rank />\\r\\n  </main>\\r\\n  \\r\\n  <style>\\r\\n    main {\\r\\n        background-color: var(--black);\\r\\n        color: var(--white);\\r\\n        height: 100vh; \\r\\n        padding-top: 0;\\r\\n    }\\r\\n  \\r\\n    @media (min-width: 768px) {\\r\\n      main{\\r\\n          padding-top: 2vh;\\r\\n      }\\r\\n    }\\r\\n    \\r\\n  </style>\\r\\n  "],"names":[],"mappings":"AA2CI,mBAAK,CACD,gBAAgB,CAAE,IAAI,OAAO,CAAC,CAC9B,KAAK,CAAE,IAAI,OAAO,CAAC,CACnB,MAAM,CAAE,KAAK,CACb,WAAW,CAAE,CACjB,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,mBAAI,CACA,WAAW,CAAE,GACjB,CACF"}`
};
let couleurbarre = "var(--white)";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isMobile = false;
  function checkScreenSize() {
    if (typeof window !== "undefined") {
      isMobile = window.innerWidth <= 768;
    }
  }
  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", checkScreenSize);
    }
  });
  $$result.css.add(css);
  return `<main class="svelte-1qsq0ci">${isMobile ? `${validate_component(MenuBurger, "MenuBurger").$$render($$result, { couleur: couleurbarre }, {}, {})}` : `${validate_component(Header, "Header").$$render($$result, {}, {}, {})}`} ${validate_component(Rank, "Rank").$$render($$result, {}, {}, {})} </main>`;
});
export {
  Page as default
};
