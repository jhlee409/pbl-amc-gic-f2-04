import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

export const getImageUrl = (bucketName: string, fileName: string) => {
  const { data } = supabase.storage.from(bucketName).getPublicUrl(fileName)
  return data.publicUrl
}
