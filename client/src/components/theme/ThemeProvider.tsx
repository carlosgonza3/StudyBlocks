import {
    createContext,
    type ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
};

const THEME_STORAGE_KEY = "studyblocks-theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
    children: ReactNode;
};

function getInitialTheme(): Theme {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    return prefersDark ? "dark" : "light";
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark");
        root.classList.add(theme);

        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    const value = useMemo<ThemeContextValue>(
        () => ({
            theme,
            setTheme: setThemeState,
            toggleTheme: () => {
                setThemeState((currentTheme) =>
                    currentTheme === "dark" ? "light" : "dark",
                );
            },
        }),
        [theme],
    );

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used inside ThemeProvider");
    }

    return context;
}