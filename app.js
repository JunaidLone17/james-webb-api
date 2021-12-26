
const cheerio = require('cheerio').default
const express = require('express')
const puppeteer = require('puppeteer');
const app = express()
const PORT = process.env.PORT || 3000
app.get('/', (req, res) => {
  console.log("Check Alpha");
(async () => {
  try {
   
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.jwst.nasa.gov/content/webbLaunch/whereIsWebb.html');
    await page.waitForSelector('#milesEarth', { timeout: 5000 });

    const body = await page.evaluate(() => {
      return document.querySelector('body').innerHTML;
    });
    //console.log(body);
    let $ = cheerio.load(body);
    
      var dist = "#NASAwebb \n @Nasawebb Distance From Earth : " + $('#milesEarth', body).text() + " miles"
    var depl = " Current Deployment Status:" + $('.oneLiner', body).text()
    var eventtime = " Time of event: " + $(".nominalEventTime", body).text()
    let image = $('#ssdItemDetailPanelImageWrap', body)
    var imagelink = image.children().last().attr()
    var imglink = "https://www.jwst.nasa.gov" + imagelink['src'];
      var response = {
        'Distance': dist,
        'Deployment': depl,
        'eventtime' : eventtime,
      'imglink':imglink }  
    res.json(response)
      
   
    

      
      await browser.close();
    
  } catch (error) {
    console.log(error);
  }
   })();
     

}) 
app.listen(PORT, () => {
    console.log("PORT UP")
})