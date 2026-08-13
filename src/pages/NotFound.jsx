import ErrorPage from '../components/ErrorPage';

const NotFound = () => (
    <ErrorPage
        code="404"
        title="This page is not here"
        lead="The link may be out of date, or the page has moved. Nothing is broken on our side — you just landed on an address that no longer resolves."
        metaTitle="404 — Page not found | Big-Matrix Solutions"
        primaryAction={{ to: '/', label: 'Back to home' }}
    />
);

export default NotFound;
