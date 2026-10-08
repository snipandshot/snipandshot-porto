# Photography portfolio (Netlify-ready)

One-page site: full-screen slideshow, About, Clients, Portfolio with
category tabs. Clicking a thumbnail opens the album; clicking a photo
in the album opens it full size.

## What to edit

| What                              | Where                                   |
|-----------------------------------|-----------------------------------------|
| Your name, About text, Clients    | index.html                              |
| Slideshow photos                  | index.html, the `<div class="slide">` lines |
| Clients background photo          | index.html, `style="background-image:..."` |
| Social links, email, WhatsApp     | index.html (header and footer)          |
| Portfolio categories and albums   | assets/js/albums.js                     |
| Colors and fonts                  | top of assets/css/style.css             |

WhatsApp link format: https://wa.me/62812xxxxxxx (country code, no + or leading 0).

## Adding an album (assets/js/albums.js)

    {
      title: "Chanel store opening",
      category: "interior",
      cover: "images/chanel-store/cover.jpg",
      photos: [
        "images/chanel-store/01.jpg",
        "images/chanel-store/02.jpg",
        "images/chanel-store/03.jpg",
      ],
    },

Add `tall: true` for a vertical cover that spans two rows.

## Preview on your computer

    python3 -m http.server 8000

then open http://localhost:8000

## Deploy

Push the folder to GitHub, then on Netlify: Add new site, Import an
existing project, choose the repo, leave the build command empty,
publish directory ".", Deploy. Or drag the folder onto
https://app.netlify.com/drop
