const PHONE_DISPLAY="07 00 00 00 00";
const PHONE_TEL="+33700000000";
function setPhone(){
  ["callTop","callBottom","callSticky"].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.href=`tel:${PHONE_TEL}`;
  });
  const bottom=document.getElementById("callBottom");
  if(bottom) bottom.textContent=PHONE_DISPLAY;
  const sticky=document.getElementById("callSticky");
  if(sticky){
    const n=sticky.querySelector(".callNumber");
    if(n) n.textContent=PHONE_DISPLAY;
  }
}
function setupDrawer(){
  const burger=document.querySelector(".burger");
  const drawer=document.getElementById("drawer");
  const closeBtn=document.querySelector(".drawerClose");
  const backdrop=document.querySelector(".drawerBackdrop");
  const open=()=>{drawer.classList.add("isOpen");drawer.setAttribute("aria-hidden","false");burger.setAttribute("aria-expanded","true");};
  const close=()=>{drawer.classList.remove("isOpen");drawer.setAttribute("aria-hidden","true");burger.setAttribute("aria-expanded","false");};
  burger?.addEventListener("click",open);
  closeBtn?.addEventListener("click",close);
  backdrop?.addEventListener("click",close);
  drawer?.querySelectorAll("a[href^='#']").forEach(a=>a.addEventListener("click",close));
}
window.handleQuote=function(ev){
  ev.preventDefault();
  const fd=new FormData(ev.target);
  const subject=encodeURIComponent("Demande de devis / dépannage - SOS Plomberie 66");
  const body=encodeURIComponent(`Nom: ${fd.get("name")}\nTéléphone: ${fd.get("phone")}\n\nDemande:\n${fd.get("msg")}\n`);
  window.location.href=`mailto:contact@sosplomberie66.fr?subject=${subject}&body=${body}`;
  return false;
}
document.getElementById("year").textContent=new Date().getFullYear();
setPhone();setupDrawer();
