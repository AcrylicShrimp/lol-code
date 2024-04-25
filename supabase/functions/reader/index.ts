import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../cors.ts";

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response("", {
      headers: { ...corsHeaders, "Content-Type": "plain/text" },
    });

  if (req.method !== "GET")
    return new Response("only GET is supported", {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "plain/text" },
    });

  const url = new URL(req.url);
  const after = url.searchParams.get("after");
  let afterId: number | null = null;

  if (after !== null) {
    afterId = parseInt(after);

    if (isNaN(afterId))
      return new Response("invalid after parameter", {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "plain/text" },
      });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );
  let query = supabaseClient
    .from("posts")
    .select(
      "id, title, contentUrl:content_url, contentType:content_type, upvotes, downvotes, writtenAt:created_at"
    );

  if (afterId !== null) query = query.filter("id", "lt", after);

  const result = await query.range(0, 10).order("id", { ascending: false });

  if (result.error)
    return new Response("internal server error", {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "plain/text" },
    });

  return new Response(JSON.stringify(result.data ?? []), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
