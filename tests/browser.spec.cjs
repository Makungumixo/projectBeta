const {test,expect}=require('@playwright/test');
const {spawn}=require('node:child_process');
const fs=require('node:fs');
let server;
test.beforeAll(async()=>{server=spawn('python3',['-m','http.server','8765','--bind','127.0.0.1'],{stdio:'ignore'});for(let i=0;i<50;i++){try{if((await fetch('http://127.0.0.1:8765/')).ok)return}catch{}await new Promise(r=>setTimeout(r,200))}throw Error('Server did not start')});
test.afterAll(()=>server?.kill());
const base='http://127.0.0.1:8765/';
const pages=['index.html','projects.html','case-studies.html','labs.html','academic-archive.html','sql-lab.html','math-lab.html','ml-lab.html','nlp-lab.html'];
for(const width of [390,768,1440]){
 test('responsive pages '+width,async({page})=>{
  await page.setViewportSize({width,height:900});
  for(const path of pages){
   const errors=[];const listener=e=>errors.push(e.message);page.on('pageerror',listener);
   await page.goto(base+path,{waitUntil:'domcontentloaded'});
   await expect(page.locator('h1').first()).toBeVisible();
   await expect(page.locator('#particles-js')).toHaveCount(1);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),path).toBeTruthy();
   await page.screenshot({path:'browser-review/'+width+'-'+path+'.png'});
   page.off('pageerror',listener);expect(errors,path).toEqual([]);
  }
 });
}
test('mobile navigation and theme persistence',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto(base);
 await page.locator('#nav-toggle').click();await expect(page.locator('#nav-menu')).toBeVisible();
 await page.locator('summary').filter({hasText:'Labs'}).click();
 await page.getByRole('link',{name:'All interactive labs'}).click();
 await expect(page).toHaveURL(/labs\.html/);
 await page.locator('#dark-mode-toggle').click();const dark=await page.locator('body').evaluate(e=>e.classList.contains('dark-mode'));
 await page.reload();expect(await page.locator('body').evaluate(e=>e.classList.contains('dark-mode'))).toBe(dark);
});
test('NLP interaction',async({page})=>{
 await page.goto(base+'nlp-lab.html');await page.locator('#docs').fill('apple banana\napple banana\ncarrot');await page.locator('#analyse').click();
 await expect(page.locator('#nlp-status')).toContainText('3 documents');await expect(page.locator('#similarity table')).toBeVisible();
});
test('ML and maths controls',async({page})=>{
 await page.goto(base+'ml-lab.html');await page.locator('#degree').fill('5');await expect(page.locator('#reg-status')).toContainText('RMSE');
 await page.goto(base+'math-lab.html');await page.locator('#run-math').click();await expect(page.locator('#math-status')).toContainText('Best');
});
test('SQL engine and query',async({page})=>{
 await page.goto(base+'sql-lab.html');await expect(page.locator('#run')).toBeEnabled({timeout:30000});
 await page.locator('#query').fill('SELECT COUNT(*) AS n FROM customers');await page.locator('#run').click();await expect(page.locator('#results')).toContainText('1000');
});


test('project imagery and local housing figures',async({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.goto(base+'index.html',{waitUntil:'domcontentloaded'});
 const imgs=page.locator('#projects .project-visual img');
 await expect(imgs).toHaveCount(9);
 const house=page.locator('img[src="assets/project-visuals/housing-actual-vs-predicted.png"]').first();
 await house.scrollIntoViewIfNeeded();
 await expect.poll(async()=>house.evaluate(img=>img.complete&&img.naturalWidth>0)).toBeTruthy();
 await page.locator('#projects').screenshot({path:'browser-review/featured-project-imagery.png'});
 await page.goto(base+'case-studies.html',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#housing .case-visual-grid img')).toHaveCount(3);
 await page.locator('#housing .case-visual-grid').scrollIntoViewIfNeeded();
 await expect.poll(async()=>page.locator('img[src="assets/project-visuals/housing-shap-summary.png"]').evaluate(img=>img.complete&&img.naturalWidth>0)).toBeTruthy();
 await page.locator('#housing .case-visual-grid').screenshot({path:'browser-review/housing-research-gallery.png'});
});


test('Amazon portfolio imagery loads from local assets',async({page})=>{
 await page.goto(base+'index.html',{waitUntil:'domcontentloaded'});
 const featured=page.locator('#projects img[src="assets/project-visuals/amazon-risk-ranking.png"]');
 await expect(featured).toHaveCount(1);
 await featured.scrollIntoViewIfNeeded();
 await expect.poll(async()=>featured.evaluate(img=>img.complete&&img.naturalWidth>0)).toBeTruthy();
 await page.goto(base+'projects.html',{waitUntil:'domcontentloaded'});
 const catalogue=page.locator('img[src="assets/project-visuals/amazon-risk-ranking.png"]');
 await expect(catalogue).toHaveCount(1);
 await expect.poll(async()=>catalogue.evaluate(img=>img.complete&&img.naturalWidth>0)).toBeTruthy();
 await page.goto(base+'case-studies.html',{waitUntil:'domcontentloaded'});
 const gallery=page.locator('#amazon .case-visual-grid img');
 await expect(gallery).toHaveCount(3);
 for(const image of await gallery.all()){
  await image.scrollIntoViewIfNeeded();
  await expect.poll(async()=>image.evaluate(img=>img.complete&&img.naturalWidth>0)).toBeTruthy();
 }
 await page.locator('#amazon .case-visual-grid').screenshot({path:'browser-review/amazon-visual-gallery.png'});
});


test('Amazon feature uses two responsive, loaded charts',async({page})=>{
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:900});
  await page.goto(base+'index.html',{waitUntil:'domcontentloaded'});
  const charts=page.locator('#projects .amazon-feature .amazon-chart-pair img');
  await expect(charts).toHaveCount(2);
  for(const img of await charts.all()){
   await img.scrollIntoViewIfNeeded();
   await expect.poll(async()=>img.evaluate(e=>e.complete&&e.naturalWidth>0)).toBeTruthy();
  }
  const columns=await page.locator('.amazon-chart-pair').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length);
  expect(columns).toBe(width<=650?1:2);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBeTruthy();
  await page.locator('.amazon-feature').screenshot({path:'browser-review/amazon-feature-'+width+'.png'});
 }
});


test('background particles are visible above background with local script',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 for(const path of ['index.html','projects.html','case-studies.html']){
  await page.goto(base+path,{waitUntil:'load'});
  const canvas=page.locator('#particles-js canvas');
  await expect(canvas).toHaveCount(1);
  await expect(canvas).toBeVisible();
  const layering=await page.locator('#particles-js').evaluate(el=>{
   const style=getComputedStyle(el);
   return {zIndex:Number(style.zIndex),pointerEvents:style.pointerEvents,width:el.clientWidth,height:el.clientHeight};
  });
  expect(layering.zIndex).toBeGreaterThanOrEqual(0);
  expect(layering.pointerEvents).toBe('none');
  expect(layering.width).toBeGreaterThan(0);
  expect(layering.height).toBeGreaterThan(0);
 }
 await page.screenshot({path:'browser-review/particles-restored.png'});
});


test('Almond case study is linked from both project listings',async({page})=>{
 await page.goto(base+'index.html',{waitUntil:'domcontentloaded'});
 const home=page.locator('#projects a[href="case-studies.html#almond"]');
 await expect(home).toHaveCount(1);
 await page.goto(base+'projects.html',{waitUntil:'domcontentloaded'});
 await expect(page.locator('[data-category="AI"] a[href="case-studies.html#almond"]')).toHaveCount(1);
 await expect(page.locator('#count')).toContainText('15 entries');
 await page.goto(base+'case-studies.html#almond',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#almond h2')).toContainText('Almond Variety Classification');
 await expect(page.locator('#almond')).toContainText('80.29%');
});


test('COS711 Almond charts load, source links stay in case study',async({page})=>{
 await page.goto(base+'index.html',{waitUntil:'domcontentloaded'});
 const card=page.locator('#projects .project-card').filter({hasText:'Almond Classification Neural Network'});
 await expect(card).toHaveCount(1);
 await expect(card.locator('a')).toHaveCount(1);
 await expect(card.locator('a')).toHaveAttribute('href','case-studies.html#almond');
 const paired=card.locator('.almond-chart-pair img');
 await expect(paired).toHaveCount(2);
 const thumbnail=card.locator('img[src="assets/project-visuals/almond-optimizer-accuracy.png"]');
 const loss=card.locator('img[src="assets/project-visuals/almond-optimizer-loss.png"]');
 await loss.scrollIntoViewIfNeeded();
 await expect.poll(async()=>loss.evaluate(e=>e.complete&&e.naturalWidth>0)).toBeTruthy();
 await thumbnail.scrollIntoViewIfNeeded();
 await expect.poll(async()=>thumbnail.evaluate(e=>e.complete&&e.naturalWidth>0)).toBeTruthy();
 await page.goto(base+'projects.html',{waitUntil:'domcontentloaded'});
 const catalogue=page.locator('article[data-category="AI"]').filter({hasText:'Almond Variety Classification'});
 await expect(catalogue.locator('img')).toHaveCount(1);
 await page.goto(base+'case-studies.html#almond',{waitUntil:'domcontentloaded'});
 const figures=page.locator('#almond .case-visual-grid img');
 await expect(figures).toHaveCount(6);
 for(const img of await figures.all()){
  await img.scrollIntoViewIfNeeded();
  await expect.poll(async()=>img.evaluate(e=>e.complete&&e.naturalWidth>0)).toBeTruthy();
 }
 await expect(page.locator('#almond')).toContainText('Artificial Intelligence II');
 await expect(page.locator('#almond a[href^="https://github.com/"]')).toHaveCount(3);
 await page.locator('#almond .case-visual-grid').screenshot({path:'browser-review/almond-actual-notebook-figures.png'});
});


test('each case study provides dataset provenance or an explicit benchmark note',async({page})=>{
 await page.goto(base+'case-studies.html',{waitUntil:'domcontentloaded'});
 const ids=['amazon','housing','news','translation','plants','almond','optimisation'];
 for(const id of ids){
  const source=page.locator('#'+id+' .dataset-source');
  await expect(source).toHaveCount(1);
  await expect(source).toBeVisible();
  if(id!=='optimisation'){
   await expect(source.locator('a[href^="https://"]')).not.toHaveCount(0);
  } else {
   await expect(source).toContainText('rather than a single external dataset');
  }
 }
 await expect(page.locator('#almond .dataset-source')).toContainText('Dataset source (confirmed)');
});


test('dataset provenance distinguishes verified source from missing original file',async({page})=>{
 await page.goto(base+'case-studies.html',{waitUntil:'domcontentloaded'});
 const almond=page.locator('#almond .dataset-source');
 await expect(almond).toContainText('Dataset source (confirmed)');
 await expect(almond.locator('a[href="https://www.kaggle.com/datasets/sohaibmoradi/almond-types-classification/data"]')).toHaveCount(1);
 const translation=page.locator('#translation .dataset-source');
 await expect(translation.locator('a[href="https://huggingface.co/datasets/dsfsi/vukuzenzele-sentence-aligned"]')).toHaveCount(1);
 await expect(translation.locator('a[href="https://huggingface.co/datasets/dsfsi/vukuzenzele-monolingual"]')).toHaveCount(1);
 await expect(translation).toContainText('no completed model experiment is claimed');
});


test('COS781 homepage card and source-backed NLP case study',async({page})=>{
 await page.goto(base+'index.html',{waitUntil:'domcontentloaded'});
 const card=page.locator('#projects .cos781-card');
 await expect(card).toHaveCount(1);
 await expect(card.locator('a')).toHaveCount(1);
 await expect(card.locator('a')).toHaveAttribute('href','case-studies.html#cos781');
 await expect(card.locator('.cos781-chart-pair img')).toHaveCount(2);
 for(const img of await card.locator('.cos781-chart-pair img').all()){
   await img.scrollIntoViewIfNeeded();
   await expect.poll(async()=>img.evaluate(e=>e.complete&&e.naturalWidth>0)).toBeTruthy();
 }
 await page.goto(base+'projects.html',{waitUntil:'domcontentloaded'});
 const listing=page.locator('article[data-category="NLP"]').filter({hasText:'English–itsonga Data Augmentation'});
 await expect(listing).toHaveCount(1);
 await expect(listing.locator('a')).toHaveAttribute('href','case-studies.html#cos781');
 await expect(page.locator('#count')).toContainText('15 entries');
 await page.goto(base+'case-studies.html#cos781',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#cos781 h2')).toContainText('English–itsonga');
 await expect(page.locator('#cos781 .case-visual-grid img')).toHaveCount(4);
 for(const img of await page.locator('#cos781 .case-visual-grid img').all()){
   await img.scrollIntoViewIfNeeded();
   await expect.poll(async()=>img.evaluate(e=>e.complete&&e.naturalWidth>0)).toBeTruthy();
 }
 await expect(page.locator('#cos781')).toContainText('26 evaluation');
 await expect(page.locator('#cos781')).toContainText('not English–itsonga translation quality scores');
 await expect(page.locator('#cos781 a[href*="colab.research.google.com"]')).toHaveCount(1);
});


test('one consolidated Xitsonga homepage project links to supporting case study',async({page})=>{
 await page.goto(base+'index.html',{waitUntil:'domcontentloaded'});
 const cards=page.locator('#projects .project-card').filter({hasText:'itsonga'});
 await expect(cards).toHaveCount(1);
 const card=page.locator('#projects .cos781-card');
 await expect(card).toHaveCount(1);
 await expect(card).toContainText('Low-resource Xitsonga–English');
 await expect(card.locator('.cos781-chart-pair img')).toHaveCount(2);
 await expect(card.locator('a')).toHaveCount(1);
 await expect(card.locator('a')).toHaveAttribute('href','case-studies.html#cos781');
 await page.goto(base+'case-studies.html#cos781',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#cos781 a[href="document-viewer.html?document=research-report"]')).toHaveCount(1);
 await expect(page.locator('#cos781 a[href*="colab.research.google.com"]')).toHaveCount(1);
 await expect(page.locator('#translation')).toHaveCount(1);
});
