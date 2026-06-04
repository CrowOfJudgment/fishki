export const messages = {
  en: {
  "hero": {
    "title": "Land your next IT job faster",
    "subtitle": "Practice interview questions that juniors actually get on interviews.",
    "earlyAcces": "Early access launching soon. Join the waitlist to get notified first."
  },
  "cta": {
    "cta": "Get early access!"
  },
  "footer": {
    "product": "Product",
    "features": "Features",
    "resources": "Resources",
    "terms": "Terms of service",
    "social": "Social"
  },
  "features": {
    "heading": "Flashcards and interview simulations designed around real hiring questions - so you walk into interviews prepared, not guessing.",
    "value": {
        "heading": "Get Your First Job",
        "text": "Land your first IT job faster by practicing real interview questions and structured answers instead of learning theory alone."
    },
    "problem": {
        "heading": "Why Juniors Fail",
        "text": "Most juniors fail not due to lack of knowledge, but because they never practice answering questions under real interview pressure."
    },
    "how": {
        "heading": "Simple Daily Practice",
        "text": "Choose a topic, practice flashcards based on real questions, repeat daily, and gradually build confidence for real interview situations."
    },
    "simulation": {
        "heading": "Mock Interview Training",
        "text": "Simulate real interviews with timed questions and structured answers so you stop freezing and start responding clearly under pressure."
    },
    "why": {
        "heading": "Built On Repetition",
        "text": "Confidence comes from repetition, not theory. We focus on recall training so answers become automatic during real technical interviews."
    },
    "built": {
        "heading": "Made For Beginners",
        "text": "Built by developers who struggled with first interviews. We designed this to remove confusion, anxiety, and lack of preparation."
    }
  },
  "carousel": {
    "main-screen": {
      "title": "Everything in one place",
      "desc": "Track progress, view stats, and manage your learning."
    },
    "splash-screen": {
      "title": "Start learning in seconds",
      "desc": "Sign in and continue exactly where you left off."
    },
    "flashcards": {
      "title": "Active learning mode",
      "desc": "Practice flashcards and reinforce knowledge through repetition."
    }
  },
  "floatingCta":{
    "text": "Sign up now!"
  }
},
  pl: {
  "hero": {
    "title": "Zdobądź następną pracę w IT szybciej",
    "subtitle": "Ćwicz pytania, które naprawdę dostają juniorzy na rozmowach rekrutacyjnych.",
    "earlyAcces": "Wczesny dostęp już wkrótce. Dołącz do listy oczekujących, żeby jako pierwszy dostać informację o starcie."
  },
  "cta": {
    "cta": "Dołącz do listy oczekujących!"
  },
  "footer": {
    "product": "Produkt",
    "features": "Funkcje",
    "resources": "Zasoby",
    "terms": "Warunki usługi",
    "social": "Media społecznościowe"
  },
  "features": {
    "heading": "Fiszki i symulacje rozmów kwalifikacyjnych oparte na prawdziwych pytaniach rekrutacyjnych, dzięki którym idziesz na rozmowę przygotowany, a nie zdany na zgadywanie.",
    "value": {
        "heading": "Zdobądź pierwszą pracę",
        "text": "Zdobądź pierwszą pracę w IT szybciej dzięki ćwiczeniu realnych pytań rekrutacyjnych zamiast samej teorii i książkowej wiedzy."
    },
    "problem": {
        "heading": "Dlaczego juniorzy odpadają",
        "text": "Juniorzy najczęściej odpadają nie przez brak wiedzy, ale brak praktyki odpowiadania na pytania pod presją rozmowy."
    },
    "how": {
        "heading": "Prosta codzienna nauka",
        "text": "Wybierasz temat, ćwiczysz fiszki z realnych pytań, powtarzasz codziennie i budujesz pewność przed rozmowami rekrutacyjnymi."
    },
    "simulation": {
        "heading": "Trening rozmów IT",
        "text": "Symulujesz prawdziwe rozmowy z ograniczeniem czasu, uczysz się odpowiadać jasno i przestajesz blokować się na pytaniach."
    },
    "why": {
        "heading": "Oparte na powtórkach",
        "text": "Pewność siebie wynika z powtórek, nie teorii. Trening pamięci sprawia, że odpowiedzi stają się naturalne."
    },
    "built": {
        "heading": "Dla początkujących",
        "text": "Stworzone przez developerów, którzy sami przechodzili pierwsze rozmowy. Usuwa chaos, stres i brak przygotowania."
    }
  },
  "carousel": {
    "mainScreen": {
      "title": "Wszystko w jednym miejscu",
      "desc": "Śledź postępy, statystyki i zarządzaj nauką."
    },
    "splashScreen": {
      "title": "Zacznij naukę w kilka sekund",
      "desc": "Zaloguj się i wróć dokładnie tam, gdzie przerwałeś."
    },
    "flashcards": {
      "title": "Nauka w trybie aktywnym",
      "desc": "Ćwicz fiszki i utrwalaj wiedzę dzięki powtórkom."
    }
  },
  "floatingCta":{
    "text": "Zapisz się już teraz!"
  }
  
}
} as const;

export type Locale = keyof typeof messages;

export function getMessages(locale: Locale) {
  return messages[locale] ?? messages.en;
}