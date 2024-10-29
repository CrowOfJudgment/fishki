import { Metadata, ResolvingMetadata } from "next";

import { getIntl } from "../../lib/intl";
import styles from "./page.module.css";

export const runtime = "edge"

type RouteProps = {
    params: { locale: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    props: RouteProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const intl = await getIntl(props.params.locale);

    return {
        title: "TableScan",
        description: "TableScan description",
        alternates: {
            canonical: "https://example.com",
            languages: {
                pl: "http://example.com/pl",
                en: "http://example.com",
                "x-default": "http://example.com",
            },
        },
    };
}

type HomeProps = {
    params: { locale: string };
};

export default async function Home({ params: { locale } }: HomeProps) {
    const intl = await getIntl(locale);

    return (
        <div>
            <h1>{intl.formatMessage({ id: "coming-soon.title" })}</h1>
            <h2>{intl.formatMessage({ id: "coming-soon.subtitle" })}</h2>
        </div>
    );
}
