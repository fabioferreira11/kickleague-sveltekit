import { w as writable } from "./index2.js";
const points = writable(0);
function calculateRank(points2) {
  if (points2 < 100) return "Réserve";
  if (points2 < 200) return "Remplaçant";
  if (points2 < 300) return "Titulaire";
  if (points2 < 400) return "Pro";
  if (points2 < 500) return "Star";
  if (points2 < 600) return "Prime";
  return "G.O.A.T";
}
const rank = writable(calculateRank(0));
points.subscribe((value) => {
  rank.set(calculateRank(value));
});
export {
  points as p,
  rank as r
};
