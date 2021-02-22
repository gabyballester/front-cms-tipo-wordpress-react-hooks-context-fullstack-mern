import { useState, useRef } from 'react';
import * as Icons from "@material-ui/icons";
import { minLengthValidation, emailValidation } from '../../../services/formValidation';
import { notification } from 'antd';
import 'antd/dist/antd.css';

import './RegisterForm.scss';

export default function RegisterForm() {

    const emailInput = useRef(null);
    const passInput = useRef(null);
    const repPassInput = useRef(null);

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        privacyPolicy: false
    });

    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false
    });

    const handleChange = e => {
        if (e.target.name === "privacyPolicy") {
            setInputs({
                ...inputs,
                // para sacar el valor del checkbox
                [e.target.name]: e.target.checked
            });
        } else {
            setInputs({
                // para sacar el valor del resto de inputs
                ...inputs,
                [e.target.name]: e.target.value
            });
        }
    };

    const inputValidation = e => {

        const { type, name } = e.target;
        if (name === "email") {
            setFormValid({ ...formValid, [name]: emailValidation(e.target, emailInput.current) });
        } else if (name === "password") {
            setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 6, passInput.current) });
        } else if (name === "repeatPassword") {
            setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 6, repPassInput.current) });
        } else if (type === "checkbox") {
            console.log('entra aqui')
            setFormValid({ ...formValid, [name]: e.target.checked });
        }

    };

    const handleSubmit = async e => {
        e.preventDefault();
        const { email, password, repeatPassword, privacyPolicy } = formValid;
        const emailVal = inputs.email;
        const passwordVal = inputs.password
        const repeatPasswordVal = inputs.repeatPassword
        const privacyPolicyVal = inputs.privacyPolicy

        if (!emailVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal) {

            notification.error({
                message: "Todos los campos son obligatorios"
            })
        } else {
            if (passwordVal != repeatPasswordVal) {
                notification.error({
                    message: "Las contraseñas tienen que ser iguales"
                })
            } else {
                notification.success({
                    message: "Cuenta creada"
                })
            }
        }

    };

    return (
        <form className="register-form" onSubmit={handleSubmit} onChange={handleChange}>
            {/* email input */}
            <div className="input-container" ref={emailInput}>
                <Icons.MailOutline />
                <input className="data-input"
                    name="email"
                    type="email"
                    placeholder="Correo electrónico"
                    value={inputs.email}
                    onChange={inputValidation}
                />
            </div>
            {/* password input */}
            <div className="input-container" ref={passInput}>
                <Icons.LockOutlined />
                <input className="data-input"
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    value={inputs.password}
                    onChange={inputValidation}
                />
            </div>
            {/* password input */}
            <div id="repeatPassword" className="input-container" ref={repPassInput}>
                <Icons.LockOutlined />
                <input className="data-input"
                    name="repeatPassword"
                    type="password"
                    placeholder="Repite contraseña"
                    value={inputs.repeatPassword}
                    onChange={inputValidation}
                />
            </div>
            {/* checkbox container */}
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    name="privacyPolicy"
                    className="checkbox"
                    checked={inputs.privacyPolicy}
                    onChange={inputValidation}
                />

                <label className="label-conditions">He leído y acepto la política de privacidad</label>
            </div>
            <button type="submit">
                Crear cuenta
      </button>
        </form>
    )
}