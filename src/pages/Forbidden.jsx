import ErrorPage from '../components/ErrorPage';

const Forbidden = () => (
    <ErrorPage
        code="403"
        title="You do not have access to this page"
        lead="This area is restricted. If you believe you should be able to reach it, ask the owner of the resource for access or get in touch with us."
        metaTitle="403 — Access denied | Big-Matrix Solutions"
        primaryAction={{ to: '/', label: 'Back to home' }}
        secondaryAction={{ to: '/contact', label: 'Request access' }}
        note="If you were sent here from an internal tool, your session may have expired. Sign in again and retry the link."
    />
);

export default Forbidden;
