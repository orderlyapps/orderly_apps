
/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase-types'

console.log("VITE_SUPABASE_URL:", import.meta.env.VITE_SUPABASE_URL);


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)