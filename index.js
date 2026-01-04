/* empty css                      */(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function r(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=r(o);fetch(o.href,a)}})();const $="https://your-energy.b.goit.study/api";async function C(){const e=await fetch(`${$}/quote`);if(!e.ok)throw new Error("Quote fetch error");return e.json()}const p="dailyQuote";function F(){const e=localStorage.getItem(p);return e?JSON.parse(e):null}function O(e,t){const r=new Date().toISOString().slice(0,10);localStorage.setItem(p,JSON.stringify({quote:e,author:t,date:r}))}const h=document.querySelector(".quote-text"),S=document.querySelector(".quote-author");function P({quote:e,author:t}){h.textContent=e,S.textContent=`— ${t}`}async function A(){const e=F(),t=new Date().toISOString().slice(0,10);if(e&&e.date===t){P(e);return}try{const r=await C();h.textContent=r.quote,S.textContent=`-${r.author}`,O(r.quote,r.author)}catch(r){console.error(r)}}A();const k="https://your-energy.b.goit.study/api";async function v(e){const t=await fetch(`${k}/filters?filter=${e}`);if(!t.ok)throw new Error("Filters fetch error");return t.json()}function i(e){return e?e.charAt(0).toUpperCase()+e.slice(1):""}const I=document.querySelector(".search-form");I.addEventListener("submit",e=>{e.preventDefault();const r=new FormData(e.target).get("keyword").trim();r&&fetchExercisesByKeyword(r)});function b(e){const t=document.querySelector(".filters-content");t&&(t.innerHTML=e.map(r=>`
        <button
          class="filter-item"
          data-filter="${r.filter}"
          data-value="${r.name}"
          style="background-image: url('${r.imgURL}')"
        >
          <span class="filter-item__overlay"></span>
          <div class="filter-item__text">
            <span class="filter-item__title">
              ${i(r.name)}
            </span>
            <span class="filter-item__subtitle">
              ${i(r.filter)}
            </span>
          </div>
        </button>
      `).join(""))}const R="https://your-energy.b.goit.study/api";async function j(e){const t=await fetch(`${R}/exercises?${e}`);if(!t.ok)throw new Error("Exercises fetch error");return t.json()}function B(e){const t=document.querySelector(".exercises-list");t&&(t.innerHTML=e.map(r=>`
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
      `).join(""))}const s={activeFilter:"Muscles",selectedCategory:null,currentExerciseId:null,currentPage:1,totalPages:1};function M(){const e=document.querySelector(".pagination-list");if(!e||s.totalPages<=1){e.innerHTML="";return}e.innerHTML=Array.from({length:s.totalPages},(t,r)=>{const n=r+1;return`
        <li>
          <button
            class="pagination-btn ${n===s.currentPage?"is-active":""}"
            data-page="${n}"
            ${n===s.currentPage?"disabled":""}
          >
            ${n}
          </button>
        </li>
      `}).join("")}async function u(e,t,r=1){try{s.currentPage=r;const n=new URLSearchParams({page:s.currentPage,limit:6});e==="Muscles"&&n.append("muscles",t),e==="Body parts"&&n.append("bodypart",t),e==="Equipment"&&n.append("equipment",t);const o=await j(n.toString());s.totalPages=o.totalPages,B(o.results),M()}catch(n){console.error(n)}}const T=document.querySelector(".filters"),D=document.querySelector(".filters-content");T.addEventListener("click",async e=>{const t=e.target.closest(".filter-tab");if(t){s.activeFilter=t.dataset.filter,V(),U(),H(),K();try{const r=await v(s.activeFilter);b(r.results)}catch(r){console.error(r)}}});D.addEventListener("click",e=>{const t=e.target.closest(".filter-item");t&&(s.selectedCategory=t.dataset.value,N(),Q(),J(),u(s.activeFilter,s.selectedCategory))});function N(){document.querySelector(".filters-content").classList.add("is-hidden")}function U(){document.querySelector(".filters-content").classList.remove("is-hidden")}function Q(){document.querySelector(".exercises-list").classList.remove("is-hidden")}function H(){document.querySelector(".exercises-list").classList.add("is-hidden")}function J(){document.querySelector(".search-form").classList.remove("is-hidden")}function K(){document.querySelector(".search-form").classList.add("is-hidden")}function V(){document.querySelectorAll(".filter-tab").forEach(e=>{e.classList.toggle("is-active",e.dataset.filter===s.activeFilter)})}(async function(){const t=await v(s.activeFilter);b(t.results)})();const Y="https://your-energy.b.goit.study/api";async function z(e){const t=await fetch(`${Y}/exercises/${e}`);if(!t.ok)throw new Error("Exercises fetch error");return t.json()}function G(e){const t=Math.round(e);return Array.from({length:5},(r,n)=>`<span class="modal__star ${n<t?"is-active":""}">★</span>`).join("")}const _="favorites";function x(){const e=localStorage.getItem(_);return e?JSON.parse(e):[]}function W(e){return x().includes(e)}function X(e){const t=x(),r=t.indexOf(e);return r===-1?t.push(e):t.splice(r,1),localStorage.setItem(_,JSON.stringify(t)),t}function L(e,t){W(t)?(e.textContent="Remove from favorites ♥",e.classList.add("is-active")):(e.textContent="Add to favorites ♡",e.classList.remove("is-active"))}function Z(e,t){const r=e.querySelector(".modal-gif");r.src=t.gifUrl,r.alt=t.name,e.querySelector(".modal-title").textContent=i(t.name),e.querySelector(".modal-description").textContent=i(t.description),e.querySelector(".modal-bodypart").textContent=i(t.bodyPart),e.querySelector(".modal-equipment").textContent=i(t.equipment),e.querySelector(".modal-target").textContent=i(t.target),e.querySelector(".modal-popularity").textContent=t.popularity??"—",e.querySelector(".modal-calories").textContent=t.burnedCalories??"—",e.querySelector(".modal-time").textContent=t.time?`${t.time} min`:"—";const n=typeof t.rating=="number"?t.rating:0;e.querySelector(".modal-rating").innerHTML=`
    <span class="modal__rating-value">${n.toFixed(1)}</span>
    <div class="modal__stars">
      ${G(n)}
    </div>
  `;const o=e.querySelector(".js-favorite-btn");L(o,s.currentExerciseId)}const l=document.querySelector(".modal"),ee=document.querySelector(".exercises-list");ee.addEventListener("click",async e=>{const t=e.target.closest(".start-btn");if(t)try{s.currentExerciseId=t.dataset.id;const r=await z(s.currentExerciseId);Z(l,r),f()}catch(r){console.error(r)}});function f(){l.classList.remove("is-hidden"),document.body.style.overflow="hidden"}function q(){l.classList.add("is-hidden"),document.body.style.overflow=""}l.addEventListener("click",e=>{const t=e.target.closest(".js-favorite-btn");if(t){X(s.currentExerciseId),L(t,s.currentExerciseId);return}(e.target.classList.contains("modal__backdrop")||e.target.classList.contains("modal__close"))&&q()});const te="https://your-energy.b.goit.study/api";async function re(e,t){const r=await fetch(`${te}/exercises/${e}/rating`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!r.ok){const n=await r.json();throw new Error(n.message||"Rating error")}return r.json()}const y=document.querySelector(".rating-modal"),w=document.querySelector(".rating-modal__stars"),g=document.querySelector(".rating-modal__form");let c=0;document.querySelector(".btn-outline").addEventListener("click",()=>{ne(),q()});y.addEventListener("click",e=>{(e.target.classList.contains("rating-modal__backdrop")||e.target.classList.contains("rating-modal__close"))&&(E(),f())});function ne(){y.classList.remove("is-hidden"),document.body.style.overflow="hidden"}function E(){y.classList.add("is-hidden"),document.body.style.overflow=""}w.addEventListener("click",e=>{const t=e.target.closest("[data-star]");t&&(c=Number(t.dataset.star),se(c))});function se(e){w.querySelectorAll("button").forEach(r=>{const n=Number(r.dataset.star);r.classList.toggle("is-active",n<=e)})}g.addEventListener("submit",async e=>{var n;if(e.preventDefault(),!c||c<1||c>5)return;const t=new FormData(g),r={rate:c,email:t.get("email"),review:((n=t.get("review"))==null?void 0:n.trim())||" "};await re(s.currentExerciseId,r),E(),f()});const m=document.querySelector(".search-form");m.addEventListener("submit",e=>{e.preventDefault(),!(!new FormData(m).get("keyword").trim()||!s.selectedCategory)&&u(s.activeFilter,s.selectedCategory,1)});const oe=document.querySelector(".pagination-list");oe.addEventListener("click",e=>{const t=e.target.closest(".pagination-btn");if(!t)return;const r=Number(t.dataset.page);u(s.activeFilter,s.selectedCategory,r)});const ae="https://your-energy.b.goit.study/api";async function ie(e){const t=await fetch(`${ae}/subscription`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})}),r=await t.json();if(!t.ok)throw new Error(r.message||"Subscription error");return r}const ce=document.querySelector(".footer__form"),le=document.querySelector(".subscription__input");ce.addEventListener("submit",async e=>{e.preventDefault();const t=le.value.trim();if(t)try{const r=await ie(t)}catch(r){alert(r.message)}});
//# sourceMappingURL=index.js.map
