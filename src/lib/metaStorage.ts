/**
 * WhatsApp credential persistence.
 * Always goes through the backend so tokens are Fernet-encrypted at rest
 * (ENCRYPTION_KEY never leaves the API servers).
 */

export interface WhatsAppCredentialsInput {
  tenant_id: string;
  whatsapp_access_token: string;
  whatsapp_business_account_id: string;
  whatsapp_phone_number_id: string;
  display_phone_number?: string;
}

function apiBase(): string {
  return (
    process.env.BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    'http://127.0.0.1:8000'
  ).replace(/\/$/, '');
}

/**
 * Saves WhatsApp credentials via backend (encrypted, per-tenant).
 */
export async function securelySaveWhatsAppCredentials({
  tenant_id,
  whatsapp_access_token,
  whatsapp_business_account_id,
  whatsapp_phone_number_id,
  display_phone_number,
}: WhatsAppCredentialsInput): Promise<{ success: boolean; error?: string }> {
  try {
    if (!tenant_id) throw new Error("Missing required 'tenant_id'.");
    if (!whatsapp_access_token || whatsapp_access_token.startsWith('•')) {
      throw new Error('A full Meta access token is required (masked values are rejected).');
    }

    const base = apiBase();
    // Prefer tenant-scoped dashboard route; fall back to legacy /auth path
    const urls = [
      `${base}/tenant/whatsapp/auth/whatsapp/save`,
      `${base}/auth/whatsapp/save`,
    ];

    let lastError = 'Save failed';
    for (const url of urls) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Tenant-Id': tenant_id,
          },
          body: JSON.stringify({
            tenant_id,
            tenantId: tenant_id,
            whatsapp_access_token,
            whatsapp_business_account_id,
            whatsapp_phone_number_id,
            display_phone_number: display_phone_number || null,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.success) {
          console.log(
            `[WhatsApp Auth] Encrypted credentials saved for tenant=${tenant_id}`
          );
          return { success: true };
        }
        lastError = data.error || data.detail?.error || `HTTP ${res.status}`;
      } catch (err: any) {
        lastError = err?.message || 'Network error';
      }
    }
    return { success: false, error: lastError };
  } catch (err: any) {
    console.error('[WhatsApp Auth] Error:', err);
    return { success: false, error: err.message || 'Internal Storage Error' };
  }
}

/** Meta IG/FB page tokens for messaging integrations */
export interface MetaCredentialsInput {
  tenant_id: string;
  long_lived_page_token: string;
  facebook_page_id: string;
  instagram_account_id: string;
}

export async function securelySaveMetaCredentials({
  tenant_id,
  long_lived_page_token,
  facebook_page_id,
  instagram_account_id,
}: MetaCredentialsInput): Promise<{ success: boolean; error?: string }> {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    if (!supabaseUrl || !supabaseServiceKey) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY.');
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data, error } = await supabaseAdmin
      .from('tenants')
      .update({
        long_lived_page_token,
        facebook_page_id,
        instagram_account_id,
        connected_to_meta: true,
        updated_at: new Date().toISOString(),
      })
      .eq('tenant_id', tenant_id)
      .select();
    if (error) return { success: false, error: error.message };
    if (!data || data.length === 0) return { success: false, error: 'Tenant row not found.' };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Internal Storage Error' };
  }
}
