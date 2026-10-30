# Chemistry Grade 10 (Khmer) — គីមីវិទ្យា ថ្នាក់ទី ១០

Khmer-language lecture website for Cambodian Grade 10 Chemistry: atoms, the periodic table, chemical bonding, organic chemistry and fertilisers.

ទំព័រមេរៀនគីមីវិទ្យា ថ្នាក់ទី ១០ ជាភាសាខ្មែរ ដែលមានរូបភាព សមីការ និងឧបករណ៍សាកល្បងអន្តរកម្ម សម្រាប់សិស្ស និងគ្រូបង្រៀន។

## Contents

- **ជំពូក ១ អាតូម** — Dalton's laws, protons/neutrons/electrons, isotopes, electron shells, the mole
- **ជំពូក ២ តារាងខួប** — groups and periods, alkali metals, halogens, noble gases, transition metals
- **ជំពូក ៣ សម្ព័ន្ធគីមី** — covalent and ionic bonds, the four types of solids
- **ជំពូក ៤ គីមីសរីរាង្គ** — petroleum, alkanes, alkenes and alkynes, benzene, fertilisers
- Summary, and exercises with click-to-reveal answers

Interactive parts: an interactive atom (all 118 elements; shell and quantum-cloud models, ions, excitation and photon emission), a full 118-element periodic table with element details and category filters, a clickable table of the first 20 elements that draws each atom's electron shells, a mass → moles → particles calculator, and an alkane structure slider (n = 1–10). A light/dark mode button sits in the top-right corner.

## Viewing the site

The site comes in two languages, and each is one complete file:

- `index.html`: Khmer (ខ្មែរ)
- `index-en.html`: English

The **English / ខ្មែរ** button in the top-right corner switches between them and keeps the reader at the same chapter or lesson.

Open either file in any web browser — no server or internet needed (only the Khmer web font, Kantumruy Pro, loads from Google Fonts; offline it falls back to the Khmer font installed on the computer).

## Publishing on GitHub Pages

1. Create a new **public** repository on <https://github.com/new> (for example `chemistry-grade10-khmer`). Leave "Add a README" unticked.
2. Upload the files, using either method:
   - **In the browser:** on the new repository page click **uploading an existing file**, drag in everything from this folder **except `node_modules`** (include the `src` and `scripts` folders, `.gitignore` and `.nojekyll`), then click **Commit changes**.
   - **With Git** (run inside this folder):
     ```bash
     git init
     git add .
     git commit -m "គីមីវិទ្យា ថ្នាក់ទី ១០ lecture website"
     git branch -M main
     git remote add origin https://github.com/YOUR-USERNAME/chemistry-grade10-khmer.git
     git push -u origin main
     ```
3. In the repository go to **Settings → Pages**, set **Source** to *Deploy from a branch*, choose **main** and **/ (root)**, then **Save**.
4. After a minute the site is live at `https://YOUR-USERNAME.github.io/chemistry-grade10-khmer/`.

## Editing the lesson

The source is in `src/`:

| File | What it holds |
|---|---|
| `src/index.html` | Khmer lesson text, SVG figures, equations written in TeX |
| `src/index.en.html` | The same page in English (keep its structure in step with `src/index.html`) |
| `src/i18n/js.en.json` | English versions of the labels shown by the interactive tools |
| `src/styles.css` | Colours, fonts and layout (light and dark themes) |
| `src/app.js` | Interactive widgets |

Equations are written in TeX and typeset at build time with [KaTeX](https://katex.org):

- inline: `\( v = v_0 + at \)`
- display: `\[ \frac{1}{p} + \frac{1}{q} = \frac{1}{f} \]`
- chemistry: `\( \ce{2Na + Cl2 -> 2NaCl} \)`
- inside an SVG figure: `<tx x="120" y="40" w="60">\vec F</tx>`

After editing, rebuild `index.html` and `index-en.html` (requires [Node.js](https://nodejs.org) 18 or newer):

```bash
npm install
npm run build
```

Then commit and push the updated `index.html` and `index-en.html` together with your source changes.

## Source

Content summarised from the Grade 10 Chemistry textbook, Ministry of Education, Youth and Sport (MoEYS), Cambodia.

## Copyright

© 2026 Phealy Thourk (ធួក ភាលី). All rights reserved. This website was created by and is owned by Phealy Thourk. See [LICENSE](LICENSE).
