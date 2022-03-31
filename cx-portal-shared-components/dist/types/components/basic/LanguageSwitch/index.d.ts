interface Language {
    key: string;
    name?: string;
}
interface LanguageSwitchProps {
    current: Language['key'];
    languages: Language[];
    onChange: (key: string) => void;
}
export declare const LanguageSwitch: ({ current, languages, onChange, }: LanguageSwitchProps) => JSX.Element;
export {};
