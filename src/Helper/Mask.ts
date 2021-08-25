interface IMask {
    cleanValue: string;
    formattedValue: string;
}

export const maskCep = (value: string): IMask => {
    const newValue = value.replace(/\D/g, '');
    const cleanValue = newValue;

    let formattedValue = newValue;

    if (!newValue) {
        return { cleanValue, formattedValue };
    }

    formattedValue = formattedValue.replace(/^(\d{5})(\d)/, '$1-$2');

    return { cleanValue, formattedValue };
};

export const maskCurrency = (value: string): IMask => {
    const newValue = value.replace(/\D/g, '');
    const cleanValue = newValue;

    let formattedValue = newValue;

    if (!newValue) {
        return { cleanValue, formattedValue };
    }

    formattedValue = `R$ ${formattedValue.replace(/(\d)(\d{2})$/, '$1,$2').replace(/(?=(\d{3})+(\D))\B/g, '.')}`;

    return { cleanValue, formattedValue };
};

export const maskPhone = (value: string): IMask => {
    const newValue = value.replace(/\D/g, '');
    const cleanValue = newValue;

    let formattedValue = newValue;

    if (!newValue) {
        return { cleanValue, formattedValue };
    }

    formattedValue = formattedValue.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d)(\d{4})$/, '$1-$2');

    return { cleanValue, formattedValue };
};
