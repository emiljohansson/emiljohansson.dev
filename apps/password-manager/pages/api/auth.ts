import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/client'

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean, error?: string }>,
) {
  supabase.auth.api.setAuthCookie(req, res)
}
