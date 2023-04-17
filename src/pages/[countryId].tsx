import Navbar from '@/components/Navbar'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function Details({ details }: any) {
  return (
    <>
      <Navbar />
      
      <main>
        <div className={styles.container}>
          <Link className={styles.anchor} href={`/`} passHref>
            <div className={styles.back}>
              <span>
                <FontAwesomeIcon icon={faLongArrowLeft} />
              </span>
              <p>Back</p>
            </div>
          </Link>
          {
            details.map((country: any, index: number) => {
              return (
                <div key={index}>
                  <div className={styles.card}>
                    <img src={country.flags.png} alt={country.flags.alt} />
                  </div>
                  <div className={styles.detailDesc}>
                    <b className={styles.name}>{country.name.official}</b>
                    <div className={styles.detailContent}>
                      <p>Native Name: {country.name.nativeName?.eng?.official}</p>
                      <p>Population: {country.population}</p>
                      <p>Region: {country.region}</p>
                      <p>Sub-region: {country.subregion}</p>
                      <p>Capital: {country.capital}</p>
                    </div>
                    <div className={styles.moreDetail}>
                      <p>Top Level Domain: {country?.tld}</p>
                      <p>Currencies: {country.currencies?.name}</p>
                      <p>Languages: {country?.languages?.eng}</p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </main>
    </>
  )
}

export async function getStaticPaths() {
const response = await fetch('https://restcountries.com/v3.1/all')
  const data = await response.json()
  const paths = data.map((country: any) => {
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

export async function getStaticProps(context: any) {
  const { params } = context
  const response = await fetch(`https://restcountries.com/v3.1/name/${params.countryId}`)
  const data = await response.json()
  
  return {
    props: {
      details: data
    }
  }
}
