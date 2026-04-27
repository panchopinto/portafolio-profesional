const $=s=>document.querySelector(s);document.getElementById('year').textContent=new Date().getFullYear();
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')}),{threshold:.15});document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
$('#themeBtn').onclick=()=>{document.documentElement.dataset.theme=document.documentElement.dataset.theme==='dark'?'light':'dark'};
let fs=16;$('#fontUp').onclick=()=>{fs=Math.min(fs+1,22);document.documentElement.style.setProperty('--fs',fs+'px')};$('#fontDown').onclick=()=>{fs=Math.max(fs-1,14);document.documentElement.style.setProperty('--fs',fs+'px')};
$('#contrastBtn').onclick=()=>document.body.classList.toggle('high-contrast');
$('#speakBtn').onclick=()=>{speechSynthesis.cancel();const text=document.body.innerText.replace(/\s+/g,' ').slice(0,2500);const u=new SpeechSynthesisUtterance(text);u.lang='es-CL';speechSynthesis.speak(u)};
if('serviceWorker' in navigator){navigator.serviceWorker.register('service-worker.js').catch(()=>{});}
