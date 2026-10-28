/* =========================================================
   PHOTO LIST — add a job photo in 3 steps:
   1. Drop the image in images/jobs/  (run scripts/optimize-images.mjs first to shrink it)
   2. Add a line below
   3. Save / push — the gallery + home carousel update automatically
   category is optional (just a label for your own reference)
   featured: true  -> also shows in the Home page carousel
   ========================================================= */
window.PHOTOS = [
  { src: "images/jobs/slope-grading-hydroseed-01.webp", title: "Slope Grading & Hydroseeding", category: "grading",   featured: true },
  { src: "images/jobs/site-grading-01.webp",            title: "Site Grading",                 category: "grading",   featured: true },
  { src: "images/jobs/hydroseeding-01.webp",            title: "Hydroseeding",                 category: "landscape", featured: true },
  { src: "images/jobs/yard-grading-beds-01.webp",       title: "Yard Grading & Bed Install",   category: "landscape", featured: true },
  { src: "images/jobs/gravel-driveway-01.webp",         title: "Gravel Driveway",              category: "grading",   featured: true }
];
