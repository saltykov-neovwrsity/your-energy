/* empty css                      */(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();let g=null,i=null,l=1,d=1;const x="https://your-energy.b.goit.study/api/quote";async function E(){try{const t=await fetch(x);if(!t.ok)throw new Error("Failed to fetch quote");const e=await t.json();q(e)}catch(t){console.error(t)}}E();function q(t){const e=document.querySelector(".quote-text"),r=document.querySelector(".quote-author");e.textContent=t.quote,r.textContent=`-${t.author}`}let c="Muscles";const S=document.querySelector(".filters");S.addEventListener("click",t=>{const e=t.target.closest(".filter-tab");e&&(c=e.dataset.filter,L(),m(c))});function L(){document.querySelectorAll(".filter-tab").forEach(e=>{const r=e.dataset.filter===c;e.classList.toggle("is-active",r)})}const v="https://your-energy.b.goit.study/api/filters";async function m(t){try{const e=await fetch(`${v}?filter=${t}`);if(!e.ok)throw new Error("Failed to fetch filters");const r=await e.json();_(r.results)}catch(e){console.error(e)}}function _(t){const e=document.querySelector(".filters-content");if(e){if(!Array.isArray(t)){console.error("renderFilters expected array, got:",t);return}e.innerHTML=t.map(r=>`
        <button 
          class="filter-item" 
          data-filter="${r.filter}"
          data-value="${r.name}"
        >
          ${r.name}
        </button>
      `).join("")}}m(c);const $=document.querySelector(".filters-content");$.addEventListener("click",t=>{const e=t.target.closest(".filter-item");if(!e)return;const r=e.dataset.value;i=e.dataset.value,b(c,r)});const h="https://your-energy.b.goit.study/api/exercises";async function b(t,e,r=1){try{l=r;const n=new URLSearchParams({page:r,limit:6});t==="Muscles"&&n.append("muscles",e),t==="Body parts"&&n.append("bodypart",e),t==="Equipment"&&n.append("equipment",e);const o=await fetch(`${h}?${n.toString()}`);if(!o.ok)throw new Error("Failed to fetch exercises");const s=await o.json();d=s.totalPages,f(s.results),p()}catch(n){console.error(n)}}function f(t){const e=document.querySelector(".exercises-list");e&&(e.innerHTML=t.map(r=>`
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

  <h3 class="exercise-card__title">${r.name}</h3>

  <p class="exercise-card__info">
    Burned calories: ${r.burnedCalories} / ${r.time} min ·
    Body part: ${r.bodyPart} ·
    Target: ${r.target}
  </p>
</li>
      `).join(""))}const F=document.querySelector(".exercises-list"),a=document.querySelector(".modal");F.addEventListener("click",t=>{const e=t.target.closest(".start-btn");if(!e)return;const r=e.dataset.id;C(r)});async function C(t){try{g=t;const e=await fetch(`https://your-energy.b.goit.study/api/exercises/${t}`);if(!e.ok)throw new Error("Failed to fetch exercise");const r=await e.json();P(r),k()}catch(e){console.error(e)}}function P(t){const e=a.querySelector(".modal-gif");e.src=t.gifUrl,e.alt=t.name,a.querySelector(".modal-title").textContent=t.name,a.querySelector(".modal-description").textContent=t.description,a.querySelector(".modal-bodypart").textContent=t.bodyPart,a.querySelector(".modal-equipment").textContent=t.equipment,a.querySelector(".modal-target").textContent=t.target,a.querySelector(".modal-rating").textContent=`${t.rating.toFixed(1)} ★`}function k(){a.classList.remove("is-hidden"),document.body.style.overflow="hidden"}function M(){a.classList.add("is-hidden"),document.body.style.overflow=""}a.addEventListener("click",t=>{(t.target.classList.contains("modal__backdrop")||t.target.classList.contains("modal__close"))&&M()});async function j(t,e){try{const r=await fetch(`https://your-energy.b.goit.study/api/exercises/${t}/rating`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!r.ok)throw new Error("Failed to send rating");return await r.json()}catch(r){console.error(r)}}const O=document.querySelector(".rating-form");O.addEventListener("submit",async t=>{t.preventDefault();const e=new FormData(t.target),r={rate:Number(e.get("rate")),email:e.get("email"),review:e.get("review")||""},n=await j(g,r);n&&(a.querySelector(".modal-rating").textContent=n.rating,t.target.reset())});const y=document.querySelector(".search-form");y.addEventListener("submit",t=>{t.preventDefault();const r=new FormData(t.target).get("keyword").trim();r&&w(r)});async function w(t,e=1){if(i)try{l=e;const r=new URLSearchParams({keyword:t,page:e,limit:6});c==="Muscles"&&r.append("muscles",i),c==="Body parts"&&r.append("bodypart",i),c==="Equipment"&&r.append("equipment",i);const n=await fetch(`${h}?${r.toString()}`);if(n.status===409){f([]),p(0);return}if(!n.ok)throw new Error("Failed to fetch exercises by keyword");const o=await n.json();d=o.totalPages,f(o.results),p(t)}catch(r){console.error(r)}}function p(t=null){const e=document.querySelector(".pagination-list");if(e){if(d<=1){e.innerHTML="";return}e.innerHTML=Array.from({length:d},(r,n)=>{const o=n+1;return`
        <li>
          <button 
            class="pagination-btn ${o===l?"is-active":""}"
            data-page="${o}"
            ${o===l?"disabled":""}
          >
            ${o}
          </button>
        </li>
      `}).join("")}}const R=document.querySelector(".pagination-list");R.addEventListener("click",t=>{var n;const e=t.target.closest(".pagination-btn");if(!e)return;const r=Number(e.dataset.page);(n=y.keyword)!=null&&n.value?w(y.keyword.value,r):b(c,i,r)});
//# sourceMappingURL=index.js.map
