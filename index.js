/* empty css                      */(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();const S="https://your-energy.b.goit.study/api";async function q(){const e=await fetch(`${S}/quote`);if(!e.ok)throw new Error("Quote fetch error");return e.json()}const v=document.querySelector(".quote-text"),w=document.querySelector(".quote-author");async function L(){try{const e=await q();v.textContent=e.quote,w.textContent=`-${e.author}`}catch(e){console.error(e)}}L();const E="https://your-energy.b.goit.study/api";async function m(e){const t=await fetch(`${E}/filters?filter=${e}`);if(!t.ok)throw new Error("Filters fetch error");return t.json()}function c(e){return e?e.charAt(0).toUpperCase()+e.slice(1):""}const $=document.querySelector(".search-form");$.addEventListener("submit",e=>{e.preventDefault();const r=new FormData(e.target).get("keyword").trim();r&&fetchExercisesByKeyword(r)});function h(e){const t=document.querySelector(".filters-content");if(t){if(!Array.isArray(e)){console.error("renderFilters expected array, got:",e);return}t.innerHTML=e.map(r=>`
        <button 
          class="filter-item" 
          data-filter="${r.filter}"
          data-value="${r.name}"
        >
          ${c(r.name)}
        </button>
      `).join("")}}const C="https://your-energy.b.goit.study/api";async function F(e){const t=await fetch(`${C}/exercises?${e}`);if(!t.ok)throw new Error("Exercises fetch error");return t.json()}function P(e){const t=document.querySelector(".exercises-list");t&&(t.innerHTML=e.map(r=>`
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

  <h3 class="exercise-card__title">${c(r.name)}</h3>

  <p class="exercise-card__info">
    Burned calories: ${r.burnedCalories} / ${r.time} min ·
    Body part: ${r.bodyPart} ·
    Target: ${r.target}
  </p>
</li>
      `).join(""))}const o={activeFilter:"Muscles",selectedCategory:null,currentExerciseId:null,currentPage:1,totalPages:1};function A(){const e=document.querySelector(".pagination-list");if(!e||o.totalPages<=1){e.innerHTML="";return}e.innerHTML=Array.from({length:o.totalPages},(t,r)=>{const n=r+1;return`
        <li>
          <button
            class="pagination-btn ${n===o.currentPage?"is-active":""}"
            data-page="${n}"
            ${n===o.currentPage?"disabled":""}
          >
            ${n}
          </button>
        </li>
      `}).join("")}async function u(e,t,r=1){try{o.currentPage=r;const n=new URLSearchParams({page:o.currentPage,limit:6});e==="Muscles"&&n.append("muscles",t),e==="Body parts"&&n.append("bodypart",t),e==="Equipment"&&n.append("equipment",t);const s=await F(n.toString());o.totalPages=s.totalPages,P(s.results),A()}catch(n){console.error(n)}}const k=document.querySelector(".filters"),M=document.querySelector(".filters-content");k.addEventListener("click",async e=>{const t=e.target.closest(".filter-tab");if(t){o.activeFilter=t.dataset.filter,R();try{const r=await m(o.activeFilter);h(r.results)}catch(r){console.error(r)}}});M.addEventListener("click",e=>{const t=e.target.closest(".filter-item");t&&(o.selectedCategory=t.dataset.value,u(o.activeFilter,o.selectedCategory))});function R(){document.querySelectorAll(".filter-tab").forEach(e=>{e.classList.toggle("is-active",e.dataset.filter===o.activeFilter)})}(async function(){const t=await m(o.activeFilter);h(t.results)})();const j="https://your-energy.b.goit.study/api";async function B(e){const t=await fetch(`${j}/exercises/${e}`);if(!t.ok)throw new Error("Exercises fetch error");return t.json()}function D(e){const t=Math.round(e);return Array.from({length:5},(r,n)=>`<span class="modal__star ${n<t?"is-active":""}">★</span>`).join("")}function O(e,t){const r=e.querySelector(".modal-gif");r.src=t.gifUrl,r.alt=t.name,e.querySelector(".modal-title").textContent=c(t.name),e.querySelector(".modal-description").textContent=c(t.description),e.querySelector(".modal-bodypart").textContent=c(t.bodyPart),e.querySelector(".modal-equipment").textContent=c(t.equipment),e.querySelector(".modal-target").textContent=c(t.target),e.querySelector(".modal-popularity").textContent=t.popularity??"—",e.querySelector(".modal-calories").textContent=t.burnedCalories??"—",e.querySelector(".modal-time").textContent=t.time?`${t.time} min`:"—";const n=typeof t.rating=="number"?t.rating:0;e.querySelector(".modal-rating").innerHTML=`
    <span class="modal__rating-value">${n.toFixed(1)}</span>
    <div class="modal__stars">
      ${D(n)}
    </div>
  `}const l=document.querySelector(".modal"),T=document.querySelector(".exercises-list");T.addEventListener("click",async e=>{const t=e.target.closest(".start-btn");if(t)try{o.currentExerciseId=t.dataset.id;const r=await B(o.currentExerciseId);O(l,r),f()}catch(r){console.error(r)}});function f(){l.classList.remove("is-hidden"),document.body.style.overflow="hidden"}function b(){l.classList.add("is-hidden"),document.body.style.overflow=""}l.addEventListener("click",e=>{(e.target.classList.contains("modal__backdrop")||e.target.classList.contains("modal__close"))&&b()});const U="https://your-energy.b.goit.study/api";async function N(e,t){const r=await fetch(`${U}/exercises/${e}/rating`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!r.ok){const n=await r.json();throw new Error(n.message||"Rating error")}return r.json()}const y=document.querySelector(".rating-modal"),x=document.querySelector(".rating-modal__stars"),g=document.querySelector(".rating-modal__form");let i=0;document.querySelector(".btn-outline").addEventListener("click",()=>{H(),b()});y.addEventListener("click",e=>{(e.target.classList.contains("rating-modal__backdrop")||e.target.classList.contains("rating-modal__close"))&&(_(),f())});function H(){y.classList.remove("is-hidden"),document.body.style.overflow="hidden"}function _(){y.classList.add("is-hidden"),document.body.style.overflow=""}x.addEventListener("click",e=>{const t=e.target.closest("[data-star]");t&&(i=Number(t.dataset.star),I(i))});function I(e){x.querySelectorAll("button").forEach(r=>{const n=Number(r.dataset.star);r.classList.toggle("is-active",n<=e)})}g.addEventListener("submit",async e=>{var n;if(e.preventDefault(),!i||i<1||i>5)return;const t=new FormData(g),r={rate:i,email:t.get("email"),review:((n=t.get("review"))==null?void 0:n.trim())||" "};await N(o.currentExerciseId,r),_(),f()});const p=document.querySelector(".search-form");p.addEventListener("submit",e=>{e.preventDefault(),!(!new FormData(p).get("keyword").trim()||!o.selectedCategory)&&u(o.activeFilter,o.selectedCategory,1)});const K=document.querySelector(".pagination-list");K.addEventListener("click",e=>{const t=e.target.closest(".pagination-btn");if(!t)return;const r=Number(t.dataset.page);u(o.activeFilter,o.selectedCategory,r)});
//# sourceMappingURL=index.js.map
