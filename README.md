This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

https://openmf.github.io/mobile-wallet/
https://venus.mifos.community/#/home

https://venus.mifos.community/fineract-provider/api/v1/self/clients/9/accounts?fields=savingsAccounts
https://venus.mifos.community/fineract-provider/api/v1/self/savingsaccounts/18?associations=transactions

## signup
search for user, empty array not found
https://venus.mifos.community/fineract-provider/api/v1/search?query=test34&resource=clients&exactMatch=false

create user, gets the resourceId that is the clientId
POST https://venus.mifos.community/fineract-provider/api/v1/users
{
    "username": "test123",
    "firstname": "test",
    "lastname": "last",
    "email": "a@b.com",
    "password": "Password1",
    "officeId": 1,
    "roles": [
        2,
        1
    ],
    "sendPasswordToEmail": false,
    "isSelfServiceUser": true,
    "repeatPassword": "Password1"
}
RESPONSE
officeId: 1
resourceId: 18

create the client with id externalId: "test123_client"
POST https://venus.mifos.community/fineract-provider/api/v1/clients
{
    "firstname": "test",
    "lastname": "last",
    "externalId": "test123_client",
    "mobileNo": "1234567891",
    "address": {
        "addressLine1": "add1",
        "addressLine2": "add2",
        "postalCode": "123456",
        "stateProvinceId": "NY",
        "countryId": "US"
    },
    "savingsProductId": 1,
    "officeId": 1,
    "legalFormId": 1,
    "active": true,
    "dateFormat": "dd-MM-yyyy",
    "activationDate": "13-12-2024",
    "submittedOnDate": "13-12-2024",
    "locale": "en_US"
}
RESPONSE
{
    "officeId": 1,
    "clientId": 17,
    "savingsId": 19,
    "resourceId": 17,
    "resourceExternalId": "test123_client"
}

verify linking user 18 to client 17
PUT https://venus.mifos.community/fineract-provider/api/v1/users/18
{
    "clients": [
        17
    ]
}
response
{"officeId":1,"resourceId":18,"changes":{"clients":["17"]}}

# for merchant
https://venus.mifos.community/fineract-provider/api/v1/users
{
    "username": "test8",
    "firstname": "a",
    "lastname": "a",
    "email": "a@b.cm",
    "password": "Password1",
    "officeId": 1,
    "roles": [
        2,
        1
    ],
    "sendPasswordToEmail": false,
    "isSelfServiceUser": true,
    "repeatPassword": "Password1"
}

https://venus.mifos.community/fineract-provider/api/v1/clients
{
    "firstname": "test",
    "lastname": "test",
    "externalId": "test1234_client",
    "mobileNo": "1234567892",
    "address": {
        "addressLine1": "add1",
        "addressLine2": "add2",
        "postalCode": "123456",
        "stateProvinceId": "NY",
        "countryId": "US"
    },
    "savingsProductId": 1,
    "officeId": 1,
    "legalFormId": 1,
    "active": true,
    "dateFormat": "dd-MM-yyyy",
    "activationDate": "13-12-2024",
    "submittedOnDate": "13-12-2024",
    "locale": "en_US"
}
response
{
    "officeId": 1,
    "clientId": 19,
    "savingsId": 20,
    "resourceId": 19,
    "resourceExternalId": "test1234_client"
}

login
POST https://venus.mifos.community/fineract-provider/api/v1/self/authentication
{
    "username": "test1234",
    "password": "Password1"
}