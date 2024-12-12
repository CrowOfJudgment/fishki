const customerPortalLink = 'https://billing.stripe.com/p/login/test_fZe3epfCg7ML8W4fYY'

export const ButtonCustomerPortal = ({userEmail}) => {
    if (userEmail) {
        return (
            <a
                href={`${customerPortalLink}?prefilled_email=${encodeURIComponent(userEmail)}`}
               className="w-full sm:w-auto py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none text-center"

            >
                Billing
            </a>
        );
    }
}