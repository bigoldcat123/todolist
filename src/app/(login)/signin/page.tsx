import Loginfor from "./component/LoginForm";

export default function Signin({
    searchParams,
}: {
    searchParams: { callbackUrl: string | null }
}) {

    console.log(searchParams.callbackUrl);

    return (
        <>
            <div className=" h-screen flex justify-center items-center">
                <Loginfor callbackUrl={searchParams.callbackUrl}></Loginfor>
            </div>
        </>
    )
}