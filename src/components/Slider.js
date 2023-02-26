import Image from 'next/image';
import { useEffect, useState } from 'react';
import arrowL from '../assets/icons/ArrowLeft.svg';
import arrowR from '../assets/icons/ArrowRight.svg';
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

// slides.map((slide, index) => {
// 	<>
// 		<div className={styles.slider__content}>
// 			<h1 className={styles.slider__title}>
// 				{slide.title}
// 			</h1>
// 			<p className={styles.slider__description}>{slide.description}</p>
// 			<button onClick={() => setFormOpen(true)} className='button filledorange' type='button'>Оставить заявку</button>
// 		</div>
// 		<div className={styles.slider__image_container}>
// 			<Image
// 				priority={true}
// 				key={index}
// 				className={`${styles.slider__image} ${currentIndex === index ? styles.active : ''}`}
// 				src={image.src}
// 				alt={`slide-${index}`}
// 			/>
// 		</div>
// 	</>
// })


const Slider = ({ setFormOpen }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

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
		setCurrentIndex((currentIndex === slides.length - 1) ? currentIndex : currentIndex + 1);
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
						<Image width={24} height={24} src={arrowL} alt='Назад' />
					</button>
					<button disabled={currentIndex === slides.length - 1} onClick={handleNextClick} className={styles.slider__next}>
						<Image width={8} height={48} src={arrowR} alt='Вперед' />
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