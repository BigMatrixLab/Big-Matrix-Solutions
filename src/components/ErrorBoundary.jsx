import React from 'react';
import ServerError from '../pages/ServerError';

/**
 * Catches render-time crashes anywhere below it and shows the 500 page.
 * Without this, an unhandled error unmounts the tree and leaves a blank screen —
 * a SPA never reaches a real HTTP 500, so this is the only way the page is seen
 * in production.
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Left as a console report: there is no error-reporting sink wired up yet.
        console.error('Unhandled render error:', error, info?.componentStack);
    }

    render() {
        if (this.state.hasError) return <ServerError />;
        return this.props.children;
    }
}

export default ErrorBoundary;
