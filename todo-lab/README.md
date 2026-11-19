# TodoLab

Projekt startowy do szkolenia **Automatyzacja testów funkcjonalnych aplikacji internetowych z użyciem Playwright i TypeScript**.

Użyj Node.js 24 (`nvm use` odczyta wersję z `.nvmrc`); Playwright 1.65 wspiera także Node.js 22 i 26.

## Uruchomienie

```sh
npm ci
npm run dev
```

Aplikacja działa domyślnie pod adresem:

```txt
http://localhost:5173
```

Hasło logowania:

```txt
admin123
```

## Testy

Projekt startowy nie ma jeszcze pliku `playwright.config.ts` ani gotowych testów. Utworzysz je w zadaniu 4. Następnie możesz używać:

```sh
npm test
npm run test:ui
npm run typecheck
```

## Funkcje do ćwiczeń

- logowanie i ochrona tras przez `sessionStorage`
- routing hash: `#/login`, `#/todos`, `#/about`
- pobieranie danych z `public/data.json`
- dodawanie, edycja, usuwanie i oznaczanie zadań
- walidacja formularza
- filtrowanie po statusie i priorytecie
- wyszukiwanie po tytule i opisie
- operacje masowe z `window.confirm`
- import JSON przez upload pliku
- eksport JSON przez download
- popup z raportem
- ramka iframe z interaktywną pomocą na stronie `O aplikacji`

Projekt celowo jest prosty i framework-free, żeby w trakcie szkolenia uwaga była na Playwright, a nie na frameworku UI.
