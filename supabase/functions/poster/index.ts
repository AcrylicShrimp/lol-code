import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Schema, {
  Type,
  string,
} from "https://denoporter.sirjosh.workers.dev/v1/deno.land/x/computed_types/src/index.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../cors.ts";

const ReqBodySchema = Schema(
  {
    title: string
      .trim()
      .normalize()
      .min(1, "title is too short")
      .max(1024, "title is too long")
      .error("title is invalid"),
    content_url: string
      .trim()
      .normalize()
      .min(1, "content_url is too short")
      .max(4096, "content_url is too long")
      .error("content_url is invalid"),
    content_type: string
      .trim()
      .normalize()
      .regexp("^(code|image)$", "content_type must be code or image")
      .error("content_type is invalid"),
  },
  {
    strict: true,
  }
);
const reqBodyValidator = ReqBodySchema.destruct();

type ReqBody = Type<typeof ReqBodySchema>;

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response("", {
      headers: { ...corsHeaders, "Content-Type": "plain/text" },
    });

  if (req.method !== "POST")
    return new Response("only POST is supported", {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "plain/text" },
    });

  let json: ReqBody;

  try {
    json = await req.json();
  } catch {
    return new Response("body must be a valid json", {
      status: 415,
      headers: { ...corsHeaders, "Content-Type": "plain/text" },
    });
  }

  const [_, body] = reqBodyValidator(json);

  if (!body)
    return new Response("body is not valid", {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "plain/text" },
    });

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  const { error } = await supabaseClient.from("posts").insert([
    {
      title: body.title,
      content_url: body.content_url,
      content_type: body.content_type,
    },
  ]);

  if (error)
    return new Response("internal server error", {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "plain/text" },
    });

  return new Response("", {
    status: 201,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
