import Image from 'next/image';
import { useEffect, useState } from 'react';
import arrowL from '../assets/icons/ArrowLeft.svg';
import arrowR from '../assets/icons/ArrowRight.svg';
import loading from '../assets/icons/Loading.svg';
import image from '../assets/images/sliderBG.svg';
import styles from '../styles/slider.module.scss';

const slides = [
	{
		src: image,
		title: 'Авто в лизинг для физических лиц',
		description: 'Получите машину за 5 дней',
	},
	{
		src: image,
		title: 'Второй слайд Второй слайд Второй слайд',
		description: 'Описание второго слайда',
	},
	{
		src: image,
		title: 'Третий слайд',
		description: 'Описание третьего слайда, Описание третьего слайда',
	},
	{
		src: image,
		title: 'Четвертый слайд',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, ex?',
	},
	{
		src: image,
		title: 'Пятый слайд',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
	},
	{
		src: image,
		title: 'Шестой слайд',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
	},
];

const Slider = ({ setFormOpen }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentIndex((currentIndex + 1) % slides.length);
		}, 10000);
		return () => clearInterval(intervalId);
	}, [currentIndex]);

	const handlePrevClick = () => {
		setCurrentIndex(currentIndex === 0 ? currentIndex : currentIndex - 1);
	};

	const handleNextClick = () => {
		setIsLoading(true)
		setTimeout(() => {
			setCurrentIndex((currentIndex === slides.length - 1) ? currentIndex : currentIndex + 1);
			setIsLoading(false)
		}, 1000)
	};

	const handleDotClick = (index) => {
		setCurrentIndex(index);
	};



	return (
		<div className={styles.slider}>
			<div className={styles.slider__content}>
				<h1 className={styles.slider__title}>
					{slides[currentIndex].title}
				</h1>
				<p className={styles.slider__description}>{slides[currentIndex].description}</p>
				<button onClick={() => setFormOpen(true)} className='button filledorange' type='button'>Оставить заявку</button>
			</div>
			<div className={styles.slider__image_container}>
				{slides.map((image, index) => (
					<Image
						priority={true}
						key={index}
						className={`${styles.slider__image} ${currentIndex === index ? styles.active : ''}`}
						src={image.src}
						alt={`slide-${index}`}

					/>
				))}
			</div>
			<div className={styles.slider__nav}>
				<div className={styles.slider__buttons}>
					<button disabled={currentIndex === 0} onClick={handlePrevClick} className={styles.slider__prev}>
						<Image src={arrowL} alt='Назад' />
					</button>
					<button disabled={currentIndex === slides.length - 1} onClick={handleNextClick} className={styles.slider__next}>
						{!isLoading ? <Image src={arrowR} className={styles.slider__next__arrow} alt='Вперед' /> : <Image className={styles.slider__next__loading} src={loading} alt={'Загрузка...'} />}
						<div className={styles.slider__next__border}></div>
					</button>
				</div>
				<div className={styles.slider__pagination}>
					{slides.map((_, index) => (
						<button
							key={index}
							onClick={() => handleDotClick(index)}
							className={`${styles.slider__dot} ${currentIndex === index ? styles.active : ''}`}
							type='button'
						/>
					))}
				</div>
			</div>
		</div >
	);
};
export default Slider