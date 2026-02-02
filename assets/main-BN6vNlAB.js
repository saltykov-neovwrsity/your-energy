(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=r(s);fetch(s.href,i)}})();(()=>{const e=document.querySelector(".js-menu-container"),t=document.querySelector(".js-open-menu"),r=document.querySelector(".js-close-menu"),o=()=>{const s=t.getAttribute("aria-expanded")==="true"||!1;t.setAttribute("aria-expanded",!s),e.classList.toggle("is-open"),document.body.classList.toggle("no-scroll")};t&&t.addEventListener("click",o),r&&r.addEventListener("click",o),window.matchMedia("(min-width: 768px)").addEventListener("change",s=>{s.matches&&(e.classList.remove("is-open"),t.setAttribute("aria-expanded",!1),document.body.classList.remove("no-scroll"))})})();const G="https://your-energy.b.goit.study/api";async function V(){const e=await fetch(`${G}/quote`);if(!e.ok)throw new Error("Quote fetch error");return e.json()}const A="dailyQuote";function Y(){const e=localStorage.getItem(A);return e?JSON.parse(e):null}function z(e,t){const r=new Date().toISOString().slice(0,10);localStorage.setItem(A,JSON.stringify({quote:e,author:t,date:r}))}const I=document.querySelector(".quote-text"),O=document.querySelector(".quote-author");function X({quote:e,author:t}){I.textContent=e,O.textContent=t}async function Z(){const e=Y(),t=new Date().toISOString().slice(0,10);if(e&&e.date===t){X(e);return}try{const r=await V();I.textContent=r.quote,O.textContent=r.author,z(r.quote,r.author)}catch(r){console.error(r)}}Z();const ee="https://your-energy.b.goit.study/api";async function te({filter:e,page:t=1,limit:r=12}){const o=new URLSearchParams({filter:e,page:t,limit:r}),s=await fetch(`${ee}/filters?${o}`);if(!s.ok)throw new Error("Filters fetch error");return s.json()}function c(e){return e?e.charAt(0).toUpperCase()+e.slice(1):""}function re(e){const t=document.querySelector(".filters-content");t&&(t.innerHTML=e.map(r=>`
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
      `).join(""))}const n={activeFilter:"Muscles",selectedCategory:null,currentExerciseId:null,currentPage:1,totalPages:1},f=5;function k(){const e=document.querySelector(".pagination-list");if(!e)return;const{totalPages:t,currentPage:r}=n;if(t<=1){e.innerHTML="";return}const o=Math.floor(f/2);let s=Math.max(1,r-o),i=Math.min(t,s+f-1);i-s+1<f&&(s=Math.max(1,i-f+1));let a="";s>1&&(a+=m(1),s>2&&(a+=L()));for(let u=s;u<=i;u++)a+=m(u,u===r);i<t&&(i<t-1&&(a+=L()),a+=m(t)),e.innerHTML=a}function m(e,t=!1){return`
    <li>
      <button
        class="pagination-btn ${t?"is-active":""}"
        data-page="${e}"
        ${t?"disabled":""}
      >
        ${e}
      </button>
    </li>
  `}function L(){return'<li class="pagination-dots">…</li>'}const B="https://your-energy.b.goit.study/api";async function se(e){const t=await fetch(`${B}/exercises?${e}`);if(!t.ok)throw new Error("Exercises fetch error");return t.json()}async function ne(e){const t=await fetch(`${B}/exercises/${e}`);if(!t.ok)throw new Error("Exercise fetch error");return t.json()}function oe(e){const t=document.querySelector(".exercises-list");t&&(t.innerHTML=e.map(r=>`
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
      Start <span>→</span>
    </button>
  </div>

  <h3 class="exercise-card__title">${c(r.name)}</h3>

  <div class="exercise-card__info">
    <div>
      <span class="exercise-card__info-label">Burned calories:</span>
      <span class="exercise-card__info-value">${r.burnedCalories} / ${r.time} min</span>
    </div>
    <div>
      <span class="exercise-card__info-label">Body part:</span>
      <span class="exercise-card__info-value">${c(r.bodyPart)}</span>
    </div>
    <div>
      <span class="exercise-card__info-label">Target:</span>
      <span class="exercise-card__info-value">${c(r.target)}</span>
    </div>
  </div>
</li>
      `).join(""))}function R(){return window.innerWidth<768?{filters:9,exercises:8}:{filters:12,exercises:10}}async function _(e,t,r=1,o=""){try{n.currentPage=r;const s=R(),i=new URLSearchParams({page:n.currentPage,limit:s.exercises});e==="Muscles"&&i.append("muscles",t),e==="Body parts"&&i.append("bodypart",t),e==="Equipment"&&i.append("equipment",t),o&&i.append("keyword",o);const a=await se(i.toString());n.totalPages=a.totalPages,oe(a.results),k()}catch(s){console.error(s)}}const h=document.querySelector(".filters"),w=document.querySelector(".filters-content"),j=document.querySelector(".subcategory-span"),q=document.querySelector(".filters-list");function ie(e){console.log("Filter container clicked:",e.target)}q&&q.addEventListener("click",ie);h&&h.addEventListener("click",async e=>{const t=e.target.closest(".filter-tab");t&&(n.activeFilter=t.dataset.filter,n.selectedCategory=null,n.currentPage=1,ue(),ce(),T(),N(),j.textContent="",await x())});w&&w.addEventListener("click",e=>{const t=e.target.closest(".filter-item");t&&(n.selectedCategory=t.dataset.value,j.textContent=` / ${n.selectedCategory}`,ae(),le(),de(),_(n.activeFilter,n.selectedCategory))});function ae(){const e=document.querySelector(".filters-content");e&&e.classList.add("is-hidden")}function ce(){const e=document.querySelector(".filters-content");e&&e.classList.remove("is-hidden")}function le(){const e=document.querySelector(".exercises");e&&e.classList.remove("is-hidden")}function T(){const e=document.querySelector(".exercises");e&&e.classList.add("is-hidden")}function de(){const e=document.querySelector(".search-form");e&&e.classList.remove("is-hidden")}function N(){const e=document.querySelector(".search-form");e&&e.classList.add("is-hidden")}function ue(){document.querySelectorAll(".filter-tab").forEach(e=>{e.classList.toggle("is-active",e.dataset.filter===n.activeFilter)})}(async function(){h&&(n.currentPage=1,T(),N(),await x())})();async function x(){try{const e=R(),t=await te({filter:n.activeFilter,page:n.currentPage,limit:e.filters});n.totalPages=t.totalPages,re(t.results),k()}catch(e){console.error(e)}}const fe="https://your-energy.b.goit.study/api";async function ge(e){const t=await fetch(`${fe}/exercises/${e}`);if(!t.ok)throw new Error("Exercises fetch error");return t.json()}function pe(e){const t=Math.round(e);return Array.from({length:5},(r,o)=>`<span class="modal__star ${o<t?"is-active":""}">★</span>`).join("")}const U="favorites";function S(){const e=localStorage.getItem(U);return e?JSON.parse(e):[]}function me(e){return S().includes(e)}function H(e){const t=S(),r=t.indexOf(e);return r===-1?t.push(e):t.splice(r,1),localStorage.setItem(U,JSON.stringify(t)),t}function D(e,t){me(t)?(e.textContent="Remove from favorites ♥",e.classList.add("is-active")):(e.textContent="Add to favorites ♡",e.classList.remove("is-active"))}function ye(e,t){const r=e.querySelector(".modal-gif");r.src=t.gifUrl,r.alt=t.name,e.querySelector(".modal-title").textContent=c(t.name),e.querySelector(".modal-description").textContent=c(t.description),e.querySelector(".modal-bodypart").textContent=c(t.bodyPart),e.querySelector(".modal-equipment").textContent=c(t.equipment),e.querySelector(".modal-target").textContent=c(t.target),e.querySelector(".modal-popularity").textContent=t.popularity??"—",e.querySelector(".modal-calories").textContent=t.burnedCalories??"—",e.querySelector(".modal-time").textContent=t.time?`${t.time} min`:"—";const o=typeof t.rating=="number"?t.rating:0;e.querySelector(".modal-rating").innerHTML=`
    <span class="modal__rating-value">${o.toFixed(1)}</span>
    <div class="modal__stars">
      ${pe(o)}
    </div>
  `;const s=e.querySelector(".js-favorite-btn");D(s,n.currentExerciseId)}const d=document.querySelector(".modal"),E=document.querySelector(".exercises")||document.querySelector(".favorites-list");async function he(e){const t=e.target.closest(".start-btn");if(t)try{n.currentExerciseId=t.dataset.id;const r=await ge(n.currentExerciseId);ye(d,r),b()}catch(r){console.error(r)}}E&&E.addEventListener("click",he);function b(){d.classList.remove("is-hidden"),document.body.style.overflow="hidden"}function Q(){d.classList.add("is-hidden"),document.body.style.overflow=""}d&&d.addEventListener("click",e=>{const t=e.target.closest(".js-favorite-btn");if(t){H(n.currentExerciseId),D(t,n.currentExerciseId);return}(e.target.classList.contains("modal__backdrop")||e.target.classList.contains("modal__close"))&&Q()});const ve="https://your-energy.b.goit.study/api";async function _e(e,t){const r=await fetch(`${ve}/exercises/${e}/rating`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!r.ok){const o=await r.json();throw new Error(o.message||"Rating error")}return r.json()}const p=document.querySelector(".rating-modal"),J=document.querySelector(".rating-modal__stars"),$=document.querySelector(".rating-modal__form");let l=0;document.querySelector(".btn-outline")&&document.querySelector(".btn-outline").addEventListener("click",()=>{xe(),Q()});p&&p.addEventListener("click",e=>{(e.target.classList.contains("rating-modal__backdrop")||e.target.classList.contains("rating-modal__close"))&&(K(),b())});function xe(){p.classList.remove("is-hidden"),document.body.style.overflow="hidden"}function K(){p.classList.add("is-hidden"),document.body.style.overflow=""}J.addEventListener("click",e=>{const t=e.target.closest("[data-star]");t&&(l=Number(t.dataset.star),Se(l))});function Se(e){J.querySelectorAll("button").forEach(r=>{const o=Number(r.dataset.star);r.classList.toggle("is-active",o<=e)})}$.addEventListener("submit",async e=>{var o;if(e.preventDefault(),!l||l<1||l>5)return;const t=new FormData($),r={rate:l,email:t.get("email"),review:((o=t.get("review"))==null?void 0:o.trim())||" "};await _e(n.currentExerciseId,r),K(),b()});const y=document.querySelector(".search-form");y&&y.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(y).get("keyword").trim();!t||!n.selectedCategory||_(n.activeFilter,n.selectedCategory,1,t)});const C=document.querySelector(".pagination-list");C&&C.addEventListener("click",e=>{const t=e.target.closest(".pagination-btn");if(!t)return;const r=Number(t.dataset.page);n.currentPage=r,n.activeFilter&&n.selectedCategory?_(n.activeFilter,n.selectedCategory,r):x()});const be="https://your-energy.b.goit.study/api";async function Le(e){const t=await fetch(`${be}/subscription`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})}),r=await t.json();if(!t.ok)throw new Error(r.message||"Subscription error");return r}const F=document.querySelector(".footer__form"),we=document.querySelector(".subscription__input");F&&F.addEventListener("submit",async e=>{e.preventDefault();const t=we.value.trim();if(t)try{const r=await Le(t)}catch(r){alert(r.message)}});const v=document.querySelector(".favorites-list"),P=document.querySelector(".favorites-empty-message");async function W(){if(!v)return;const e=S();if(e.length===0){v.innerHTML="",M(!0);return}M(!1);try{const t=e.map(o=>ne(o)),r=await Promise.all(t);qe(r)}catch(t){console.error("Error fetching favorites:",t)}}function M(e){P&&(P.style.display=e?"block":"none")}function qe(e){const t=e.map(r=>`
    <li class="exercise-card favorite-card" data-id="${r._id}">
      <div class="exercise-card__header">
        <div class="exercise-card__meta">
          <span class="exercise-card__badge">WORKOUT</span>
          <button class="favorite-btn--trash" data-id="${r._id}" aria-label="Remove">
            <svg width="16" height="16" viewBox="0 0 20 20">
              <use href="./img/icons/trash-01.svg#icon"></use> 
            </svg>
          </button>
        </div>

        <button class="exercise-card__start start-btn" data-id="${r._id}">
            Start <span>→</span>
        </button>
      </div>

      <div class="exercise-card__title-row">
        <div class="exercise-icon-wrapper">
             <svg width="24" height="24">
                <use href="./img/icons/human.svg#icon-human"></use>
            </svg>
        </div>
        <h3 class="exercise-card__title">${c(r.name)}</h3>
      </div>

      <p class="exercise-card__info">
        <span class="info-item">Burned calories: <span class="info-value">${r.burnedCalories} / ${r.time} min</span></span>
        <span class="info-item">Body part: <span class="info-value">${c(r.bodyPart)}</span></span>
        <span class="info-item">Target: <span class="info-value">${c(r.target)}</span></span>
      </p>
    </li>
  `).join("");v.innerHTML=t,document.querySelectorAll(".favorite-btn--trash").forEach(r=>{r.addEventListener("click",Ee)})}async function Ee(e){const t=e.target.closest(".favorite-btn--trash");if(!t)return;const r=t.dataset.id;H(r),await W()}document.querySelector(".favorites-list")&&W();const g=window.location.pathname,$e=document.querySelectorAll(".header__nav-link, .mobile-menu__link");$e.forEach(e=>{const t=e.getAttribute("href"),r=t==="./index.html"||t==="index.html"||t==="/",o=g==="/"||g.endsWith("index.html")||g==="";r&&o||!r&&g.endsWith(t.replace("./",""))?e.classList.add("is-active"):e.classList.remove("is-active")});
//# sourceMappingURL=main-BN6vNlAB.js.map
