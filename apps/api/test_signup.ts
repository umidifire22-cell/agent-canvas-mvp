import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yckyhqztdtbiiqtlukla.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlja3locXp0ZHRiaWlxdGx1a2xhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTcyMDIzNSwiZXhwIjoyMDg3Mjk2MjM1fQ.9YdnH1dh2xE_uzFn_XSpfxyM6-ISw8-_5H8LGic2dxY';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlja3locXp0ZHRiaWlxdGx1a2xhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MjAyMzUsImV4cCI6MjA4NzI5NjIzNX0.0VIPFPV-NmAlbcqaPio_GlhAQPs194l-RJImY4xSr1k';

const supabaseAdmin = createClient(supabaseUrl, supabaseKey);
const supabaseAnon = createClient(supabaseUrl, anonKey);

async function testSignup() {
    console.log("Testing Anon Signup...");
    const { data, error } = await supabaseAnon.auth.signUp({
        email: 'test@agentcanvas.com',
        password: 'Password123!',
    });

    if (error) {
        console.error("Signup Error:", error.message);
    } else {
        console.log("Signup Success!", data);
    }
}

testSignup();
