import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const p=await params;
  return {
    title: decodeURIComponent(p.id),
    description: "Read the full news article"
  };
}

export default async function ArticlePage({ searchParams }) {
  const sp=await searchParams;
  const articleString = sp?.data;

  if (!articleString) {
    return (
      <>
        <Navbar />
        <div className="container p-5">
          <h3>No article found.</h3>
        </div>
        <Footer />
      </>
    );
  }

  const article = JSON.parse(articleString);

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <p className="text-danger fw-semibold">{article.source?.name}</p>
        <h1 className="fw-bold" style={{ lineHeight: 1.3 }}>{article.title}</h1>
        <Image
          src={article.image || "/fallback.png"}
          alt={article.title}
          width={1200}
          height={600}
          className="img-fluid rounded mb-4"
          style={{ objectFit: "cover" }}
        />
        <p className="fw-bold mt-2">{new Date(article.publishedAt).toLocaleString()}</p>


        <p className="fs-5" style={{ lineHeight: "1.8" }}>
          {article.description || "No description available."}
        </p>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-4"
        >
          Read Full Article
        </a>
      </div>

      <Footer />
    </>
  );
}
