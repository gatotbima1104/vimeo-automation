import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import dotenv from 'dotenv'
import { executablePath } from 'puppeteer'

dotenv.config()

puppeteerExtra.use(StealthPlugin());

(async()=> {
    try {
        const browser = await puppeteerExtra.launch({
         ignoreHTTPSErrors: true,
         headless: false,
         executablePath: executablePath(),
         args: ['--no-sandbox', '--disable-setuid-sandbox'],
        }) 
     
        const url = 'https://vimeo.com/log_in'
     
        const page = await browser.newPage()
        await page.goto(url, {
         waitUntil: 'domcontentloaded'
        })
     
        await page.waitForTimeout(5000)
     
        const email = await page.$('input#signup_email')
        const password = await page.$('input#login_password')
     
        await email.type(process.env.EMAIL, {
         delay: 100
        })
        await password.type(process.env.PASSWORD, {
         delay: 100
        })
     
        const btn = await page.$('input[type="submit"]')
        await btn.click()
     
        await page.waitForNavigation()
        await page.waitForTimeout(5000)
     
        await page.screencast({
         path: 'home.jpg'
        })
    } catch (error) {
        console.log(error)
    }
})()