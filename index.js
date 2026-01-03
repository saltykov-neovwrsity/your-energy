/* empty css                      */(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}})();const l="https://your-energy.b.goit.study/api/quote";async function u(){try{const r=await fetch(l);if(!r.ok)throw new Error("Failed to fetch quote");const e=await r.json();f(e)}catch(r){console.error(r)}}u();function f(r){const e=document.querySelector(".quote-text"),t=document.querySelector(".quote-author");e.textContent=r.quote,t.textContent=`-${r.author}`}let c="Muscles";const d=document.querySelector(".filters");d.addEventListener("click",r=>{const e=r.target.closest(".filter-tab");e&&(c=e.dataset.filter,p(),a(c))});function p(){document.querySelectorAll(".filter-tab").forEach(e=>{const t=e.dataset.filter===c;e.classList.toggle("is-active",t)})}const y="https://your-energy.b.goit.study/api/filters";async function a(r){try{const e=await fetch(`${y}?filter=${r}`);if(!e.ok)throw new Error("Failed to fetch filters");const t=await e.json();h(t.results)}catch(e){console.error(e)}}function h(r){const e=document.querySelector(".filters-content");if(e){if(!Array.isArray(r)){console.error("renderFilters expected array, got:",r);return}e.innerHTML=r.map(t=>`
        <button 
          class="filter-item" 
          data-filter="${t.filter}"
          data-value="${t.name}"
        >
          ${t.name}
        </button>
      `).join("")}}a(c);const g=document.querySelector(".filters-content");g.addEventListener("click",r=>{const e=r.target.closest(".filter-item");if(!e)return;const t=e.dataset.value;E(c,t)});const m="https://your-energy.b.goit.study/api/exercises";async function E(r,e){try{const t=new URLSearchParams;r==="Muscles"&&t.append("muscles",e),r==="Body parts"&&t.append("bodypart",e),r==="Equipment"&&t.append("equipment",e),t.append("page",1),t.append("limit",6);const s=await fetch(`${m}?${t.toString()}`);if(!s.ok)throw new Error("Failed to fetch exercises");const o=await s.json();q(o.results)}catch(t){console.error(t)}}function q(r){const e=document.querySelector(".exercises-list");if(e){if(!Array.isArray(r)){console.error("renderExercises expected array, got:",r);return}e.innerHTML=r.map(t=>`
        <li class="exercise-card">
          <img src="${t.gifUrl}" alt="${t.name}" width="200" />
          <h3>${t.name}</h3>
          <p>Target: ${t.target}</p>
          <p>Rating: ${t.rating}</p>
        </li>
      `).join("")}}
//# sourceMappingURL=index.js.map
