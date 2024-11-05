import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";

const app = express();
const port = 3001;

app.use(cors());

app.get('/api/web-scrap', async (req, res) => {
    try {
        const url = "https://www.linkedin.com/jobs/collections/remote-jobs/?currentJobId=4061990885&discover=recommended&discoveryOrigin=JOBS_HOME_JYMBII";

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.goto(url, { waitUntil: 'networkidle2' });

        const content = await page.content();
        const $ = cheerio.load(content);

        const articles = {
            h1: $('strong').map((i, el) => $(el).text()).get(),
            h2: $('.job-card-container__primary-description').map((i, el) => $(el).text()).get(),
            img: $('img').map((i, el) => $(el).attr('src')).get(),
            p: $('p[dir="ltr"]').map((i, el) => $(el).text()).get(),
        };

        await browser.close();
        res.json(articles);
    } catch (err) {
        console.error("Scraping failed:", err.message);
        res.status(500).json({ error: "Failed to scrape the website" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});
