# Automatyzacja testów funkcjonalnych z Playwright i TypeScript

To repozytorium zawiera aplikację TodoLab do ćwiczeń oraz workbook uczestnika.

## Zawartość

- [`todo-lab/`](./todo-lab/) — aplikacja Vite i TypeScript, którą będziemy testować w Playwright;
- [`materials/workbook.pdf`](./materials/workbook.pdf) — zadania, pytania po ćwiczeniach i miejsce na notatki.

Wariant szkolenia: **wariant bazowy**.

## Wymagania

- Node.js i npm;
- Git;
- przeglądarka Chromium, instalowana poleceniem Playwright z zadania 4.

## Uruchomienie

```sh
git clone https://github.com/matwjablonski/playwright-1126.git
cd playwright-1126/todo-lab
npm ci
npm run dev
```

Aplikacja działa pod adresem `http://localhost:5173`. Hasło demonstracyjne to `admin123`.

Zacznij od zadania 1 w workbooku. Projekt startowy celowo nie ma konfiguracji Playwright ani testów — powstaną w trakcie warsztatu.

## Przydatne polecenia

Uruchamiaj je z katalogu `todo-lab/`:

```sh
npm run lint
npm run build
```

Po wykonaniu zadania 4 możesz uruchamiać `npm test` i `npm run test:ui`.

## Kontakt

Pytania po szkoleniu: [mail@mateuszjablonski.com](mailto:mail@mateuszjablonski.com).
