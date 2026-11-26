const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
function load(file, values) {
 const nodes = new Map();
 function node(){return {value:'',textContent:'',children:[],style:{},setAttribute(){},addEventListener(){},append(...x){this.children.push(...x)},replaceChildren(...x){this.children=x}}}
 function get(id){if(!nodes.has(id)){const n=node();n.value=String(values[id]??'');nodes.set(id,n)}return nodes.get(id)}
 const document={getElementById:get,createElement:node,createElementNS:node,addEventListener(_,fn){fn()}};
 vm.runInNewContext(fs.readFileSync(file,'utf8'),{document,Math,Number,Array,Set,Map,Object,String,Error},{timeout:5000});
 return get;
}
test('optimisation: hill climbing does not worsen best objective',()=>{
 const g=load('math-lab.js',{algorithm:'hill',start:3,rate:.1,iterations:80,seed:42});
 const value=()=>Number(g('math-status').textContent.match(/Best f\(x\): (-?[\d.]+)/)[1]);
 const before=value();g('run-math').onclick();assert.ok(value()<=before);
});
test('TSP: 2-opt never increases route length',()=>{
 const g=load('math-extras.js',{'cluster-k':3});
 const length=()=>Number(g('tsp-status').textContent.match(/Route length: ([\d.]+)/)[1]);
 const before=length();g('tsp-run').onclick();assert.ok(length()<=before);
});
test('K-means: Lloyd updates do not increase SSE',()=>{
 const g=load('math-extras.js',{'cluster-k':3});
 const sse=()=>Number(g('cluster-status').textContent.match(/SSE: ([\d.]+)/)[1]);
 const before=sse();g('cluster-run').onclick();assert.ok(sse()<=before);
});
test('regression: finite errors for all supported degrees',()=>{
 const g=load('ml-lab.js',{degree:3,threshold:.5});
 for(let d=1;d<=9;d++){g('degree').value=String(d);g('degree').oninput();assert.match(g('reg-status').textContent,/Training RMSE: \d+\.\d+ \| Test RMSE: \d+\.\d+/)}
});
test('classification: threshold extremes and confusion matrix totals',()=>{
 const g=load('ml-lab.js',{degree:3,threshold:.5});
 for(const t of [0,.5,1]){g('threshold').value=String(t);g('threshold').oninput();const [tp,tn,fp,fn]=['tp','tn','fp','fn'].map(id=>Number(g(id).textContent));assert.equal(tp+tn+fp+fn,160);if(t===0)assert.equal(tn+fn,0);if(t===1)assert.equal(tp+fp,0)}
});
test('NLP: identical documents have cosine 1; disjoint documents 0',()=>{
 const g=load('nlp-lab.js',{docs:'apple banana\napple banana\ncarrot',weight:'tfidf',k:2});
 const rows=g('similarity').children[0].children[1].children;
 assert.equal(rows[0].children[2].textContent,'1');assert.equal(rows[0].children[3].textContent,'0');
});
