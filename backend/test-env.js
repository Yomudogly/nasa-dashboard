import 'dotenv/config';

console.log('NASA_API_KEY from .env:', process.env.NASA_API_KEY);
console.log('Is it DEMO_KEY?', process.env.NASA_API_KEY === 'DEMO_KEY');
console.log('API key length:', process.env.NASA_API_KEY?.length);
