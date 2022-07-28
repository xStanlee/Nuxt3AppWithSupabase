import { createClient } from '@supabase/supabase-js'

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6bHNudndkZWZ3Z3Rxdnh1aGNzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY1NzU1NDA5MCwiZXhwIjoxOTczMTMwMDkwfQ.y54JQcFLW5WpjJUm72ZlEOkmBCBCvtuwrD4nXcCvC1E";
const supabaseUrl = 'https://pzlsnvwdefwgtqvxuhcs.supabase.co';

const useSupabase = () => {
    const supabase = createClient(supabaseUrl, SUPABASE_KEY);
    
    return {
        supabase
    }
}

export default useSupabase;