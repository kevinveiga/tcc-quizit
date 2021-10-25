import React, { ReactElement, useCallback, useEffect, useState, useRef } from 'react';

import { useField } from '@unform/core';
import { Input } from 'react-native-elements';

import { maskCep, maskCurrency, maskPhone } from '../../helpers/mask';
import { IInput, IInputReference } from '../../interface';

import { inputPrimary } from '../../styles/form';
import { variable } from '../../styles/variable';

export function InputCep({
    cbFunction,
    label,
    leftIcon,
    maxLength = 9,
    name = 'cep',
    placeholder = 'Cep',
    rightIcon,
    theme = inputPrimary,
    ...props
}: IInput): ReactElement {
    const inputRef = useRef<IInputReference>(null);

    const { defaultValue, error, fieldName, registerField } = useField(name);

    const [stateText, setStateText] = useState(maskCep(defaultValue).formattedValue);

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputRef.current,
            getValue: (ref: any) => {
                return maskCep(ref.props.value || '').cleanValue;
            }
        });
    }, [fieldName, registerField]);

    const handleChangeText = useCallback(
        (value: string) => {
            const { formattedValue } = maskCep(value);

            setStateText(formattedValue);

            if (cbFunction) {
                cbFunction(value);
            }
        },
        [cbFunction]
    );

    return (
        <Input
            autoCapitalize="none"
            autoCompleteType="postal-code"
            containerStyle={theme.containerStyle}
            errorStyle={{ color: variable.colorAlert }}
            errorMessage={error && error}
            keyboardType="numeric"
            label={label}
            leftIcon={leftIcon}
            maxLength={maxLength}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            ref={inputRef}
            rightIcon={rightIcon}
            textContentType="postalCode"
            value={stateText}
            defaultValue={defaultValue}
            {...props}
        />
    );
}

export function InputCurrency({
    cbFunction,
    label,
    leftIcon,
    maxLength = 31,
    name = 'valor',
    placeholder = 'R$',
    rightIcon,
    theme = inputPrimary,
    ...props
}: IInput): ReactElement {
    const inputRef = useRef<IInputReference>(null);

    const { defaultValue, error, fieldName, registerField } = useField(name);

    const [stateText, setStateText] = useState(maskCurrency(defaultValue).formattedValue);

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputRef.current,
            getValue: (ref: any) => {
                return maskCurrency(ref.props.value || '').cleanValue;
            }
        });
    }, [fieldName, registerField]);

    const handleChangeText = useCallback(
        (value: string) => {
            const { formattedValue } = maskCurrency(value);

            setStateText(formattedValue);

            if (cbFunction) {
                cbFunction(value);
            }
        },
        [cbFunction]
    );

    return (
        <Input
            autoCapitalize="none"
            autoCompleteType="off"
            containerStyle={theme.containerStyle}
            errorStyle={{ color: variable.colorAlert }}
            errorMessage={error && error}
            keyboardType="numeric"
            label={label}
            leftIcon={leftIcon}
            maxLength={maxLength}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            ref={inputRef}
            rightIcon={rightIcon}
            textContentType="none"
            value={stateText}
            defaultValue={defaultValue}
            {...props}
        />
    );
}

export function InputDefault({
    cbFunction,
    label,
    leftIcon,
    maxLength = 300,
    name = 'default',
    placeholder,
    rightIcon,
    theme = inputPrimary,
    ...props
}: IInput): ReactElement {
    const inputRef = useRef<IInputReference>(null);

    const { defaultValue, error, fieldName, registerField } = useField(name);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = defaultValue;
        }
    }, [defaultValue]);

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputRef.current,
            clearValue: () => {
                if (inputRef.current) {
                    inputRef.current.setNativeProps({ text: '' });
                    inputRef.current.value = '';
                }
            },
            getValue: () => {
                if (inputRef.current) {
                    return inputRef.current.value;
                }

                return '';
            },
            setValue: (ref: any, value: string) => {
                if (inputRef.current) {
                    inputRef.current.setNativeProps({ text: value });
                    inputRef.current.value = value;
                }
            }
        });
    }, [fieldName, registerField]);

    const handleChangeText = useCallback(
        (value: string) => {
            if (inputRef.current) {
                inputRef.current.value = value;
            }

            if (cbFunction) {
                cbFunction(value);
            }
        },
        [cbFunction]
    );

    return (
        <Input
            autoCapitalize="none"
            autoCompleteType="off"
            containerStyle={theme.containerStyle}
            errorStyle={{ color: variable.colorAlert }}
            errorMessage={error && error}
            keyboardType="default"
            label={label}
            leftIcon={leftIcon}
            maxLength={maxLength}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            ref={inputRef}
            rightIcon={rightIcon}
            textContentType="none"
            defaultValue={defaultValue}
            {...props}
        />
    );
}

export function InputEmail({
    cbFunction,
    label,
    leftIcon,
    maxLength = 70,
    name = 'email',
    placeholder = 'E-mail',
    rightIcon,
    theme = inputPrimary,
    ...props
}: IInput): ReactElement {
    const inputRef = useRef<IInputReference>(null);

    const { defaultValue, error, fieldName, registerField } = useField(name);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = defaultValue;
        }
    }, [defaultValue]);

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputRef.current,
            clearValue: () => {
                if (inputRef.current) {
                    inputRef.current.setNativeProps({ text: '' });
                    inputRef.current.value = '';
                }
            },
            getValue: () => {
                if (inputRef.current) {
                    return inputRef.current.value;
                }

                return '';
            },
            setValue: (ref: any, value: string) => {
                if (inputRef.current) {
                    inputRef.current.setNativeProps({ text: value });
                    inputRef.current.value = value;
                }
            }
        });
    }, [fieldName, registerField]);

    const handleChangeText = useCallback(
        (value: string) => {
            if (inputRef.current) {
                inputRef.current.value = value;
            }

            if (cbFunction) {
                cbFunction(value);
            }
        },
        [cbFunction]
    );

    return (
        <Input
            autoCapitalize="none"
            autoCompleteType="email"
            containerStyle={theme.containerStyle}
            errorStyle={{ color: variable.colorAlert }}
            errorMessage={error && error}
            inputStyle={theme.inputStyle}
            keyboardType="email-address"
            label={label}
            leftIcon={leftIcon}
            leftIconContainerStyle={theme.leftIconContainerStyle}
            maxLength={maxLength}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            ref={inputRef}
            rightIcon={rightIcon}
            textContentType="emailAddress"
            defaultValue={defaultValue}
            {...props}
        />
    );
}

export function InputPassword({
    cbFunction,
    label,
    leftIcon,
    maxLength = 30,
    name = 'password',
    placeholder = 'Senha',
    rightIcon,
    theme = inputPrimary,
    ...props
}: IInput): ReactElement {
    const inputRef = useRef<IInputReference>(null);

    const { defaultValue, error, fieldName, registerField } = useField(name);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = defaultValue;
        }
    }, [defaultValue]);

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputRef.current,
            clearValue() {
                if (inputRef.current) {
                    inputRef.current.setNativeProps({ text: '' });
                    inputRef.current.value = '';
                }
            },
            getValue() {
                if (inputRef.current) {
                    return inputRef.current.value;
                }

                return '';
            },
            setValue(ref, value) {
                if (inputRef.current) {
                    inputRef.current.setNativeProps({ text: value });
                    inputRef.current.value = value;
                }
            }
        });
    }, [fieldName, registerField]);

    const handleChangeText = useCallback(
        (value: string) => {
            if (inputRef.current) {
                inputRef.current.value = value;
            }

            if (cbFunction) {
                cbFunction(value);
            }
        },
        [cbFunction]
    );

    return (
        <Input
            autoCapitalize="none"
            autoCompleteType="password"
            containerStyle={theme.containerStyle}
            errorStyle={{ color: variable.colorAlert }}
            errorMessage={error && error}
            inputStyle={theme.inputStyle}
            keyboardType="default"
            label={label}
            leftIcon={leftIcon}
            leftIconContainerStyle={theme.leftIconContainerStyle}
            maxLength={maxLength}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            ref={inputRef}
            rightIcon={rightIcon}
            secureTextEntry={true}
            textContentType="password"
            defaultValue={defaultValue}
            {...props}
        />
    );
}

export function InputPasswordConfirm({
    cbFunction,
    label,
    leftIcon,
    maxLength = 30,
    name = 'passwordConfirm',
    placeholder = 'Confirmar senha',
    rightIcon,
    theme = inputPrimary,
    ...props
}: IInput): ReactElement {
    const inputRef = useRef<IInputReference>(null);

    const { defaultValue, error, fieldName, registerField } = useField(name);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = defaultValue;
        }
    }, [defaultValue]);

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputRef.current,
            clearValue() {
                if (inputRef.current) {
                    inputRef.current.setNativeProps({ text: '' });
                    inputRef.current.value = '';
                }
            },
            getValue() {
                if (inputRef.current) {
                    return inputRef.current.value;
                }

                return '';
            },
            setValue(ref, value) {
                if (inputRef.current) {
                    inputRef.current.setNativeProps({ text: value });
                    inputRef.current.value = value;
                }
            }
        });
    }, [fieldName, registerField]);

    const handleChangeText = useCallback(
        (value: string) => {
            if (inputRef.current) {
                inputRef.current.value = value;
            }

            if (cbFunction) {
                cbFunction(value);
            }
        },
        [cbFunction]
    );

    return (
        <Input
            autoCapitalize="none"
            autoCompleteType="password"
            containerStyle={theme.containerStyle}
            errorStyle={{ color: variable.colorAlert }}
            errorMessage={error && error}
            inputStyle={theme.inputStyle}
            keyboardType="default"
            label={label}
            leftIcon={leftIcon}
            leftIconContainerStyle={theme.leftIconContainerStyle}
            maxLength={maxLength}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            ref={inputRef}
            rightIcon={rightIcon}
            secureTextEntry={true}
            textContentType="password"
            defaultValue={defaultValue}
            {...props}
        />
    );
}

export function InputPhone({
    cbFunction,
    label,
    leftIcon,
    maxLength = 15,
    name = 'celular',
    placeholder = '(DD) 99999-9999',
    rightIcon,
    theme = inputPrimary,
    ...props
}: IInput): ReactElement {
    const inputRef = useRef<IInputReference>(null);

    const { defaultValue, error, fieldName, registerField } = useField(name);

    const [stateText, setStateText] = useState(maskPhone(defaultValue).formattedValue);

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputRef.current,
            getValue: (ref: any) => {
                return maskPhone(ref.props.value || '').cleanValue;
            }
        });
    }, [fieldName, registerField]);

    const handleChangeText = useCallback(
        (value: string) => {
            const { formattedValue } = maskPhone(value);

            setStateText(formattedValue);

            if (cbFunction) {
                cbFunction(value);
            }
        },
        [cbFunction]
    );

    return (
        <Input
            autoCapitalize="none"
            autoCompleteType="tel"
            containerStyle={theme.containerStyle}
            errorStyle={{ color: variable.colorAlert }}
            errorMessage={error && error}
            keyboardType="numeric"
            label={label}
            leftIcon={leftIcon}
            maxLength={maxLength}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            ref={inputRef}
            rightIcon={rightIcon}
            textContentType="telephoneNumber"
            value={stateText}
            defaultValue={defaultValue}
            {...props}
        />
    );
}
