import Navbar from '@/components/Navbar'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import Image from 'next/image'

export default function Details({ details }) {
  console.log(details[0])
  return (
    <>
    <Navbar />
<Link href={`/`} passHref>
    <div className={styles.back}>
    <p>Back</p>
    </div>
</Link>

{
 details.map((country, index) => {
   return (
     <div key={index}>
<div className={styles.card}>
  <img src={country.flags.png} alt=""/>
</div>
     
     <b>{country.name.official}</b>
     
     <p>Native Name: {country.name.nativeName?.eng?.official}</p>
     <p>Population: {country.population}</p>
    <p>Region: {country.region}</p>
    <p>Sub-region: {country.subregion}</p>
    <p>Capital: {country.capital}</p>
    
    <div>
    <p>Top Level Domain: {country.tld}</p>
    <p>Currencies: {country.currencies.BBD?.name}</p>
    <p>Languages: {country.languages.eng}</p>
    </div>
    
    <div>
    <b>Border countries</b>
    </div>
    
     </div>
     )
 })
}

    </>
  )
}

export async function getStaticPaths() {
const response = await fetch('https://restcountries.com/v3.1/all')
  const data = await response.json()
  const paths = data.map(country => {
    return {
      params: {
        countryId: `${country.name.common}`
      }
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const response = await fetch(`https://restcountries.com/v3.1/name/${params.countryId}`)
  const data = await response.json()
  
  return {
    props: {
      details: data
    }
  }
}