# NBAFrontOffice

The purpose of this app is to deliver important information to an NBA Front Office.

This app will take player and team statistics and compare those stats to their salary for that given season. The goal is to put a dollar value on statistics. How much money are we paying a player or entire team per points, rebounds, assists, fouls, win percentage?

On the backend, this app utilizes fetch within NextJS in order to pull data from the "mysportsfeeds" API to pull statistics, logos, and headshots.

Attaining a players salary information was much more challenging, so I decided to develop some custom web scraping technology in order to traverse sporttrac.com's DOM and created JSON files based off the information attained. **NOTE** I would NOT have used web scraping for any kind of commercial based product.The API's I found for salary information are extremely expensive and I decided to improvise. I have no intention to use this data or custom functions I created outside of this job candidacy context.

On the frontend, I used NextJS, React, and ChartJS. All of the state is implemented in src/app/page.js. The Chart components access the "mysportsfeeds" API, the local JSON files, and assemble that data for Chart.JS, which is a library that utilizes HTML Canvas to place data in the view field.

The graph I am using is a Bubble Graph with x and y coordinates. The x axis is for team salary data, the y axis is for the selected statistic.

The app is deployed on vercel here: https://nba-front-office.vercel.app/

Thank you so much for the opportunity. I look forward to hearing from you.
