/*
  C.G Bhaiya.com Diwali site.
  Add your Firebase web config below to enable consent-based visitor records.
  For a simple first setup, view records in Firebase Console > Firestore Database.
*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// 1) Replace values with Firebase Console > Project settings > Your apps > Web app config.
const firebaseConfig = {
  apiKey: "PASTE_YOUR_FIREBASE_API_KEY",
  authDomain: "PASTE_YOUR_PROJECT.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID"
};
// Change this to your real public Facebook profile/page URL.
const FACEBOOK_URL = "https://www.facebook.com/";
document.getElementById("facebookLink").href = FACEBOOK_URL;

const nameInput=document.getElementById("visitorName"), consent=document.getElementById("consent");
const greeting=document.getElementById("greeting"), statusEl=document.getElementById("status");
const modal=document.getElementById("modal"), giftResult=document.getElementById("giftResult");
let visitorName="", started=false, db=null;
const firebaseReady = firebaseConfig.apiKey.startsWith("AIza") &&
  !firebaseConfig.projectId.startsWith("PASTE_") &&
  !firebaseConfig.appId.startsWith("PASTE_");
if(firebaseReady){try{db=getFirestore(initializeApp(firebaseConfig));}catch(e){console.error("Firebase init error",e);}}

function fireworks(amount=85){
 const canvas=document.getElementById("fireworks"),ctx=canvas.getContext("2d"),dpr=Math.min(devicePixelRatio||1,2);
 canvas.width=innerWidth*dpr;canvas.height=innerHeight*dpr;canvas.style.width=innerWidth+"px";canvas.style.height=innerHeight+"px";ctx.setTransform(dpr,0,0,dpr,0,0);
 const colors=["#ffd166","#ff6bcb","#7cf7ff","#fff","#9cff8a","#ff914d"],parts=[];
 for(let b=0;b<Math.max(2,Math.floor(amount/22));b++){let x=innerWidth*(.12+Math.random()*.76),y=innerHeight*(.12+Math.random()*.5),n=25+Math.floor(Math.random()*25);for(let i=0;i<n;i++){let a=Math.PI*2*i/n,s=1.2+Math.random()*4.5;parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:45+Math.random()*30,c:colors[Math.floor(Math.random()*colors.length)],r:1+Math.random()*2});}}
 let frame=0;function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);for(const p of parts){if(p.life<=0)continue;p.x+=p.vx;p.y+=p.vy;p.vy+=.035;p.vx*=.985;p.vy*=.985;p.life--;ctx.globalAlpha=Math.max(0,p.life/65);ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;if(++frame<90)requestAnimationFrame(draw);else ctx.clearRect(0,0,innerWidth,innerHeight);}draw();
}
function showModal(title,message){document.getElementById("modalTitle").textContent=title;document.getElementById("modalText").textContent=message;modal.hidden=false;fireworks(110);}
function closeModal(){modal.hidden=true;}

// Save only if user checks the consent box. No phone number or precise location is collected.
async function recordVisit(){
 if(!consent.checked || !visitorName || !db) return;
 try{
  await addDoc(collection(db,"diwaliVisits"),{
   name:visitorName,
   consent:true,
   consentTextVersion:"2026-10-v1",
   createdAt:serverTimestamp(),
   page:"diwali-gifts"
  });
  statusEl.textContent="धन्यवाद! आपकी सहमति के साथ विज़िट रिकॉर्ड हो गई।";
 }catch(err){
  console.error("Visitor record failed:",err);
  statusEl.textContent="गिफ्ट चल रहा है, लेकिन रिकॉर्ड सेव नहीं हुआ। Firebase सेटअप और Rules जाँचें।";
 }
}
function start(){
 const value=nameInput.value.trim();
 if(!value){nameInput.focus();nameInput.placeholder="पहले अपना नाम लिखें 😊";return;}
 if(consent.checked && value.length<2){showModal("नाम जाँचें","कृपया अपना नाम थोड़ा पूरा लिखें।");return;}
 visitorName=value;started=true;
 greeting.textContent=`🎇 ${visitorName} जी, आपको और आपके परिवार को दिवाली की हार्दिक शुभकामनाएँ!`;
 fireworks(100);
 if(consent.checked){
  if(db) recordVisit();
  else statusEl.textContent="सहमति चुनी गई, लेकिन रिकॉर्डिंग चालू करने के लिए Firebase config भरना बाकी है।";
 } else statusEl.textContent="आपने नाम रिकॉर्ड करने की सहमति नहीं दी है। आप फिर भी गिफ्ट खोल सकते हैं।";
 showModal(`Happy Diwali, ${visitorName}! 🪔`,"आपकी जिंदगी खुशियों, सेहत, प्यार और तरक्की की रोशनी से जगमगाती रहे। नीचे किसी भी गिफ्ट पर टैप करें!");
}
document.getElementById("startBtn").addEventListener("click",start);
nameInput.addEventListener("keydown",e=>{if(e.key==="Enter")start();});
const gifts = [
 {icon:"🎁", title:"सरप्राइज़ बॉक्स खुल गया!", wish:"आपके घर में खुशियों और हँसी की बरसात हो! 🌟"},
 {icon:"🧧", title:"शुभ लाल लिफाफा खुल गया!", wish:"आपके हर काम में सफलता और नई उम्मीद मिले! 🧧"},
 {icon:"💝", title:"प्यार का गिफ्ट खुल गया!", wish:"आपके परिवार और दोस्तों के बीच प्यार हमेशा बना रहे! 💝"},
 {icon:"🪙", title:"समृद्धि का गिफ्ट खुल गया!", wish:"आपके जीवन में सुख, शांति और तरक्की आए! 🪙"}
];
document.querySelectorAll(".gift").forEach(btn=>btn.addEventListener("click",()=>{
 if(!started){nameInput.focus();showModal("पहले अपना नाम लिखें 🪔","अपना नाम लिखकर शुभकामनाएँ पाएँ दबाएँ। नाम रिकॉर्ड करना वैकल्पिक है।");return;}
 const n=Number(btn.dataset.gift), gift=gifts[n-1];btn.classList.add("opened");giftResult.hidden=false;
 giftResult.textContent=`${gift.icon} ${gift.title} ${gift.wish} — ${visitorName} जी, शुभ दीपावली!`;
 fireworks(115);showModal(`${gift.icon} ${gift.title}`,gift.wish);
}));
document.getElementById("closeModal").addEventListener("click",closeModal);
document.getElementById("okBtn").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});
document.getElementById("shareBtn").addEventListener("click",async()=>{
 const data={title:"C.G Bhaiya.com — Happy Diwali",text:"🎇 आपको और आपके परिवार को दिवाली की हार्दिक शुभकामनाएँ! अपना गिफ्ट खोलें 🪔",url:location.href};
 try{if(navigator.share)await navigator.share(data);else if(navigator.clipboard){await navigator.clipboard.writeText(location.href);alert("लिंक कॉपी हो गया। अब WhatsApp/Facebook पर भेजें।");}else prompt("लिंक कॉपी करें:",location.href);}
 catch(e){if(e.name!=="AbortError")alert("शेयर नहीं हुआ। ब्राउज़र के Share विकल्प से कोशिश करें।");}
});
/* Extra touch fireworks + scroll parallax */
(() => {
  let lastFirework = 0;

  // Screen background पर टैप करने से आतिशबाज़ी
  document.addEventListener("pointerdown", (event) => {
    const target = event.target;

    // Buttons, links और form fields के मौजूदा काम को न रोकें
    if (target.closest("button, a, input, label, textarea, select")) return;

    const now = Date.now();
    if (now - lastFirework < 350) return;
    lastFirework = now;

    if (typeof fireworks === "function") {
      fireworks(65);
    }
  }, { passive: true });

  // Scroll से हल्का parallax effect
  let scheduled = false;

  function updateParallax() {
    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );

    const progress = Math.min(1, window.scrollY / maxScroll);
    const offset = Math.round(progress * 24);

    document.documentElement.style.setProperty(
      "--parallax-y",
      `${offset}px`
    );

    document.querySelectorAll(".ambient").forEach((layer, index) => {
      const direction = index === 0 ? -1 : 1;
      layer.style.transform =
        `translate3d(0, ${window.scrollY * 0.08 * direction}px, 0)`;
    });

    scheduled = false;
  }

  window.addEventListener("scroll", () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(updateParallax);
  }, { passive: true });

  updateParallax();
})();
/* Rotating Bhaiyalal greeting messages */
(() => {
  const message = document.getElementById("bhaiyaMessage");
  if (!message) return;

  const greetings = [
    "Hi! मैं भैयालाल हूँ! 👦🎁",
    "आप सभी को दीपावली की शुभकामनाएँ! 🪔",
    "मेरे डॉग के गिफ्ट देखिए! 🐕🎁",
    "खुश रहिए, मुस्कुराते रहिए! ✨",
    "Happy Diwali from Bhaiyalal! 🎆"
  ];

  let index = 0;

  window.setInterval(() => {
    index = (index + 1) % greetings.length;
    message.textContent = greetings[index];
  }, 3500);
})();
