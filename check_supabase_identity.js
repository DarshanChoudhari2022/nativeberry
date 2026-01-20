
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProject() {
    console.log(`\n🔍 Checking connection to: ${supabaseUrl}`);
    console.log(`🔑 Using Key (starts with): ${supabaseKey.substring(0, 10)}...`);

    // 1. Check if 'orders' exists
    const { count, error } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });

    if (error) {
        if (error.code === '42P01' || error.message.includes('not found')) { // undefined_table
            console.error("\n❌ Database Connection Successful, but TABLES MISSING.");
            console.error("   Action Required: Run the 'supabase_schema_MASTER.sql' script in your Supabase SQL Editor.");
        } else {
            console.error("\n❌ Connection Failed:", error.message);
            if (error.message.includes('ENOTFOUND')) {
                console.error("   Hint: The Project URL might be wrong or the project is currently sleeping/deleted.");
            }
        }
    } else {
        console.log(`\n✅ SUCCESS! Connected to database.`);
        console.log(`   'orders' table found with ${count} records.`);
    }
}

checkProject();
