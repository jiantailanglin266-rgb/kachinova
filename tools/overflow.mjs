import puppeteer from 'puppeteer-core';
const CHROME='C:/Program Files/Google/Chrome/Application/chrome.exe';
let t=process.argv[2]||'/'; if(!t.startsWith('/'))t='/'+t;
const w=parseInt(process.argv[3]||'390',10);
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--hide-scrollbars'],defaultViewport:{width:w,height:844}});
const p=await b.newPage();
const BASE=process.env.BASE_URL||'http://localhost:4477';
await p.goto(BASE+t,{waitUntil:'networkidle2'});
await p.evaluate(()=>document.fonts.ready);
const r=await p.evaluate((vw)=>{
  document.documentElement.style.overflowX='visible';
  document.body.style.overflowX='visible';
  const out=[];
  document.querySelectorAll('body *').forEach(el=>{
    const cs=getComputedStyle(el);
    if(cs.position==='fixed')return;
    const b=el.getBoundingClientRect();
    if(b.right>vw+1||b.left<-1){
      // ignore if an ancestor clips it
      let a=el.parentElement,clipped=false;
      while(a){const s=getComputedStyle(a);if(/hidden|clip|auto|scroll/.test(s.overflowX)){clipped=true;break;}a=a.parentElement;}
      if(!clipped)out.push(`${el.tagName.toLowerCase()}.${(el.className||'').toString().trim().split(/\s+/)[0]} L${Math.round(b.left)} R${Math.round(b.right)} "${(el.textContent||'').trim().slice(0,28)}"`);
    }
  });
  const secs=[];
  document.querySelectorAll('main > *, main > * > *, footer, header').forEach(el=>{
    if(el.scrollWidth>vw+1) secs.push(`${el.tagName.toLowerCase()}.${(el.className||'').toString().trim().split(/\s+/)[0]}#${el.id||'-'} scrollW=${el.scrollWidth}`);
  });
  return {sw:document.documentElement.scrollWidth,out:[...new Set(out)].slice(0,12),secs:[...new Set(secs)].slice(0,12)};
},w);
console.log(t,'@',w,'scrollWidth',r.sw);
r.out.forEach(x=>console.log('    el',x));
(r.secs||[]).forEach(x=>console.log('    sec',x));
await b.close();
