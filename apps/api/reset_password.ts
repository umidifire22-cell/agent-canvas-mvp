import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yckyhqztdtbiiqtlukla.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlja3locXp0ZHRiaWlxdGx1a2xhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTcyMDIzNSwiZXhwIjoyMDg3Mjk2MjM1fQ.9YdnH1dh2xE_uzFn_XSpfxyM6-ISw8-_5H8LGic2dxY';
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

async function resetPassword() {
    console.log("Forcing password reset...");
    const { data: usersData, error: usersError } = await supabaseAdmin.auth.admin.listUsers();

    if (usersError) {
        console.error("Error listing users:", usersError);
        return;
    }

    const adminUser = usersData.users.find(u => u.email === 'admin@agentcanvas.com');

    if (!adminUser) {
        console.error("Admin user not found!");
        return;
    }

    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
        adminUser.id,
        { password: 'Welcome123!' }
    );

    if (error) {
        console.error("Password Reset Error:", error.message);
    } else {
        console.log("Password Reset Successful! New password is: Welcome123!");
    }
}

resetPassword();
