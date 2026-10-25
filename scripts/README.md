# Placeholder assets

Some images referenced by `src/menuData.json`, `src/merchData.json`,
`src/socialImpactData.json`, `src/LocalPages.tsx`, `src/App.tsx` and
`src/index.css` were never uploaded to this repository. So that the site has
no broken images, placeholders were generated at the exact paths the code
expects.

## Replacing them

Drop the real file in at the same path — nothing else needs to change. Each
placeholder is labelled in-page with a `PLACEHOLDER IMAGE` tag or obvious
placeholder copy so they are easy to spot.

List what is still missing at any time:

```bash
grep -rhoE "/assets/[A-Za-z0-9._/-]+\.(jpg|jpeg|png|svg|webp|woff2)" src index.html \
  | sed 's|^/assets/||' | sort -u \
  | while read -r p; do [ -f "public/assets/$p" ] || echo "MISSING $p"; done
```

## Regenerating the catalog placeholders

```bash
python3 -m venv /tmp/venv && /tmp/venv/bin/pip install pillow
/tmp/venv/bin/python scripts/make_placeholders.py
```

The script reads the JSON catalogs and only writes files that do not exist,
so it is safe to re-run after real photos are added.

## Fonts

`public/assets/SoDoSans-*.woff2` are **not** the real SoDo Sans. They are
[Jost](https://fonts.google.com/specimen/Jost) (SIL Open Font License, copy in
`public/assets/OFL-Jost.txt`), a geometric sans used as a temporary stand-in
because the SoDo Sans OTFs were not in the repo. Replace these three files with
the licensed SoDo Sans webfonts to restore the brand typeface.
