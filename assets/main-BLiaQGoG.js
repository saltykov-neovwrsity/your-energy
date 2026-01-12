(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function r(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=r(s);fetch(s.href,i)}})();(()=>{const e=document.querySelector(".js-menu-container"),t=document.querySelector(".js-open-menu"),r=document.querySelector(".js-close-menu"),o=()=>{const s=t.getAttribute("aria-expanded")==="true"||!1;t.setAttribute("aria-expanded",!s),e.classList.toggle("is-open"),document.body.classList.toggle("no-scroll")};t&&t.addEventListener("click",o),r&&r.addEventListener("click",o),window.matchMedia("(min-width: 768px)").addEventListener("change",s=>{s.matches&&(e.classList.remove("is-open"),t.setAttribute("aria-expanded",!1),document.body.classList.remove("no-scroll"))})})();const K="https://your-energy.b.goit.study/api";async function W(){const e=await fetch(`${K}/quote`);if(!e.ok)throw new Error("Quote fetch error");return e.json()}const F="dailyQuote";function G(){const e=localStorage.getItem(F);return e?JSON.parse(e):null}function V(e,t){const r=new Date().toISOString().slice(0,10);localStorage.setItem(F,JSON.stringify({quote:e,author:t,date:r}))}const M=document.querySelector(".quote-text"),A=document.querySelector(".quote-author");function Y({quote:e,author:t}){M.textContent=e,A.textContent=t}async function z(){const e=G(),t=new Date().toISOString().slice(0,10);if(e&&e.date===t){Y(e);return}try{const r=await W();M.textContent=r.quote,A.textContent=r.author,V(r.quote,r.author)}catch(r){console.error(r)}}z();const X="https://your-energy.b.goit.study/api";async function Z({filter:e,page:t=1,limit:r=12}){const o=new URLSearchParams({filter:e,page:t,limit:r}),s=await fetch(`${X}/filters?${o}`);if(!s.ok)throw new Error("Filters fetch error");return s.json()}function a(e){return e?e.charAt(0).toUpperCase()+e.slice(1):""}function ee(e){const t=document.querySelector(".filters-content");t&&(t.innerHTML=e.map(r=>`
        <button
          class="filter-item"
          data-filter="${r.filter}"
          data-value="${r.name}"
          style="background-image: url('${r.imgURL}')"
        >
          <span class="filter-item__overlay"></span>
          <div class="filter-item__text">
            <span class="filter-item__title">
              ${a(r.name)}
            </span>
            <span class="filter-item__subtitle">
              ${a(r.filter)}
            </span>
          </div>
        </button>
      `).join(""))}const n={activeFilter:"Muscles",selectedCategory:null,currentExerciseId:null,currentPage:1,totalPages:1,filtersPerPage:12},f=5;function O(){const e=document.querySelector(".pagination-list");if(!e)return;const{totalPages:t,currentPage:r}=n;if(t<=1){e.innerHTML="";return}const o=Math.floor(f/2);let s=Math.max(1,r-o),i=Math.min(t,s+f-1);i-s+1<f&&(s=Math.max(1,i-f+1));let c="";s>1&&(c+=y(1),s>2&&(c+=_()));for(let u=s;u<=i;u++)c+=y(u,u===r);i<t&&(i<t-1&&(c+=_()),c+=y(t)),e.innerHTML=c}function y(e,t=!1){return`
    <li>
      <button
        class="pagination-btn ${t?"is-active":""}"
        data-page="${e}"
        ${t?"disabled":""}
      >
        ${e}
      </button>
    </li>
  `}function _(){return'<li class="pagination-dots">…</li>'}const I="https://your-energy.b.goit.study/api";async function te(e){const t=await fetch(`${I}/exercises?${e}`);if(!t.ok)throw new Error("Exercises fetch error");return t.json()}async function re(e){const t=await fetch(`${I}/exercises/${e}`);if(!t.ok)throw new Error("Exercise fetch error");return t.json()}function se(e){const t=document.querySelector(".exercises-list");t&&(t.innerHTML=e.map(r=>`
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

  <h3 class="exercise-card__title">${a(r.name)}</h3>

  <p class="exercise-card__info">
    Burned calories: ${r.burnedCalories} / ${r.time} min ·
    Body part: ${r.bodyPart} ·
    Target: ${r.target}
  </p>
</li>
      `).join(""))}async function v(e,t,r=1,o=""){try{n.currentPage=r;const s=new URLSearchParams({page:n.currentPage,limit:10});e==="Muscles"&&s.append("muscles",t),e==="Body parts"&&s.append("bodypart",t),e==="Equipment"&&s.append("equipment",t),o&&s.append("keyword",o);const i=await te(s.toString());n.totalPages=i.totalPages,se(i.results),O()}catch(s){console.error(s)}}const h=document.querySelector(".filters"),L=document.querySelector(".filters-content"),k=document.querySelector(".subcategory-span"),w=document.querySelector(".filters-list");function ne(e){console.log("Filter container clicked:",e.target)}w&&w.addEventListener("click",ne);h&&h.addEventListener("click",async e=>{const t=e.target.closest(".filter-tab");t&&(n.activeFilter=t.dataset.filter,n.selectedCategory=null,n.currentPage=1,le(),ie(),B(),R(),k.textContent="",await S())});L&&L.addEventListener("click",e=>{const t=e.target.closest(".filter-item");t&&(n.selectedCategory=t.dataset.value,k.textContent=` / ${n.selectedCategory}`,oe(),ae(),ce(),v(n.activeFilter,n.selectedCategory))});function oe(){const e=document.querySelector(".filters-content");e&&e.classList.add("is-hidden")}function ie(){const e=document.querySelector(".filters-content");e&&e.classList.remove("is-hidden")}function ae(){const e=document.querySelector(".exercises");e&&e.classList.remove("is-hidden")}function B(){const e=document.querySelector(".exercises");e&&e.classList.add("is-hidden")}function ce(){const e=document.querySelector(".search-form");e&&e.classList.remove("is-hidden")}function R(){const e=document.querySelector(".search-form");e&&e.classList.add("is-hidden")}function le(){document.querySelectorAll(".filter-tab").forEach(e=>{e.classList.toggle("is-active",e.dataset.filter===n.activeFilter)})}(async function(){h&&(n.currentPage=1,B(),R(),await S())})();async function S(){try{const e=await Z({filter:n.activeFilter,page:n.currentPage,limit:n.filtersPerPage});n.totalPages=e.totalPages,ee(e.results),O()}catch(e){console.error(e)}}const de="https://your-energy.b.goit.study/api";async function ue(e){const t=await fetch(`${de}/exercises/${e}`);if(!t.ok)throw new Error("Exercises fetch error");return t.json()}function fe(e){const t=Math.round(e);return Array.from({length:5},(r,o)=>`<span class="modal__star ${o<t?"is-active":""}">★</span>`).join("")}const j="favorites";function b(){const e=localStorage.getItem(j);return e?JSON.parse(e):[]}function ge(e){return b().includes(e)}function T(e){const t=b(),r=t.indexOf(e);return r===-1?t.push(e):t.splice(r,1),localStorage.setItem(j,JSON.stringify(t)),t}function N(e,t){ge(t)?(e.textContent="Remove from favorites ♥",e.classList.add("is-active")):(e.textContent="Add to favorites ♡",e.classList.remove("is-active"))}function ye(e,t){const r=e.querySelector(".modal-gif");r.src=t.gifUrl,r.alt=t.name,e.querySelector(".modal-title").textContent=a(t.name),e.querySelector(".modal-description").textContent=a(t.description),e.querySelector(".modal-bodypart").textContent=a(t.bodyPart),e.querySelector(".modal-equipment").textContent=a(t.equipment),e.querySelector(".modal-target").textContent=a(t.target),e.querySelector(".modal-popularity").textContent=t.popularity??"—",e.querySelector(".modal-calories").textContent=t.burnedCalories??"—",e.querySelector(".modal-time").textContent=t.time?`${t.time} min`:"—";const o=typeof t.rating=="number"?t.rating:0;e.querySelector(".modal-rating").innerHTML=`
    <span class="modal__rating-value">${o.toFixed(1)}</span>
    <div class="modal__stars">
      ${fe(o)}
    </div>
  `;const s=e.querySelector(".js-favorite-btn");N(s,n.currentExerciseId)}const d=document.querySelector(".modal"),q=document.querySelector(".exercises")||document.querySelector(".favorites-list");async function me(e){const t=e.target.closest(".start-btn");if(t)try{n.currentExerciseId=t.dataset.id;const r=await ue(n.currentExerciseId);ye(d,r),x()}catch(r){console.error(r)}}q&&q.addEventListener("click",me);function x(){d.classList.remove("is-hidden"),document.body.style.overflow="hidden"}function U(){d.classList.add("is-hidden"),document.body.style.overflow=""}d&&d.addEventListener("click",e=>{const t=e.target.closest(".js-favorite-btn");if(t){T(n.currentExerciseId),N(t,n.currentExerciseId);return}(e.target.classList.contains("modal__backdrop")||e.target.classList.contains("modal__close"))&&U()});const pe="https://your-energy.b.goit.study/api";async function he(e,t){const r=await fetch(`${pe}/exercises/${e}/rating`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!r.ok){const o=await r.json();throw new Error(o.message||"Rating error")}return r.json()}const g=document.querySelector(".rating-modal"),D=document.querySelector(".rating-modal__stars"),E=document.querySelector(".rating-modal__form");let l=0;document.querySelector(".btn-outline")&&document.querySelector(".btn-outline").addEventListener("click",()=>{ve(),U()});g&&g.addEventListener("click",e=>{(e.target.classList.contains("rating-modal__backdrop")||e.target.classList.contains("rating-modal__close"))&&(H(),x())});function ve(){g.classList.remove("is-hidden"),document.body.style.overflow="hidden"}function H(){g.classList.add("is-hidden"),document.body.style.overflow=""}D.addEventListener("click",e=>{const t=e.target.closest("[data-star]");t&&(l=Number(t.dataset.star),Se(l))});function Se(e){D.querySelectorAll("button").forEach(r=>{const o=Number(r.dataset.star);r.classList.toggle("is-active",o<=e)})}E.addEventListener("submit",async e=>{var o;if(e.preventDefault(),!l||l<1||l>5)return;const t=new FormData(E),r={rate:l,email:t.get("email"),review:((o=t.get("review"))==null?void 0:o.trim())||" "};await he(n.currentExerciseId,r),H(),x()});const m=document.querySelector(".search-form");m&&m.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(m).get("keyword").trim();!t||!n.selectedCategory||v(n.activeFilter,n.selectedCategory,1,t)});const $=document.querySelector(".pagination-list");$&&$.addEventListener("click",e=>{const t=e.target.closest(".pagination-btn");if(!t)return;const r=Number(t.dataset.page);n.currentPage=r,n.activeFilter&&n.selectedCategory?v(n.activeFilter,n.selectedCategory,r):S()});const be="https://your-energy.b.goit.study/api";async function xe(e){const t=await fetch(`${be}/subscription`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})}),r=await t.json();if(!t.ok)throw new Error(r.message||"Subscription error");return r}const C=document.querySelector(".footer__form"),_e=document.querySelector(".subscription__input");C&&C.addEventListener("submit",async e=>{e.preventDefault();const t=_e.value.trim();if(t)try{const r=await xe(t)}catch(r){alert(r.message)}});const Q=document.querySelector(".favorites-list"),P=document.querySelector(".favorites-empty-message");async function J(){if(!Q)return;const e=b();if(e.length===0){Le();return}try{const t=e.map(o=>re(o)),r=await Promise.all(t);we(r)}catch(t){console.error("Error fetching favorites:",t)}}function Le(){P&&(P.style.display="block")}function we(e){const t=e.map(r=>`
    <li class="exercise-card favorite-card" data-id="${r._id}">
      <div class="exercise-card__header">
        <div class="exercise-card__meta">
          <span class="exercise-card__badge">WORKOUT</span>
        </div>

        <button class="favorite-btn--trash" data-id="${r._id}" aria-label="Remove">
          <svg width="16" height="16">
            <use href="./img/icons/trash.svg#trash"></use> 
          </svg>
        </button>

        <button class="exercise-card__start start-btn" data-id="${r._id}">
            Start
            <svg width="14" height="14">
              <use href="./img/icons/icon.svg#arrow"></use>
            </svg>
        </button>
      </div>

      <div class="exercise-card__title-row">
        <div class="exercise-icon-wrapper">
             <svg width="24" height="24">
                <use href="./img/icons/human.svg#icon-human"></use>
            </svg>
        </div>
        <h3 class="exercise-card__title">${a(r.name)}</h3>
      </div>

      <p class="exercise-card__info">
        <span class="info-item">Burned calories: <span class="info-value">${r.burnedCalories} / ${r.time} min</span></span>
        <span class="info-item">Body part: <span class="info-value">${a(r.bodyPart)}</span></span>
        <span class="info-item">Target: <span class="info-value">${a(r.target)}</span></span>
      </p>
    </li>
  `).join("");Q.innerHTML=t,document.querySelectorAll(".favorite-btn--trash").forEach(r=>{r.addEventListener("click",qe)})}async function qe(e){const t=e.target.closest(".favorite-btn--trash");if(!t)return;const r=t.dataset.id;T(r),await J()}document.querySelector(".favorites-list")&&J();const p=window.location.pathname,Ee=document.querySelectorAll(".header__nav-link");Ee.forEach(e=>{e.getAttribute("href")==="./index.html"&&(p==="/"||p.endsWith("index.html"))||p.endsWith(e.getAttribute("href").replace("./",""))?e.classList.add("is-active"):e.classList.remove("is-active")});
//# sourceMappingURL=main-BLiaQGoG.js.map
