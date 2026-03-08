import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fvlpibvwrfoonvsxrszg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2bHBpYnZ3cmZvb252c3hyc3pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMDA1MDEsImV4cCI6MjA4ODU3NjUwMX0.2LazzEZa9y1Z2lxT3MASONdjeTHw2oJR5QbUWb5fGiU';
//9876543210@tecnomovil

export const supabase = createClient(supabaseUrl, supabaseKey);