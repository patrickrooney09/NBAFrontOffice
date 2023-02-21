# NBAFrontOffice

The purpose of this app is to deliver important information to an NBA Front Office.

This app will take player and team statistics and compare those stats to their salary for that given season. The goal is to put a dollar value on statistics. How much money are we paying a player or entire team per points, rebounds, assists, fouls, win percentage?

On the backend, this app utilizes fetch within NextJS in order to pull data from the "mysportsfeeds" API to pull statistics, logos, and headshots.

Attaining a players salary information was much more challenging, so I decided to develop some custom web scraping technology in order to traverse sporttrac.com's DOM and created JSON files based off the information attained. **NOTE** I would NOT have used web scraping for any kind of commercial based product.The API's I found for salary information are extremely expensive and I decided to improvise. I have no intention to use this data or custom functions I created outside of this job candidacy context.

On the frontend, I used NextJS, React, and ChartJS. All of the state is implemented in src/app/page.js. The Chart components access the "mysportsfeeds" API, the local JSON files, and assemble that data for Chart.JS, which is a library that utilizes HTML Canvas to place data in the view field.

The graph I am using is a Bubble Graph with x and y coordinates. The x axis is for team salary data, the y axis is for the selected statistic.

The app is deployed on vercel here: https://nba-front-office.vercel.app/

Thank you so much for the opportunity. I look forward to hearing from you.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
