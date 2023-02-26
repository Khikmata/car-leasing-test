import Image from 'next/image';
import { useState } from 'react';
import loadingIcon from '../assets/icons/Loading.svg';
import tg from '../assets/icons/tg.svg';
import wa from '../assets/icons/whatsapp.svg';
import styles from '../styles/form.module.scss';

const Form = ({ formOpen, setFormOpen }) => {

	const [phone, setPhone] = useState('');
	const [name, setName] = useState('');
	const [phoneError, setPhoneError] = useState(false);
	const [nameError, setNameError] = useState(false);
	const [phoneValid, setPhoneValid] = useState(false);
	const [nameValid, setNameValid] = useState(false);

	const handlePhoneChange = (event) => {
		const value = event.target.value;
		const digitsOnly = value.replace(/\D/g, '');
		const formatted = digitsOnly.replace(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/, '+$1 ($2) $3 $4 $5');
		if (formatted.length === 11) {
			setPhoneValid(true)
		} else {
			setPhoneValid(false)
		}
		setPhone(formatted);
	};


	const handleNameChange = (event) => {
		const value = event.target.value;
		setName(value);
		const nameRegex = /^[a-zA-Z\u0400-\u04ff]+$/;
		const isValid = nameRegex.test(value);
		setNameError(!isValid);
	};

	const handlePhoneBlur = () => {
		const phoneRegex = /^\+\d{1}\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}$/;
		let isValid = phoneRegex.test(phone);
		if (phone === '') {
			isValid = true;
		}
		if (isValid) {
			setPhoneValid(true);
		}
		setPhoneError(!isValid);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			setPhone('');
			setName('');
			setNameError('');
			setPhoneError('');
			setFormOpen(false);
		}, 2000);

	};

	const handleClose = () => {
		setPhone('');
		setName('');
		setNameError('');
		setPhoneError('');
		setFormOpen(false);
	};

	const [isLoading, setIsLoading] = useState(false);

	const handleLoading = () => {

	}


	return (
		<div className={formOpen ? [styles.form, styles.active].join(' ') : [styles.form]}>
			<div className={styles.container}>
				<div onClick={handleClose} className={styles.form__close}>x</div>
				<span className={styles.form__title}>Онлайн-заявка</span>
				<p className={styles.form__description}>Заполните форму, и мы вскоре свяжемся с вами, чтобы ответить на все вопросы</p>
				<form action="/api/form" method="post" className={styles.form__block} onSubmit={handleSubmit}>
					<div className={styles.form__inputs}>
						<div className={styles.input}>
							<label className={styles.form__phone} htmlFor="phone">
								Телефон *
							</label>
							{(!phoneError && phoneValid && phone !== '') && <div className={styles.form__phone__valid}>✔</div>}
							<input
								required
								maxLength={11}
								minLength={11}
								type="tel"
								placeholder="+7 (234) 567 22 33"
								className={`forms__input phone ${phoneError ? 'error' : ''}`}
								name="phone"
								value={phone}
								onChange={handlePhoneChange}
								onBlur={handlePhoneBlur}
							/>
							{phoneError && (
								<p role="alert" style={{ color: "#D53234" }}>
									Номер телефона указан неверно
								</p>
							)}
						</div>
						<div className={styles.input}>
							{(!nameError && name !== '') && <div className={styles.form__name__valid}>✔</div>}
							<input
								placeholder="Имя"
								className={`forms__input ${nameError ? 'error' : ''}`}
								required
								maxLength={16}
								minLength={2}
								type='text'
								pattern="[a-zA-Z\u0400-\u04ff\s]+"
								value={name}
								onChange={handleNameChange}
							/>
							{nameError && (
								<p role="alert" style={{ color: "#D53234" }}>
									Имя должно быть от 2 до 16 символов A-Z
								</p>
							)}
						</div>
					</div>
					<div className={styles.form__submit}>
						<p>
							Нажимая на кнопку «Оставить заявку», я даю согласие <b> на обработку персональных данных </b>
						</p>
						<button onClick={handleLoading} className="filledorange" type="submit">
							{!isLoading ? 'Оставить заявку' : <Image className='loading' src={loadingIcon} alt={'Загрузка...'} />}
						</button>
					</div>
				</form>
				<div className={styles.form__links}>
					<a href='#' target="_blank" className={styles.form__link}>
						<Image src={wa} alt="" />
					</a>
					<a href='#' target="_blank" className={styles.form__link}>
						<Image src={tg} alt="" />
					</a>
				</div >
			</div >
		</div >
	)
}

export default Form