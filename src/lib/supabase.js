import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zemlwjpvsyyvdsulxsjm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplbWx3anB2c3l5dmRzdWx4c2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyODQ4NzQsImV4cCI6MjA1Njg2MDg3NH0.fxRbBdtT0pk7kkQEUgSXGnAcH2OxoKD-W5ql6GNago4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);