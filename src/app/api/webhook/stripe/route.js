import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '../../../../lib/firebaseConfig';
import {collection, query, where, getDocs, addDoc, updateDoc, doc, setDoc} from "firebase/firestore";
import {headers} from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

import { auth } from "../../../../lib/firebaseConfig";
export async function getCurrentUser() {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe(); // Cleanup the listener immediately
            if (user) {
                resolve(user); // User is signed in
            } else {
                resolve(null); // No user is signed in
            }
        }, (error) => {
            unsubscribe(); // Cleanup in case of error
            reject(error); // Reject on error
        });
    });
}


export async function POST(req) {
    const currentUser = await getCurrentUser()

    const body = await req.text();
    // Await headers() to retrieve Stripe signature
    const stripeHeaders = await headers();
    const signature = stripeHeaders.get('stripe-signature');

    let data;
    let eventType;
    let event;

    // Verify Stripe event
    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error(`Webhook signature verification failed. ${err.message}`);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }

    data = event.data;
    eventType = event.type;

    try {
        const userCollection = collection(db, 'users'); // Firestore "users" collection

        switch (eventType) {
            case 'invoice.payment_succeeded': {
                const session = await stripe.checkout.sessions.retrieve(data.object.id, {
                    expand: ['line_items'],
                });
                const customerId = session.customer;
                const customer = await stripe.customers.retrieve(customerId);
                const priceId = session.line_items?.data[0]?.price.id;
                if (customer.email) {

                    await giveAccessToUser(customer.email)
                } else {
                    throw new Error('No user email found');
                }

                break;
            }

            case 'checkout.session.completed': {
                const session = await stripe.checkout.sessions.retrieve(data.object.id, {
                    expand: ['line_items'],
                });
                const customerId = session.customer;
                const customer = await stripe.customers.retrieve(customerId);
                const priceId = session.line_items?.data[0]?.price.id;
                if (customer.email) {
                    await giveAccessToUser(customer.email)
                } else {
                    throw new Error('No user email found');
                }

                break;
            }

            case 'customer.subscription.deleted': {
                // Extract subscription data from the event
                const subscription = data.object;
                const customerId = subscription.customer;

                try {
                    // Retrieve the customer from Stripe to get their email
                    const customer = await stripe.customers.retrieve(customerId);

                    if (customer.email) {
                        // Call a function to revoke access for the user
                        await revokeAccessFromUser(customer.email);
                    } else {
                        throw new Error('No user email found');
                    }
                } catch (error) {
                    console.error('Error revoking access:', error);
                }

                break;
            }


            default:
                console.warn('Unhandled event type:', eventType);
        }
    } catch (e) {
        console.error(`Stripe webhook error: ${e.message} | EVENT TYPE: ${eventType}`);
    }

    return NextResponse.json({});
}

const giveAccessToUser = async (customerEmail) => {
    try {
        const q = query(
            collection(db, "users"),
            where("email", "==", customerEmail)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("No user found with the provided email.");
            return;
        }

        querySnapshot.forEach(async (docSnapshot) => {
            const userDocRef = doc(db, "users", docSnapshot.id);

            await updateDoc(userDocRef, {
                hasAccess: true,
            });

            console.log(`Updated document ${docSnapshot.id} with hasAccess: true`);
        });

    } catch (error) {
        console.error("Error updating user document:", error);
    }
};


const revokeAccessFromUser = async (customerEmail) => {
    try {
        const q = query(
            collection(db, "users"),
            where("email", "==", customerEmail)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("No user found with the provided email.");
            return;
        }

        querySnapshot.forEach(async (docSnapshot) => {
            const userDocRef = doc(db, "users", docSnapshot.id);

            await updateDoc(userDocRef, {
                hasAccess: false,
            });

        });

    } catch (error) {
        console.error("Error revoking access to user. ", error)
    }
}
