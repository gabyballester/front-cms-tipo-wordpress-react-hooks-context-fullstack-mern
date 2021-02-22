import { useState, useRef } from 'react';
import * as Icons from "@material-ui/icons";
import * as Core from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { minLengthValidation, emailValidation } from '../../../services/formValidation';

import './RegisterForm.scss';

export default function RegisterForm() {
    const classes = useStyles();

    const useStyles = makeStyles((theme) => ({
        margin: {
          margin: theme.spacing(1),
        },
      }));
      

    const emailInputContainer = useRef();

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

        if (type === "email") {
            setFormValid({ ...formValid, [name]: emailValidation(e.target, emailInputContainer.current) });
        }
        if (type === "password") {
            setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 6) });
        }
        if (type === "checkbox") {
            setFormValid({ ...formValid, [name]: e.target.checked });
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(inputs);

    };

    return (
        <form className="register-form" onSubmit={handleSubmit} onChange={handleChange}>
            {/* email input */}
            <div ref={emailInputContainer} className="input-container error">

            <FormControl className={classes.margin}>
        <InputLabel htmlFor="input-with-icon-adornment">With a start adornment</InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>

                <input className="data-input error"
                    startAdornment={
                        <Core.InputAdornment position="start">
                            <Icons.MailOutline />
                        </Core.InputAdornment>
                    }
                    name="email"
                    type="email"
                    placeholder="Correo electrónico"
                    value={inputs.email}
                    onChange={inputValidation}
                />


                {/* <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                            <AccountCircle />
                            </InputAdornment>
                        }
        /> */}

            </div>
            {/* password input */}
            <div className="input-container">
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
            <div className="input-container">
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
            <div className="checkbox-container"
                onClick={() => setInputs({ privacyPolicy: !inputs.privacyPolicy })}
            >
                <input
                    type="checkbox"
                    onChange={inputValidation}
                    name="privacyPolicy"
                    className="checkbox"
                    checked={inputs.privacyPolicy} />
                <label className="label-conditions">He leído y acepto la política de privacidad</label>
            </div>
            <button type="submit">
                Crear cuenta
      </button>
        </form>
    )
}