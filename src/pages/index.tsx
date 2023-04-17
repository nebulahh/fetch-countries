import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export default function Home({ countries }: any) {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [allCountries, setAllCountries] = useState(countries)
  const [searchParam] = useState(["capital", "name", "region"]);
  const [filterParam, setFilterParam] = useState("All");
  
  const data = Object.values(allCountries);

  function search(items: any) {
    return items.filter((item: any) => {
      if (item.region == filterParam) {
        return searchParam.some((newItem) => {
          return (
            item?.region
              .toString()
              .toLowerCase()
              .indexOf(searchQuery.toLowerCase()) > -1
          );
        });
      } 
/*else if (filterParam == "All") {
        return searchParam.some((newItem) => {
          return (
            item[newItem]?.common
              ?.toString()
              ?.toLowerCase()
              ?.indexOf(searchQuery.toLowerCase()) > -1
          );
        });
      }*/
    });
  }
  return (
    <div className={styles.body}>
      <Navbar />
      <main>
        <div className={styles.container}>
          <div className={styles.searchContainer}>
            <div className={styles.searchBarContainer}>
              <div className={styles.searchBar}>
                 <span>
                   <FontAwesomeIcon icon={faSearch} />
                 </span>
                <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={styles.searchQueryInput} placeholder="Search for a country..." name="search" />
                  </div>
                </div>
            <select className={styles.filter}
              onChange={(e) => {
                setFilterParam(e.target.value);
              }}
              title='filter' name="choice">
             {/* <option value="All">Filter by Region</option>*/}
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
                <div className={styles.grid} >

          {
            search(data).map((country: any, index: number) => {
              return (
                  <div className={styles.card} key={index}>
                    <Link className={styles.anchor} href={`/${country.name.common}`} passHref>
                      <img src={country.flags.png} alt={country.flags.alt} />
                      <div className={styles.description}>
                        <h2 className={styles.name}>{country.name.official}</h2>
                        <p>Population: {country.population}</p>
                        <p>Region: {country.region}</p>
                        <p>Capital: {country.capital}</p>
                      </div>
                    </Link>
                  </div>
              )
            })
            }
                </div>
            
        </div>
      </main>
    </div>
  )
  
}

export async function getStaticProps() {
  const response = await fetch('https://restcountries.com/v3.1/region/africa')
  const countries = await response.json()

  return {
    props: {
      countries
    }
  }
}
