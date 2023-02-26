import Calculator from '@/components/Calculator';
import Form from '@/components/Form';
import Navbar from '@/components/Navbar';
import Slider from '@/components/Slider';
import styles from '@/styles/Home.module.scss';
import Meta from '@/utlis/Meta';
import { useState } from 'react';


export default function Home() {

  const [burgerOpen, setBurgerOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);



  return (
    <>
      <Meta title='LeasingCar' description='Car leasing company' />
      <div onClick={() => setDropdownOpen(false)} className={styles.wrapper}>
        <div className={(burgerOpen || formOpen) ? [styles.modal, styles.active].join(' ') : [styles.modal]}></div>
        <Form formOpen={formOpen} setFormOpen={setFormOpen} />
        <div className={styles.container}>
          <header className={styles.header}>
            <Navbar
              setDropdownOpen={setDropdownOpen}
              dropdownOpen={dropdownOpen}
              setBurgerOpen={setBurgerOpen}
              burgerOpen={burgerOpen}
              setFormOpen={setFormOpen}
              formOpen={formOpen}
            />
          </header>
          <main>
            <Slider setFormOpen={setFormOpen} />
            <Calculator setFormOpen={setFormOpen} />
          </main>
        </div>
      </div>
    </>
  )
}
