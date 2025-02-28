import { setTokenCookie, removeTokenCookie, getTokenCookie } from '../../lib/cookies';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { delivery_Person_email } = req.body;

      // In a real application, you'd want to generate a secure token here
      const token = Buffer.from(delivery_Person_email).toString('base64');

      setTokenCookie(res, token);
      res.status(200).json({ message: 'Logged in successfully' });
    } else if (req.method === 'DELETE') {
      removeTokenCookie(res);
      res.status(200).json({ message: 'Logged out successfully' });
    } else if (req.method === 'GET') {
      const token = getTokenCookie(req);
      if (token) {
        // In a real application, you'd want to decode and verify the token here
        const delivery_Person_email = Buffer.from(token, 'base64').toString('ascii');
        res.status(200).json({ user: { delivery_Person_email, isLoggedIn: true } });
      } else {
        res.status(200).json({ user: null });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Session API error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
