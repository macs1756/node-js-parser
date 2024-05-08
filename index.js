
import fs from 'fs'
import puppeteer from 'puppeteer';

const getCurrentDateTimeString = () => {
  const now = new Date();
  return now.toISOString().replace(/:/g, '-').replace(/\..+/, '').replace('T', '-');
};


(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://www.bazar.club/item_category/architecture-design');


  //get screenshot
  //await page.setViewport({ width: 1080, height: 1024 });
  // await page.screenshot({ path: `${Date.now()}.png` })



  const res = await page.evaluate(() => {

    let arrTitle = []

    let title = document.querySelectorAll('.listing-card-title')

    title.forEach(e => {
      arrTitle.push({
        link: e.href,
        text: e.innerText,
      })

    })

    return arrTitle
  })

  console.log(res);

  const filePath = `json/data_${getCurrentDateTimeString()}.json`;

  try {
    fs.writeFileSync(filePath, JSON.stringify(res));
    console.log('Дані успішно записані у файл', filePath);
  } catch (err) {
    console.error('Помилка запису в файл:', err);
  }



  // Wait and click on first result
  // const searchResultSelector = '.devsite-result-item-link';
  // await page.waitForSelector(searchResultSelector);
  // await page.click(searchResultSelector);


  // Locate the full title with a unique string
  // const textSelector = await page.waitForSelector(
  //   'text/Customize and automate'
  // );

  // const fullTitle = await textSelector?.evaluate(el => el.textContent);

  // Print the full title
  // console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();
})();

