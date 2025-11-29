import Image from "next/image";
import Link from "next/link";

export default function Section({ title, articles }) {
  if (!articles || articles.length === 0) return null;

  // MAIN BIG ARTICLE — FIRST ONE
  const main = articles[0];

  // FOUR RIGHT SIDE ARTICLES
  const sideArticles = articles.slice(1, 5);

  // SLUGIFY
  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const mainSlug = slugify(main.title);
  const mainData = encodeURIComponent(JSON.stringify(main));

  return (
    <section
      className="my-5"
      id={title.replace(/\s+/g, "").toLowerCase()}  // used for scroll navigation
    >
      <h2 className="mb-4 fw-bold border-start border-4 border-danger ps-3">
        {title}
      </h2>

      <div className="row g-4">

        {/* LEFT BIG CARD */}
        <div className="col-md-6">
          <Link
            href={`/article/${mainSlug}?data=${mainData}`}
            className="text-decoration-none"
          >
            <Image
              src={main.image || "/fallback.png"}
              alt={main.title}
              width={700}
              height={400}
              className="img-fluid rounded mb-2"
              style={{ objectFit: "cover" }}
            />

            <h3 className="fw-bold text-dark">{main.title}</h3>

            <p className="text-muted">
              {main.description
                ? main.description.slice(0, 150) + "..."
                : "No description available"}
            </p>
          </Link>
        </div>

        {/* RIGHT SIDE SMALL CARDS */}
        <div className="col-md-6 d-flex flex-column gap-3">

          {sideArticles.map((article, index) => {
            const slug = slugify(article.title);
            const qs = encodeURIComponent(JSON.stringify(article));

            return (
              <Link
                href={`/article/${slug}?data=${qs}`}
                key={index}
                className="text-decoration-none"
              >
                <div className="d-flex gap-3 border-bottom pb-2">

                  <Image
                    src={article.image || "/fallback.png"}
                    alt={article.title}
                    width={120}
                    height={80}
                    className="rounded"
                    style={{ objectFit: "cover" }}
                  />

                  <p className="m-0 text-dark fw-semibold">
                    {article.title.length > 90
                      ? article.title.slice(0, 90) + "..."
                      : article.title}
                  </p>

                </div>
              </Link>
            );
          })}

        </div>
      </div>
    </section>
  );
}
