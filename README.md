---
### Overview
This services enable storing mailing list & contacts on filecoin where community can vote to decide who can contact them and the file is encrypted and only shared to operator (who is sending the message) after DAO approval.

A more complete background on motivation and architecture can be found [here](https://docs.google.com/presentation/d/1CYfaMsRAmkGg-UDutYKVrySTIoC73teIOt--M-s6UDs/edit)

This includes 
1) server which can be execute by creator / operator
2) smart contracts for governance by voting

Smart contract is modified with reference to https://github.com/filecoin-project/fevm-data-dao-kit


### Demo
- GET http://localhost:3000/api/add?id=a&email=a@a.com&name=a
- GET http://localhost:3000/api/add?id=b&email=b@b.com&name=b

### Design on data structure

As lighthouse is a perpertual storage with cost charged upfront by size and file deletion is not possible, and data set could be incremental natually, e.g. new members, update of emails. We do a event sourcing approach, to be flexible about dataset and avoid duplications of data

There is [immerjs](https://immerjs.github.io/) and [RFC-6902](https://datatracker.ietf.org/doc/html/rfc6902/#section-4.1) for that so we wont reinvent the wheel

The node could compute the diff patches and store the related operaitons in different files which work as an append list, e.g.

```
contacts-1.json
contacts-2.json
```
(Pruning of such dataset is in theory possible, while not current focus)

### Design on Membership

We do not assume every contact is by default a member of the DAO. The way Governance Token distributed is decoupled and totally subject to community's decisions. Contact manipulation is separated from the contract. 

### Governance on Operator
Could be 
- dedicated owner (whitelisted by wallet adderss),
  - (create isWhiteListed method at contract and apply in access control)
- or holding over particular token threshold
  - (use balanceOf method in access control)

### Reward 
- We could also reward operator for computation at the proposal

---

### Codebase

-   originally generated via nextjs edge template

env-cmd yarn hardhat run scripts/propose.js

---

name: Using Crypto in Edge Middleware and Edge Functions
slug: edge-functions-crypto
description: Learn to utilize the crypto Web APIs at the edge.
framework: Next.js
useCase:

-   Edge Functions
-   Edge Middleware
-   Documentation
    css: Tailwind
    deployUrl: https://vercel.com/new/clone?repository-url=https://github.com/vercel/examples/tree/main/edge-middleware/crypto&project-name=crypto&repository-name=crypto
    demoUrl: https://edge-functions-crypto.vercel.app
    relatedTemplates:
-   ab-testing-simple

---

# Crypto

In this example, you'll see how you can utilize the `crypto` Web APIs with Edge Middleware and Edge Functions.

Working example: [crypto.vercel.sh](https://crypto.vercel.sh/)

Includes:

-   `crypto.randomUUID`
-   `crypto.getRandomValues`
-   Encryption with `crypto.subtle`
-   Decryption with `crypto.subtle`

## Demo

https://edge-functions-crypto.vercel.app

## How to Use

You can choose from one of the following two methods to use this repository:

### One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/examples/tree/main/edge-middleware/crypto&project-name=crypto&repository-name=crypto)

### Clone and Deploy

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [pnpm](https://pnpm.io/installation) to bootstrap the example:

```bash
pnpm create next-app --example https://github.com/vercel/examples/tree/main/edge-middleware/crypto crypto
```

Next, run Next.js in development mode:

```bash
pnpm dev
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=edge-middleware-eap) ([Documentation](https://nextjs.org/docs/deployment)).
