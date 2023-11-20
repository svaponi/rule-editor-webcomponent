import React, { PropsWithChildren } from 'react';
export declare class ErrorBoundary extends React.Component<PropsWithChildren, {
    hasError: boolean;
}> {
    constructor(props: PropsWithChildren);
    static getDerivedStateFromError(error: unknown): {
        hasError: boolean;
    };
    render(): string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element;
}
