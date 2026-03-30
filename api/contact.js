// api/contact.js — Vercel Serverless Function
// Envoie via Resend : notification interne + confirmation client
// Variables d'env requises : RESEND_API_KEY

const RECIPIENT = 'gfweb.pro@outlook.fr'
const SENDER    = 'GF Web <contact@gf-web.fr>'

function isValidEmail(str) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// ── Templates ────────────────────────────────────────────────────────────────

function notificationHtml({ name, email, subject, message }) {
  const n = escapeHtml(name)
  const e = escapeHtml(email)
  const s = escapeHtml(subject)
  const m = escapeHtml(message)

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#080808;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0f0f0f;border:1px solid #1e1e1e;border-radius:6px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="padding:32px 40px 24px;border-bottom:1px solid #1e1e1e;">
            <span style="font-family:monospace;font-size:20px;font-weight:800;color:#f0ede8;letter-spacing:-0.02em;">GF<span style="color:#c8f135;">.</span></span>
            <span style="display:block;margin-top:12px;font-family:monospace;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#c8f135;">Nouveau message reçu</span>
          </td>
        </tr>

        <!-- Infos -->
        <tr>
          <td style="padding:32px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:32px;">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #1e1e1e;font-family:monospace;font-size:10px;color:#4a4a4a;text-transform:uppercase;letter-spacing:0.1em;width:110px;vertical-align:top;">Nom</td>
                <td style="padding:12px 0;border-bottom:1px solid #1e1e1e;font-size:14px;color:#f0ede8;">${n}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #1e1e1e;font-family:monospace;font-size:10px;color:#4a4a4a;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;">Email</td>
                <td style="padding:12px 0;border-bottom:1px solid #1e1e1e;font-size:14px;"><a href="mailto:${e}" style="color:#c8f135;text-decoration:none;">${e}</a></td>
              </tr>
              <tr>
                <td style="padding:12px 0;font-family:monospace;font-size:10px;color:#4a4a4a;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;">Sujet</td>
                <td style="padding:12px 0;font-size:14px;color:#f0ede8;">${s}</td>
              </tr>
            </table>

            <!-- Message block -->
            <div style="background:#080808;border:1px solid #1e1e1e;border-radius:4px;padding:24px;">
              <p style="margin:0 0 14px;font-family:monospace;font-size:10px;color:#4a4a4a;letter-spacing:0.1em;text-transform:uppercase;">Message</p>
              <p style="margin:0;font-size:14px;line-height:1.8;color:#a0a0a0;white-space:pre-wrap;">${m}</p>
            </div>

            <!-- CTA -->
            <div style="margin-top:32px;">
              <a href="mailto:${e}?subject=Re: ${s}" style="display:inline-block;background:#c8f135;color:#080808;font-family:monospace;font-size:12px;letter-spacing:0.06em;padding:13px 24px;border-radius:2px;text-decoration:none;font-weight:600;">Répondre à ${n}</a>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #1e1e1e;font-family:monospace;font-size:10px;color:#4a4a4a;letter-spacing:0.04em;">
            gf-web.fr — Email reçu depuis le formulaire de contact
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function confirmationHtml({ name }) {
  const n = escapeHtml(name)

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#080808;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0f0f0f;border:1px solid #1e1e1e;border-radius:6px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="padding:32px 40px 24px;border-bottom:1px solid #1e1e1e;">
            <span style="font-family:monospace;font-size:20px;font-weight:800;color:#f0ede8;letter-spacing:-0.02em;">GF<span style="color:#c8f135;">.</span></span>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px;">
            <p style="margin:0 0 8px;font-family:monospace;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#c8f135;">Message reçu</p>
            <h1 style="margin:0 0 24px;font-size:28px;font-weight:800;letter-spacing:-0.03em;color:#f0ede8;line-height:1.1;">Bonjour ${n},</h1>
            <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#a0a0a0;">
              Merci pour votre message. Je l'ai bien reçu et vous répondrai dans les <strong style="color:#f0ede8;">24 heures</strong>.
            </p>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.75;color:#a0a0a0;">
              En attendant, n'hésitez pas à consulter mes services sur le site.
            </p>

            <a href="https://gf-web.fr" style="display:inline-block;background:#c8f135;color:#080808;font-family:monospace;font-size:12px;letter-spacing:0.06em;padding:13px 24px;border-radius:2px;text-decoration:none;font-weight:600;">Voir gf-web.fr</a>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:0 40px;">
            <div style="height:1px;background:#1e1e1e;"></div>
          </td>
        </tr>

        <!-- Signature -->
        <tr>
          <td style="padding:28px 40px 32px;">
            <p style="margin:0 0 4px;font-size:14px;color:#f0ede8;font-weight:500;">Gabriel</p>
            <p style="margin:0;font-family:monospace;font-size:11px;color:#4a4a4a;letter-spacing:0.04em;">GF Web — Développeur web freelance</p>
            <p style="margin:6px 0 0;font-family:monospace;font-size:11px;"><a href="mailto:contact@gf-web.fr" style="color:#c8f135;text-decoration:none;">contact@gf-web.fr</a></p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:16px 40px;border-top:1px solid #1e1e1e;font-family:monospace;font-size:10px;color:#4a4a4a;letter-spacing:0.04em;">
            Vous recevez cet email car vous avez soumis le formulaire de contact sur gf-web.fr.
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

// ── Handler ───────────────────────────────────────────────────────────────────

async function sendEmail(payload, apiKey) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const responseText = await res.text()

  if (!res.ok) {
    throw new Error(`Resend HTTP ${res.status} — ${responseText}`)
  }

  try {
    return JSON.parse(responseText)
  } catch {
    return { raw: responseText }
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // ── Validation ──
  const { name, email, subject, message } = req.body ?? {}

  const errors = []
  if (!name?.trim())                          errors.push('name')
  if (!email?.trim() || !isValidEmail(email)) errors.push('email')
  if (!subject?.trim())                       errors.push('subject')
  if (!message?.trim())                       errors.push('message')

  if (errors.length) {
    return res.status(400).json({ error: 'Champs invalides ou manquants', fields: errors })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY manquante')
    return res.status(500).json({ error: 'Configuration serveur manquante' })
  }

  const n = name.trim()
  const e = email.trim()
  const s = subject.trim()
  const m = message.trim()

  // ── Email 1 : notification interne ──
  try {
    await sendEmail({
      from: SENDER,
      to: [RECIPIENT],
      reply_to: e,
      subject: `[GF Web] ${s} — ${n}`,
      html: notificationHtml({ name: n, email: e, subject: s, message: m }),
    }, apiKey)
  } catch (err) {
    console.error('[contact] notification FAILED:', String(err))
    return res.status(500).json({ error: 'Échec de l\'envoi. Réessayez ou contactez-moi directement.' })
  }

  // ── Email 2 : confirmation client (non bloquant) ──
  try {
    await sendEmail({
      from: SENDER,
      to: [e],
      subject: 'Votre message a bien été reçu — GF Web',
      html: confirmationHtml({ name: n }),
    }, apiKey)
  } catch (err) {
    console.error('[contact] confirmation FAILED:', String(err))
  }

  return res.status(200).json({ success: true })
}
