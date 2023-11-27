// pages/api/webhook.tsx
//fvgherstgsthjyehsergdhsagzsd
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
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
        const data = req.body;

        if (data.object === 'page') {
            try {
                for (const entry of data.entry) {
                    for (const change of entry.changes) {
                        if (
                            change.value.item === 'comment' &&
                            change.value.verb === 'add' &&
                            change.value.from.name !== 'Revista Sufletului' &&
                            change.value.message &&
                            isNotReply(change.value.comment_id, change.value.parent_id)
                        ) {
                            const phpEndpoint = 'https://tavydesign.com/facebook/webhook/call.php';
                            await axios.post(phpEndpoint, change.value);
                        }
                    }
                }
                res.status(200).json({ success: true, message: 'Data processed' });
            } catch (error) {
                res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
            }
        } else {
            res.status(400).json({ success: false, message: 'Invalid request object' });
        }
    } else {
        const verifyToken = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];
        // Handle any non-GET/POST requests
        res.status(405).json({ success: false, message: 'Method Not Allowed: ' + verifyToken + ' - ' + challenge });
    }
}

function isNotReply(commentId, parentId) {
    const [commentFirstPart] = commentId.split('_');
    const [, parentSecondPart] = parentId.split('_');

    return commentFirstPart === parentSecondPart;
}