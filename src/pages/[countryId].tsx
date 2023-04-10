export default function Details({ details }) {
  console.log(details)
  return (
    <>
{
 details[0].name.official
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