import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// 디버깅을 위한 로그
console.log('=== Supabase Configuration ===')
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key:', supabaseKey ? '***' + supabaseKey.slice(-4) : 'undefined')
console.log('Environment variables:', {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? '***' + import.meta.env.VITE_SUPABASE_ANON_KEY.slice(-4) : 'undefined'
})

export const supabase = createClient(supabaseUrl, supabaseKey)

// Supabase 클라이언트 연결 테스트
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('Supabase connection error:', error)
  } else {
    console.log('Supabase connected successfully')
  }
})

export const getImageUrl = (bucketName: string, fileName: string) => {
  console.log('=== Getting Image URL ===')
  console.log('Bucket:', bucketName)
  console.log('File:', fileName)
  
  try {
    const { data, error } = supabase.storage.from(bucketName).getPublicUrl(fileName)
    
    if (error) {
      console.error('Error getting public URL:', error)
      return null
    }
    
    console.log('Generated URL:', data.publicUrl)
    return data.publicUrl
  } catch (err) {
    console.error('Exception in getImageUrl:', err)
    return null
  }
}
