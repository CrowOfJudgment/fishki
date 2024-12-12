import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '../../../../lib/firebaseConfig';
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
    const stripeHeaders = await headers();
    const signature = stripeHeaders.get('stripe-signature');

    let event;

    try {
        const body = await req.text(); // Ensure raw body is read for Stripe verification
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
    }

    const { data, type: eventType } = event;

    try {
        switch (eventType) {
            case 'invoice.payment_succeeded': {
                const invoice = data.object;
                const customerId = invoice.customer;

                // Retrieve the customer details
                const customer = await stripe.customers.retrieve(customerId);

                if (customer.email) {
                    await giveAccessToUser(customer.email);
                    console.log(`Access granted for invoice payment succeeded: ${customer.email}`);
                } else {
                    throw new Error('Customer email not found for invoice payment.');
                }
                break;
            }

            case 'checkout.session.completed': {
                const session = data.object; // Directly use the event's session object
                const customerEmail = session.customer_email;

                if (customerEmail) {
                    await giveAccessToUser(customerEmail);
                }
                break;
            }

            case 'customer.subscription.deleted': {
                const customerId = data.object.customer;
                const customer = await stripe.customers.retrieve(customerId);

                if (customer.email) {
                    await revokeAccessFromUser(customer.email);
                }
                break;
            }

            default:
                console.warn(`Unhandled event type: ${eventType}`);
        }
    } catch (error) {
        console.error(`Error processing event: ${error.message}`, { eventType });
    }

    return NextResponse.json({ received: true });
}



// Helper function to grant access to a user
async function giveAccessToUser(customerEmail) {
    try {
        const userQuery = query(collection(db, "users"), where("email", "==", customerEmail));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
            querySnapshot.forEach(async (docSnapshot) => {
                const userDocRef = doc(db, "users", docSnapshot.id);
                await updateDoc(userDocRef, { hasAccess: true });
                console.log(`Access granted to user: ${customerEmail}`);
            });
        } else {
            console.warn(`No user found for email: ${customerEmail}`);
        }
    } catch (error) {
        console.error('Error granting access:', error);
    }
}

// Helper function to revoke access from a user
async function revokeAccessFromUser(customerEmail) {
    try {
        const userQuery = query(collection(db, "users"), where("email", "==", customerEmail));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
            querySnapshot.forEach(async (docSnapshot) => {
                const userDocRef = doc(db, "users", docSnapshot.id);
                await updateDoc(userDocRef, { hasAccess: false });
                console.log(`Access revoked for user: ${customerEmail}`);
            });
        } else {
            console.warn(`No user found for email: ${customerEmail}`);
        }
    } catch (error) {
        console.error('Error revoking access:', error);
    }
}
