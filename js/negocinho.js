let PRODUTOS = [
  {id:'fatia_bolo', nome:'Fatia bolo / doce', preco:10},
  {id:'fatia_torta_doce', nome:'Fatia torta doce', preco:12},
  {id:'fatia_torta_salgada', nome:'Fatia torta salgada', preco:12},
  {id:'torta_inteira', nome:'Torta inteira', preco:60},
  {id:'pao_mel', nome:'Pão de mel', preco:8},
  {id:'sanduiche', nome:'Sanduíche natural', preco:12},
  {id:'salada', nome:'Salada pote', preco:15},
  {id:'outro', nome:'Outro', preco:0},
];
let token = sessionStorage.getItem('suspiroAdminToken') || null;
let SABORES = [];
let filtroNeg = 'tudo';
let DB = { dias: [], pizzas: [], fiados: [], encomendas: [] };

const $ = id => document.getElementById(id);
const BRL = v => (Number(v)||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
// Data local (não UTC) — evita cair no dia anterior no Brasil
const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};
// Backup manual local (sem DB): guarda última cópia no aparelho caso falhe a rede
function backupLocal(key, val){
  try{ localStorage.setItem('negocinho_'+key, JSON.stringify(val)); }catch(e){}
}

function toast(m){ const t=$('toast'); t.textContent=m; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2200); }
function authH(){ return {'Content-Type':'application/json','X-Admin-Password':token}; }

// ---------- login ----------
async function tryLogin(pw){
  const r = await fetch('/api/auth',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:pw})});
  if(!r.ok) throw new Error('senha');
  token = pw; sessionStorage.setItem('suspiroAdminToken', pw);
  showApp();
}
function showApp(){
  $('loginScreen').style.display='none'; $('app').style.display='block';
  boot();
}

// ---------- boot ----------
async function boot(){
  $('diaData').value = todayStr(); $('pizzaData').value = todayStr(); $('encData').value = todayStr();
  buildDiaForm(); buildFiadoRow('diaFiados'); buildFiadoRow('pizzaFiados');
  await loadAll();
}
async function loadAll(){
  const [d,p,f,e,s,pp] = await Promise.all([
    fetch('/api/vendas-dia',{cache:'no-store'}).then(r=>r.json()).catch(()=>[]),
    fetch('/api/noites-pizza',{cache:'no-store'}).then(r=>r.json()).catch(()=>[]),
    fetch('/api/fiados',{cache:'no-store'}).then(r=>r.json()).catch(()=>[]),
    fetch('/api/encomendas',{cache:'no-store'}).then(r=>r.json()).catch(()=>[]),
    fetch('/api/sabores-pizza',{cache:'no-store'}).then(r=>r.json()).catch(()=>({sabores:[]})),
    fetch('/api/produtos-suspiro',{cache:'no-store'}).then(r=>r.json()).catch(()=>({produtos:[]})),
  ]);
  DB.dias=d; DB.pizzas=p; DB.fiados=f; DB.encomendas=e;
  if (pp.produtos && pp.produtos.length) PRODUTOS = pp.produtos;
  SABORES = s.sabores && s.sabores.length ? s.sabores : [
    {id:'mussarela',nome:'Mussarela'},{id:'calabresa-cebola',nome:'Calabresa com Cebola'},
    {id:'marguerita',nome:'Marguerita'},{id:'portuguesa',nome:'Portuguesa'},
    {id:'frango-catupiry',nome:'Frango Catupiry'},{id:'pera-gorgonzola-mel',nome:'Pera com gorgonzola e mel'},
    {id:'nutella-normal',nome:'Nutella Normal'},{id:'nutella-morango',nome:'Nutella Morango'},
  ];
  buildDiaForm(); buildPrecosEditor(); buildPizzaSabores();
  renderHoje(); renderFiados(); renderEncomendas();
}

// ---------- forms ----------
function autoValor(id){
  const pr = PRODUTOS.find(x=>x.id===id); if(!pr) return;
  const q = Number(document.querySelector(`[data-q="${id}"]`).value)||0;
  const vEl = document.querySelector(`[data-v="${id}"]`);
  if (vEl.dataset.manual==='1') return; // respeita digitação manual
  vEl.value = (q * (Number(pr.preco)||0)).toFixed(2).replace('.00','');
  calcDia();
}
function buildDiaForm(){
  const box = $('diaProdutos'); box.innerHTML='';
  PRODUTOS.forEach(pr=>{
    const div=document.createElement('div'); div.className='prod-row';
    div.innerHTML=`<b>${pr.nome} <small style="color:#78716c">R$ ${pr.preco}</small></b><div class="prod-controls"><div class="stepper"><button type="button" data-minus="${pr.id}" aria-label="Diminuir ${pr.nome}">−</button><input type="number" min="0" value="0" inputmode="numeric" data-q="${pr.id}" aria-label="Quantidade ${pr.nome}"><button type="button" data-plus="${pr.id}" aria-label="Aumentar ${pr.nome}">+</button></div><div class="valor-wrap"><label>Valor total R$<input type="number" min="0" step="0.01" inputmode="decimal" placeholder="0" data-v="${pr.id}" aria-label="Valor ${pr.nome}"></label></div></div>`;
    box.appendChild(div);
  });
  box.querySelectorAll('[data-plus]').forEach(b=>b.onclick=()=>{const i=box.querySelector(`[data-q="${b.dataset.plus}"]`);i.value=(Number(i.value)||0)+1;const v=box.querySelector(`[data-v="${b.dataset.plus}"]`);v.dataset.manual='';autoValor(b.dataset.plus);});
  box.querySelectorAll('[data-minus]').forEach(b=>b.onclick=()=>{const i=box.querySelector(`[data-q="${b.dataset.minus}"]`);i.value=Math.max(0,(Number(i.value)||0)-1);const v=box.querySelector(`[data-v="${b.dataset.minus}"]`);v.dataset.manual='';autoValor(b.dataset.minus);});
  box.querySelectorAll('[data-q]').forEach(i=>i.addEventListener('input',()=>{const v=box.querySelector(`[data-v="${i.dataset.q}"]`);v.dataset.manual='';autoValor(i.dataset.q);}));
  box.querySelectorAll('[data-v]').forEach(i=>i.addEventListener('input',()=>{i.dataset.manual='1';calcDia();}));
  const g=$('diaGasto'); if(g && !g.dataset.bound){g.dataset.bound='1';g.addEventListener('input',calcDia);}
}
function buildPrecosEditor(){
  let det=$('precosEditor');
  if(!det){
    det=document.createElement('details'); det.className='sabores'; det.id='precosEditor';
    det.innerHTML=`<summary>⚙ Preços (toca para ajustar)</summary><div id="precosList"></div><button type="button" class="ghost" id="savePrecos" style="margin-top:8px">💾 Salvar preços</button><p class="hint">Muda o preço aqui que o valor preenche sozinho ao apertar + e −. Valor continua editável.</p>`;
    $('tab-dia').insertBefore(det, $('diaProdutos'));
    det.querySelector('#savePrecos').onclick=savePrecos;
  }
  const list=det.querySelector('#precosList'); list.innerHTML='';
  PRODUTOS.forEach(pr=>{
    const r=document.createElement('div'); r.className='fiado-row';
    r.innerHTML=`<span style="align-self:center"><b>${pr.nome}</b></span><input type="number" min="0" step="0.01" value="${pr.preco}" data-preco="${pr.id}" aria-label="Preço ${pr.nome}"><span></span>`;
    list.appendChild(r);
  });
}
async function savePrecos(){
  PRODUTOS.forEach(pr=>{const el=document.querySelector(`[data-preco="${pr.id}"]`); if(el) pr.preco=Number(el.value)||0;});
  const r=await fetch('/api/produtos-suspiro',{method:'POST',headers:authH(),body:JSON.stringify({produtos:PRODUTOS})});
  if(r.ok){toast('Preços salvos! ✅');buildDiaForm();}else toast('Erro: confere a senha');
}
function calcDia(){
  let total=0;
  PRODUTOS.forEach(pr=>{ total += Number(document.querySelector(`[data-v="${pr.id}"]`).value)||0; });
  const gasto = Number($('diaGasto').value)||0;
  $('diaTotal').textContent = BRL(total);
  $('diaSobrou').textContent = BRL(total-gasto);
}
function buildFiadoRow(boxId){
  const box=$(boxId);
  const div=document.createElement('div'); div.className='fiado-row';
  div.innerHTML=`<input placeholder="Nome que fiou"><input type="number" placeholder="R$" min="0" step="0.01"><button type="button">x</button>`;
  div.querySelector('button').onclick=()=>div.remove();
  box.appendChild(div);
}
function collectFiados(boxId){
  return [...document.querySelectorAll(`#${boxId} .fiado-row`)].map(r=>{
    const [n,v]=[r.querySelectorAll('input')[0].value.trim(), Number(r.querySelectorAll('input')[1].value)||0];
    return n&&v>0?{nome:n,valor:v}:null;
  }).filter(Boolean);
}
function buildPizzaSabores(){
  const box=$('pizzaSabores'); box.innerHTML='';
  SABORES.forEach(s=>{
    const div=document.createElement('div'); div.className='sabor-row';
    div.innerHTML=`<b>${s.nome}<br><small>Fina 35 • Grossa 40</small></b><input type="number" min="0" value="0" placeholder="Fina" data-fina="${s.id}"><input type="number" min="0" value="0" placeholder="Grossa" data-grossa="${s.id}">`;
    box.appendChild(div);
  });
  box.addEventListener('input', calcPizzaHint);
  ['pizzaFat','pizzaCustoMassa','pizzaCustoRecheio','pizzaCustoX'].forEach(id=>$(id).addEventListener('input', calcPizzaLucro));
}
function calcPizzaHint(){
  let exp=0, q=0;
  SABORES.forEach(s=>{
    const f=Number(document.querySelector(`[data-fina="${s.id}"]`)?.value)||0;
    const g=Number(document.querySelector(`[data-grossa="${s.id}"]`)?.value)||0;
    q+=f+g; exp+=f*35+g*40;
  });
  $('pizzaHint').textContent=`Esperado pelos sabores: ${BRL(exp)} (${q} pizzas) — mas vale o que você DIGITAR no faturamento.`;
  if(!Number($('pizzaQtd').value)) $('pizzaQtd').value=q;
  calcPizzaLucro();
}
function calcPizzaLucro(){
  const fat=Number($('pizzaFat').value)||0;
  const c=(Number($('pizzaCustoMassa').value)||0)+(Number($('pizzaCustoRecheio').value)||0)+(Number($('pizzaCustoX').value)||0);
  $('pizzaLucro').textContent=BRL(fat-c);
}

// ---------- save ----------
async function saveDia(){
  const btn=$('saveDia'); if(btn.disabled)return; btn.disabled=true; btn.textContent='Salvando...';
  try{
  const itens={}; let total=0;
  PRODUTOS.forEach(pr=>{
    const q=Number(document.querySelector(`[data-q="${pr.id}"]`).value)||0;
    const v=Number(document.querySelector(`[data-v="${pr.id}"]`).value)||0;
    itens[pr.id]={qtd:q,valor:v}; total+=v;
  });
  const body={data:$('diaData').value||todayStr(),negocio:'suspiro',itens,total_vendas:total,gasto_total:Number($('diaGasto').value)||0,gasto_obs:$('diaGastoObs').value||'',fiados:collectFiados('diaFiados')};
  backupLocal('ultimo_dia', body);
  const r=await fetch('/api/vendas-dia',{method:'POST',headers:authH(),body:JSON.stringify(body)});
  if(r.ok){toast('Dia salvo! ✅');await loadAll();}else toast('Erro: confere a senha');
  }finally{btn.disabled=false;btn.textContent='💾 Salvar dia';}
}
async function savePizza(){
  const btn=$('savePizza'); if(btn.disabled)return; btn.disabled=true; btn.textContent='Salvando...';
  try{
  const sabores={};
  SABORES.forEach(s=>{sabores[s.id]={fina:Number(document.querySelector(`[data-fina="${s.id}"]`)?.value)||0,grossa:Number(document.querySelector(`[data-grossa="${s.id}"]`)?.value)||0};});
  const fat=Number($('pizzaFat').value)||0;
  const cm=Number($('pizzaCustoMassa').value)||0, cr=Number($('pizzaCustoRecheio').value)||0, cx=Number($('pizzaCustoX').value)||0;
  const body={data:$('pizzaData').value||todayStr(),negocio:'pizza',qtd:Number($('pizzaQtd').value)||0,faturamento:fat,sabores,custo_massa:cm,custo_recheio:cr,custo_x:cx,custo_total:cm+cr+cx,lucro:fat-(cm+cr+cx),fiados:collectFiados('pizzaFiados')};
  backupLocal('ultima_pizza', body);
  const r=await fetch('/api/noites-pizza',{method:'POST',headers:authH(),body:JSON.stringify(body)});
  if(r.ok){toast('Noite de pizza salva! ✅');await loadAll();}else toast('Erro: confere a senha');
  }finally{btn.disabled=false;btn.textContent='💾 Salvar noite de pizza';}
}
async function saveEnc(){
  const total=Number($('encTotal').value)||0, sinal=Number($('encSinal').value)||0;
  const body={entrega:$('encData').value,hora:$('encHora').value||'',cliente:$('encCliente').value,telefone:$('encTel').value,oque:$('encOque').value,total,sinal,falta:total-sinal};
  if(!body.cliente||!body.oque||!total){toast('Preenche cliente, o que é e total');return;}
  const r=await fetch('/api/encomendas',{method:'POST',headers:authH(),body:JSON.stringify(body)});
  if(r.ok){toast('Encomenda salva!');$('encCliente').value='';$('encOque').value='';$('encTotal').value='';$('encSinal').value='0';await loadAll();}
}

// ---------- renders ----------
function renderHoje(){
  const hoje=todayStr();
  const weekAgo=new Date(); weekAgo.setDate(weekAgo.getDate()-7); const wStr=weekAgo.toISOString().slice(0,10);
  let eH=0,gH=0,eW=0,sW=0;
  DB.dias.forEach(d=>{
    if(filtroNeg!=='tudo'&&filtroNeg!=='suspiro')return;
    if(d.data===hoje){eH+=d.total_vendas||0;gH+=d.gasto_total||0;}
    if(d.data>=wStr){eW+=d.total_vendas||0;sW+=(d.total_vendas||0)-(d.gasto_total||0);}
  });
  DB.pizzas.forEach(p=>{
    if(filtroNeg!=='tudo'&&filtroNeg!=='pizza')return;
    if(p.data===hoje){eH+=p.faturamento||0;gH+=p.custo_total||0;}
    if(p.data>=wStr){eW+=p.faturamento||0;sW+=p.lucro||((p.faturamento||0)-(p.custo_total||0));}
  });
  $('cEntrou').textContent=BRL(eH); $('cGastou').textContent=BRL(gH); $('cSobrou').textContent=BRL(eH-gH);
  $('wEntrou').textContent=BRL(eW); $('wSobrou').textContent=BRL(sW);
  const fiadoAberto=DB.fiados.filter(f=>!f.pago).reduce((s,f)=>s+(Number(f.valor)||0),0);
  $('wFiado').textContent=BRL(fiadoAberto);
  $('fiadoBadge').textContent=DB.fiados.filter(f=>!f.pago).length?`(${DB.fiados.filter(f=>!f.pago).length})`:'';

  const rec=[...DB.dias.map(d=>({t:'🍰 Dia '+d.data,v:d.total_vendas-(d.gasto_total||0),id:d.id,k:'dia'})),...DB.pizzas.map(p=>({t:'🍕 Pizza '+p.data+` (${p.qtd||0})`,v:p.lucro,id:p.id,k:'pizza'}))]
    .sort().reverse().slice(0,8);
  $('recentList').innerHTML=rec.length?rec.map(r=>`<div class="item"><b>${r.t}</b> — ${BRL(r.v)} de sobrou <div class="rowbtns"><button class="btn-del" onclick="delLan('${r.k}','${r.id}')">Apagar</button></div></div>`).join(''):'<div class="item">Nada lançado ainda. Lança o dia de hoje!</div>';
}
async function delLan(kind,id){
  if(!confirm('Apagar esse lançamento?'))return;
  const url=kind==='dia'?`/api/vendas-dia/${id}`:`/api/noites-pizza/${id}`;
  await fetch(url,{method:'DELETE',headers:authH()}); await loadAll();
}
function renderFiados(){
  const list=DB.fiados.filter(f=>!f.pago);
  $('fiadosList').innerHTML=list.length?list.map(f=>`<div class="item"><b>${f.cliente}</b> — ${BRL(f.valor)} <small>${f.data} • ${f.negocio==='pizza'?'🍕 pizza':'🍰 suspiro'}</small><div class="rowbtns"><button class="btn-pago" onclick="pagarFiado('${f.id}')">Marcou pago ✓</button></div></div>`).join(''):'<div class="item">Ninguém devendo. 🎉</div>';
}
async function pagarFiado(id){
  await fetch(`/api/fiados/${id}`,{method:'PUT',headers:authH(),body:JSON.stringify({pago:true})});
  await loadAll();
}
function renderEncomendas(){
  const abertas=DB.encomendas.filter(e=>e.status!=='entregue').sort((a,b)=>String(a.entrega).localeCompare(String(b.entrega)));
  $('encList').innerHTML=abertas.length?abertas.map(e=>`<div class="item"><b>${e.entrega}${e.hora?' '+e.hora:''} — ${e.cliente}</b><br>${e.oque}<br>Total ${BRL(e.total)} • Sinal ${BRL(e.sinal)} • <b>Falta ${BRL(e.falta)}</b><div class="rowbtns"><button class="btn-pago" onclick="entregarEnc('${e.id}')">Entregue ✓</button></div></div>`).join(''):'<div class="item">Sem encomendas abertas.</div>';
}
async function entregarEnc(id){
  await fetch(`/api/encomendas/${id}`,{method:'PUT',headers:authH(),body:JSON.stringify({status:'entregue'})});
  await loadAll();
}

// ---------- nav ----------
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.tabs button').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
  b.classList.add('active'); $( 'tab-'+b.dataset.tab).classList.add('active');
});
document.querySelectorAll('.chip').forEach(c=>c.onclick=()=>{
  document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));
  c.classList.add('active'); filtroNeg=c.dataset.neg; renderHoje();
});
$('loginForm').addEventListener('submit',async e=>{e.preventDefault();try{await tryLogin($('password').value);}catch{toast('Senha errada');}});
$('logoutBtn').onclick=()=>{sessionStorage.removeItem('suspiroAdminToken');location.reload();};
$('addFiadoDia').onclick=()=>buildFiadoRow('diaFiados');
$('addFiadoPizza').onclick=()=>buildFiadoRow('pizzaFiados');
$('saveDia').onclick=saveDia; $('savePizza').onclick=savePizza; $('saveEnc').onclick=saveEnc;
window.delLan=delLan; window.pagarFiado=pagarFiado; window.entregarEnc=entregarEnc;
if(token) showApp();
