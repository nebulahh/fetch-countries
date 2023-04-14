import styles from '@/styles/Home.module.css'
import Link from 'next/link'

export default function Navbar() {
  
  return (
<header className={styles.header}> 
      <nav className={styles.nav}> 
<Link href={`/`} passHref>
       <p>
       Where in the world?
       </p>
 </Link>
       <p>
       <span> </span>
       Dark Mode
       </p>
      </nav>
    </header>
    )
}