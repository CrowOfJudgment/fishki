import { getIntl } from "../../lib/intl";
import Script from "next/script";

export const runtime = "edge";

export default async function Home({ params }) {
    const { locale } = params; // Destructure locale from params
    const intl = await getIntl(locale);

    return (
        <div style={{height: "100vh"}}>
            {/*<h1>{intl.formatMessage({ id: "coming-soon.title" })}</h1>*/}
            {/*<h2>{intl.formatMessage({ id: "coming-soon.subtitle" })}</h2>*/}
            <iframe data-tally-src="https://tally.so/r/mDvvXN?transparentBackground=1" width="100%" height="100%"
                    frameBorder="0" marginHeight="0" marginWidth="0" title="Join the Waitlist..."></iframe>

            <Script
                id="tally-js"
                src="https://tally.so/widgets/embed.js"
            />
        </div>
    );
}
