# Task Manager - Prosty Manager Zadań

To jest prosta aplikacja do zarządzania zadaniami zbudowana z nowoczesnych technologii. Możesz dodawać, edytować, usuwać i oznaczać zadania jako wykonane.

GitHub: https://github.com/Lefjuu/crud

---

## Co potrafi ta aplikacja?

- Dodawanie zadań - wpisz tytuł i dodaj nowe zadanie
- Oznaczanie jako wykonane - kliknij żeby zaznaczyć zadanie
- Edytowanie - zmień tytuł zadania
- Usuwanie - usuń zadanie które już nie potrzebne
- Ciemny motyw - łatwy dla oczu interfejs
- Responsywny design - działa na komputerze i telefonie

---

## Technologie

| Część          | Narzędzia                                      |
| -------------- | ---------------------------------------------- |
| Frontend       | Next.js 16, React 19, TypeScript, Tailwind CSS |
| Backend        | Next.js API, REST API                          |
| Baza danych    | Prisma + SQLite                                |
| Stan aplikacji | TanStack React Query                           |
| Testy          | Jest + React Testing Library                   |
| Konteneryzacja | Docker                                         |
| CI/CD          | GitHub Actions                                 |

---

## Wymagania

- Node.js 20+ (nowszy niż 18!)
- npm lub yarn
- Docker (opcjonalnie, do konteneryzacji)

---

## Szybki start

### Opcja 1: Lokalne uruchomienie

```bash
# 1. Pobierz kod
git clone https://github.com/Lefjuu/crud.git
cd crud

# 2. Zainstaluj zależności
npm install

# 3. Przygotuj bazę danych
npx prisma generate
npx prisma db push

# 4. Uruchom aplikację
npm run dev
```

Otwórz http://localhost:3000 i zaczynaj korzystać!

### Opcja 2: Z Dockerem

```bash
# Wszystko jednym poleceniem
npm run docker:dev
```

---

## Testowanie

```bash
# Wszystkie testy
npm test

# Testy z pokryciem kodu
npm run test:coverage

# Testy w trybie obserwacji
npm run test:watch
```

Mamy 9 testów automatycznych które sprawdzają działanie aplikacji.

---

## Struktura projektu

```
crud/
├── src/
│   ├── app/
│   │   ├── api/tasks/     # API dla zadań
│   │   ├── layout.tsx     # Główny layout
│   │   ├── page.tsx       # Strona główna
│   │   └── globals.css    # Style CSS
│   ├── components/
│   │   ├── tasks/         # Komponenty zadań
│   │   │   ├── AddTaskForm.tsx
│   │   │   ├── TaskItem.tsx
│   │   │   └── TaskList.tsx
│   │   └── providers.tsx  # Provider React Query
│   ├── hooks/
│   │   └── useTasks.ts    # Hooki zarządzania zadaniami
│   └── lib/
│       ├── api/tasks.ts   # Funkcje API
│       └── services/      # Logika biznesowa
├── prisma/
│   ├── schema.prisma      # Schemat bazy danych
│   └── migrations/        # Migracje bazy
├── __tests__/             # Testy automatyczne
├── .github/workflows/     # CI/CD (GitHub Actions)
├── Dockerfile             # Konfiguracja Docker
├── docker-compose.yml     # Docker Compose
└── README.md
```

---

## API Endpoints

| Metoda | Ścieżka         | Opis                      |
| ------ | --------------- | ------------------------- |
| GET    | /api/tasks      | Pobierz wszystkie zadania |
| POST   | /api/tasks      | Dodaj nowe zadanie        |
| PUT    | /api/tasks/[id] | Zaktualizuj zadanie       |
| DELETE | /api/tasks/[id] | Usuń zadanie              |

---

## API Endpoints

| Metoda | Ścieżka         | Opis                      |
| ------ | --------------- | ------------------------- |
| GET    | /api/tasks      | Pobierz wszystkie zadania |
| POST   | /api/tasks      | Dodaj nowe zadanie        |
| PUT    | /api/tasks/[id] | Zaktualizuj zadanie       |
| DELETE | /api/tasks/[id] | Usuń zadanie              |

Przykład dodania zadania:

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Nauczyć się React"}'
```

---

## Dokumentacja API

Pełna interaktywna dokumentacja API jest dostępna pod adresem **http://localhost:3000/api-docs** po uruchomieniu aplikacji.

Dokumentacja zawiera:

- Szczegółowe opisy wszystkich endpointów
- Przykłady żądań i odpowiedzi
- Możliwość testowania API bezpośrednio z przeglądarki
- Schematy danych dla wszystkich modeli

Możesz również przejść do dokumentacji klikając przycisk "API Docs" na stronie głównej aplikacji.

---

## Baza danych

Używamy SQLite z Prisma ORM. Schemat jest prosty:

```prisma
model Task {
  id        Int      @id @default(autoincrement())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## Dostępne komendy

```bash
npm run dev          # Uruchom w trybie development
npm run build        # Zbuduj do produkcji
npm start            # Uruchom wersję produkcyjną
npm run lint         # Sprawdź jakość kodu
npm test             # Uruchom testy
npm run test:watch   # Testy z auto-odświeżaniem
npm run test:coverage # Testy z raportem pokrycia
npm run docker:dev   # Uruchom z Docker
npm run docker:down  # Zatrzymaj Docker
```

---

## CI/CD Pipeline

Projekt ma automatyczne testowanie przez GitHub Actions:

- Testy na Node.js 20 i 22
- Sprawdzanie jakości kodu (ESLint)
- Budowanie aplikacji
- Budowanie obrazu Docker
- Raporty z pokrycia kodu
