import axios from 'axios';
import cheerio from 'cheerio'
import { getInnerHTML } from 'domutils';

const getSalaryCapData = () =>{
   const url = 'https://www.spotrac.com/nba/cap/'
   axios(url).then(response =>{
    const html = response.data
    const $ = cheerio.load(html)
    $('td', html).each(function(){
      const title = $(this).text()
      console.log(title)
    })
   })
}


export  {getSalaryCapData}
