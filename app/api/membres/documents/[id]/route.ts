import { readFile } from "node:fs/promises";
import path from "node:path";
import { getSession } from "@/lib/auth";
import { memberDocuments } from "@/data/member-documents";

export const dynamic = "force-dynamic";

/** Téléchargement d'un document réservé : uniquement avec une session membre valide. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return new Response("Accès réservé aux membres du club.", {
      status: 401,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
    });
  }
  const { id } = await params;
  const doc = memberDocuments.find((d) => d.id === id);
  if (!doc) return new Response("Document introuvable.", { status: 404 });

  const data = await readFile(path.join(process.cwd(), "private", path.basename(doc.file)));
  return new Response(new Uint8Array(data), {
    headers: {
      "Content-Type": doc.mime,
      "Content-Disposition": `attachment; filename="${doc.downloadName}"`,
      "Content-Length": String(data.length),
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
