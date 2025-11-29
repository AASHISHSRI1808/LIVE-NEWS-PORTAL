// app/page.js
// Server Component — Next.js app router
import React from "react";

// --- helper to fetch news from GNews ---
async function fetchGNews(q, max = 8) {
  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) {
    // Return a descriptive object instead of throwing so build doesn't fail
    return { error: "MISSING_API_KEY", q, articles: [] };
  }

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=en&max=${max}&apikey=${apiKey}`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } }); // ISR: revalidate each 60s
    if (!res.ok) {
      const txt = await res.text();
      console.error("GNews fetch failed", q, res.status, txt);
      return { error: "FETCH_FAILED", status: res.status, q, articles: [] };
    }
    const json = await res.json();
    return { error: null, q, articles: json.articles || [] };
  } catch (err) {
    console.error("GNews fetch error", q, err);
    return { error: "EXCEPTION", detail: String(err), q, articles: [] };
  }
}

export default async function Page() {
  // categories/queries you want to show on homepage
  const queries = [
    { key: "topnews", title: "टॉप न्यूज़", q: "india" },
    { key: "business", title: "बिजनेस", q: "business" },
    { key: "sports", title: "खेल", q: "sports" },
    { key: "bollywood", title: "बॉलीवुड", q: "bollywood" },
  ];

  // fetch all categories in parallel
  const fetchPromises = queries.map((c) => fetchGNews(c.q, 6));
  const results = await Promise.all(fetchPromises);

  // find if API key is missing (any result with error=MISSING_API_KEY)
  const missingKey = results.some((r) => r.error === "MISSING_API_KEY");

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "20px" }}>
      <header style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>न्यूज़पोर्टल — डेमो</h1>
        <p style={{ margin: "8px 0 0", color: "#666" }}>
          यह पेज GNews API से डाटा लाकर दिखाता है (server-side). अगर API key सेट नहीं है तो नीचे बताया गया है।
        </p>
      </header>

      {missingKey && (
        <div style={{ border: "1px solid #f1c0c0", background: "#fff6f6", padding: 12, borderRadius: 8, marginBottom: 18 }}>
          <strong style={{ color: "#a00" }}>API Key missing:</strong>{" "}
          कृपया Vercel (या environment) में <code>GNEWS_API_KEY</code> जोड़ें — फिर redeploy करें.
        </div>
      )}

      {queries.map((cat, idx) => {
        const data = results[idx] || { articles: [], error: "NO_DATA" };
        return (
          <section id={cat.key} key={cat.key} style={{ marginBottom: 28 }}>
            <h2 style={{ color: "#d80000", marginBottom: 12 }}>{cat.title}</h2>

            {data.error && data.error !== "MISSING_API_KEY" && (
              <div style={{ color: "#a00", marginBottom: 8 }}>
                {`"${cat.title}" लोड करने में समस्या हुई — ${data.error}`}
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 12 }}>
              {data.articles.length === 0 ? (
                <div style={{ color: "#666" }}>कोई आर्टिकल नहीं मिला।</div>
              ) : (
                data.articles.map((a) => (
                  <article key={a.url} style={{ background: "#fff", padding: 12, borderRadius: 8, boxShadow: "0 6px 14px rgba(0,0,0,0.06)" }}>
                    <a href={a.url} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
                      {a.image && <img src={a.image} alt={a.title} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 6 }} />}
                      <h3 style={{ fontSize: 16, margin: "10px 0 6px" }}>{a.title}</h3>
                      <p style={{ margin: 0, color: "#666", fontSize: 13 }}>{a.source?.name} — {new Date(a.publishedAt).toLocaleString()}</p>
                    </a>
                  </article>
                ))
              )}
            </div>
          </section>
        );
      })}

      <footer style={{ marginTop: 40, color: "#888", fontSize: 13 }}>
        <div>Built with GNews API (server-side fetch + ISR)</div>
      </footer>
    </main>
  );
}
