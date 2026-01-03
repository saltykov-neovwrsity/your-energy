/* empty css                      */(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const f of s.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&n(f)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();let m=null,l=null,d=1,u=1;const q="https://your-energy.b.goit.study/api/quote";async function E(){try{const e=await fetch(q);if(!e.ok)throw new Error("Failed to fetch quote");const t=await e.json();S(t)}catch(e){console.error(e)}}E();function S(e){const t=document.querySelector(".quote-text"),r=document.querySelector(".quote-author");t.textContent=e.quote,r.textContent=`-${e.author}`}let c="Muscles";const _=document.querySelector(".filters");_.addEventListener("click",e=>{const t=e.target.closest(".filter-tab");t&&(c=t.dataset.filter,L(),h(c))});function L(){document.querySelectorAll(".filter-tab").forEach(t=>{const r=t.dataset.filter===c;t.classList.toggle("is-active",r)})}const v="https://your-energy.b.goit.study/api/filters";async function h(e){try{const t=await fetch(`${v}?filter=${e}`);if(!t.ok)throw new Error("Failed to fetch filters");const r=await t.json();$(r.results)}catch(t){console.error(t)}}function $(e){const t=document.querySelector(".filters-content");if(t){if(!Array.isArray(e)){console.error("renderFilters expected array, got:",e);return}t.innerHTML=e.map(r=>`
        <button 
          class="filter-item" 
          data-filter="${r.filter}"
          data-value="${r.name}"
        >
          ${i(r.name)}
        </button>
      `).join("")}}h(c);const C=document.querySelector(".filters-content");C.addEventListener("click",e=>{const t=e.target.closest(".filter-item");if(!t)return;const r=t.dataset.value;l=t.dataset.value,x(c,r)});const b="https://your-energy.b.goit.study/api/exercises";async function x(e,t,r=1){try{d=r;const n=new URLSearchParams({page:r,limit:6});e==="Muscles"&&n.append("muscles",t),e==="Body parts"&&n.append("bodypart",t),e==="Equipment"&&n.append("equipment",t);const o=await fetch(`${b}?${n.toString()}`);if(!o.ok)throw new Error("Failed to fetch exercises");const s=await o.json();u=s.totalPages,p(s.results),g()}catch(n){console.error(n)}}function p(e){const t=document.querySelector(".exercises-list");t&&(t.innerHTML=e.map(r=>`
<li class="exercise-card">
  <div class="exercise-card__header">
    <div class="exercise-card__meta">
      <span class="exercise-card__badge">WORKOUT</span>
      <span class="exercise-card__rating">
        ${r.rating.toFixed(1)}
        <span class="exercise-card__star">★</span>
      </span>
    </div>

    <button class="exercise-card__start start-btn" data-id="${r._id}">
      Start →
    </button>
  </div>

  <h3 class="exercise-card__title">${i(r.name)}</h3>

  <p class="exercise-card__info">
    Burned calories: ${r.burnedCalories} / ${r.time} min ·
    Body part: ${r.bodyPart} ·
    Target: ${r.target}
  </p>
</li>
      `).join(""))}const F=document.querySelector(".exercises-list"),a=document.querySelector(".modal");F.addEventListener("click",e=>{const t=e.target.closest(".start-btn");if(!t)return;const r=t.dataset.id;P(r)});async function P(e){try{m=e;const t=await fetch(`https://your-energy.b.goit.study/api/exercises/${e}`);if(!t.ok)throw new Error("Failed to fetch exercise");const r=await t.json();M(r),j()}catch(t){console.error(t)}}function M(e){const t=a.querySelector(".modal-gif");t.src=e.gifUrl,t.alt=e.name,a.querySelector(".modal-title").textContent=i(e.name)||e.name,a.querySelector(".modal-description").textContent=i(e.description)||e.description,a.querySelector(".modal-bodypart").textContent=i(e.bodyPart)||e.bodyPart,a.querySelector(".modal-equipment").textContent=i(e.equipment)||e.equipment,a.querySelector(".modal-calories").textContent=e.burnedCalories,a.querySelector(".modal-target").textContent=i(e.target)||e.target,a.querySelector(".modal-popularity").textContent=e.popularity,a.querySelector(".modal-time").textContent=`${e.time} min`,a.querySelector(".modal-rating").innerHTML=`
  <span class="modal__rating-value">${e.rating.toFixed(1)}</span>
  <div class="modal__stars">
    ${k(e.rating)}
  </div>
`}function k(e){const t=Math.round(e);return Array.from({length:5},(r,n)=>`<span class="modal__star ${n<t?"is-active":""}">★</span>`).join("")}function j(){a.classList.remove("is-hidden"),document.body.style.overflow="hidden"}function A(){a.classList.add("is-hidden"),document.body.style.overflow=""}a.addEventListener("click",e=>{(e.target.classList.contains("modal__backdrop")||e.target.classList.contains("modal__close"))&&A()});async function O(e,t){try{const r=await fetch(`https://your-energy.b.goit.study/api/exercises/${e}/rating`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!r.ok)throw new Error("Failed to send rating");return await r.json()}catch(r){console.error(r)}}const T=document.querySelector(".rating-form");T.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.target),r={rate:Number(t.get("rate")),email:t.get("email"),review:t.get("review")||""},n=await O(m,r);n&&(a.querySelector(".modal-rating").textContent=n.rating,e.target.reset())});function i(e){return e?e.charAt(0).toUpperCase()+e.slice(1):""}const y=document.querySelector(".search-form");y.addEventListener("submit",e=>{e.preventDefault();const r=new FormData(e.target).get("keyword").trim();r&&w(r)});async function w(e,t=1){if(l)try{d=t;const r=new URLSearchParams({keyword:e,page:t,limit:6});c==="Muscles"&&r.append("muscles",l),c==="Body parts"&&r.append("bodypart",l),c==="Equipment"&&r.append("equipment",l);const n=await fetch(`${b}?${r.toString()}`);if(n.status===409){p([]),g(0);return}if(!n.ok)throw new Error("Failed to fetch exercises by keyword");const o=await n.json();u=o.totalPages,p(o.results),g(e)}catch(r){console.error(r)}}function g(e=null){const t=document.querySelector(".pagination-list");if(t){if(u<=1){t.innerHTML="";return}t.innerHTML=Array.from({length:u},(r,n)=>{const o=n+1;return`
        <li>
          <button 
            class="pagination-btn ${o===d?"is-active":""}"
            data-page="${o}"
            ${o===d?"disabled":""}
          >
            ${o}
          </button>
        </li>
      `}).join("")}}const R=document.querySelector(".pagination-list");R.addEventListener("click",e=>{var n;const t=e.target.closest(".pagination-btn");if(!t)return;const r=Number(t.dataset.page);(n=y.keyword)!=null&&n.value?w(y.keyword.value,r):x(c,l,r)});
//# sourceMappingURL=index.js.map
