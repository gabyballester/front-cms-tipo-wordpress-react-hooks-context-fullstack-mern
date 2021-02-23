import { useState, useRef } from 'react';
import * as Icons from "@material-ui/icons";
import { minLengthValidation, emailValidation } from '../../../utils/formValidation';
import { notification } from 'antd';
import 'antd/dist/antd.css';
import { signUpApi } from "../../../api/user";

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
            setFormValid({ ...formValid, [name]: e.target.checked });
        }

    };

    const handleSubmit = async e => {
        e.preventDefault();
        const { email, password, repeatPassword, privacyPolicy } = formValid;

        if (!email || !password || !repeatPassword || !privacyPolicy) {

            notification.error({
                message: "Todos los campos son obligatorios"
            })

        } else {

            const passwordVal = inputs.password
            const repeatPasswordVal = inputs.repeatPassword

            if (passwordVal !== repeatPasswordVal) {
                notification.error({
                    message: "Las contraseñas tienen que ser iguales"
                })
            } else {
                const result = await signUpApi(inputs);
                if (!result.ok) {
                    notification.error({
                        message: result.message
                    });
                } else {
                    notification.success({
                        message: result.message
                    });
                    resetForm();
                }
            }
        }

    };

    const resetForm = () => {
        emailInput.current.classList.remove("success", "error");
        passInput.current.classList.remove("success", "error");
        repPassInput.current.classList.remove("success", "error");

        setInputs({
            email: "",
            password: "",
            repeatPassword: "",
            privacyPolicy: false
        });

        setFormValid({
            email: false,
            password: false,
            repeatPassword: false,
            privacyPolicy: false
        });
    };

    return (
        <form className="container-form" onSubmit={handleSubmit} onChange={handleChange}>
            {/* email input */}
            <div className="input-container-form" ref={emailInput}>
                <Icons.MailOutline />
                <input className="data-input-form"
                    name="email"
                    type="email"
                    placeholder="Correo electrónico"
                    value={inputs.email}
                    onChange={inputValidation}
                />
            </div>
            {/* password input */}
            <div className="input-container-form" ref={passInput}>
                <Icons.LockOutlined />
                <input className="data-input-form"
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    value={inputs.password}
                    onChange={inputValidation}
                />
            </div>
            {/* password input */}
            <div id="repeatPassword" className="input-container-form" ref={repPassInput}>
                <Icons.LockOutlined />
                <input className="data-input-form"
                    name="repeatPassword"
                    type="password"
                    placeholder="Repite contraseña"
                    value={inputs.repeatPassword}
                    onChange={inputValidation}
                />
            </div>
            {/* checkbox container */}
            <div className="checkbox-container-form">
                <input
                    type="checkbox"
                    name="privacyPolicy"
                    className="checkbox"
                    checked={inputs.privacyPolicy}
                    onChange={inputValidation}
                />

                <label className="label-conditions">He leído y acepto la política de privacidad</label>
            </div>
            <button className="button-form" type="submit">
                Crear cuenta
      </button>
        </form>
    )
}