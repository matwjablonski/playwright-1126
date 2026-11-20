# Automatyzacja testów funkcjonalnych z Playwright i TypeScript

To repozytorium zawiera aplikację TodoLab do ćwiczeń oraz workbook uczestnika.

## Zawartość

- [`todo-lab/`](./todo-lab/) — aplikacja Vite i TypeScript, którą będziemy testować w Playwright;
- [`materials/workbook.pdf`](./materials/workbook.pdf) — zadania, pytania po ćwiczeniach i miejsce na notatki.
- [`materials/additional.md`](./materials/additional.md) — sprawdzone materiały dodatkowe do warsztatów.
- [`materials/presentation.pdf`](./materials/presentation.pdf) — prezentacja ze szkolenia.

Wariant szkolenia: **wariant bazowy**.

## Wymagania

- Node.js i npm;
- Git;
- przeglądarka Chromium, instalowana poleceniem Playwright z zadania 4.

## Uruchomienie

```sh
cd todo-lab
npm ci
npx playwright install chromium firefox webkit
npm test
```

Pytania po szkoleniu: [mail@mateuszjablonski.com](mailto:mail@mateuszjablonski.com).
