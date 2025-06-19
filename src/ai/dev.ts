import { config } from 'dotenv';
config();

import '@/ai/flows/detect-significant-changes.ts';
import '@/ai/flows/summarize-sentiment.ts';