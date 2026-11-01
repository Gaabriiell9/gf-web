// Capture la page d'accueil de chaque projet du portfolio.
// Lancé par .github/workflows/screenshots.yml (GitHub Actions a accès à internet).
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const all = [
  ['senaelec', 'https://senaelec.fr'],
  ['susymodas', 'https://susymodas.com'],
  ['quickdevis', 'https://quickdevis.gf-web.fr'],
  ['cvpro', 'https://cv-pro.gf-web.fr'],
]
// SITES=quickdevis,cvpro pour ne refaire que certaines captures
const only = (process.env.SITES || '').split(',').filter(Boolean)
const sites = only.length ? all.filter(([n]) => only.includes(n)) : all

await mkdir('public/projets', { recursive: true })
const browser = await chromium.launch()
for (const [name, url] of sites) {
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1.5, locale: 'fr-FR' })
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 })
    await page.waitForTimeout(2500)
    // bandeau cookies : on accepte pour qu'il ne masque pas la page
    for (const label of ['Tout accepter', 'Accepter tout', "J'accepte"]) {
      const b = page.getByRole('button', { name: label, exact: true }).first()
      if (await b.isVisible().catch(() => false)) { await b.click().catch(() => {}); break }
    }
    await page.addStyleTag({ content: '::-webkit-scrollbar{display:none}' })
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(2500)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(800)
    await page.screenshot({ path: `public/projets/${name}.jpg`, type: 'jpeg', quality: 78 })
    console.log('ok', name, page.url())
  } catch (e) {
    console.log('ERREUR', name, e.message)
  }
  await page.close()
}
await browser.close()
