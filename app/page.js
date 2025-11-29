import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import BreakingNews from "@/components/BreakingNews";

async function getNews(query) {
  const apiKey = process.env.GNEWS_API_KEY;


  try {
    const res = await fetch(
      `https://gnews.io/api/v4/search?q=${query}&lang=en&max=10&apikey=${apiKey}`,
      { cache: "no-store" }
    );

    const json = await res.json();
    console.log("GNEWS RESPONSE FOR:", query, json);

    return json.articles || [];
  } catch (error) {
    console.log("API ERROR:", error);
    return [];
  }
}

export default async function Home() {
  // Fetch each section separately
  const topNews = await getNews("India");
  const sportsNews = await getNews("sports");
  const techNews = await getNews("technology");
  const entertainmentNews = await getNews("bollywood");
  const businessNews = await getNews("business");
//    console.log("TopNews length in render:", topNews.length);
// console.log("Sports length in render:", sportsNews.length);
// console.log("Tech length in render:", techNews.length);

  return (
    <>
      <Navbar />
      <BreakingNews headlines={topNews.slice(0, 5).map(a => a.title)} />
      <div className="container py-4">
      {topNews.length > 0 && (
        <Hero 
        main={topNews[0]}
        side={topNews.slice(1,4)} 
        />
      )}

      {/* <Section title="Top News" articles={topNews} /> */}
      <Section title="Sports" articles={sportsNews} />
      <Section title="Technology" articles={techNews} />
      <Section title="Entertainment" articles={entertainmentNews} />
      <Section title="Business" articles={businessNews} />
      </div>
      <Footer />
    </>
  );
}
