// api/contact.js — Vercel Serverless Function
// Envoie un email via Resend (https://resend.com) — API gratuite jusqu'à 3000 emails/mois
// Variables d'environnement à configurer sur Vercel :
//   RESEND_API_KEY  → ta clé API Resend
//   CONTACT_EMAIL   → l'adresse qui reçoit les messages (ex: joaofarias20@icloud.com)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, subject, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Champs requis manquants' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_EMAIL || 'joaofarias20@icloud.com'

  if (!apiKey) {
    console.error('RESEND_API_KEY manquante')
    return res.status(500).json({ error: 'Configuration serveur manquante' })
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'GF Web Contact <contact@gf-web.fr>',
        to: [to],
        reply_to: email,
        subject: `[GF Web] ${subject || 'Nouveau message'} — ${name}`,
        html: `
          <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f0f; color: #f0ede8; padding: 40px; border-radius: 8px;">
            <div style="border-bottom: 1px solid #1e1e1e; padding-bottom: 24px; margin-bottom: 24px;">
              <span style="font-family: monospace; font-size: 11px; color: #c8f135; letter-spacing: 0.1em;">NOUVEAU MESSAGE — GF-WEB.FR</span>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e1e1e; font-family: monospace; font-size: 11px; color: #4a4a4a; text-transform: uppercase; letter-spacing: 0.08em; width: 120px;">Nom</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e1e1e; font-size: 14px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e1e1e; font-family: monospace; font-size: 11px; color: #4a4a4a; text-transform: uppercase; letter-spacing: 0.08em;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e1e1e; font-size: 14px;"><a href="mailto:${email}" style="color: #c8f135;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e1e1e; font-family: monospace; font-size: 11px; color: #4a4a4a; text-transform: uppercase; letter-spacing: 0.08em;">Sujet</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e1e1e; font-size: 14px;">${subject || 'Non précisé'}</td>
              </tr>
            </table>

            <div style="background: #080808; border: 1px solid #1e1e1e; border-radius: 4px; padding: 24px;">
              <p style="font-family: monospace; font-size: 10px; color: #4a4a4a; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 16px;">Message</p>
              <p style="font-size: 14px; line-height: 1.75; color: #a0a0a0; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>

            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #1e1e1e;">
              <a href="mailto:${email}" style="display: inline-block; background: #c8f135; color: #080808; font-family: monospace; font-size: 12px; letter-spacing: 0.06em; padding: 12px 24px; border-radius: 2px; text-decoration: none;">Répondre à ${name}</a>
            </div>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Resend error:', err)
      return res.status(500).json({ error: 'Échec envoi email' })
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return res.status(500).json({ error: 'Erreur serveur' })
  }
}
