export const revalidate = 3600;

export async function GET() {
  try {
    const res = await fetch("https://api.github.com/repos/maryamtb/rook", {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return Response.json({ stars: null });
    const data = await res.json();
    return Response.json({ stars: data.stargazers_count ?? null });
  } catch {
    return Response.json({ stars: null });
  }
}
