
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkTable() {
    console.log("Checking 'orders' table access...");
    const { data, error } = await supabase.from('orders').select('*').limit(1);

    if (error) {
        console.error("❌ Error selecting from orders:", error);
    } else {
        console.log("✅ Success! Found " + data.length + " rows.");
        if (data.length > 0) {
            console.log("Sample Row Keys:", Object.keys(data[0]));
        }
    }
}

checkTable();
