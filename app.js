let COURSE;const CID=(new URLSearchParams(location.search).get('c')||'').replace(/[^a-z0-9-]/g,'');
const $=s=>document.querySelector(s),app=$('#app'),E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const DIS='Insignia de autoformación de Inteliun, sin verificación externa. NO es una certificación oficial ni está relacionada con ISO, ENAC, AENOR, IRCA, AEM ni otras entidades.';
let S={};
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const prep=()=>shuffle(COURSE.modules.flatMap(m=>m.questions.map(q=>({m:m.title,q:q.q,e:q.explain,o:shuffle(q.options.map((t,i)=>({t,ok:i===q.answer})))}))));
const level=p=>p>=1?{n:'ORO',s:3,a:'#ffe27a',b:'#c98a00'}:p>=.9?{n:'PLATA',s:2,a:'#f4f6f8',b:'#8d99a6'}:{n:'BRONCE',s:1,a:'#f6b985',b:'#a8561b'};
const star=(x,y,R,f,c)=>`<polygon points="${[...Array(10)].map((_,i)=>{const r=i%2?R*.45:R,a=Math.PI*i/5-Math.PI/2;return(x+r*Math.cos(a)).toFixed(1)+','+(y+r*Math.sin(a)).toFixed(1)})}" fill="${f?c:'none'}" stroke="${c}" stroke-width="1.5" opacity="${f?1:.5}"/>`;
const gear=(cx,cy,r)=>`<polygon points="${[...Array(8).keys()].flatMap(k=>[-14,-9,9,14].map((d,j)=>{const a=(k*45+d)*Math.PI/180,rr=j%3?r:r*.8;return(cx+rr*Math.cos(a)).toFixed(1)+','+(cy+rr*Math.sin(a)).toFixed(1)}))}" fill="url(#m)"/><circle cx="${cx}" cy="${cy}" r="${r*.62}" fill="url(#m)"/><circle cx="${cx}" cy="${cy}" r="${r*.3}" fill="#12307a"/>`;
function wrap(t,n){const w=t.split(' '),l=[''];w.forEach(x=>{const k=l.length-1;(l[k]+' '+x).trim().length>n?l.push(x):l[k]=(l[k]+' '+x).trim()});return l.slice(0,3)}
const sha=async s=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))].map(b=>b.toString(16).padStart(2,'0')).join('');
function badge(title,name,date,score,total,url,h){
 const L=level(score/total),t=wrap(title,19).map((s,i)=>`<text x="200" y="${214+i*22}" text-anchor="middle" font-size="19" font-weight="700" fill="#fff">${E(s)}</text>`).join('');
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" font-family="Helvetica,Arial,sans-serif" role="img" aria-label="${E(title)}">
<defs><linearGradient id="m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${L.a}"/><stop offset="1" stop-color="${L.b}"/></linearGradient>
<radialGradient id="b" cx=".5" cy=".3" r=".9"><stop offset="0" stop-color="#2f6bff"/><stop offset="1" stop-color="#0a1f5c"/></radialGradient></defs>
<rect width="400" height="400" fill="#fff"/><circle cx="200" cy="190" r="172" fill="url(#m)"/><circle cx="200" cy="190" r="158" fill="url(#b)"/>
<circle cx="200" cy="190" r="146" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="3" stroke-dasharray="2 7"/>
<text x="200" y="74" text-anchor="middle" font-size="12" letter-spacing="4" fill="${L.a}">INTELIUN</text>
${gear(200,116,36)}${[0,1,2].map(i=>star(166+i*34,170,11,i<L.s,L.a)).join('')}${t}
<text x="200" y="284" text-anchor="middle" font-size="15" fill="#dbe7ff">${E(name)}</text>
<text x="200" y="303" text-anchor="middle" font-size="12" fill="#b9ccff">${E(date)} · ${score}/${total}</text>
<polygon points="68,334 332,334 348,354 332,374 68,374 52,354" fill="url(#m)" stroke="#0a1f5c" stroke-width="2"/>
<text x="200" y="360" text-anchor="middle" font-size="13" font-weight="700" letter-spacing="1" fill="#1b1b1b">NIVEL ${L.n} · INTELIUN</text><text x="200" y="392" text-anchor="middle" font-size="10" fill="#666" font-family="monospace">ID ${h.slice(0,16)}</text></svg>`}
const bar=()=>`<div class="bar"><i style="width:${S.i/S.qs.length*100}%"></i></div>`;
function intro(){app.innerHTML=`<h1>${E(COURSE.title)}</h1><p>${E(COURSE.description)}</p><div class="warn">${DIS}</div><h3>Datos de la insignia</h3><label>Nombre que aparecerá en la insignia (puedes usar un alias o solo tus iniciales)<input id="n"></label><button id="go">Empezar curso</button>`;
 $('#go').onclick=()=>{const n=$('#n').value.trim();if(!n)return $('#n').focus();S={name:n,gh:'',qs:prep(),i:0,score:0,wrong:[]};study()}}
function study(){app.innerHTML=COURSE.modules.map(m=>`<h2>${E(m.title)}</h2><ul>${m.study.map(s=>`<li>${E(s)}</li>`).join('')}</ul>`).join('')+`<button id="ex">Hacer el examen (${S.qs.length} preguntas)</button>`;$('#ex').onclick=ask}
function ask(){if(S.i>=S.qs.length)return result();const q=S.qs[S.i];
 app.innerHTML=`${bar()}<p><small>${S.i+1}/${S.qs.length} · ${E(q.m)}</small></p><h3>${E(q.q)}</h3>`+q.o.map((o,i)=>`<button class="opt" data-i="${i}">${E(o.t)}</button>`).join('')+'<div id="fb"></div>';
 document.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{const o=q.o[b.dataset.i];document.querySelectorAll('.opt').forEach((x,i)=>{x.disabled=true;if(q.o[i].ok)x.classList.add('ok')});
  if(o.ok)S.score++;else{b.classList.add('ko');S.wrong.push(q)}S.i++;
  $('#fb').innerHTML=`<p>${o.ok?'✅ Correcto.':'❌ Incorrecto.'} ${E(q.e||'')}</p><button id="nx">${S.i<S.qs.length?'Siguiente':'Ver resultado'}</button>`;$('#nx').onclick=ask})}
function download(name,data,type){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([data],{type}));a.download=name;a.click()}
async function result(){const t=S.qs.length,p=S.score/t,ok=p>=COURSE.pass_ratio,pct=Math.round(p*100);
 if(!ok){app.innerHTML=`<h2>Resultado: ${S.score}/${t} (${pct} %)</h2><p>Necesitas al menos un ${COURSE.pass_ratio*100} %. No se ha generado insignia.</p><h3>Repaso de fallos</h3>`+S.wrong.map(q=>`<p><b>${E(q.q)}</b><br>Correcta: ${E(q.o.find(o=>o.ok).t)}<br><small>${E(q.e||'')}</small></p>`).join('')+'<button id="re">Repasar y reintentar</button>';return $('#re').onclick=intro}
 const L=level(p),d=new Date().toISOString().slice(0,10),nonce=[...crypto.getRandomValues(new Uint8Array(16))].map(b=>b.toString(16).padStart(2,'0')).join('');
 const f=[COURSE.id,COURSE.version,S.name,S.gh,d,`${S.score}/${t}`,L.n,nonce];let h;
 try{h=await sha(f.join('|'))}catch(e){return app.innerHTML='<p>Tu navegador no permite calcular la huella desde un archivo local. Abre la página desde https (GitHub Pages) o con <code>python -m http.server</code>.</p>'}
 const svg=badge(COURSE.title,S.name,d.split('-').reverse().join('/'),S.score,t,'',h);
 app.innerHTML=`<h2>🎉 ¡Aprobado! ${S.score}/${t} (${pct} %) · Nivel ${L.n}</h2>${svg}<p style="text-align:center"><button id="pdf">Descargar PDF</button><button id="d2" class="s">Descargar PNG</button><button id="d4" class="s">Reiniciar</button></p>
<div class="warn">${DIS}</div><h3>Tu insignia es tuya</h3><p>Inteliun no guarda tus datos. Descarga el PDF, custódialo y cuélgalo donde quieras (por ejemplo en LinkedIn: Destacados o una publicación).</p>`;
 $('#d4').onclick=intro;$('#pdf').onclick=()=>pdf(svg,h,d,L,pct);
 $('#d2').onclick=()=>{const i=new Image();i.onload=()=>{const c=document.createElement('canvas');c.width=800;c.height=800;c.getContext('2d').drawImage(i,0,0,800,800);c.toBlob(b=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='insignia.png';a.click()})};i.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)}}
fetch('cursos/'+CID+'.json').then(r=>r.json()).then(c=>{COURSE=c;intro()}).catch(()=>{app.innerHTML='<h2>Curso no encontrado</h2><p><a href="./">Volver al catálogo</a></p>'});
const ws=s=>String(s).replace(/[^\x20-\x7E\xA0-\xFF]/g,'');
async function pdf(svg,h,d,L,pct){
 const {PDFDocument,StandardFonts,rgb,PDFName,PDFString}=PDFLib,t=S.qs.length;
 const png=await new Promise((ok,ko)=>{const i=new Image();i.onload=()=>{const c=document.createElement('canvas');c.width=c.height=800;c.getContext('2d').drawImage(i,0,0,800,800);c.toBlob(b=>b.arrayBuffer().then(ok),'image/png')};i.onerror=ko;i.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)});
 const doc=await PDFDocument.create(),pg=doc.addPage([595,842]),F=await doc.embedFont(StandardFonts.Helvetica),B=await doc.embedFont(StandardFonts.HelveticaBold),img=await doc.embedPng(png);
 const C=(x,y,s,f=F,c=rgb(.1,.1,.1))=>{x=ws(x);pg.drawText(x,{x:(595-f.widthOfTextAtSize(x,s))/2,y,size:s,font:f,color:c})};
 C('INTELIUN ACADEMY',790,14,B,rgb(.1,.34,.86));C('Insignia de superaci\u00f3n',755,28,B);
 C('Se otorga a',705,12);C(S.name,670,24,B);C('por superar el curso',635,12);C(COURSE.title,605,18,B);
 C(`${d.split('-').reverse().join('/')} \u00b7 Puntuaci\u00f3n ${S.score}/${t} (${pct} %) \u00b7 Nivel ${L.n}`,575,11);
 pg.drawImage(img,{x:117.5,y:190,width:360,height:360});
 wrap(DIS,110).forEach((l,i)=>C(l,150-i*11,8,F,rgb(.35,.35,.35)));
 C('Inteliun no almacena datos personales. ID: '+h,100,6.5,F,rgb(.45,.45,.45));
 doc.setTitle(ws('Insignia Inteliun - '+COURSE.title));doc.setAuthor('Inteliun Academy');doc.setCreator('Inteliun Academy');doc.setSubject(ws(`${COURSE.title} - Nivel ${L.n} - ${S.score}/${t}`));doc.setKeywords(['inteliun','insignia',L.n,...COURSE.tags].map(ws));doc.setCreationDate(new Date());
 const I=doc.getInfoDict();[['InteliunID',h],['Course',COURSE.id+' v'+COURSE.version],['Level',L.n],['Score',S.score+'/'+t],['IssueDate',d]].forEach(([k,v])=>I.set(PDFName.of(k),PDFString.of(v)));
 download('insignia-inteliun-'+COURSE.id+'.pdf',await doc.save(),'application/pdf')}
