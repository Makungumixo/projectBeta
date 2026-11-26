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
 await expect(imgs).toHaveCount(4);
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
