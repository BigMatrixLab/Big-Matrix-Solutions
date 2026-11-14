import LEGAL from '../data/legal.json';

const { company } = LEGAL;

/**
 * Legal identity of the company (name, RJSC registration, trade licence,
 * registered office) as a labelled list. Used by the policy pages and the
 * About page; scripts/build-legal-pdfs.py prints the same rows in the PDFs.
 */
const COMPANY_ROWS = [
    { label: 'Legal name', value: company.legalName },
    {
        label: 'Registration',
        value: `${company.registration}, RJSC Reg. No. ${company.rjscRegNo} (${company.incorporated})`,
    },
    ...(company.tradeLicenseNo
        ? [{ label: 'Trade licence', value: `${company.tradeLicenseNo} (${company.tradeLicenseAuthority})` }]
        : []),
    { label: 'Registered office', value: company.address },
];

const CompanyRows = () => (
    <dl className="bm-legal__contact bm-legal__contact--wide">
        {COMPANY_ROWS.map((row) => (
            <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>
        ))}
    </dl>
);

export default CompanyRows;
