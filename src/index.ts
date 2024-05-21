import 'dotenv';
import App from './app';

process.on('SIGTERM', () => process.exit());
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL;
App.get('/env', (_req, res) => res.json({ BASE_URL }));

App.listen(PORT, () => console.log('App listening at %d', PORT));