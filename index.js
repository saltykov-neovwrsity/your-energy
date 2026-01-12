/* empty css                      */(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=r(n);fetch(n.href,a)}})();const I="https://your-energy.b.goit.study/api";async function O(){const e=await fetch(`${I}/quote`);if(!e.ok)throw new Error("Quote fetch error");return e.json()}const x="dailyQuote";function A(){const e=localStorage.getItem(x);return e?JSON.parse(e):null}function M(e,t){const r=new Date().toISOString().slice(0,10);localStorage.setItem(x,JSON.stringify({quote:e,author:t,date:r}))}const _=document.querySelector(".quote-text"),L=document.querySelector(".quote-author");function R({quote:e,author:t}){_.textContent=e,L.textContent=`— ${t}`}async function k(){const e=A(),t=new Date().toISOString().slice(0,10);if(e&&e.date===t){R(e);return}try{const r=await O();_.textContent=r.quote,L.textContent=`-${r.author}`,M(r.quote,r.author)}catch(r){console.error(r)}}k();const B="https://your-energy.b.goit.study/api";async function j({filter:e,page:t=1,limit:r=12}){const o=new URLSearchParams({filter:e,page:t,limit:r}),n=await fetch(`${B}/filters?${o}`);if(!n.ok)throw new Error("Filters fetch error");return n.json()}function c(e){return e?e.charAt(0).toUpperCase()+e.slice(1):""}const N=document.querySelector(".search-form");N.addEventListener("submit",e=>{e.preventDefault();const r=new FormData(e.target).get("keyword").trim();r&&fetchExercisesByKeyword(r)});function T(e){const t=document.querySelector(".filters-content");t&&(t.innerHTML=e.map(r=>`
        <button
          class="filter-item"
          data-filter="${r.filter}"
          data-value="${r.name}"
          style="background-image: url('${r.imgURL}')"
        >
          <span class="filter-item__overlay"></span>
          <div class="filter-item__text">
            <span class="filter-item__title">
              ${c(r.name)}
            </span>
            <span class="filter-item__subtitle">
              ${c(r.filter)}
            </span>
          </div>
        </button>
      `).join(""))}const s={activeFilter:"Muscles",selectedCategory:null,currentExerciseId:null,currentPage:1,totalPages:1,filtersPerPage:12},d=5;function w(){const e=document.querySelector(".pagination-list");if(!e)return;const{totalPages:t,currentPage:r}=s;if(t<=1){e.innerHTML="";return}const o=Math.floor(d/2);let n=Math.max(1,r-o),a=Math.min(t,n+d-1);a-n+1<d&&(n=Math.max(1,a-d+1));let i="";n>1&&(i+=g(1),n>2&&(i+=S()));for(let u=n;u<=a;u++)i+=g(u,u===r);a<t&&(a<t-1&&(i+=S()),i+=g(t)),e.innerHTML=i}function g(e,t=!1){return`
    <li>
      <button
        class="pagination-btn ${t?"is-active":""}"
        data-page="${e}"
        ${t?"disabled":""}
      >
        ${e}
      </button>
    </li>
  `}function S(){return'<li class="pagination-dots">…</li>'}const D="https://your-energy.b.goit.study/api";async function U(e){const t=await fetch(`${D}/exercises?${e}`);if(!t.ok)throw new Error("Exercises fetch error");return t.json()}function Q(e){const t=document.querySelector(".exercises-list");t&&(t.innerHTML=e.map(r=>`
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
      `).join(""))}async function y(e,t,r=1){try{s.currentPage=r;const o=new URLSearchParams({page:s.currentPage,limit:6});e==="Muscles"&&o.append("muscles",t),e==="Body parts"&&o.append("bodypart",t),e==="Equipment"&&o.append("equipment",t);const n=await U(o.toString());s.totalPages=n.totalPages,Q(n.results),w()}catch(o){console.error(o)}}const H=document.querySelector(".filters"),J=document.querySelector(".filters-content");H.addEventListener("click",async e=>{const t=e.target.closest(".filter-tab");t&&(s.activeFilter=t.dataset.filter,s.currentPage=1,X(),G(),Y(),W(),await m())});J.addEventListener("click",e=>{const t=e.target.closest(".filter-item");t&&(s.selectedCategory=t.dataset.value,K(),V(),z(),y(s.activeFilter,s.selectedCategory))});function K(){const e=document.querySelector(".filters-content");e&&e.classList.add("is-hidden")}function G(){const e=document.querySelector(".filters-content");e&&e.classList.remove("is-hidden")}function V(){const e=document.querySelector(".exercises-list");e&&e.classList.remove("is-hidden")}function Y(){const e=document.querySelector(".exercises-list");e&&e.classList.add("is-hidden")}function z(){const e=document.querySelector(".search-form");e&&e.classList.remove("is-hidden")}function W(){const e=document.querySelector(".search-form");e&&e.classList.add("is-hidden")}function X(){document.querySelectorAll(".filter-tab").forEach(e=>{e.classList.toggle("is-active",e.dataset.filter===s.activeFilter)})}(async function(){s.currentPage=1,await m()})();async function m(){try{const e=await j({filter:s.activeFilter,page:s.currentPage,limit:s.filtersPerPage});s.totalPages=e.totalPages,T(e.results),w()}catch(e){console.error(e)}}const Z="https://your-energy.b.goit.study/api";async function ee(e){const t=await fetch(`${Z}/exercises/${e}`);if(!t.ok)throw new Error("Exercises fetch error");return t.json()}function te(e){const t=Math.round(e);return Array.from({length:5},(r,o)=>`<span class="modal__star ${o<t?"is-active":""}">★</span>`).join("")}const q="favorites";function E(){const e=localStorage.getItem(q);return e?JSON.parse(e):[]}function re(e){return E().includes(e)}function ne(e){const t=E(),r=t.indexOf(e);return r===-1?t.push(e):t.splice(r,1),localStorage.setItem(q,JSON.stringify(t)),t}function $(e,t){re(t)?(e.textContent="Remove from favorites ♥",e.classList.add("is-active")):(e.textContent="Add to favorites ♡",e.classList.remove("is-active"))}function se(e,t){const r=e.querySelector(".modal-gif");r.src=t.gifUrl,r.alt=t.name,e.querySelector(".modal-title").textContent=c(t.name),e.querySelector(".modal-description").textContent=c(t.description),e.querySelector(".modal-bodypart").textContent=c(t.bodyPart),e.querySelector(".modal-equipment").textContent=c(t.equipment),e.querySelector(".modal-target").textContent=c(t.target),e.querySelector(".modal-popularity").textContent=t.popularity??"—",e.querySelector(".modal-calories").textContent=t.burnedCalories??"—",e.querySelector(".modal-time").textContent=t.time?`${t.time} min`:"—";const o=typeof t.rating=="number"?t.rating:0;e.querySelector(".modal-rating").innerHTML=`
    <span class="modal__rating-value">${o.toFixed(1)}</span>
    <div class="modal__stars">
      ${te(o)}
    </div>
  `;const n=e.querySelector(".js-favorite-btn");$(n,s.currentExerciseId)}const f=document.querySelector(".modal"),oe=document.querySelector(".exercises-list");oe.addEventListener("click",async e=>{const t=e.target.closest(".start-btn");if(t)try{s.currentExerciseId=t.dataset.id;const r=await ee(s.currentExerciseId);se(f,r),p()}catch(r){console.error(r)}});function p(){f.classList.remove("is-hidden"),document.body.style.overflow="hidden"}function P(){f.classList.add("is-hidden"),document.body.style.overflow=""}f.addEventListener("click",e=>{const t=e.target.closest(".js-favorite-btn");if(t){ne(s.currentExerciseId),$(t,s.currentExerciseId);return}(e.target.classList.contains("modal__backdrop")||e.target.classList.contains("modal__close"))&&P()});const ae="https://your-energy.b.goit.study/api";async function ie(e,t){const r=await fetch(`${ae}/exercises/${e}/rating`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!r.ok){const o=await r.json();throw new Error(o.message||"Rating error")}return r.json()}const h=document.querySelector(".rating-modal"),C=document.querySelector(".rating-modal__stars"),v=document.querySelector(".rating-modal__form");let l=0;document.querySelector(".btn-outline").addEventListener("click",()=>{ce(),P()});h.addEventListener("click",e=>{(e.target.classList.contains("rating-modal__backdrop")||e.target.classList.contains("rating-modal__close"))&&(F(),p())});function ce(){h.classList.remove("is-hidden"),document.body.style.overflow="hidden"}function F(){h.classList.add("is-hidden"),document.body.style.overflow=""}C.addEventListener("click",e=>{const t=e.target.closest("[data-star]");t&&(l=Number(t.dataset.star),le(l))});function le(e){C.querySelectorAll("button").forEach(r=>{const o=Number(r.dataset.star);r.classList.toggle("is-active",o<=e)})}v.addEventListener("submit",async e=>{var o;if(e.preventDefault(),!l||l<1||l>5)return;const t=new FormData(v),r={rate:l,email:t.get("email"),review:((o=t.get("review"))==null?void 0:o.trim())||" "};await ie(s.currentExerciseId,r),F(),p()});const b=document.querySelector(".search-form");b.addEventListener("submit",e=>{e.preventDefault(),!(!new FormData(b).get("keyword").trim()||!s.selectedCategory)&&y(s.activeFilter,s.selectedCategory,1)});const ue=document.querySelector(".pagination-list");ue.addEventListener("click",e=>{const t=e.target.closest(".pagination-btn");if(!t)return;const r=Number(t.dataset.page);s.currentPage=r,s.selectedCategory?y(s.activeFilter,s.selectedCategory,r):m()});const de="https://your-energy.b.goit.study/api";async function fe(e){const t=await fetch(`${de}/subscription`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})}),r=await t.json();if(!t.ok)throw new Error(r.message||"Subscription error");return r}const ge=document.querySelector(".footer__form"),ye=document.querySelector(".subscription__input");ge.addEventListener("submit",async e=>{e.preventDefault();const t=ye.value.trim();if(t)try{const r=await fe(t)}catch(r){alert(r.message)}});
//# sourceMappingURL=index.js.map
