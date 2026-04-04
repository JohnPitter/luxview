import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import ptBR from './locales/pt-BR.js';

const STORAGE_KEY = 'luxview_lang';
const DEFAULT_LANG = 'pt-BR';

export const SUPPORTED_LANGS = [
  { code: 'pt-BR', label: 'Portugu\u00eas', flag: 'br' },
  { code: 'en', label: 'English', flag: 'us' },
  { code: 'es', label: 'Espa\u00f1ol', flag: 'es' },
  { code: 'zh', label: '\u4e2d\u6587', flag: 'cn' },
  { code: 'ja', label: '\u65e5\u672c\u8a9e', flag: 'jp' },
];

const localeLoaders = {
  'pt-BR': () => Promise.resolve(ptBR),
  en: () => import('./locales/en.js').then((m) => m.default),
  es: () => import('./locales/es.js').then((m) => m.default),
  zh: () => import('./locales/zh.js').then((m) => m.default),
  ja: () => import('./locales/ja.js').then((m) => m.default),
};

const I18nContext = createContext(null);

function getInitialLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.some((l) => l.code === stored)) {
      return stored;
    }
  } catch {
    /* localStorage unavailable */
  }
  return DEFAULT_LANG;
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);
  const [messages, setMessages] = useState(lang === DEFAULT_LANG ? ptBR : {});
  const [loading, setLoading] = useState(lang !== DEFAULT_LANG);

  useEffect(() => {
    if (lang === DEFAULT_LANG) {
      setMessages(ptBR);
      setLoading(false);
      return;
    }

    const loader = localeLoaders[lang];
    if (!loader) return;

    setLoading(true);
    loader().then((mod) => {
      setMessages(mod);
      setLoading(false);
    });
  }, [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((code) => {
    if (!SUPPORTED_LANGS.some((l) => l.code === code)) return;
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* localStorage unavailable */
    }
    setLangState(code);
  }, []);

  const t = useCallback(
    (key, params) => {
      let value = messages[key];
      if (value === undefined) {
        // Fallback to pt-BR if key is missing in current locale
        value = ptBR[key];
      }
      if (value === undefined) return key;
      if (params) {
        return value.replace(/\{(\w+)\}/g, (_, k) =>
          params[k] !== undefined ? String(params[k]) : `{${k}}`
        );
      }
      return value;
    },
    [messages],
  );

  return (
    <I18nContext.Provider value={{ t, lang, setLang, loading }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return ctx;
}
