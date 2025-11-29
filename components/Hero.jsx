import Image from "next/image";
import Link from "next/link";

export default function Hero({ main,side }) {
  if(!main) return null;
  const mainSlug = main.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const mainQs=encodeURIComponent(JSON.stringify(main));
  return (
    <div className="row g-4 mb-4">
      <div className="col-md-8">
    <Link href={`/article/${mainSlug}?data=${mainQs}`} className="text-decoration-none">
      <div className="position-relative rounded overflow-hidded">
        <Image
          src={main.image || "/fallback.png"}
          alt={main.title}
          width={1200}
          height={600}
          className="img-fluid rounded"
        />
        <h2 className="position-absolute bottom-0 start-0 bg-dark bg-opacity-75 text-white p-3 m-3 rounded"
         style={{ background: "rgba(0,0,0,0.6)" }}>
          {main.title}
        </h2>
      </div>
    </Link>
    </div>
    <div className="col-md-4 d-flex flex-column gap-3">
      {side.slice(0.3).map((article,idx)=>(
        <SmallHeroCard key={idx} article={article}/>
      ))}
    </div>

    </div>
  );
}

function SmallHeroCard({ article }) {
  const slug = article.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const queryString = encodeURIComponent(JSON.stringify(article));

  return (
    <Link
      href={`/article/${slug}?data=${queryString}`}
      className="text-decoration-none"
    >
      <div className="d-flex gap-3 border-bottom pb-2">
        <Image
          src={article.image || "/fallback.png"}
          width={120}
          height={80}
          className="rounded"
          alt={article.title}
        />
        <p className="fw-bold text-dark">{article.title.slice(0, 80)}...</p>
      </div>
    </Link>
  );
}
