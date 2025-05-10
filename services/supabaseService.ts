import { createClient } from '@supabase/supabase-js'
import Constants from 'expo-constants';

const { supabaseUrl, SUPABASE_KEY } = Constants.expoConfig?.extra || {};

export const supabase = createClient(supabaseUrl, SUPABASE_KEY)
