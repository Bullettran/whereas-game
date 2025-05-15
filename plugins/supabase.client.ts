// @ts-ignore
import { defineNuxtPlugin } from "#app";
// @ts-ignore
import { createClient } from "@supabase/supabase-js";
// @ts-ignore
import type { SupabaseClient } from "@supabase/supabase-js";

// @ts-ignore
export default defineNuxtPlugin((nuxtApp) => {
    // @ts-ignore
    const config = useRuntimeConfig() as any;

    // Создаём клиент Supabase
    const supabase: SupabaseClient = createClient(
        config.public.supabaseUrl,
        config.public.supabaseKey,
    );

    return {
        provide: {
            supabase,
        },
    };
});