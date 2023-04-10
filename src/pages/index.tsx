import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ countries }) {
  return (
    <>
    
<h1>List of coubtries</h1>

{
  countries.map((country, index)=> {
    return (
      <div key={index}>
<Link href={`/${country.name.common}`} passHref>
        <p>{country.name.official}, while capital - {country.capital}</p>
</Link>
        <hr />
      </div>
      )
  })
}
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