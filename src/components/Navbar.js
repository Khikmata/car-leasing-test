
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import logoblack from '.././assets/icons/logoblack.svg';
import logowhite from '.././assets/icons/logowhite.svg';
import styles from '../styles/navbar.module.scss';


const Navbar = ({ setBurgerOpen, burgerOpen, setFormOpen, formOpen, setDropdownOpen, dropdownOpen }) => {


	const [scrollY, setScrollY] = useState(0);


	useEffect(() => {
		function handleScroll() {
			setScrollY(window.scrollY);
		}

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const handleForm = () => {
		setBurgerOpen(false);
		setFormOpen(true);
	}

	const handleDropdown = (e) => {
		setDropdownOpen(true);
		e.stopPropagation();
	}

	const isMobile = useMediaQuery({ query: `(max-width: 426px)` });

	return (<>
		<div className={burgerOpen ? [styles.modal, styles.active].join(' ') : [styles.modal]}>
			{
				(scrollY > 0 &&
					<div onClick={() => setBurgerOpen(!burgerOpen)} className={styles.burgerModal}>
						<span className={burgerOpen ? [styles.burgerIcon, styles.active].join(' ') : [styles.burgerIcon]}></span>
					</div>)
			}
			<div>
				<ul className={burgerOpen ? [styles.list, styles.active].join(' ') : [styles.list]} >
					<li className={styles.link}><a href=''>Лизинг</a></li>
					<li className={styles.link}><a target="_blank">Каталог</a></li>
					<li className={styles.link}><a target="_blank">О нас</a></li>
				</ul>
			</div>
			<div className={styles.modalButton}>
				<button onClick={handleForm} className='button filledorange' type='button'>Оставить заявку</button>
			</div>
		</div>
		<div className={styles.navbar}>
			<div className={scrollY > 0 ? [styles.container, styles.active].join(' ') : [styles.container]}>
				<div className={styles.content}>
					<div className={styles.leftside}>
						{<Image className={styles.logo} src={(scrollY < 1 && isMobile) ? logowhite : logoblack} alt='logo' />}
						<p>лизинговая компания</p>
					</div>
					<div className={styles.rightside}>
						<div className={styles.pc}>
							<nav>
								<ul className={styles.list}>
									<li onMouseOver={handleDropdown} className={styles.link}>
										<a href='#' target="_blank">Лизинг</a>
									</li>
									<li className={styles.link}><a href='#' target="_blank">Каталог</a></li>
									<li className={styles.link}><a href='#' target="_blank">О нас</a></li>
								</ul>
								<ul className={dropdownOpen ? [styles.leasing__dropdown, styles.active].join(' ') : [styles.leasing__dropdown]}>
									<li href="#">Для личного использования</li>
									<li href="#">Для юридических диц</li>
									<li href="#">Калькулятор</li>
								</ul>
							</nav>
							<button onClick={handleForm} className='button outlinedorange' type='button'>Оставить заявку</button>
						</div>
						<div className={styles.mobile}>
							{
								!formOpen && <div onClick={() => setBurgerOpen(!burgerOpen)} className={styles.burger}>
									<span className={burgerOpen ? [styles.burgerIcon, styles.active].join(' ') : [styles.burgerIcon]}></span>
								</div>
							}
						</div>
					</div>
				</div>
			</div>
		</div >
	</>
	)
}

export default Navbar