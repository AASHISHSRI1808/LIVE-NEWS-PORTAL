PART B — Explanation & Documentation
1. Design Document Wireframe - Screenshots attached

Layout Decisions-
I chose a 1 large card on the left and 4 smaller cards on the right for every section because:
-> This layout matches the structure of LiveHindustan.com, which the assignment asked me to clone.
-> A single large card highlights the most important story.
-> Four small cards allow readers to quickly scan more headlines without overwhelming them.
-> It creates a clean visual hierarchy and works well on both desktop and mobile.

Which Sections I Included
Based on the assignment:
Top News
Sports
Business
Technology
Entertainment
These are the most common sections in Indian news portals.

Highlighting Top Stories

Top stories are highlighted using:
Larger images
Bigger fonts
Bold headlines
More description

2. Data-Fetching Strategy 

Since this project is in the Next.js App Router, I did server-side data fetching using:
await fetch(url, { cache: "no-store" })

Why this method?
Because:
News changes very frequently
Readers must see fresh content every time
Using SSG (getStaticProps) would show outdated news
ISR might still show old data depending on the revalidation interval
cache: "no-store" = App Router equivalent of getServerSideProps

Tradeoffs
Pros	Cons
Always fresh news	Slightly slower than static
API key stays safe	More API calls
Best for real-time news websites	Requires stable internet / API

This is the correct choice for a news portal.

3. Code Explanation
Components Created
Navbar-> Contains links to scroll to sections, Fully responsive, Active section highlighting while scrolling

Hero-> Displays the top-most news article, Big image + overlay title
Fully responsive

Section-> Reusable component for each category,1 big article + 4 small articles layout, Accepts title and articles
Generates clean section IDs for smooth scrolling

NewsCard-> Used for small article previews, Compact layout with image + headline

ArticlePage-> Dynamic article page using:
URL slug for readability
Query string for full article data
Displays title, image, date, description

Footer-> Simple Bootstrap footer for completeness

4. Data Model Structure

Every article object looks like:

{
  "id": "string",
  "title": "string",
  "description": "string",
  "content": "string",
  "url": "string",
  "image": "string",
  "publishedAt": "string",
  "source": {
    "name": "string"
  }
}
This perfectly matches the GNews API.

5. Challenges & How I Solved Them
Challenge 1 — Dynamic Routing Not Working
Windows kept creating a folder named:
\[id]
instead of:
[id]
Fix:
Created the folder using PowerShell:

mkdir "[id]"
And passed full article data via URL query string.

Challenge 2 — next/image errors for external domains
GNews images come from many domains, causing this error:
Invalid src prop: domain not configured
Fix:
Added domains in next.config.js.

Challenge 3 — API returning empty responses
GNews free tier limits queries.

Fix:
Updated keyword queries (“India latest news”, “bollywood”, “technology updates”)

Added logging to inspect API responses

Challenge 4 — Smooth Scrolling Not Working

The section IDs contained spaces ("Top News" → "top news")
Fix:
Used:id={title.replace(/\s+/g, '').toLowerCase()}

Challenge 5 — Article page showing “No article found”
Encoding/decoding JSON in query string failed.
Fix: const article = JSON.parse(articleString);
Also used encodeURIComponent safely.

6. Improvements If Given More Time

If I had more time, I would add:
Pagination
Search bar for articles
User-selected categories
Dark mode
Bookmark / Save Article feature
Shimmer loading skeleton
Multi-language support (Hindi + English)

PART C — Testing & Edge Cases
Edge Case 1 — Missing Image
If an article has no image:
src={article.image || "/fallback.png"}

Edge Case 2 — Empty API Response
Section component automatically hides:
if (!articles || articles.length === 0) return null;

Edge Case 3 — Long Titles
Handled by slicing:
article.title.slice(0, 90) + "..."

Edge Case 4 — Failed API
Shows fallback UI:
No news available

Edge Case 5 — Loading State
Bootstrap spinner.

PART D — AI Use & Reflection
a) What I used AI for
Clarifying Next.js App Router routing
Solving encoding/decoding for article routing
Bug fixing (params.id, Windows folder name, API errors)
Generating documentation

b) Where AI was wrong / needed correction
Initially gave Pages Router code (getServerSideProps)
Provided incorrect image domain config
Some dynamic routing suggestions caused errors
I manually inspected, corrected, and tested all AI outputs.

c) How I verified AI code
Logged API responses in console
Used Next.js error overlays
Matched UI against LiveHindustan
Verified section IDs and scroll behavior
Tested routing manually

d) Custom modifications I made
Created final layout matching LiveHindustan
Implemented scroll spy manually
Encoded full article data in URL
Rewrote Section component to optimize layout
Fixed all Windows path escaping issues
Ensured complete responsiveness