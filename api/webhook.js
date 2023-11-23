module.exports = async (req, res) => {
    // Check if it's a POST request
    if (req.method === 'POST') {
        // Parse the request body
        const data = req.body;

        // TODO: Process the data (e.g., store in database)

        // Send a response
        res.status(200).send({ success: true, message: 'Webhook data received' });
    } else {
        // Handle any non-POST requests
        res.status(405).send({ error: 'Method Not Allowed' });
    }
};
