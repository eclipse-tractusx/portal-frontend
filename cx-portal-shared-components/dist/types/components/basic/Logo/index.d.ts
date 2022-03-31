interface LogoProps {
    variant: 'standard' | 'short' | 'text';
    altText: string;
}
export declare const Logo: ({ variant, altText, ...props }: LogoProps) => JSX.Element;
export {};
