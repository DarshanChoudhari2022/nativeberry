
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials!');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runTest() {
    console.log("🚀 Starting Supply Chain Logic Test...");
    const timestamp = new Date().toISOString();
    const testCustomer = `Test User ${timestamp}`;

    // --- STEP 1: CREATE ORDER (Simulating OrderEntryForm) ---
    console.log("\n1️⃣  Testing Order Creation...");

    // Inputs
    const price250g = 100;
    const price1kg = 350;
    const qty250g = 4; // 1kg total
    const qty1kg = 2;  // 2kg total

    // Calculations
    const totalWeight = (qty250g * 0.25) + (qty1kg * 1.0); // Should be 3.0 kg
    const totalAmount = (qty250g * price250g) + (qty1kg * price1kg); // 400 + 700 = 1100

    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
            customer_name: testCustomer,
            customer_address: "123 Test Lane",
            distance_km: 5.5,
            delivery_date: new Date().toISOString().split('T')[0], // Today
            status: 'Pending',
            payment_status: 'Pending', // IMPORTANT: Business rule, always pending unless prepaid
            salesperson: 'Tester',
            delivery_notes: `Total weight: ${totalWeight}kg`,
            total_amount: totalAmount
        })
        .select()
        .single();

    if (orderError) {
        console.error("❌ Order Creation Failed:", orderError.message);
        return;
    }
    console.log(`✅ Order #${order.id} Created. Amount: ₹${order.total_amount} (Expected: ₹${totalAmount})`);

    // --- STEP 2: CREATE ITEMS (Simulating OrderEntryForm) ---
    console.log("\n2️⃣  Adding Items...");
    const items = [
        { order_id: order.id, product_type: 'Plastic Box (250g)', quantity: qty250g, weight_kg: qty250g * 0.25, unit_price: price250g },
        { order_id: order.id, product_type: 'Cardboard Box (1kg)', quantity: qty1kg, weight_kg: qty1kg * 1.0, unit_price: price1kg }
    ];

    const { error: itemsError } = await supabase.from('order_items').insert(items);
    if (itemsError) console.error("❌ Item Creation Failed:", itemsError.message);
    else console.log("✅ Items Added.");

    // --- STEP 3: CHECK FARMER SUMMARY (Simulating FarmerOrderSummary) ---
    console.log("\n3️⃣  Checking Farmer Requirements (Before Delivery)...");
    // Logic: Should show up because status is 'Pending'
    const { data: reqData } = await supabase
        .from('orders')
        .select('id, status')
        .eq('id', order.id);

    const isIncluded = reqData && reqData[0] && reqData[0].status !== 'Cancelled' && reqData[0].status !== 'Delivered';
    console.log(`   - Order #${order.id} Status: ${reqData[0].status}`);
    console.log(`   - Included in Farmer List? ${isIncluded ? "YES (Correct)" : "NO (Issue?)"}`);


    // --- STEP 4: ASSIGN DRIVER (Simulating DeliveryManager) ---
    console.log("\n4️⃣  Assigning Driver...");
    const { error: assignError } = await supabase
        .from('orders')
        .update({ delivery_boy: 'Ramesh', status: 'Out for Delivery' })
        .eq('id', order.id);

    if (assignError) console.error("❌ Assignment Failed:", assignError.message);
    else console.log("✅ Driver Assigned. Status updated to 'Out for Delivery'.");

    // --- STEP 5: CHECK FARMER SUMMARY (After Assignment) ---
    console.log("\n5️⃣  Checking Farmer Requirements (After Dispatch)...");
    const { data: reqData2 } = await supabase.from('orders').select('id, status').eq('id', order.id);

    // Current logic includes 'Out for Delivery'
    const isIncluded2 = reqData2[0].status !== 'Cancelled' && reqData2[0].status !== 'Delivered';
    console.log(`   - Order #${order.id} Status: ${reqData2[0].status}`);
    console.log(`   - Included in Farmer List? ${isIncluded2 ? "YES" : "NO"}`);
    if (isIncluded2) {
        console.log("   ⚠️  Observation: 'Out for Delivery' is still counted in Farmer Requirements.");
    }


    // --- STEP 6: MARK DELIVERED (Simulating DeliveryManager) ---
    console.log("\n6️⃣  Completing Delivery...");
    const { error: deliverError } = await supabase
        .from('orders')
        .update({ status: 'Delivered', payment_status: 'Paid' })
        .eq('id', order.id);

    if (deliverError) console.error("❌ Delivery Mark Failed:", deliverError.message);
    else console.log("✅ Marked Delivered & Paid.");

    // --- STEP 7: VERIFY FINANCIALS (Simulating Stats) ---
    console.log("\n7️⃣  Verifying Final Stats...");
    const { data: finalOrder } = await supabase.from('orders').select('*').eq('id', order.id).single();
    console.log(`   - Final Status: ${finalOrder.status}`);
    console.log(`   - Payment Status: ${finalOrder.payment_status} (Expected: Paid)`);
    console.log(`   - Revenue Recorded: ₹${finalOrder.total_amount}`);

    console.log("\n✅ Test Sequence Complete.");
}

runTest();
