// app/page.js  — UPDATED (replace your existing file with this)
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import BreakingNews from "@/components/BreakingNews";

async function getNews(query) {
  const apiKey = process.env.GNEWS_API_KEY;

  // अगर API key नहीं है तो खाली array लौटाओ (build fail रोकने के लिए)
  if (!apiKey) {
    return [];
  }

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=10&apikey=${apiKey}`;

  try {
    // IMPORTANT: use ISR revalidation (revalidate > 0). Don't use no-store / revalidate:0.
    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) {
      // log minimal info for debugging (do NOT log the full URL with key)
      console.error(`GNews fetch failed for "${query}" — status: ${res.status}`);
      return [];
    }

    const json = await res.json();
    return json.articles || [];
  } catch (error) {
    console.error("GNews fetch error for:", query, error?.message || error);
    return [];
  }
}

export default async function Home() {
  // parallel fetch: keeps render fast
  const [topNews, sportsNews, techNews, entertainmentNews, businessNews] =
    await Promise.all([
      getNews("India"),
      getNews("sports"),
      getNews("technology"),
      getNews("bollywood"),
      getNews("business"),
    ]);

  const topHeadlines = topNews.slice(0, 5).map((a) => a.title).filter(Boolean);

  return (
    <>
      <Navbar />
      <BreakingNews headlines={topHeadlines} />
      <div className="container py-4">
        {topNews.length > 0 && <Hero main={topNews[0]} side={topNews.slice(1, 4)} />}

        <Section title="Top News" articles={topNews} />
        <Section title="Sports" articles={sportsNews} />
        <Section title="Technology" articles={techNews} />
        <Section title="Entertainment" articles={entertainmentNews} />
        <Section title="Business" articles={businessNews} />
      </div>
      <Footer />
    </>
  );
}
