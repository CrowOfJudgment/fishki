import EmailAndPasswordAuth from "../../../components/EmailAndPasswordAuth";

export const runtime = "edge";

export default function Login() {
    return (
        <div>
            <EmailAndPasswordAuth />
        </div>
    )
}