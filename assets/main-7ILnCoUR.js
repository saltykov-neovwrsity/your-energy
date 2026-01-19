(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}})();(()=>{const e=document.querySelector(".js-menu-container"),t=document.querySelector(".js-open-menu"),r=document.querySelector(".js-close-menu"),i=()=>{const s=t.getAttribute("aria-expanded")==="true"||!1;t.setAttribute("aria-expanded",!s),e.classList.toggle("is-open"),document.body.classList.toggle("no-scroll")};t&&t.addEventListener("click",i),r&&r.addEventListener("click",i),window.matchMedia("(min-width: 768px)").addEventListener("change",s=>{s.matches&&(e.classList.remove("is-open"),t.setAttribute("aria-expanded",!1),document.body.classList.remove("no-scroll"))})})();const W="https://your-energy.b.goit.study/api";async function G(){const e=await fetch(`${W}/quote`);if(!e.ok)throw new Error("Quote fetch error");return e.json()}const P="dailyQuote";function V(){const e=localStorage.getItem(P);return e?JSON.parse(e):null}function Y(e,t){const r=new Date().toISOString().slice(0,10);localStorage.setItem(P,JSON.stringify({quote:e,author:t,date:r}))}const M=document.querySelector(".quote-text"),A=document.querySelector(".quote-author");function z({quote:e,author:t}){M.textContent=e,A.textContent=t}async function X(){const e=V(),t=new Date().toISOString().slice(0,10);if(e&&e.date===t){z(e);return}try{const r=await G();M.textContent=r.quote,A.textContent=r.author,Y(r.quote,r.author)}catch(r){console.error(r)}}X();const Z="https://your-energy.b.goit.study/api";async function ee({filter:e,page:t=1,limit:r=12}){const i=new URLSearchParams({filter:e,page:t,limit:r}),s=await fetch(`${Z}/filters?${i}`);if(!s.ok)throw new Error("Filters fetch error");return s.json()}function c(e){return e?e.charAt(0).toUpperCase()+e.slice(1):""}function te(e){const t=document.querySelector(".filters-content");t&&(t.innerHTML=e.map(r=>`
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
      `).join(""))}const n={activeFilter:"Muscles",selectedCategory:null,currentExerciseId:null,currentPage:1,totalPages:1},f=5;function I(){const e=document.querySelector(".pagination-list");if(!e)return;const{totalPages:t,currentPage:r}=n;if(t<=1){e.innerHTML="";return}const i=Math.floor(f/2);let s=Math.max(1,r-i),o=Math.min(t,s+f-1);o-s+1<f&&(s=Math.max(1,o-f+1));let a="";s>1&&(a+=p(1),s>2&&(a+=b()));for(let u=s;u<=o;u++)a+=p(u,u===r);o<t&&(o<t-1&&(a+=b()),a+=p(t)),e.innerHTML=a}function p(e,t=!1){return`
    <li>
      <button
        class="pagination-btn ${t?"is-active":""}"
        data-page="${e}"
        ${t?"disabled":""}
      >
        ${e}
      </button>
    </li>
  `}function b(){return'<li class="pagination-dots">…</li>'}const O="https://your-energy.b.goit.study/api";async function re(e){const t=await fetch(`${O}/exercises?${e}`);if(!t.ok)throw new Error("Exercises fetch error");return t.json()}async function se(e){const t=await fetch(`${O}/exercises/${e}`);if(!t.ok)throw new Error("Exercise fetch error");return t.json()}function ne(e){const t=document.querySelector(".exercises-list");t&&(t.innerHTML=e.map(r=>`
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
      `).join(""))}function k(){return window.innerWidth<768?{filters:9,exercises:8}:{filters:12,exercises:10}}async function v(e,t,r=1,i=""){try{n.currentPage=r;const s=k(),o=new URLSearchParams({page:n.currentPage,limit:s.exercises});e==="Muscles"&&o.append("muscles",t),e==="Body parts"&&o.append("bodypart",t),e==="Equipment"&&o.append("equipment",t),i&&o.append("keyword",i);const a=await re(o.toString());n.totalPages=a.totalPages,ne(a.results),I()}catch(s){console.error(s)}}const h=document.querySelector(".filters"),w=document.querySelector(".filters-content"),B=document.querySelector(".subcategory-span"),L=document.querySelector(".filters-list");function ie(e){console.log("Filter container clicked:",e.target)}L&&L.addEventListener("click",ie);h&&h.addEventListener("click",async e=>{const t=e.target.closest(".filter-tab");t&&(n.activeFilter=t.dataset.filter,n.selectedCategory=null,n.currentPage=1,de(),ae(),R(),j(),B.textContent="",await _())});w&&w.addEventListener("click",e=>{const t=e.target.closest(".filter-item");t&&(n.selectedCategory=t.dataset.value,B.textContent=` / ${n.selectedCategory}`,oe(),ce(),le(),v(n.activeFilter,n.selectedCategory))});function oe(){const e=document.querySelector(".filters-content");e&&e.classList.add("is-hidden")}function ae(){const e=document.querySelector(".filters-content");e&&e.classList.remove("is-hidden")}function ce(){const e=document.querySelector(".exercises");e&&e.classList.remove("is-hidden")}function R(){const e=document.querySelector(".exercises");e&&e.classList.add("is-hidden")}function le(){const e=document.querySelector(".search-form");e&&e.classList.remove("is-hidden")}function j(){const e=document.querySelector(".search-form");e&&e.classList.add("is-hidden")}function de(){document.querySelectorAll(".filter-tab").forEach(e=>{e.classList.toggle("is-active",e.dataset.filter===n.activeFilter)})}(async function(){h&&(n.currentPage=1,R(),j(),await _())})();async function _(){try{const e=k(),t=await ee({filter:n.activeFilter,page:n.currentPage,limit:e.filters});n.totalPages=t.totalPages,te(t.results),I()}catch(e){console.error(e)}}const ue="https://your-energy.b.goit.study/api";async function fe(e){const t=await fetch(`${ue}/exercises/${e}`);if(!t.ok)throw new Error("Exercises fetch error");return t.json()}function ge(e){const t=Math.round(e);return Array.from({length:5},(r,i)=>`<span class="modal__star ${i<t?"is-active":""}">★</span>`).join("")}const T="favorites";function x(){const e=localStorage.getItem(T);return e?JSON.parse(e):[]}function pe(e){return x().includes(e)}function N(e){const t=x(),r=t.indexOf(e);return r===-1?t.push(e):t.splice(r,1),localStorage.setItem(T,JSON.stringify(t)),t}function U(e,t){pe(t)?(e.textContent="Remove from favorites ♥",e.classList.add("is-active")):(e.textContent="Add to favorites ♡",e.classList.remove("is-active"))}function me(e,t){const r=e.querySelector(".modal-gif");r.src=t.gifUrl,r.alt=t.name,e.querySelector(".modal-title").textContent=c(t.name),e.querySelector(".modal-description").textContent=c(t.description),e.querySelector(".modal-bodypart").textContent=c(t.bodyPart),e.querySelector(".modal-equipment").textContent=c(t.equipment),e.querySelector(".modal-target").textContent=c(t.target),e.querySelector(".modal-popularity").textContent=t.popularity??"—",e.querySelector(".modal-calories").textContent=t.burnedCalories??"—",e.querySelector(".modal-time").textContent=t.time?`${t.time} min`:"—";const i=typeof t.rating=="number"?t.rating:0;e.querySelector(".modal-rating").innerHTML=`
    <span class="modal__rating-value">${i.toFixed(1)}</span>
    <div class="modal__stars">
      ${ge(i)}
    </div>
  `;const s=e.querySelector(".js-favorite-btn");U(s,n.currentExerciseId)}const d=document.querySelector(".modal"),q=document.querySelector(".exercises")||document.querySelector(".favorites-list");async function ye(e){const t=e.target.closest(".start-btn");if(t)try{n.currentExerciseId=t.dataset.id;const r=await fe(n.currentExerciseId);me(d,r),S()}catch(r){console.error(r)}}q&&q.addEventListener("click",ye);function S(){d.classList.remove("is-hidden"),document.body.style.overflow="hidden"}function D(){d.classList.add("is-hidden"),document.body.style.overflow=""}d&&d.addEventListener("click",e=>{const t=e.target.closest(".js-favorite-btn");if(t){N(n.currentExerciseId),U(t,n.currentExerciseId);return}(e.target.classList.contains("modal__backdrop")||e.target.classList.contains("modal__close"))&&D()});const he="https://your-energy.b.goit.study/api";async function ve(e,t){const r=await fetch(`${he}/exercises/${e}/rating`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!r.ok){const i=await r.json();throw new Error(i.message||"Rating error")}return r.json()}const g=document.querySelector(".rating-modal"),H=document.querySelector(".rating-modal__stars"),E=document.querySelector(".rating-modal__form");let l=0;document.querySelector(".btn-outline")&&document.querySelector(".btn-outline").addEventListener("click",()=>{_e(),D()});g&&g.addEventListener("click",e=>{(e.target.classList.contains("rating-modal__backdrop")||e.target.classList.contains("rating-modal__close"))&&(Q(),S())});function _e(){g.classList.remove("is-hidden"),document.body.style.overflow="hidden"}function Q(){g.classList.add("is-hidden"),document.body.style.overflow=""}H.addEventListener("click",e=>{const t=e.target.closest("[data-star]");t&&(l=Number(t.dataset.star),xe(l))});function xe(e){H.querySelectorAll("button").forEach(r=>{const i=Number(r.dataset.star);r.classList.toggle("is-active",i<=e)})}E.addEventListener("submit",async e=>{var i;if(e.preventDefault(),!l||l<1||l>5)return;const t=new FormData(E),r={rate:l,email:t.get("email"),review:((i=t.get("review"))==null?void 0:i.trim())||" "};await ve(n.currentExerciseId,r),Q(),S()});const m=document.querySelector(".search-form");m&&m.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(m).get("keyword").trim();!t||!n.selectedCategory||v(n.activeFilter,n.selectedCategory,1,t)});const $=document.querySelector(".pagination-list");$&&$.addEventListener("click",e=>{const t=e.target.closest(".pagination-btn");if(!t)return;const r=Number(t.dataset.page);n.currentPage=r,n.activeFilter&&n.selectedCategory?v(n.activeFilter,n.selectedCategory,r):_()});const Se="https://your-energy.b.goit.study/api";async function be(e){const t=await fetch(`${Se}/subscription`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})}),r=await t.json();if(!t.ok)throw new Error(r.message||"Subscription error");return r}const C=document.querySelector(".footer__form"),we=document.querySelector(".subscription__input");C&&C.addEventListener("submit",async e=>{e.preventDefault();const t=we.value.trim();if(t)try{const r=await be(t)}catch(r){alert(r.message)}});const J=document.querySelector(".favorites-list"),F=document.querySelector(".favorites-empty-message");async function K(){if(!J)return;const e=x();if(e.length===0){Le();return}try{const t=e.map(i=>se(i)),r=await Promise.all(t);qe(r)}catch(t){console.error("Error fetching favorites:",t)}}function Le(){F&&(F.style.display="block")}function qe(e){const t=e.map(r=>`
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
        <h3 class="exercise-card__title">${c(r.name)}</h3>
      </div>

      <p class="exercise-card__info">
        <span class="info-item">Burned calories: <span class="info-value">${r.burnedCalories} / ${r.time} min</span></span>
        <span class="info-item">Body part: <span class="info-value">${c(r.bodyPart)}</span></span>
        <span class="info-item">Target: <span class="info-value">${c(r.target)}</span></span>
      </p>
    </li>
  `).join("");J.innerHTML=t,document.querySelectorAll(".favorite-btn--trash").forEach(r=>{r.addEventListener("click",Ee)})}async function Ee(e){const t=e.target.closest(".favorite-btn--trash");if(!t)return;const r=t.dataset.id;N(r),await K()}document.querySelector(".favorites-list")&&K();const y=window.location.pathname,$e=document.querySelectorAll(".header__nav-link");$e.forEach(e=>{e.getAttribute("href")==="./index.html"&&(y==="/"||y.endsWith("index.html"))||y.endsWith(e.getAttribute("href").replace("./",""))?e.classList.add("is-active"):e.classList.remove("is-active")});
//# sourceMappingURL=main-7ILnCoUR.js.map
