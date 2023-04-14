import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ countries }) {

  return (
    <>
    <Navbar />
<main>
<div className={styles.searchContainer}>
  <div className={styles.searchBar}>
<button className={styles.searchQuerySubmit} type="submit" name="searchQuerySubmit">
      <svg
      style={{width:24 +"px", height:24+"px" }}viewBox="0 0 24 24"><path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
      </svg>
    </button>
   
    <input className={styles.searchQueryInput} type="text" name="searchQueryInput" placeholder="Search" value="" />
    
  </div>
  
  
<select name="choice">
  <option value="first">First Value</option>
  <option value="second" selected>Second Value</option>
  <option value="third">Third Value</option>
</select>

</div>



{
  countries.map((country, index)=> {
    return (
      <div key={index}>
<Link href={`/${country.name.common}`} passHref>

<div className={styles.card}>
  <img src={country.flags.png} alt=""/>
  <div className={styles.description}>
    <h2>{country.name.official}</h2>
    <p>Population: {country.population}</p>
    <p>Region: {country.region}</p>
    <p>Capital: {country.capital}</p>
    
  </div>
</div>
</Link>
        <hr />
      </div>
      )
  })
}
</main>
    </>
  )
}

export async function getStaticProps() {
  const response = await fetch('https://restcountries.com/v3.1/all')
  const data = await response.json()
  console.log(data.slice(0, 2))
  
  return {
    props: {
      countries: data
    }
  }
}