import { useRef, useState } from 'react';
import styles from '../styles/calculator.module.scss';

const Calculator = ({ setFormOpen }) => {

	const costRef = useRef();
	const [costValue, setCostValue] = useState(1000000);
	const percentRef = useRef();
	const [percentValue, setPercentValue] = useState(10);
	const durationRef = useRef();
	const [durationValue, setDurationValue] = useState(1);


	let percentValueFormated = Math.round(percentValue * costValue / 100);
	const monthlyPrice = Math.round((costValue - (percentValueFormated * ((percentValue) / (1 + (percentValue)) - durationValue - 1))) / 100)
	const contractSum = Math.round(percentValueFormated + (durationValue * monthlyPrice));



	const formattedMonthlyPrice = (monthlyPrice.toLocaleString('ru-RU', {
		useGrouping: true,
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
		minimumIntegerDigits: 1,
	})).replace(/,/g, ' ');
	const formattedContractSum = (contractSum.toLocaleString('ru-RU', {
		useGrouping: true,
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
		minimumIntegerDigits: 1,
	})).replace(/,/g, ' ');



	const handleCostChange = (event) => {
		setCostValue(event.target.value);
	}
	const handlePercentChange = (event) => {
		setPercentValue(event.target.value);
	}
	const handleDurationChange = (event) => {
		setDurationValue(event.target.value);

	}

	const handleCostBlur = (event) => {
		const currentValue = event.target.value;

		if (currentValue < 1000000) {
			setCostValue(1000000);
		} else if (currentValue > 6000000) {
			setCostValue(6000000);
		}
	}

	const handlePercentBlur = (event) => {
		const currentValue = event.target.value;
		if (currentValue < 10) {
			setPercentValue(10);
		} else if (currentValue > 60) {
			setPercentValue(60);
		}
	}

	const handleDurationBlur = (event) => {
		const currentValue = event.target.value;
		if (currentValue < 1) {
			setDurationValue(1);
		} else if (currentValue > 60) {
			setDurationValue(60);
		}
	}
	const handleFocusChange = () => {
		percentValueFormated = 0;
		setPercentValue(10)
	}

	const handleSubmit = () => {
		setFormOpen(true);
		const data = [{ costValue, percentValue, durationValue, percentValueFormated, monthlyPrice, contractSum }]
		console.log(data)
	}

	return (
		<div className={styles.calculator}>
			<p className={styles.title}>Рассчитайте стоимость автомобиля в лизинг</p>
			<div className={styles.settings}>
				<div className={styles.settings__item}>
					<p>Стоимость автомобиля</p>
					<div className={styles.slider}>
						<input className={styles.slider__display} onBlur={handleCostBlur} onChange={handleCostChange} type="number" value={costValue} />
						<input
							type={'range'}
							className={styles.slider__track}
							value={costValue}
							onChange={handleCostChange}
							ref={costRef}
							min={1000000}
							max={6000000}
							style={{ '--value': costValue, '--max': 5000000, '--min': 1000000 }} />
						<p className={styles.slider__classificator}>₽</p>
					</div>
				</div>
				<div className={styles.settings__item}>
					<p>Первоначальный взнос</p>
					<div className={styles.slider}>
						<input className={styles.slider__display} onFocus={handleFocusChange} onBlur={handlePercentBlur} disabled type="type" value={percentValueFormated + ' ₽'} />
						<input
							disabled
							type={'range'}
							className={styles.slider__track}
							value={percentValue}
							onChange={(e) => setPercentValue(e.target.value)}
							ref={percentRef}
							min={10}
							max={60}
							style={{ '--value': percentValue, '--max': 50, '--min': 10 }}
						/>
						<p style={{ fontSize: '20px' }} className={[styles.slider__classificator + ' disabled ']}>{percentValue}%</p>
					</div>
				</div>
				<div className={styles.settings__item}>
					<p>Срок лизинга</p>
					<div className={styles.slider}>
						<input className={styles.slider__display} onBlur={handleDurationBlur} onChange={handleDurationChange} type="number" value={durationValue} />
						<input
							type={'range'}
							className={styles.slider__track}
							value={durationValue}
							onChange={(e) => setDurationValue(e.target.value)}
							ref={durationRef}
							min={1}
							max={60}
							style={{ '--value': durationValue, '--max': 60, '--min': 1 }} />
						<p className={styles.slider__classificator}>мес.</p>
					</div>
				</div>
			</div>
			<div className={styles.price}>
				<div className={styles.price__item}>
					<p>Сумма договора лизинга</p>
					<span>{formattedContractSum} ₽</span>
				</div>
				<div className={styles.price__item}>
					<p>Ежемесячный платеж от</p>
					<span>{formattedMonthlyPrice} ₽</span>
				</div>
				<button onClick={handleSubmit} className={styles.price__item + ' filledorange'}>Оставить заявку</button>
			</div>
		</div >
	)
}

export default Calculator