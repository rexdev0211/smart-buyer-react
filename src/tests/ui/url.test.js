const puppeteer = require('puppeteer')


describe('URLs', () => {
  beforeAll(async () => {
    await page.setViewport({
      width: 1920,
      height: 1080
    })
  }); 
  // afterAll(async () => {
  //   await page.setDefaultTimeout(-1);
  //   await browser.close();
  //   return true;
  // });

  beforeEach(async () => {
    await page.goto('http://localhost:3000', {waitUntil: 'networkidle0'});
  }); 

  describe('/en', () => {
    it('direct url', async () => {
      expect(await page.url()).toEqual('http://localhost:3000/en/');
    }); 
    
    it('logo click', async () => {
      await page.click('.brands-list a')
      await page.click('.logo')
      expect(await page.url()).toEqual('http://localhost:3000/en/');
    });
  });

  describe('/en/search',  () => {
    it('see all', async () => {
      await page.click('.expandable-title a')
      expect(await page.url()).toMatch(/^http:\/\/localhost:3000\/en\/search$/);
    });
    
    it('clear filters', async () => {
      await page.click('.brands-list a');
      await page.click('*[class*="makeStyles-hidesm"] button')
      expect(await page.url()).toMatch(/^http:\/\/localhost:3000\/en\/search$/);
    });
  });

  it('/en/brand/{Name}/', async () => {
    await page.click('.brands-list a')
    expect(await page.url()).toMatch(/^http:\/\/localhost:3000\/en\/brand\/\w+$/);
  });  
  
  it('/en/brand/{Name},{Name}/', async () => {
    await Promise.all([
      page.click('.brands-list a'),
      page.waitForNavigation({waitUntil: 'networkidle0'}),
    ]);
    await page.click('*[class*="makeStyles-hidesm"] div div:nth-child(5) *[class*="makeStyles-category"]:nth-child(3) input')
    expect(await page.url()).toMatch(/^http:\/\/localhost:3000\/en\/brand\/\w+,\w+$/);
  }); 
  
  it('/en/tag/{Name}', async () => {
    await page.click('.top-tags a')
    expect(await page.url()).toMatch(/^http:\/\/localhost:3000\/en\/tag\/\w+$/);
  });  
  
  it('/en/tag/{Name},{Name}', async () => {
    await Promise.all([
      page.click('.top-tags a'),
      page.waitForNavigation({waitUntil: 'networkidle0'}),
    ]);
    await page.click('*[class*="makeStyles-category"]:nth-child(3) input')
    expect(await page.url()).toMatch(/^http:\/\/localhost:3000\/en\/tag\/\w+,\w+$/);
  });  
  
  it('/en/brand/{Brand}/tag/{Name}', async () => {
    await Promise.all([
      page.click('.top-tags a'),
      page.waitForNavigation({waitUntil: 'networkidle0'}),
    ]);
    await page.click('*[class*="makeStyles-hidesm"] div div:nth-child(5) *[class*="makeStyles-category"]:nth-child(3) input')
    expect(await page.url()).toMatch(/^http:\/\/localhost:3000\/en\/brand\/\w+\/tag\/\w+$/);
  });
  
  it('/en/brand/{Brand},{Brand}/tag/{Name},{Name}', async () => {
    await Promise.all([
      page.click('.top-tags a'),
      page.waitForNavigation({waitUntil: 'networkidle0'}),
    ]);
    await page.click('*[class*="makeStyles-category"]:nth-child(3) input')
    await page.click('*[class*="makeStyles-hidesm"] div div:nth-child(5) *[class*="makeStyles-category"]:nth-child(2) input')
    await page.click('*[class*="makeStyles-hidesm"] div div:nth-child(5) *[class*="makeStyles-category"]:nth-child(3) input')
    expect(await page.url()).toMatch(/^http:\/\/localhost:3000\/en\/brand\/\w+,\w+\/tag\/\w+,\w+$/);
  }); 
  
  it('/en/products/{Brand}/{Name}', async () => {
    await page.click('.products-list a')
    expect(await page.url()).toMatch(/^http:\/\/localhost:3000\/en\/products\/\w+\/.+/);
  });  
  
  it('title "Spend smarter, to enjoy longer"', async () => {
    expect(await page.title()).toEqual('Smartbuyer - Spend smarter, to enjoy longer');
  });
});