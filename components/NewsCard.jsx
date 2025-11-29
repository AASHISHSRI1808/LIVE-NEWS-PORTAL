import Image from "next/image";
import Link from "next/link";

export default function NewsCard({ article }) {
  if (!article) return null;

    const slug = article.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const queryString = encodeURIComponent(JSON.stringify(article));
//   console.log("LINK GENERATED:", `/article/${slug}?data=${queryString}`);
//   console.log("SLUG:", slug);
// console.log("QUERY:", queryString);



  return (
    <Link href={`/article/${slug}?data=${queryString}`} className="text-decoration-none">
      <div className="d-flex flex-column border-bottom pb-3 mb-3">
        <Image
          src={article.image || "/fallback.png"}
          width={500}
          height={300}
          className="rounded mb-2"
          alt={article.title}
          style={{ objectFit: "cover" }}
        />

        <p className="news-headline">{article.title}</p>
        {/* <p className="news-headline">
            {article.title.length > 90 
             ? article.title.slice(0, 90) + "..." 
             : article.title}
        </p> */}

        <p className="text-muted small mt-1">{article.description?.slice(0, 90)}...</p>
      </div>
    </Link>
  );
}
