# TodoLab

Aplikacja ćwiczeniowa oraz testy z zadań 1–13 workbooka (bez wariantu 3a). Aplikacja używa Vite i TypeScript, a testy Playwright.

## Uruchomienie

Wymagany jest Node.js 24 (`nvm use` odczytuje `.nvmrc`). Z katalogu `todo-lab/`:

```sh
npm ci
npx playwright install chromium firefox webkit
npm run dev
```

Aplikacja: `http://localhost:5173`; hasło demonstracyjne: `admin123`.

## Testy i kontrola jakości

```sh
npm run lint
npm run build
npm test
npm run test:ui
```

`npm test` uruchamia kontrolę typów i testy w Chromium, Firefox, WebKit oraz mobilnym Chromium. Playwright sam uruchamia serwer Vite. Dla innego adresu ustaw `TEST_BASE_URL`, na przykład `TEST_BASE_URL=http://localhost:5173 npm test`.

Raport HTML otworzysz poleceniem `npx playwright show-report`. Raport JSON jest w `test-results/results.json`. Po nieudanym teście zachowywane są screenshot, video i trace. Do interaktywnego debugowania użyj `npx playwright test --debug`; `page.pause()` dodawaj wyłącznie tymczasowo.

Testy wizualne mają stały viewport i kontrolowane dane. Snapshoty są przygotowane dla Chromium na macOS; na innych systemach i w pozostałych projektach przeglądarkowych te trzy testy są pomijane. Po świadomym sprawdzeniu obrazów można je odnowić poleceniem `npx playwright test tests/visual.spec.ts --project=chromium --update-snapshots`.

## Organizacja

- `tests/*.spec.ts` — scenariusze; każdy test zaczyna z osobnym kontekstem przeglądarki.
- `tests/pages/*.page.ts` — Page Objecty z locatorami i powtarzalnymi akcjami.
- `tests/fixtures/*.factory.ts` — kontrolowane dane testowe.
- `tests/fixtures/authenticated-test.ts` — izolowana inicjalizacja `sessionStorage` przed nawigacją.
- `tests/setup/*.setup.ts` — demonstracja zapisu `storageState` do ignorowanego `playwright/.auth/`.

`storageState` zapisuje ciasteczka i `localStorage`, ale nie `sessionStorage`. Dlatego testy wymagające zalogowania używają fixture z `addInitScript()`. Osobny test sprawdza, że nowy kontekst z zapisanym `storageState` trafia na stronę logowania.

Testy preferują role i etykiety dostępności; `data-testid` służy tam, gdzie UI nie ma odpowiedniej nazwy. CSS i XPath występują w ćwiczeniu porównującym strategie locatorów. Locator oparty na roli lub etykiecie zwykle lepiej znosi zmianę struktury HTML; selektor XPath odwołujący się do `li` jest tu celowo przykładem bardziej kruchej zależności.
