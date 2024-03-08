import 'dotenv';
import App from './app';

process.on('SIGTERM', () => process.exit());
const PORT = process.env.PORT || 3000;

App.listen(PORT, () => console.log('App listening at %d', PORT));