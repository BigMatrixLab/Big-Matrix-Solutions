import LEGAL from '../data/legal.json';

const { company } = LEGAL;

/**
 * Email, phone and address as a labelled list. Used by the policy pages and
 * the About page, with the details from data/legal.json.
 */
const ContactRows = () => (
    <dl className="bm-legal__contact">
        <div><dt>Email</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd></div>
        <div><dt>Phone</dt><dd><a href={company.phoneHref}>{company.phone}</a></dd></div>
        <div><dt>Address</dt><dd>{company.address}</dd></div>
    </dl>
);

export default ContactRows;
