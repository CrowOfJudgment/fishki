import { getIntl } from "../../lib/intl";

export const runtime = "edge";

export default async function Home({ params }) {
    const { locale } = params; // Destructure locale from params
    const intl = await getIntl(locale);

    return (
        <div>
            <h1>{intl.formatMessage({ id: "coming-soon.title" })}</h1>
            <h2>{intl.formatMessage({ id: "coming-soon.subtitle" })}</h2>
        </div>
    );
}
