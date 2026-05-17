export type SupabaseStatus = {
  configured: boolean;
  reachable: boolean;
  usingFallback: boolean;
  projectUrl: string | null;
  message: string;
};

const fallbackSupabaseUrl = "https://spupfvjkarfkfvelqfpb.supabase.co";
const fallbackSupabaseKey = "sb_publishable_cXBDlhXaCoW85AZHJLulEA_lILA924R";

export function getSupabaseConfig() {
  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const envKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY;

  return {
    url: envUrl || fallbackSupabaseUrl,
    key: envKey || fallbackSupabaseKey,
    usingFallback: !envUrl || !envKey,
  };
}

export async function getSupabaseStatus(): Promise<SupabaseStatus> {
  const { url, key, usingFallback } = getSupabaseConfig();

  if (!url || !key) {
    return {
      configured: false,
      reachable: false,
      usingFallback,
      projectUrl: null,
      message: "Variaveis do Supabase ausentes.",
    };
  }

  try {
    const response = await fetch(`${url}/rest/v1/`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      cache: "no-store",
    });

    return {
      configured: true,
      reachable: response.ok || response.status === 401 || response.status === 404,
      usingFallback,
      projectUrl: url,
      message: response.ok
        ? "Supabase acessivel; tabelas protegidas por RLS."
        : `Supabase respondeu HTTP ${response.status}; conferir politicas/env.`,
    };
  } catch {
    return {
      configured: true,
      reachable: false,
      usingFallback,
      projectUrl: url,
      message: "Nao foi possivel acessar o Supabase neste momento.",
    };
  }
}
