import EmailAndPasswordAuth from "../../../components/EmailAndPasswordAuth";

export const runtime = "edge";

export default function Login() {
    return (
        <div>
            <h1>Login</h1>
            <EmailAndPasswordAuth />
        </div>
    )
}