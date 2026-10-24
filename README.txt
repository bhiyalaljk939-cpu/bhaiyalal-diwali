C.G Bhaiya.com — Diwali Website v2 (mobile-first)

FILES
- index.html: website
- style.css: dark background, 3D gift cards, mobile layout
- app.js: fireworks, gift reveal, share button, consent-based Firebase record
- firestore.rules: starter Firestore security rules

PART A — LOCAL TEST
1. Extract this ZIP on your phone.
2. For the design preview, open index.html in a browser. Because app.js uses JavaScript modules, Firebase setup testing is best from a local web server or deployed HTTPS URL.
3. Change FACEBOOK_URL in app.js to your real public Facebook page/profile URL.

PART B — FREE HOSTING (Firebase Hosting)
1. Open https://console.firebase.google.com/ and sign in with Google.
2. Create a project, e.g. cg-bhaiyalal-diwali.
3. In Project settings > General > Your apps, add a Web app and copy the Firebase config.
4. Replace the placeholder values in firebaseConfig at the top of app.js.
5. In Build > Firestore Database, create a database.
6. Open Firestore Rules and paste firestore.rules from this folder, then Publish.
7. For Firebase Hosting, the standard CLI deployment uses Node.js/npm and the Firebase CLI. It is easiest on a computer or in a supported cloud development environment. From a phone, use a GitHub repository and a free static host such as Netlify as an alternative for the website files. Firebase Firestore can still store the records.
8. Upload index.html, style.css and app.js to your static host. Ensure the deployed site uses HTTPS. Open the public URL and test.

PART C — VIEW VISITOR RECORDS
Firebase Console > Build > Firestore Database > Data > diwaliVisits.
The site records a visitor's typed name, server timestamp, consent=true, consent text version, and page label only when the checkbox is checked and Firebase is configured.
The visitor can still use the gifts without consenting. No phone number or precise location is collected.

IMPORTANT PRIVACY / SECURITY NOTES
- Do not make the collection publicly readable. The included rules deny public reads; check records only in Firebase Console.
- This starter rule allows anonymous writes after consent but does not prevent spam. Before sharing widely, add Firebase App Check and appropriate abuse controls; never put service-account/private admin keys in website code.
- A public client website cannot securely show an admin-only visitor list without adding authentication and admin access rules.
- Be transparent about what is recorded, provide a contact/retention policy if collecting names, and delete records you no longer need.
- This is a festive greeting site, not a real-money or guaranteed-prize offer.

V3 UPDATE: Each gift has a unique icon, color theme, title, and Hindi greeting. The background has extra festive sparkle styling.
