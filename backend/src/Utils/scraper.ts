import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

export const getHtml = async (url: string): Promise<string> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const html = await page.content();
  await browser.close();
  return html;
};

export const getCheerio = async (url: string): Promise<cheerio.CheerioAPI | undefined> => {
  try {
    const html = await getHtml(url);
    return cheerio.load(html);
  } catch (error) {
    console.log(error);
  }
};
