(function(){
  var NS="http://www.w3.org/2000/svg",$=function(s){return document.querySelector(s)};
  function el(t,a,p){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}
  function txt(p,x,y,s,cls,anchor,style){var t=el("text",{x:x,y:y,"text-anchor":anchor||"middle"},p);if(cls)t.setAttribute("class",cls);if(style)t.setAttribute("style",style);t.textContent=s;return t}
  var E=[null,
   ["H","អ៊ីដ្រូសែន",1,"I",1,"non"],["He","អេល្យូម",4,"VIII",1,"nob"],
   ["Li","លីចូម",7,"I",2,"alk"],["Be","បេរីល្យូម",9,"II",2,"ae"],["B","បរ",11,"III",2,"mtd"],["C","កាបូន",12,"IV",2,"non"],["N","អាសូត",14,"V",2,"non"],["O","អុកស៊ីសែន",16,"VI",2,"non"],["F","ភ្លុយអរ",19,"VII",2,"hal"],["Ne","ណេអុង",20,"VIII",2,"nob"],
   ["Na","សូដ្យូម",23,"I",3,"alk"],["Mg","ម៉ាញេស្យូម",24,"II",3,"ae"],["Al","អាលុយមីញ៉ូម",27,"III",3,"met"],["Si","ស៊ីលីស្យូម",28,"IV",3,"mtd"],["P","ផូស្វ័រ",31,"V",3,"non"],["S","ស្ពាន់ធ័រ",32,"VI",3,"non"],["Cl","ក្លរ",35,"VII",3,"hal"],["Ar","អាកុង",40,"VIII",3,"nob"],
   ["K","ប៉ូតាស្យូម",39,"I",4,"alk"],["Ca","កាល់ស្យូម",40,"II",4,"ae"]];
  var GR=["I","II","III","IV","V","VI","VII","VIII"];
  function shells(n){var cap=[2,8,8,2],r=[];for(var i=0;i<4&&n>0;i++){var k=Math.min(cap[i],n);r.push(k);n-=k}return r}
  var SUP={"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹"};
  function cfg(s){var L="KLMN";return s.map(function(k,i){return "("+L[i]+")"+String(k).split("").map(function(c){return SUP[c]}).join("")}).join("")}
  /* Bohr diagram into group g, centred at cx,cy */
  function bohr(g,Z,charge,cx,cy,opt){
    opt=opt||{};var A=E[Z][2],s=shells(Z-(charge||0)),R=[34,54,74,94];
    el("circle",{cx:cx,cy:cy,r:24,style:"fill:color-mix(in srgb,var(--pro) 18%,var(--card));stroke:var(--pro);stroke-width:1.5"},g);
    txt(g,cx,cy-2,Z+"p","", "middle","font-size:12px;font-weight:700;fill:var(--pro)");
    txt(g,cx,cy+12,(A-Z)+"n","", "middle","font-size:12px;font-weight:700;fill:var(--neu)");
    s.forEach(function(k,i){var r=R[i];el("circle",{cx:cx,cy:cy,r:r,style:"fill:none;stroke:var(--line);stroke-width:1.4"},g);
      for(var j=0;j<k;j++){var a=-Math.PI/2+j*2*Math.PI/k+(i%2?Math.PI/k:0);
        var col=(opt.hl&&i===s.length-1&&j>=k-opt.hl)?"var(--pro)":"var(--ele)";
        el("circle",{cx:(cx+r*Math.cos(a)).toFixed(1),cy:(cy+r*Math.sin(a)).toFixed(1),r:5,style:"fill:"+col},g)}});
    if(opt.label){txt(g,cx,cy-(R[s.length-1]+10),opt.label,"","middle","font-weight:700")}
    if(opt.bracket){var rr=R[s.length-1]+8;el("path",{d:"M"+(cx-rr+8)+" "+(cy-rr)+" L"+(cx-rr)+" "+(cy-rr)+" L"+(cx-rr)+" "+(cy+rr)+" L"+(cx-rr+8)+" "+(cy+rr)+" M"+(cx+rr-8)+" "+(cy-rr)+" L"+(cx+rr)+" "+(cy-rr)+" L"+(cx+rr)+" "+(cy+rr)+" L"+(cx+rr-8)+" "+(cy+rr),style:"fill:none;stroke:var(--ink);stroke-width:1.6"},g);
      txt(g,cx+rr+4,cy-rr+4,opt.bracket,"","start","font-weight:700;font-size:16px")}
  }
  /* nucleus picture (fig 2) and isotopes */
  function nucleus(g,cx,cy,p,n,r){var tot=p+n,pts=[];for(var i=0;i<tot;i++){var a=i*2.39996,d=r*Math.sqrt(i/tot);pts.push([cx+d*Math.cos(a),cy+d*Math.sin(a)])}
    var order=[];for(var i=0;i<tot;i++)order.push(i);
    order.forEach(function(i){var isP=(i*7)%tot<p;el("circle",{cx:pts[i][0].toFixed(1),cy:pts[i][1].toFixed(1),r:6.2,style:"fill:"+(isP?"var(--pro)":"var(--neu)")+";stroke:var(--card);stroke-width:1"},g)})}
  
  nucleus($("#iso35"),90,64,17,18,40);nucleus($("#iso37"),270,64,17,20,42);
  /* Cl2 dots */
  (function(){var g=$("#cl2dots"),c1=[120,70],c2=[200,70],r=40;
    [[-90],[180],[90]].forEach(function(a,i){var b=a[0]*Math.PI/180;[-10,10].forEach(function(o){var bb=b+o*Math.PI/180;el("circle",{cx:c1[0]+r*Math.cos(bb),cy:c1[1]+r*Math.sin(bb),r:4,style:"fill:var(--ele)"},g)})});
    [[-90],[0],[90]].forEach(function(a){var b=a[0]*Math.PI/180;[-10,10].forEach(function(o){var bb=b+o*Math.PI/180;el("circle",{cx:c2[0]+r*Math.cos(bb),cy:c2[1]+r*Math.sin(bb),r:4,style:"fill:var(--pro)"},g)})});
    el("circle",{cx:160,cy:62,r:4,style:"fill:var(--ele)"},g);el("circle",{cx:160,cy:78,r:4,style:"fill:var(--pro)"},g);
  })();
  /* ionic figure */
  bohr($("#ionNa"),11,0,90,100,{hl:1});
  bohr($("#ionCl"),17,0,100,100);
  bohr($("#ionNap"),11,1,100,100,{bracket:"+"});
  bohr($("#ionClm"),17,-1,90,100,{hl:1,bracket:"−"});
  /* solids */
  (function(){var g=$("#molS");[[40,40],[110,30],[165,60],[60,105],[130,100],[175,128]].forEach(function(p,i){var a=i*0.9;
      el("line",{x1:p[0]-14*Math.cos(a),y1:p[1]-14*Math.sin(a),x2:p[0]+14*Math.cos(a),y2:p[1]+14*Math.sin(a),style:"stroke:#5f3dc4;stroke-width:12;stroke-linecap:round"},g)});
    g=$("#graph");for(var L=0;L<3;L++){var y0=28+L*44;for(var k=0;k<4;k++){var cx=32+k*44+(L%2)*22,cy=y0,h=12;var d="";for(var j=0;j<6;j++){var a=Math.PI/6+j*Math.PI/3;d+=(j?"L":"M")+(cx+h*1.4*Math.cos(a)).toFixed(1)+" "+(cy+h*Math.sin(a)*1.0).toFixed(1)}el("path",{d:d+"Z",style:"fill:none;stroke:var(--ink);stroke-width:1.8"},g)}
      if(L<2)el("line",{x1:10,x2:190,y1:y0+22,y2:y0+22,class:"dsh"},g)}
    g=$("#lat");for(var i=0;i<6;i++)for(var j=0;j<4;j++){var na=(i+j)%2===0,x=22+i*31,y=24+j*34;el("circle",{cx:x,cy:y,r:na?9:14,style:"fill:"+(na?"var(--noble)":"var(--nonmetal)")+";opacity:.85"},g);txt(g,x,y+5,na?"+":"−","","middle","fill:#fff;font-weight:700;font-size:14px")}
    g=$("#metl");for(var i=0;i<5;i++)for(var j=0;j<4;j++){var x=24+i*38,y=22+j*35;el("circle",{cx:x,cy:y,r:13,style:"fill:var(--metal);opacity:.8"},g);txt(g,x,y+5,"+","","middle","fill:#fff;font-weight:700")}
    for(var k=0;k<22;k++){el("circle",{cx:(10+(k*53)%185),cy:(10+(k*37)%130),r:3,style:"fill:var(--ele)"},g)}
  })();
  /* benzene */
  function hexa(g,r,mode){var d="";for(var j=0;j<6;j++){var a=-Math.PI/2+j*Math.PI/3;d+=(j?"L":"M")+(r*Math.cos(a)).toFixed(1)+" "+(r*Math.sin(a)).toFixed(1)}el("path",{d:d+"Z",style:"fill:none;stroke:var(--ink);stroke-width:2.2"},g);
    if(mode==="circle")el("circle",{cx:0,cy:0,r:r*.58,style:"fill:none;stroke:var(--ink);stroke-width:2"},g);
    else{for(var j=0;j<6;j+=2){var a1=-Math.PI/2+j*Math.PI/3,a2=a1+Math.PI/3,k=.78;el("line",{x1:k*r*Math.cos(a1),y1:k*r*Math.sin(a1),x2:k*r*Math.cos(a2),y2:k*r*Math.sin(a2),style:"stroke:var(--ink);stroke-width:2.2"},g)}
      for(var j=0;j<6;j++){var a=-Math.PI/2+j*Math.PI/3;el("line",{x1:(r+3)*Math.cos(a),y1:(r+3)*Math.sin(a),x2:(r+18)*Math.cos(a),y2:(r+18)*Math.sin(a),style:"stroke:var(--ink);stroke-width:1.6"},g);txt(g,(r+27)*Math.cos(a),(r+27)*Math.sin(a)+5,"H","at","middle","font-size:14px")}}}
  hexa($("#benz1"),40,"kek");hexa($("#benz2"),40,"circle");
  /* periodic widget */
  var pt=$("#pt"),cur=null;
  var h=document.createElement("div");pt.appendChild(h);
  GR.forEach(function(g){var d=document.createElement("div");d.className="gh";d.textContent=g;pt.appendChild(d)});
  for(var P=1;P<=4;P++){var ph=document.createElement("div");ph.className="ph";ph.textContent=P;pt.appendChild(ph);
    GR.forEach(function(g){var z=0;for(var i=1;i<=20;i++)if(E[i][4]===P&&E[i][3]===g)z=i;
      if(!z){pt.appendChild(document.createElement("div"));return}
      var b=document.createElement("button");b.type="button";b.className=E[z][5];b.setAttribute("aria-pressed","false");b.setAttribute("aria-label",E[z][1]+" Z="+z);
      b.innerHTML='<span class="z">'+z+'</span><span class="s">'+E[z][0]+'</span>';b.addEventListener("click",function(){show(z)});b.dataset.z=z;pt.appendChild(b)})}
  var CAT={alk:"លោហៈអាល់កាឡាំង",ae:"លោហៈ (ក្រុម II)",met:"លោហៈ",mtd:"ធាតុអំផូទែ",non:"អលោហៈ",hal:"អាឡូសែន",nob:"ឧស្ម័នកម្រ"};
  function show(z){var e=E[z],svg=$("#bohr");while(svg.firstChild)svg.removeChild(svg.firstChild);bohr(svg,z,0,120,120);
    pt.querySelectorAll("button").forEach(function(b){b.setAttribute("aria-pressed",+b.dataset.z===z?"true":"false")});
    $("#eName").textContent=e[1]+" ("+e[0]+") · "+CAT[e[5]];
    $("#eP").textContent=z;$("#eN").textContent=e[2]-z;$("#eE").textContent=z;
    $("#eCfg").textContent=cfg(shells(z));$("#eGP").textContent="ក្រុម "+e[3]+" · ខួប "+e[4];}
  show(11);
  /* mole calculator */
  function mole(){var v=$("#msub").value.split("|"),M=+v[0],m=parseFloat($("#mmass").value);
    if(!(m>=0)){$("#mn").textContent="បញ្ចូលម៉ាសជាលេខ";$("#mN").textContent="—";return}
    var n=m/M,N=n*6.02e23;$("#mn").textContent=(n<0.01&&n>0?n.toExponential(2):n.toFixed(n<10?3:2))+" mol";
    if(N===0){$("#mN").textContent="0";return}
    var ex=Math.floor(Math.log10(N)),man=N/Math.pow(10,ex);
    $("#mN").textContent=man.toFixed(2)+"×10"+String(ex).split("").map(function(c){return c==="-"?"⁻":SUP[c]}).join("")+" "+v[2];}
  $("#msub").addEventListener("change",mole);$("#mmass").addEventListener("input",mole);mole();
  /* alkane widget */
  var NM=["","មេតាន","អេតាន","ប្រូប៉ាន","ប៊ុយតាន","ប៉ង់តាន","អ៊ិចសាន","ហិបតាន","អុកតាន","ណូណាន","ដេកាន"];
  var BP=[0,-162,-89,-42,-0.4,36,69,98,126,151,174];
  var SUB=["₀","₁","₂","₃","₄","₅","₆","₇","₈","₉"];
  function sub(n){return String(n).split("").map(function(c){return SUB[+c]}).join("")}
  function alk(){var n=+$("#sn").value,svg=$("#chain");while(svg.firstChild)svg.removeChild(svg.firstChild);$("#on").textContent=n;
    var dx=Math.min(62,600/(n+1)),x0=350-(n-1)*dx/2,y=65;
    for(var i=0;i<n;i++){var x=x0+i*dx;
      if(i<n-1)el("line",{x1:x+10,y1:y-5,x2:x+dx-10,y2:y-5,style:"stroke:var(--ink);stroke-width:2"},svg);
      el("line",{x1:x,y1:y-20,x2:x,y2:y-38,style:"stroke:var(--ink);stroke-width:1.8"},svg);el("line",{x1:x,y1:y+4,x2:x,y2:y+20,style:"stroke:var(--ink);stroke-width:1.8"},svg);
      txt(svg,x,y,"C","at");txt(svg,x,y-42,"H","at","middle","font-size:15px");txt(svg,x,y+38,"H","at","middle","font-size:15px");
      if(i===0){el("line",{x1:x-10,y1:y-5,x2:x-24,y2:y-5,style:"stroke:var(--ink);stroke-width:1.8"},svg);txt(svg,x-34,y,"H","at","middle","font-size:15px")}
      if(i===n-1){el("line",{x1:x+10,y1:y-5,x2:x+24,y2:y-5,style:"stroke:var(--ink);stroke-width:1.8"},svg);txt(svg,x+34,y,"H","at","middle","font-size:15px")}}
    $("#aName").textContent=NM[n];$("#aF").textContent="C"+(n>1?sub(n):"")+"H"+sub(2*n+2);
    $("#aBp").textContent=BP[n]+" °C";$("#aSt").textContent=n<=4?"ឧស្ម័ន":"រាវ";}
  $("#sn").addEventListener("input",alk);alk();
})();

/* light / dark toggle: remembers the choice; otherwise follows the device setting */
(function(){
  var root=document.documentElement,btn=document.getElementById("themeToggle");if(!btn)return;
  var mq=window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)"):null;
  function isDark(){var t=root.getAttribute("data-theme");return t?t==="dark":!!(mq&&mq.matches)}
  function sync(){var d=isDark();btn.classList.toggle("is-dark",d);
    btn.querySelector(".t-label").textContent=d?"ភ្លឺ":"ងងឹត";
    btn.setAttribute("aria-label",d?"ប្តូរទៅរបៀបភ្លឺ":"ប្តូរទៅរបៀបងងឹត");btn.setAttribute("aria-pressed",d?"true":"false")}
  btn.addEventListener("click",function(){var next=isDark()?"light":"dark";root.setAttribute("data-theme",next);
    try{localStorage.setItem("theme",next)}catch(e){}sync()});
  if(mq&&mq.addEventListener)mq.addEventListener("change",sync);
  sync();
})();

/* language switch: keep the reader's place (section or chapter) and remember the choice */
(function(){
  var a=document.getElementById("langToggle");if(!a)return;
  a.addEventListener("click",function(e){
    var h=location.hash;
    if(!h){var sel=document.querySelector('.chcard[aria-selected="true"]');if(sel)h="#chapter-"+sel.dataset.ch;}
    try{localStorage.setItem("lang",a.getAttribute("hreflang"))}catch(err){}
    a.setAttribute("href",a.getAttribute("href").split("#")[0]+(h||""));
  });
})();

/* interactive atom: shell (Bohr) model and quantum cloud model, ions, excitation and photon emission */
(function(){
  var svg=document.getElementById("atomSvg");if(!svg)return;
  var NS="http://www.w3.org/2000/svg",CX=140,CY=125,$=function(i){return document.getElementById(i)};
  function el(t,a,p){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}
  /* all 118 elements: [symbol, Z, neutrons in the most common isotope, electrons per shell K L M N O P Q] */
  var ELS=[["H",1,0,[1]],["He",2,2,[2]],["Li",3,4,[2,1]],["Be",4,5,[2,2]],["B",5,6,[2,3]],["C",6,6,[2,4]],["N",7,7,[2,5]],["O",8,8,[2,6]],["F",9,10,[2,7]],["Ne",10,10,[2,8]],["Na",11,12,[2,8,1]],["Mg",12,12,[2,8,2]],["Al",13,14,[2,8,3]],["Si",14,14,[2,8,4]],["P",15,16,[2,8,5]],["S",16,16,[2,8,6]],["Cl",17,18,[2,8,7]],["Ar",18,22,[2,8,8]],["K",19,20,[2,8,8,1]],["Ca",20,20,[2,8,8,2]],["Sc",21,24,[2,8,9,2]],["Ti",22,26,[2,8,10,2]],["V",23,28,[2,8,11,2]],["Cr",24,28,[2,8,13,1]],["Mn",25,30,[2,8,13,2]],["Fe",26,30,[2,8,14,2]],["Co",27,32,[2,8,15,2]],["Ni",28,31,[2,8,16,2]],["Cu",29,35,[2,8,18,1]],["Zn",30,35,[2,8,18,2]],["Ga",31,39,[2,8,18,3]],["Ge",32,41,[2,8,18,4]],["As",33,42,[2,8,18,5]],["Se",34,45,[2,8,18,6]],["Br",35,45,[2,8,18,7]],["Kr",36,48,[2,8,18,8]],["Rb",37,48,[2,8,18,8,1]],["Sr",38,50,[2,8,18,8,2]],["Y",39,50,[2,8,18,9,2]],["Zr",40,51,[2,8,18,10,2]],["Nb",41,52,[2,8,18,12,1]],["Mo",42,54,[2,8,18,13,1]],["Tc",43,55,[2,8,18,13,2]],["Ru",44,57,[2,8,18,15,1]],["Rh",45,58,[2,8,18,16,1]],["Pd",46,60,[2,8,18,18]],["Ag",47,61,[2,8,18,18,1]],["Cd",48,64,[2,8,18,18,2]],["In",49,66,[2,8,18,18,3]],["Sn",50,69,[2,8,18,18,4]],["Sb",51,71,[2,8,18,18,5]],["Te",52,76,[2,8,18,18,6]],["I",53,74,[2,8,18,18,7]],["Xe",54,77,[2,8,18,18,8]],["Cs",55,78,[2,8,18,18,8,1]],["Ba",56,81,[2,8,18,18,8,2]],["La",57,82,[2,8,18,18,9,2]],["Ce",58,82,[2,8,18,19,9,2]],["Pr",59,82,[2,8,18,21,8,2]],["Nd",60,84,[2,8,18,22,8,2]],["Pm",61,84,[2,8,18,23,8,2]],["Sm",62,88,[2,8,18,24,8,2]],["Eu",63,89,[2,8,18,25,8,2]],["Gd",64,93,[2,8,18,25,9,2]],["Tb",65,94,[2,8,18,27,8,2]],["Dy",66,97,[2,8,18,28,8,2]],["Ho",67,98,[2,8,18,29,8,2]],["Er",68,99,[2,8,18,30,8,2]],["Tm",69,100,[2,8,18,31,8,2]],["Yb",70,103,[2,8,18,32,8,2]],["Lu",71,104,[2,8,18,32,9,2]],["Hf",72,106,[2,8,18,32,10,2]],["Ta",73,108,[2,8,18,32,11,2]],["W",74,110,[2,8,18,32,12,2]],["Re",75,111,[2,8,18,32,13,2]],["Os",76,114,[2,8,18,32,14,2]],["Ir",77,115,[2,8,18,32,15,2]],["Pt",78,117,[2,8,18,32,17,1]],["Au",79,118,[2,8,18,32,18,1]],["Hg",80,121,[2,8,18,32,18,2]],["Tl",81,123,[2,8,18,32,18,3]],["Pb",82,125,[2,8,18,32,18,4]],["Bi",83,126,[2,8,18,32,18,5]],["Po",84,125,[2,8,18,32,18,6]],["At",85,125,[2,8,18,32,18,7]],["Rn",86,136,[2,8,18,32,18,8]],["Fr",87,136,[2,8,18,32,18,8,1]],["Ra",88,138,[2,8,18,32,18,8,2]],["Ac",89,138,[2,8,18,32,18,9,2]],["Th",90,142,[2,8,18,32,18,10,2]],["Pa",91,140,[2,8,18,32,20,9,2]],["U",92,146,[2,8,18,32,21,9,2]],["Np",93,144,[2,8,18,32,22,9,2]],["Pu",94,150,[2,8,18,32,24,8,2]],["Am",95,148,[2,8,18,32,25,8,2]],["Cm",96,151,[2,8,18,32,25,9,2]],["Bk",97,150,[2,8,18,32,27,8,2]],["Cf",98,153,[2,8,18,32,28,8,2]],["Es",99,153,[2,8,18,32,29,8,2]],["Fm",100,157,[2,8,18,32,30,8,2]],["Md",101,157,[2,8,18,32,31,8,2]],["No",102,157,[2,8,18,32,32,8,2]],["Lr",103,163,[2,8,18,32,32,8,3]],["Rf",104,163,[2,8,18,32,32,10,2]],["Db",105,163,[2,8,18,32,32,11,2]],["Sg",106,163,[2,8,18,32,32,12,2]],["Bh",107,163,[2,8,18,32,32,13,2]],["Hs",108,161,[2,8,18,32,32,14,2]],["Mt",109,169,[2,8,18,32,32,15,2]],["Ds",110,171,[2,8,18,32,32,16,2]],["Rg",111,171,[2,8,18,32,32,17,2]],["Cn",112,173,[2,8,18,32,32,18,2]],["Nh",113,173,[2,8,18,32,32,18,3]],["Fl",114,175,[2,8,18,32,32,18,4]],["Mc",115,175,[2,8,18,32,32,18,5]],["Lv",116,177,[2,8,18,32,32,18,6]],["Ts",117,177,[2,8,18,32,32,18,7]],["Og",118,176,[2,8,18,32,32,18,8]]];
  var R=[34,60,84,104],OMEGA=[1.8,0.9,0.6,0.45,0.36,0.3,0.26],SHN="KLMNOPQ";
  var PER=[[1,2],[3,10],[11,18],[19,36],[37,54],[55,86],[87,118]];
  var sel=$("atEl");PER.forEach(function(r,pi){var og=document.createElement("optgroup");og.label=["ខួបទី ១","ខួបទី ២","ខួបទី ៣","ខួបទី ៤","ខួបទី ៥","ខួបទី ៦","ខួបទី ៧"][pi];
    for(var z=r[0];z<=r[1];z++){var e=ELS[z-1],o=document.createElement("option");o.value=z-1;o.textContent=e[0]+" (Z = "+e[1]+")";og.appendChild(o)}sel.appendChild(og)});sel.value=10;
  var gS=$("atShells"),gD=$("atDots"),gP=$("atPhot"),gN=$("nuc"),gE=$("atE");var gL=el("g",{style:"pointer-events:none"},svg);
  var Z,N,electrons=[],mode="bohr",running=!window.matchMedia||!window.matchMedia("(prefers-reduced-motion: reduce)").matches,last=0,drag=null,dots=[],DOTMAX=700,dotI=0;
  function clear(g){while(g.firstChild)g.removeChild(g.firstChild)}
  /* nucleus: protons and neutrons packed in a small ball */
  function drawNucleus(){clear(gN);var tot=Z+N,r=Math.min(22,Math.max(6,Math.sqrt(tot)*3.1)),pr=Math.max(1.5,Math.min(6,r/Math.sqrt(tot)*1.25));
    var pts=[];for(var i=0;i<tot;i++){var a=i*2.39996,d=r*Math.sqrt((i+.5)/tot);pts.push([CX+d*Math.cos(a),CY+d*Math.sin(a)])}
    pts.forEach(function(p,i){var isP=((i*7)%tot)<Z;el("circle",{cx:p[0].toFixed(1),cy:p[1].toFixed(1),r:pr,style:"fill:"+(isP?"var(--pro)":"var(--neu)")+";stroke:var(--card);stroke-width:.8"},gN)})}
  /* electrons per shell for the current electron count: cations lose from the outer shell, anions fill like the next element */
  var dist=[];
  function distFor(n){var base=ELS[Z-1][3].slice();if(n>=Z){if(n>Z&&n<=118)base=ELS[n-1][3].slice();return base}
    var k=Z-n;for(var s=base.length-1;s>=0&&k>0;s--){var t=Math.min(base[s],k);base[s]-=t;k-=t}while(base.length&&!base[base.length-1])base.pop();return base}
  function setRadii(nsh){var m=Math.max(4,nsh+1),step=88/m;R=[];for(var s=0;s<7;s++)R.push(22+(s+1)*step)}
  function drawShells(){clear(gS);clear(gL);var top=Math.max(dist.length-1,highestShell());for(var s=0;s<7;s++){if(s>top)break;
      el("circle",{cx:CX,cy:CY,r:R[s],style:"fill:none;stroke:var(--line);stroke-width:1.2;stroke-dasharray:"+(mode==="bohr"?"none":"3 4")},gS);
      var t=el("text",{x:CX+3,y:CY-R[s]+3.5,"class":"sm",style:"font-size:9px;font-weight:700;paint-order:stroke;stroke:var(--card);stroke-width:3px"},gL);t.textContent=SHN[s]}}
  function highestShell(){var h=0;electrons.forEach(function(e){if(e.shell>h)h=e.shell});return h}
  /* assign shells and evenly spaced slots (2, 8, 8, 2) */
  function layout(){var bound=electrons.filter(function(e){return !e.free});dist=distFor(bound.length);
    var idx=0;dist.forEach(function(c,s){for(var k=0;k<c;k++){var e=bound[idx++];if(e&&!e.excited)e.shell=s}});
    var counts=[0,0,0,0,0,0,0];bound.forEach(function(e){counts[e.shell]++});
    var seen=[0,0,0,0,0,0,0];bound.forEach(function(e){var s=e.shell;e.slot=seen[s]++;e.nIn=counts[s];
      e.c.setAttribute("r",Math.max(1.8,Math.min(5.5,0.3*2*Math.PI*R[s]/Math.max(1,counts[s]))).toFixed(2))})}
  function makeE(){var c=el("circle",{r:5.5,"class":"ae",style:"fill:var(--ele);stroke:var(--card);stroke-width:1.2"},gE);
    return {c:c,shell:0,slot:0,nIn:1,x:CX+200,y:CY,vx:0,vy:0,phase:Math.random()*6.28,excited:0,free:0}}
  function setElement(i){var e=ELS[i];Z=e[1];N=e[2];setRadii(e[3].length);electrons.forEach(function(x){gE.removeChild(x.c)});electrons=[];
    for(var k=0;k<Z;k++){var o=makeE();electrons.push(o)}layout();
    electrons.forEach(function(o){var p=target(o,0);o.x=p[0];o.y=p[1]});clearDots();drawNucleus();drawShells();status()}
  var T=0;
  function target(o,t){var s=o.shell,ang=o.phase*0+(2*Math.PI*o.slot/o.nIn)+OMEGA[s]*t*(s%2?-1:1);return [CX+R[s]*Math.cos(ang),CY+R[s]*Math.sin(ang)]}
  function clearDots(){clear(gD);dots=[];dotI=0}
  /* quantum cloud: sample a position from a radial probability distribution peaked at the shell radius */
  function gauss(){var u=1-Math.random(),v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)}
  function sample(o){var s=o.shell,sp=Math.min(0.2,6/R[s]+0.05),r=Math.abs(R[s]*(1+sp*gauss()));if(s===0)r=Math.abs(R[0]*(0.9+0.35*gauss()));r=Math.max(9,Math.min(118,r));var a=Math.random()*2*Math.PI;return [CX+r*Math.cos(a),CY+r*Math.sin(a)]}
  function addDot(x,y){var d;if(dots.length<DOTMAX){d=el("circle",{r:1.3,style:"fill:var(--ele)"},gD);dots.push(d)}else{d=dots[dotI];dotI=(dotI+1)%DOTMAX}
    d.setAttribute("cx",x.toFixed(1));d.setAttribute("cy",y.toFixed(1));d.setAttribute("opacity",".35")}
  /* photon: a wavy arrow leaving the atom, coloured by the jump size */
  function photon(x,y,shellFrom){var a=Math.atan2(y-CY,x-CX),len=70,col=["#e03131","#f59f00","#40c057","#7048e8"][Math.min(3,shellFrom)];
    var d="";for(var i=0;i<=40;i++){var s=i/40*len,w=Math.sin(i/40*len/5)*4;d+=(i?"L":"M")+(x+Math.cos(a)*s-Math.sin(a)*w).toFixed(1)+" "+(y+Math.sin(a)*s+Math.cos(a)*w).toFixed(1)}
    var p=el("path",{d:d,style:"fill:none;stroke:"+col+";stroke-width:2.4;stroke-linecap:round"},gP);var born=performance.now();
    (function fade(){var k=(performance.now()-born)/900;if(k>=1){gP.removeChild(p);return}p.setAttribute("opacity",(1-k).toFixed(2));p.setAttribute("transform","translate("+(Math.cos(a)*k*30).toFixed(1)+" "+(Math.sin(a)*k*30).toFixed(1)+")");requestAnimationFrame(fade)})()}
  function sup(n){var m={"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹"};return String(n).split("").map(function(c){return m[c]}).join("")}
  function status(){var ne=electrons.filter(function(e){return !e.free}).length,q=Z-ne,sym=ELS[sel.value][0];
    $("atP").textContent=Z;$("atNe").textContent=ne;$("atQ").textContent=q>0?"+"+q:q<0?"−"+(-q):"0";
    var ion=q===0?sym:sym+(Math.abs(q)>1?sup(Math.abs(q)):"")+(q>0?"⁺":"⁻");$("atIon").textContent=ion;
    $("atIon").style.fill=q>0?"var(--pro)":q<0?"var(--ele)":"var(--ink)";
    $("atSt").textContent=q===0?"អាតូមអព្យាក្រឹត":q>0?"អ៊ីយ៉ុងវិជ្ជមាន":"អ៊ីយ៉ុងអវិជ្ជមាន";
    $("atAdd").disabled=ne>=Math.min(118,Z+3);
    var S2="⁰¹²³⁴⁵⁶⁷⁸⁹",d2=distFor(ne);$("atCfg").innerHTML=d2.length?d2.map(function(n,i){return "("+"KLMNOPQ"[i]+")"+String(n).split("").map(function(c){return S2[+c]}).join("")}).join("<wbr>")+" <span class=\"atcfgn\">= "+d2.join(", ")+"</span>":"—";$("atRem").disabled=ne<=0}
  function frame(ts){var dt=last?Math.min(0.05,(ts-last)/1000):0;last=ts;if(running)T+=dt;
    electrons.forEach(function(o){
      if(o.free){o.x+=o.vx*dt;o.y+=o.vy*dt;var dd=Math.hypot(o.x-CX,o.y-CY);o.c.setAttribute("opacity",Math.max(0,1-(dd-120)/80).toFixed(2));
        if(dd>210){gE.removeChild(o.c);electrons.splice(electrons.indexOf(o),1)}}
      else if(o===drag){}
      else{if(o.excited&&running){o.excited-=dt;if(o.excited<=0){o.excited=0;var from=o.shell;o.shell=o.home;layout();photon(o.x,o.y,from-o.home)}}
        if(o.shell>=R.length)o.shell=R.length-1;var p=target(o,T);
        /* attraction to the nucleus: spring back to the shell position (damped) */
        var k=o.returning?8:30;o.vx+=(p[0]-o.x)*k*dt-o.vx*Math.min(1,9*dt);o.vy+=(p[1]-o.y)*k*dt-o.vy*Math.min(1,9*dt);
        if(Math.hypot(p[0]-o.x,p[1]-o.y)<1.5)o.returning=false;
        if(o.returning){o.x+=o.vx*dt;o.y+=o.vy*dt}else{o.x=p[0];o.y=p[1];o.vx=o.vy=0}}
      o.c.setAttribute("cx",o.x.toFixed(1));o.c.setAttribute("cy",o.y.toFixed(1));
      var show=mode==="bohr"||o===drag||o.free;o.c.style.display=show?"":"none";
      if(mode==="cloud"&&running&&!o.free&&o!==drag){for(var k2=0;k2<2;k2++){var s=sample(o);addDot(s[0],s[1])}}});
    requestAnimationFrame(frame)}
  /* pointer: drag (pulls back or ionises) or click (excite → photon) */
  function pt(ev){var m=svg.getScreenCTM().inverse(),q=svg.createSVGPoint();q.x=ev.clientX;q.y=ev.clientY;q=q.matrixTransform(m);return q}
  var downAt=null,moved=false;
  svg.addEventListener("pointerdown",function(ev){if(mode!=="bohr")return;var q=pt(ev),best=null,bd=14;
    electrons.forEach(function(o){if(o.free)return;var d=Math.hypot(o.x-q.x,o.y-q.y);if(d<bd){bd=d;best=o}});
    if(!best)return;drag=best;downAt=q;moved=false;best.c.classList.add("drag");svg.setPointerCapture(ev.pointerId);ev.preventDefault()});
  svg.addEventListener("pointermove",function(ev){if(!drag)return;var q=pt(ev);if(Math.hypot(q.x-downAt.x,q.y-downAt.y)>3)moved=true;drag.x=q.x;drag.y=q.y});
  function up(){if(!drag)return;var o=drag;drag=null;o.c.classList.remove("drag");
    if(!moved){ if(!o.excited&&o.shell<6){o.home=o.shell;o.shell=o.shell+1;o.excited=1.1;o.returning=true;}}
    else if(Math.hypot(o.x-CX,o.y-CY)>118){var a=Math.atan2(o.y-CY,o.x-CX);o.free=1;o.vx=Math.cos(a)*160;o.vy=Math.sin(a)*160;
      electrons.splice(electrons.indexOf(o),1);electrons.push(o);layout();drawShells();status()}
    else{o.returning=true}}
  svg.addEventListener("pointerup",up);svg.addEventListener("pointercancel",up);
  $("atAdd").addEventListener("click",function(){var o=makeE();var a=Math.random()*6.28;o.x=CX+200*Math.cos(a);o.y=CY+200*Math.sin(a);o.returning=true;
    var bound=electrons.filter(function(e){return !e.free});var free=electrons.filter(function(e){return e.free});electrons=bound.concat([o],free);layout();drawShells();status()});
  $("atRem").addEventListener("click",function(){var bound=electrons.filter(function(e){return !e.free});if(!bound.length)return;var o=bound[bound.length-1],a=Math.atan2(o.y-CY,o.x-CX);
    o.free=1;o.excited=0;o.vx=Math.cos(a)*160;o.vy=Math.sin(a)*160;electrons.splice(electrons.indexOf(o),1);electrons.push(o);layout();drawShells();status()});
  $("atReset").addEventListener("click",function(){setElement(sel.value)});
  sel.addEventListener("change",function(){setElement(sel.value)});
  function setMode(m){mode=m;$("atBohr").classList.toggle("on",m==="bohr");$("atCloud").classList.toggle("on",m==="cloud");
    $("atBohr").setAttribute("aria-pressed",m==="bohr");$("atCloud").setAttribute("aria-pressed",m==="cloud");clearDots();drawShells()}
  $("atBohr").addEventListener("click",function(){setMode("bohr")});$("atCloud").addEventListener("click",function(){setMode("cloud")});
  var pb=$("atPlay"),txtPause=pb.textContent,txtPlay="▶ ចាក់";
  function syncPlay(){pb.textContent=running?txtPause:txtPlay}
  pb.addEventListener("click",function(){running=!running;syncPlay()});
  window.showAtom=function(i){sel.value=i;setElement(i)};
  setElement(10);syncPlay();requestAnimationFrame(frame);
})();

/* full periodic table: 118 elements, click for details, filter by category, open in the atom model */
(function(){
  var box=document.getElementById("ptf");if(!box)return;
  var PT=[["H",1,"1.008","non",1,1,"Hydrogen","អ៊ីដ្រូសែន",[1],0],["He",2,"4.0026","nob",1,18,"Helium","អេល្យូម",[2],2],["Li",3,"6.94","alk",2,1,"Lithium","លីចូម",[2,1],4],["Be",4,"9.0122","ae",2,2,"Beryllium","បេរីល្យូម",[2,2],5],["B",5,"10.81","mtd",2,13,"Boron","បរ",[2,3],6],["C",6,"12.011","non",2,14,"Carbon","កាបូន",[2,4],6],["N",7,"14.007","non",2,15,"Nitrogen","អាសូត",[2,5],7],["O",8,"15.999","non",2,16,"Oxygen","អុកស៊ីសែន",[2,6],8],["F",9,"18.998","hal",2,17,"Fluorine","ភ្លុយអរ",[2,7],10],["Ne",10,"20.180","nob",2,18,"Neon","ណេអុង",[2,8],10],["Na",11,"22.990","alk",3,1,"Sodium","សូដ្យូម",[2,8,1],12],["Mg",12,"24.305","ae",3,2,"Magnesium","ម៉ាញេស្យូម",[2,8,2],12],["Al",13,"26.982","post",3,13,"Aluminium","អាលុយមីញ៉ូម",[2,8,3],14],["Si",14,"28.085","mtd",3,14,"Silicon","ស៊ីលីស្យូម",[2,8,4],14],["P",15,"30.974","non",3,15,"Phosphorus","ផូស្វ័រ",[2,8,5],16],["S",16,"32.06","non",3,16,"Sulfur","ស្ពាន់ធ័រ",[2,8,6],16],["Cl",17,"35.45","hal",3,17,"Chlorine","ក្លរ",[2,8,7],18],["Ar",18,"39.948","nob",3,18,"Argon","អាកុង",[2,8,8],22],["K",19,"39.098","alk",4,1,"Potassium","ប៉ូតាស្យូម",[2,8,8,1],20],["Ca",20,"40.078","ae",4,2,"Calcium","កាល់ស្យូម",[2,8,8,2],20],["Sc",21,"44.956","tr",4,3,"Scandium","",[2,8,9,2],24],["Ti",22,"47.867","tr",4,4,"Titanium","",[2,8,10,2],26],["V",23,"50.942","tr",4,5,"Vanadium","",[2,8,11,2],28],["Cr",24,"51.996","tr",4,6,"Chromium","",[2,8,13,1],28],["Mn",25,"54.938","tr",4,7,"Manganese","",[2,8,13,2],30],["Fe",26,"55.845","tr",4,8,"Iron","ដែក",[2,8,14,2],30],["Co",27,"58.933","tr",4,9,"Cobalt","",[2,8,15,2],32],["Ni",28,"58.693","tr",4,10,"Nickel","",[2,8,16,2],31],["Cu",29,"63.546","tr",4,11,"Copper","ទង់ដែង",[2,8,18,1],35],["Zn",30,"65.38","tr",4,12,"Zinc","ស័ង្កសី",[2,8,18,2],35],["Ga",31,"69.723","post",4,13,"Gallium","",[2,8,18,3],39],["Ge",32,"72.630","mtd",4,14,"Germanium","",[2,8,18,4],41],["As",33,"74.922","mtd",4,15,"Arsenic","",[2,8,18,5],42],["Se",34,"78.971","non",4,16,"Selenium","",[2,8,18,6],45],["Br",35,"79.904","hal",4,17,"Bromine","ប្រូម",[2,8,18,7],45],["Kr",36,"83.798","nob",4,18,"Krypton","",[2,8,18,8],48],["Rb",37,"85.468","alk",5,1,"Rubidium","",[2,8,18,8,1],48],["Sr",38,"87.62","ae",5,2,"Strontium","",[2,8,18,8,2],50],["Y",39,"88.906","tr",5,3,"Yttrium","",[2,8,18,9,2],50],["Zr",40,"91.224","tr",5,4,"Zirconium","",[2,8,18,10,2],51],["Nb",41,"92.906","tr",5,5,"Niobium","",[2,8,18,12,1],52],["Mo",42,"95.95","tr",5,6,"Molybdenum","",[2,8,18,13,1],54],["Tc",43,"[98]","tr",5,7,"Technetium","",[2,8,18,13,2],55],["Ru",44,"101.07","tr",5,8,"Ruthenium","",[2,8,18,15,1],57],["Rh",45,"102.91","tr",5,9,"Rhodium","",[2,8,18,16,1],58],["Pd",46,"106.42","tr",5,10,"Palladium","",[2,8,18,18],60],["Ag",47,"107.87","tr",5,11,"Silver","ប្រាក់",[2,8,18,18,1],61],["Cd",48,"112.41","tr",5,12,"Cadmium","",[2,8,18,18,2],64],["In",49,"114.82","post",5,13,"Indium","",[2,8,18,18,3],66],["Sn",50,"118.71","post",5,14,"Tin","សំណប៉ាហាំង",[2,8,18,18,4],69],["Sb",51,"121.76","mtd",5,15,"Antimony","",[2,8,18,18,5],71],["Te",52,"127.60","mtd",5,16,"Tellurium","",[2,8,18,18,6],76],["I",53,"126.90","hal",5,17,"Iodine","អ៊ីយ៉ូត",[2,8,18,18,7],74],["Xe",54,"131.29","nob",5,18,"Xenon","",[2,8,18,18,8],77],["Cs",55,"132.91","alk",6,1,"Caesium","",[2,8,18,18,8,1],78],["Ba",56,"137.33","ae",6,2,"Barium","",[2,8,18,18,8,2],81],["La",57,"138.91","lan",9,3,"Lanthanum","",[2,8,18,18,9,2],82],["Ce",58,"140.12","lan",9,4,"Cerium","",[2,8,18,19,9,2],82],["Pr",59,"140.91","lan",9,5,"Praseodymium","",[2,8,18,21,8,2],82],["Nd",60,"144.24","lan",9,6,"Neodymium","",[2,8,18,22,8,2],84],["Pm",61,"[145]","lan",9,7,"Promethium","",[2,8,18,23,8,2],84],["Sm",62,"150.36","lan",9,8,"Samarium","",[2,8,18,24,8,2],88],["Eu",63,"151.96","lan",9,9,"Europium","",[2,8,18,25,8,2],89],["Gd",64,"157.25","lan",9,10,"Gadolinium","",[2,8,18,25,9,2],93],["Tb",65,"158.93","lan",9,11,"Terbium","",[2,8,18,27,8,2],94],["Dy",66,"162.50","lan",9,12,"Dysprosium","",[2,8,18,28,8,2],97],["Ho",67,"164.93","lan",9,13,"Holmium","",[2,8,18,29,8,2],98],["Er",68,"167.26","lan",9,14,"Erbium","",[2,8,18,30,8,2],99],["Tm",69,"168.93","lan",9,15,"Thulium","",[2,8,18,31,8,2],100],["Yb",70,"173.05","lan",9,16,"Ytterbium","",[2,8,18,32,8,2],103],["Lu",71,"174.97","lan",9,17,"Lutetium","",[2,8,18,32,9,2],104],["Hf",72,"178.49","tr",6,4,"Hafnium","",[2,8,18,32,10,2],106],["Ta",73,"180.95","tr",6,5,"Tantalum","",[2,8,18,32,11,2],108],["W",74,"183.84","tr",6,6,"Tungsten","",[2,8,18,32,12,2],110],["Re",75,"186.21","tr",6,7,"Rhenium","",[2,8,18,32,13,2],111],["Os",76,"190.23","tr",6,8,"Osmium","",[2,8,18,32,14,2],114],["Ir",77,"192.22","tr",6,9,"Iridium","",[2,8,18,32,15,2],115],["Pt",78,"195.08","tr",6,10,"Platinum","",[2,8,18,32,17,1],117],["Au",79,"196.97","tr",6,11,"Gold","មាស",[2,8,18,32,18,1],118],["Hg",80,"200.59","tr",6,12,"Mercury","បារត",[2,8,18,32,18,2],121],["Tl",81,"204.38","post",6,13,"Thallium","",[2,8,18,32,18,3],123],["Pb",82,"207.2","post",6,14,"Lead","សំណ",[2,8,18,32,18,4],125],["Bi",83,"208.98","post",6,15,"Bismuth","",[2,8,18,32,18,5],126],["Po",84,"[209]","post",6,16,"Polonium","",[2,8,18,32,18,6],125],["At",85,"[210]","hal",6,17,"Astatine","",[2,8,18,32,18,7],125],["Rn",86,"[222]","nob",6,18,"Radon","",[2,8,18,32,18,8],136],["Fr",87,"[223]","alk",7,1,"Francium","",[2,8,18,32,18,8,1],136],["Ra",88,"[226]","ae",7,2,"Radium","",[2,8,18,32,18,8,2],138],["Ac",89,"[227]","act",10,3,"Actinium","",[2,8,18,32,18,9,2],138],["Th",90,"232.04","act",10,4,"Thorium","",[2,8,18,32,18,10,2],142],["Pa",91,"231.04","act",10,5,"Protactinium","",[2,8,18,32,20,9,2],140],["U",92,"238.03","act",10,6,"Uranium","អ៊ុយរ៉ាញ៉ូម",[2,8,18,32,21,9,2],146],["Np",93,"[237]","act",10,7,"Neptunium","",[2,8,18,32,22,9,2],144],["Pu",94,"[244]","act",10,8,"Plutonium","",[2,8,18,32,24,8,2],150],["Am",95,"[243]","act",10,9,"Americium","",[2,8,18,32,25,8,2],148],["Cm",96,"[247]","act",10,10,"Curium","",[2,8,18,32,25,9,2],151],["Bk",97,"[247]","act",10,11,"Berkelium","",[2,8,18,32,27,8,2],150],["Cf",98,"[251]","act",10,12,"Californium","",[2,8,18,32,28,8,2],153],["Es",99,"[252]","act",10,13,"Einsteinium","",[2,8,18,32,29,8,2],153],["Fm",100,"[257]","act",10,14,"Fermium","",[2,8,18,32,30,8,2],157],["Md",101,"[258]","act",10,15,"Mendelevium","",[2,8,18,32,31,8,2],157],["No",102,"[259]","act",10,16,"Nobelium","",[2,8,18,32,32,8,2],157],["Lr",103,"[266]","act",10,17,"Lawrencium","",[2,8,18,32,32,8,3],163],["Rf",104,"[267]","tr",7,4,"Rutherfordium","",[2,8,18,32,32,10,2],163],["Db",105,"[268]","tr",7,5,"Dubnium","",[2,8,18,32,32,11,2],163],["Sg",106,"[269]","tr",7,6,"Seaborgium","",[2,8,18,32,32,12,2],163],["Bh",107,"[270]","tr",7,7,"Bohrium","",[2,8,18,32,32,13,2],163],["Hs",108,"[269]","tr",7,8,"Hassium","",[2,8,18,32,32,14,2],161],["Mt",109,"[278]","tr",7,9,"Meitnerium","",[2,8,18,32,32,15,2],169],["Ds",110,"[281]","tr",7,10,"Darmstadtium","",[2,8,18,32,32,16,2],171],["Rg",111,"[282]","tr",7,11,"Roentgenium","",[2,8,18,32,32,17,2],171],["Cn",112,"[285]","tr",7,12,"Copernicium","",[2,8,18,32,32,18,2],173],["Nh",113,"[286]","post",7,13,"Nihonium","",[2,8,18,32,32,18,3],173],["Fl",114,"[289]","post",7,14,"Flerovium","",[2,8,18,32,32,18,4],175],["Mc",115,"[290]","post",7,15,"Moscovium","",[2,8,18,32,32,18,5],175],["Lv",116,"[293]","post",7,16,"Livermorium","",[2,8,18,32,32,18,6],177],["Ts",117,"[294]","hal",7,17,"Tennessine","",[2,8,18,32,32,18,7],177],["Og",118,"[294]","nob",7,18,"Oganesson","",[2,8,18,32,32,18,8],176]];
  var EN=document.documentElement.lang==="en";
  var CAT={alk:"លោហៈអាល់កាឡាំង",ae:"លោហៈអាល់កាឡាំងលើដី",tr:"លោហៈឆ្លង",post:"លោហៈក្រោយឆ្លង",mtd:"ធាតុអំផូទែ",non:"អលោហៈ",hal:"អាឡូសែន",nob:"ឧស្ម័នកម្រ",lan:"ឡង់តានីត",act:"អាក់ទីនីត"};
  var ROM={1:"IA",2:"IIA",13:"IIIA",14:"IVA",15:"VA",16:"VIA",17:"VIIA",18:"VIIIA"};
  var SH="KLMNOPQ",SUP="⁰¹²³⁴⁵⁶⁷⁸⁹";
  function sup(n){return String(n).split("").map(function(c){return SUP[+c]}).join("")}
  function shells(z){var c=0,cfg=[],caps=null;var e=PT[z-1];/* electron shells come from the atom-model data when present */
    return e[8]||null}
  var grpT=box.dataset.grp,perT=box.dataset.per;
  function cell(r,c,node){node.style.gridRow=r+1;node.style.gridColumn=c+1;box.appendChild(node)}
  for(var g=1;g<=18;g++){var h=document.createElement("div");h.className="gh";h.innerHTML=(ROM[g]?"<b>"+ROM[g]+"</b>":"")+g;cell(0,g,h)}
  for(var p=1;p<=7;p++){var ph=document.createElement("div");ph.className="ph";ph.textContent=p;cell(p,0,ph)}
  var ref1=document.createElement("div");ref1.className="ph-ref";ref1.textContent="57–71";cell(6,3,ref1);
  var ref2=document.createElement("div");ref2.className="ph-ref";ref2.textContent="89–103";cell(7,3,ref2);
  var gap=document.createElement("div");gap.className="gap";gap.style.gridRow=9;box.appendChild(gap);
  var fl=document.createElement("div");fl.className="flab";fl.textContent=box.dataset.ln;fl.style.gridRow=11;box.appendChild(fl);
  var fa=document.createElement("div");fa.className="flab";fa.textContent=box.dataset.ac;fa.style.gridRow=12;box.appendChild(fa);
  var btns=[];
  PT.forEach(function(e){var b=document.createElement("button");b.type="button";b.className="pte ptc-"+e[3];b.dataset.z=e[1];b.dataset.cat=e[3];
    b.setAttribute("aria-pressed","false");b.setAttribute("aria-label",e[6]+" ("+e[0]+", Z = "+e[1]+")");
    b.innerHTML='<span class="z">'+e[1]+'</span><span class="s">'+e[0]+'</span>';
    var r=e[4]<=7?e[4]:e[4]+1;b.style.gridRow=r+1;b.style.gridColumn=e[5]+1;box.appendChild(b);btns.push(b);
    b.addEventListener("click",function(){show(e[1])})});
  var $=function(i){return document.getElementById(i)},cur=11;
  function show(z){cur=z;var e=PT[z-1];btns.forEach(function(b){b.setAttribute("aria-pressed",+b.dataset.z===z?"true":"false")});
    $("pfZ").textContent=z;$("pfSym").textContent=e[0];$("pfName").textContent=(!EN&&e[7])?e[7]:e[6];$("pfMass").textContent=e[2]+" u";
    $("pfZ2").textContent=z;$("pfM2").innerHTML=e[2]+" u<small class=\"molar\">M = "+e[2]+" g/mol</small>";$("pfCat").textContent=CAT[e[3]];
    var grp=e[4]>7?"3":String(e[5]),per=e[4]===9?6:e[4]===10?7:e[4];
    $("pfGP").textContent=grpT+" "+grp+(ROM[+grp]?" ("+ROM[+grp]+")":"")+" · "+perT+" "+per;
    $("pfN").innerHTML=e[9]+"<small class=\"molar\">n = A − Z = "+(z+e[9])+" − "+z+"</small>";
    var sh=e[8];$("pfSh").innerHTML=sh.map(function(n,i){return "("+SH[i]+")"+sup(n)}).join("<wbr>")+"<small class=\"molar\">= "+sh.join(", ")+"</small>";
    $("ptfInfo").querySelector(".ptf-big").className="ptf-big ptc-"+e[3];drawMini(e)}
  [].forEach.call(document.querySelectorAll(".ptc-leg"),function(l){l.addEventListener("click",function(){
    var on=l.getAttribute("aria-pressed")!=="true";[].forEach.call(document.querySelectorAll(".ptc-leg"),function(x){x.setAttribute("aria-pressed","false")});
    l.setAttribute("aria-pressed",on?"true":"false");box.classList.toggle("filtering",on);
    btns.forEach(function(b){b.classList.toggle("hl",on&&b.dataset.cat===l.dataset.cat)})})});
  /* mini Bohr atom: nucleus + electrons orbiting on each shell */
  var NS="http://www.w3.org/2000/svg",mini=$("pfMini"),rings=[],t0=null,miniMode="bohr",cloudDots=[],cloudCursor=0,lastCloudTime=0;
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function mk(t,a,p){var x=document.createElementNS(NS,t);for(var k in a)x.setAttribute(k,a[k]);p.appendChild(x);return x}
  function drawMini(e){if(!mini)return;while(mini.firstChild)mini.removeChild(mini.firstChild);rings=[];cloudDots=[];cloudCursor=0;lastCloudTime=0;
    var sh=e[8],n=sh.length,C=100,step=84/(n+0.6);
    mk("circle",{cx:C,cy:C,r:96,style:"fill:var(--ele);opacity:.06"},mini);
    sh.forEach(function(cnt,s){var R=14+(s+1)*step;
      if(miniMode==="bohr")mk("circle",{cx:C,cy:C,r:R,style:"fill:none;stroke:var(--line);stroke-width:1"},mini);
      if(miniMode==="bohr"){
        var g=mk("g",{},mini),er=Math.max(1.4,Math.min(4.2,0.3*2*Math.PI*R/cnt));
        for(var k=0;k<cnt;k++){var a=2*Math.PI*k/cnt;mk("circle",{cx:(C+R*Math.cos(a)).toFixed(2),cy:(C+R*Math.sin(a)).toFixed(2),r:er.toFixed(2),style:"fill:var(--ele)"},g)}
        var lb=mk("text",{x:C,y:(C-R+3).toFixed(1),"text-anchor":"middle",style:"font-size:7px;font-weight:700;fill:var(--muted);paint-order:stroke;stroke:var(--card);stroke-width:2px"},mini);lb.textContent=SH[s];
        rings.push({g:g,w:(s%2?-1:1)*60/(s+1)});
      }else{
        // Stable samples of a schematic 3D shell distribution projected onto the page.
        // Dot count is a visual sampling density, not the number of electrons.
        var seed=e[1]*131+s*997+1;
        function rand(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return (seed+0.5)/4294967296}
        var cloud=mk("g",{"data-cloud-shell":s+1},mini);
        for(var k=0;k<cnt*18;k++){
          var normal=Math.sqrt(-2*Math.log(rand()))*Math.cos(2*Math.PI*rand());
          var radius=Math.max(0,Math.min(95,R*(1+normal*0.24)));
          var polar=2*rand()-1,angle=2*Math.PI*rand(),projected=radius*Math.sqrt(1-polar*polar);
          var dot=mk("circle",{cx:(C+projected*Math.cos(angle)).toFixed(2),cy:(C+projected*Math.sin(angle)).toFixed(2),r:1.05,style:"fill:var(--ele);opacity:.24"},cloud);
          cloudDots.push({node:dot,radius:R});
        }
      }
    });
    var Z=e[1],nN=Math.max(0,parseInt(String(e[2]).replace(/[\[\]]/g,""),10)-Z)||0,tot=Math.min(Z+nN,160),rn=Math.min(11,Math.max(4,Math.sqrt(Z+nN)*1.4)),pr=Math.max(1,rn/Math.sqrt(tot)*1.2);
    for(var i=0;i<tot;i++){var a=i*2.39996,d=rn*Math.sqrt((i+.5)/tot),isP=((i*7)%tot)<Math.round(tot*Z/(Z+nN));
      mk("circle",{cx:(C+d*Math.cos(a)).toFixed(2),cy:(C+d*Math.sin(a)).toFixed(2),r:pr.toFixed(2),style:"fill:"+(isP?"var(--pro)":"var(--neu)")},mini)}
    var cap=$("pfMiniCap");if(cap)cap.textContent=e[0]+" · "+(miniMode==="bohr"?(EN?"Bohr model":"ម៉ូដែល Bohr"):(EN?"Schematic electron cloud":"ពពកអេឡិចត្រុងសាមញ្ញ"))+" · "+sh.join(", ");
    mini.setAttribute("aria-label",e[6]+" — "+(miniMode==="bohr"?(EN?"Bohr shell model":"ម៉ូដែលស្រទាប់ Bohr"):(EN?"Schematic electron probability cloud":"ពពកប្រូបាប៊ីលីតេអេឡិចត្រុងសាមញ្ញ")));
  }
  function setMiniMode(mode){
    miniMode=mode;
    ["pfBohr","pfCloud"].forEach(function(id){var active=(id==="pfBohr")===(mode==="bohr");$(id).classList.toggle("on",active);$(id).setAttribute("aria-pressed",String(active))});
    drawMini(PT[cur-1]);
  }
  $("pfBohr").addEventListener("click",function(){setMiniMode("bohr")});
  $("pfCloud").addEventListener("click",function(){setMiniMode("cloud")});
  // Renew probability samples rather than animate a fictitious orbital path.
  var miniPlaying=!reduce,lastMiniTime=null,miniElapsed=0;
  function refreshCloud(){
    var count=Math.ceil(cloudDots.length/4);
    for(var k=0;k<count;k++){
      var sample=cloudDots[cloudCursor++%cloudDots.length];
      var normal=Math.sqrt(-2*Math.log(Math.max(1e-10,Math.random())))*Math.cos(2*Math.PI*Math.random());
      var radius=Math.max(0,Math.min(95,sample.radius*(1+normal*0.24)));
      var polar=2*Math.random()-1,angle=2*Math.PI*Math.random(),projected=radius*Math.sqrt(1-polar*polar);
      sample.node.setAttribute("cx",(100+projected*Math.cos(angle)).toFixed(2));
      sample.node.setAttribute("cy",(100+projected*Math.sin(angle)).toFixed(2));
    }
  }
  function syncMiniPlay(){var button=$("pfMotion");if(!button)return;
    button.textContent=miniPlaying?(EN?"Pause animation":"ផ្អាកចលនា"):(EN?"Play animation":"បើកចលនា");
    button.setAttribute("aria-pressed",String(miniPlaying));
  }
  $("pfMotion").addEventListener("click",function(){miniPlaying=!miniPlaying;syncMiniPlay()});
  syncMiniPlay();
  function spin(ts){
    var delta=lastMiniTime===null?0:Math.min(100,ts-lastMiniTime);lastMiniTime=ts;
    if(miniPlaying&&!document.hidden){
      miniElapsed+=delta;
      rings.forEach(function(r){r.g.setAttribute("transform","rotate("+(r.w*miniElapsed/1000).toFixed(2)+" 100 100)")});
      if(miniMode==="cloud"&&cloudDots.length&&ts-lastCloudTime>=80){refreshCloud();lastCloudTime=ts}
    }
    requestAnimationFrame(spin);
  }
  requestAnimationFrame(spin);
  /* element information pop-up: opened by clicking the big element card */
  (function(){var src=document.getElementById("elinfo"),big=$("ptfInfo")&&$("ptfInfo").querySelector(".ptf-big");if(!src||!big)return;
    var D;try{D=JSON.parse(src.textContent)}catch(err){return}var L=D.L;
    big.setAttribute("role","button");big.tabIndex=0;big.title=L.hint;big.setAttribute("aria-haspopup","dialog");
    var hint=document.createElement("span");hint.className="ptf-hint";hint.textContent="ⓘ "+L.hint;big.appendChild(hint);
    var dlg=document.createElement("dialog");dlg.className="el-dlg";dlg.setAttribute("aria-labelledby","edName");
    dlg.innerHTML='<div class="ed-head"><div class="ed-tile"><small class="edZ"></small><b class="edSym"></b><span class="edMass"></span></div>'+
      '<div class="ed-title"><h3 id="edName"></h3><span class="pill edCat"></span><p class="edWhat"></p></div>'+
      '<button type="button" class="ed-x" aria-label="'+L.close+'">×</button></div>'+
      '<div class="ed-body"><div class="ed-row"><div class="ed-card"><h4>📅 '+L.when+'</h4><p class="edWhen"></p></div><div class="ed-card"><h4>👤 '+L.who+'</h4><p class="edWho"></p></div></div>'+
      '<div class="ed-card"><h4>🔬 '+L.how+'</h4><p class="edHow"></p></div>'+
      '<div class="ed-card"><h4>🌍 '+L.where+'</h4><p class="edWhere"></p></div>'+
      '<div class="ed-row"><div class="ed-card"><h4>🛠️ '+L.uses+'</h4><p class="edUses"></p></div><div class="ed-card"><h4>💡 '+L.why+'</h4><p class="edWhy"></p></div></div>'+
      '<div class="ed-refs"><h4>📚 '+L.refs+'</h4><ol class="edRefs"></ol></div></div>'+
      '<div class="ed-nav"><button type="button" class="ed-prev">‹ '+L.prev+'</button><button type="button" class="ed-next">'+L.next+' ›</button></div>';
    document.body.appendChild(dlg);
    var q=function(c){return dlg.querySelector(c)},z0=cur;
    function fill(z){var e=PT[z-1],d=D.d[z];if(!e||!d)return;z0=z;
      q(".ed-head").className="ed-head ptc-"+e[3];q(".edZ").textContent=z;q(".edSym").textContent=e[0];q(".edMass").textContent=e[2]+" u";
      q("#edName").textContent=(!EN&&e[7])?e[7]+" ("+e[6]+")":e[6];q(".edCat").textContent=CAT[e[3]];
      q(".edWhat").textContent=d[2];q(".edWhen").textContent=d[0];q(".edWho").textContent=d[1];q(".edUses").textContent=d[3];
      q(".edWhy").textContent=d[4];q(".edHow").textContent=d[5];q(".edWhere").textContent=d[6];
      var ol=q(".edRefs");ol.innerHTML="";d[7].forEach(function(r){var li=document.createElement("li");
        if(r.u){var a=document.createElement("a");a.href=r.u;a.target="_blank";a.rel="noopener";a.textContent=r.t;li.appendChild(a)}else li.textContent=r.t;ol.appendChild(li)});
      q(".ed-prev").disabled=z<=1;q(".ed-next").disabled=z>=118;q(".ed-body").scrollTop=0}
    function open(){fill(cur);if(dlg.showModal)dlg.showModal();else dlg.setAttribute("open","")}
    big.addEventListener("click",open);
    big.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();open()}});
    q(".ed-x").addEventListener("click",function(){dlg.close()});
    dlg.addEventListener("click",function(e){if(e.target===dlg)dlg.close()});
    function step(k){var z=z0+k;if(z<1||z>118)return;show(z);fill(z)}
    q(".ed-prev").addEventListener("click",function(){step(-1)});q(".ed-next").addEventListener("click",function(){step(1)});
    dlg.addEventListener("keydown",function(e){if(e.key==="ArrowLeft"){step(-1)}else if(e.key==="ArrowRight"){step(1)}});
  })();
  $("pfAtom").addEventListener("click",function(){if(window.showAtom){window.showAtom(cur-1);var s=document.getElementById("atomSvg");if(s)s.scrollIntoView({behavior:"smooth",block:"center"})}});
  show(11);
})();
