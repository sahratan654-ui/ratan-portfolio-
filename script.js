const menu=document.getElementById("menu"),nav=document.getElementById("nav");
menu.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(e=>observer.observe(e));
const sections=document.querySelectorAll("section[id]"),links=document.querySelectorAll("#nav a");
window.addEventListener("scroll",()=>{let c="";sections.forEach(s=>{if(scrollY>=s.offsetTop-180)c=s.id});links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+c))});
const dateInput=document.querySelector('input[name="date"]');
const today=new Date(); dateInput.min=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().split("T")[0];

document.getElementById("appointmentForm").addEventListener("submit",function(e){
  e.preventDefault();
  const data=new FormData(this);
  const subject=encodeURIComponent("Appointment request from "+data.get("name"));
  const body=encodeURIComponent(
    "Name: "+data.get("name")+"\n"+
    "Email: "+data.get("email")+"\n"+
    "Preferred date: "+data.get("date")+"\n"+
    "Preferred time: "+data.get("time")+"\n"+
    "Meeting type: "+data.get("type")+"\n\n"+
    "Message:\n"+data.get("message")
  );
  const toast=document.getElementById("toast");
  toast.textContent="Form checked. Replace your email address in the code to send requests to your inbox.";
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),5000);
  // After hosting, replace the placeholder email below with your real email.
  // window.location.href="mailto:your-email@example.com?subject="+subject+"&body="+body;
});
