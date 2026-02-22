import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yckyhqztdtbiiqtlukla.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlja3locXp0ZHRiaWlxdGx1a2xhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTcyMDIzNSwiZXhwIjoyMDg3Mjk2MjM1fQ.9YdnH1dh2xE_uzFn_XSpfxyM6-ISw8-_5H8LGic2dxY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUsers() {
    const { data: users, error } = await supabase.auth.admin.listUsers();
    if (error) {
        console.error("Error fetching users:", error);
    } else {
        console.log("Users:", users.users.map(u => ({ id: u.id, email: u.email, confirmed_at: u.confirmed_at })));
    }
}

checkUsers();
