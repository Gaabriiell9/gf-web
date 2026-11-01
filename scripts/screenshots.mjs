// Capture la page d'accueil de chaque projet du portfolio.
// Lancé par .github/workflows/screenshots.yml (GitHub Actions a accès à internet).
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const sites = [
  ['senaelec', 'https://senaelec.fr'],
  ['susymodas', 'https://susymodas.com'],
  ['quickdevis', 'https://quickdevis.gf-web.fr'],
  ['cvpro', 'https://cv-pro.gf-web.fr'],
]

await mkdir('public/projets', { recursive: true })
const browser = await chromium.launch()
for (const [name, url] of sites) {
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1.5, locale: 'fr-FR' })
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 })
    for (const label of ['Tout accepter', 'Accepter', "J'accepte", 'OK']) {
      const b = page.getByRole('button', { name: label, exact: false }).first()
      if (await b.isVisible().catch(() => false)) { await b.click().catch(() => {}); break }
    }
    await page.addStyleTag({ content: '::-webkit-scrollbar{display:none}' })
    await page.waitForTimeout(3500)
    await page.screenshot({ path: `public/projets/${name}.jpg`, type: 'jpeg', quality: 78 })
    console.log('ok', name, page.url())
  } catch (e) {
    console.log('ERREUR', name, e.message)
  }
  await page.close()
}
await browser.close()
