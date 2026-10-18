const $=id=>document.getElementById(id), KEY='ai-coach-draft-v1';
let step=0, requestId=crypto.randomUUID(), saved;
const fields=SECTIONS.flatMap(s=>s.fields);
const labels=['认识你','真实任务','AI 经历','设备准备','安排确认'];
SECTIONS.forEach((s,i)=>{
 const page=document.createElement('section');page.id='page'+i;page.hidden=i!==0;
 const title=document.createElement('h2');title.textContent=s.title;title.tabIndex=-1;page.append(title);
 const desc=document.createElement('p');desc.textContent=s.desc;page.append(desc);
 s.fields.forEach(([id,label,type,required,options,hint])=>{
 const box=document.createElement(type==='checks'?'fieldset':'div');box.className='field';
 const caption=document.createElement(type==='checks'?'legend':'label');caption.textContent=label;caption.htmlFor=id;
 const mark=document.createElement('small');mark.textContent=required?'必填':'选填';caption.append(mark);box.append(caption);
 if(type==='checks'){options.forEach(option=>{const l=document.createElement('label');l.className='check';const c=document.createElement('input');c.type='checkbox';c.name=id;c.value=option;l.append(c,document.createTextNode(option));box.append(l);});}
 else{const el=document.createElement(type==='textarea'?'textarea':type==='select'?'select':'input');el.id=id;el.name=id;el.required=required;
 if(type==='select'){el.add(new Option('请选择',''));options.forEach(o=>el.add(new Option(o,o)));}else{el.maxLength=type==='textarea'?2000:300;el.placeholder=hint||'请填写';}box.append(el);}
 page.append(box);
 });$('pages').append(page);
 const indicator=document.createElement('span');indicator.textContent=labels[i];$('steps').append(indicator);
});
function values(){const data={};fields.forEach(([id,,type])=>{data[id]=type==='checks'?[...document.querySelectorAll(`input[name="${id}"]:checked`)].map(x=>x.value):$(id).value.trim();});return data;}
function save(){if(!$('remember').checked)return;try{localStorage.setItem(KEY,JSON.stringify({answers:values(),requestId}));$('draftStatus').textContent='草稿已保存在此浏览器；提交后请手动清除。';}catch{$('draftStatus').textContent='浏览器不允许保存草稿，请勿关闭页面。';}}
try{saved=JSON.parse(localStorage.getItem(KEY));if(saved?.answers){fields.forEach(([id,,type])=>{const v=saved.answers[id];if(type==='checks'){document.querySelectorAll(`input[name="${id}"]`).forEach(c=>c.checked=Array.isArray(v)&&v.includes(c.value));}else if(typeof v==='string')$(id).value=v;});if(typeof saved.requestId==='string')requestId=saved.requestId;$('remember').checked=true;$('draftStatus').textContent='已恢复此浏览器的草稿。';}}catch{}
$('remember').onchange=()=>{if($('remember').checked)save();else{try{localStorage.removeItem(KEY);}catch{}$('draftStatus').textContent='已关闭本机保存，当前填写内容仍保留在页面。';}};
$('clear').onclick=()=>{try{localStorage.removeItem(KEY);}catch{}$('remember').checked=false;$('draftStatus').textContent='本机草稿已清除；当前页面填写内容仍保留。';};
$('survey').addEventListener('input',save);
function validate(i){for(const [id,label,type,required] of SECTIONS[i].fields){const v=values()[id];if(required&&!v.length){$('error').textContent='请完成：'+label;(type==='checks'?document.querySelector(`input[name="${id}"]`):$(id)).focus();return false;}if(type==='checks'&&v.includes('以上均需协助')&&v.length>1){$('error').textContent='“以上均需协助”不能与其他操作同时选择。';document.querySelector(`input[name="${id}"]`).focus();return false;}}return true;}
function show(){SECTIONS.forEach((s,i)=>$('page'+i).hidden=i!==step);$('review').hidden=step!==5;$('back').hidden=step===0;$('stepLabel').textContent=step===5?'最后确认':`STEP 0${step+1} / 05`;$('progress').value=Math.min(step+1,5);[...$('steps').children].forEach((n,i)=>n.className=i===Math.min(step,4)?'active':'');$('next').textContent=step===5?'确认并提交':step===4?'查看填写内容 →':'继续 →';$('error').textContent='';if(step===5){$('summary').replaceChildren();const data=values();SECTIONS.forEach(s=>{const dl=document.createElement('dl');s.fields.forEach(([id,label])=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=Array.isArray(data[id])?data[id].join('、'):data[id]||'未填写';dl.append(dt,dd);});$('summary').append(dl);});} }
$('back').onclick=()=>{step--;show();$('page'+step).querySelector('h2').focus();};
const endpoint=window.SURVEY_CONFIG.endpoint;
if(!endpoint)$('notice').textContent='预览版：问卷尚未开放提交。可以查看与填写，回答不会发送给讲师。';
$('survey').onsubmit=e=>{e.preventDefault();if(step<5){if(!validate(step))return;step++;show();(step===5?$('review'):$('page'+step)).querySelector('h2').focus();return;}
 for(let i=0;i<5;i++){if(!validate(i)){step=i;show();validate(i);return;}}
 if(!$('consent').checked){$('error').textContent='请阅读并勾选提交确认。';$('consent').focus();return;}
 if(!/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(endpoint)){$('error').textContent='尚未开放提交，请等待讲师提供正式链接。你的回答没有被发送。';return;}
 save();const transport=document.createElement('form');transport.method='POST';transport.action=endpoint;
 const payload=document.createElement('input');payload.type='hidden';payload.name='payload';payload.value=JSON.stringify({version:'1.0',requestId,consent:true,answers:values(),website:$('survey').elements.website.value});transport.append(payload);document.body.append(transport);transport.submit();
};show();
