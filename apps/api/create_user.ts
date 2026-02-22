import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yckyhqztdtbiiqtlukla.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlja3locXp0ZHRiaWlxdGx1a2xhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTcyMDIzNSwiZXhwIjoyMDg3Mjk2MjM1fQ.9YdnH1dh2xE_uzFn_XSpfxyM6-ISw8-_5H8LGic2dxY';

const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

async function createAdminUser() {
    console.log("Creating auto-confirmed user account...");
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: 'admin@agentcanvas.com',
        password: 'H6iq23$ihfB/Bv.',
        email_confirm: true
    });

    if (error) {
        console.error("Account Creation Error:", error.message);
    } else {
        console.log("Account Created & Confirmed!", data.user.email);

        // Let's also ensure they have credits
        const { error: dbErr } = await supabaseAdmin.from('profiles').upsert({
            id: data.user.id,
            credits_balance: 100
        });

        if (dbErr) {
            console.error("Failed to add credits:", dbErr.message);
        } else {
            console.log("Added 100 credits to the account.");
        }
    }
}

createAdminUser();
