// pages/api/webhook.tsx
//fvgherstgsthjyehsergdhsagzsd
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Token-ul tău personal pe care îl setezi în Dashboard-ul de Facebook App
    const MY_VERIFY_TOKEN = 'fvgherstgsthjyehsergdhsagzsd';

    // Verifică dacă este o cerere GET pentru validarea webhook-ului
    if (req.method === 'GET') {
        const verifyToken = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];

        if (verifyToken === MY_VERIFY_TOKEN) {
            // Trimite înapoi 'hub.challenge' dacă token-ul este valid
            res.status(200).send(challenge);
        } else {
            // Trimite un mesaj de eroare dacă token-ul nu este valid
            res.status(403).send('Invalid verify token');
        }
    } else if (req.method === 'POST') {
        // Aici poți procesa cererile POST de la webhook (de exemplu, actualizări de pagină, mesaje etc.)

        // Trimite un răspuns de succes
        res.status(200).json({ success: true, message: 'Webhook received' });
    } else {
        const verifyToken = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];
        // Handle any non-GET/POST requests
        res.status(405).json({ success: false, message: 'Method Not Allowed: ' + verifyToken + ' - ' + challenge });
    }
}