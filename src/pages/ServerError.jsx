import ErrorPage from '../components/ErrorPage';

const ServerError = () => (
    <ErrorPage
        code="500"
        title="Something broke on our end"
        lead="The request failed while we were handling it. This one is on us, not on you. Reloading often clears it; if it keeps happening, tell us what you were doing and we will look."
        metaTitle="500 — Server error | Big-Matrix Solutions"
        primaryAction={{ to: '/', label: 'Back to home' }}
        secondaryAction={{
            label: 'Reload the page',
            icon: 'bi-arrow-clockwise',
            onClick: () => window.location.reload(),
        }}
        note="Still stuck? Send us the page address and the time it happened — that is enough for us to find it in the logs."
    />
);

export default ServerError;
