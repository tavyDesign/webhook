// pages/api/webhook.tsx
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Token-ul tău personal pe care îl setezi în Dashboard-ul de Facebook App
    const MY_VERIFY_TOKEN = 'fvgherstgsthjyehsergdhsagzsd';

    // Verifică dacă este o cerere GET pentru validarea webhook-ului
    if (req.method === 'GET') {
        // Extrage parametrii 'hub.mode', 'hub.challenge' și 'hub.verify_token' din cerere
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];

        // Verifică dacă 'mode' și 'token' sunt corecte
        if (mode === 'subscribe' && token === MY_VERIFY_TOKEN) {
            // Răspunde cu 'challenge' trimis de Facebook
            res.status(200).send(challenge);
        } else {
            // Răspunde cu o eroare dacă verificația nu este corectă
            res.status(403).end();
        }
    } else if (req.method === 'POST') {
        // Aici poți procesa cererile POST de la webhook (de exemplu, actualizări de pagină, mesaje etc.)

        // Trimite un răspuns de succes
        res.status(200).json({ success: true, message: 'Webhook received' });
    } else {
        // Handle any non-GET/POST requests
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}