import * as Yup from 'yup';

Yup.setLocale({
    array: {
        max: 'Deve ter no máximo ${max} itens',
        min: 'Deve ter no mínimo ${min} itens'
    },
    date: {
        max: 'Deve ser menor que a data ${max}',
        min: 'Deve ser maior que a data ${min}'
    },
    mixed: {
        default: 'Não é válido',
        required: 'Campo obrigatório',
        oneOf: 'Deve ser um dos seguintes valores: ${values}',
        notOneOf: 'Não pode ser os valores: ${values}'
    },
    number: {
        integer: 'Deve ser um número inteiro',
        lessThan: 'Deve ser menor que ${less}',
        max: 'Máximo de ${max}',
        min: 'Mínimo de ${min}',
        moreThan: 'Deve ser maior que ${more}',
        negative: 'Deve ser um número negativo',
        notEqual: 'Não pode ser igual à ${notEqual}',
        positive: 'Deve ser um número posítivo'
    },
    string: {
        email: 'Formato de e-mail inválido',
        length: 'Deve ter exatamente ${length} caracteres',
        lowercase: 'Deve estar em maiúsculo',
        max: 'Deve ter no máximo ${max} caracteres',
        min: 'Deve ter pelo menos ${min} caracteres',
        trim: 'Não deve conter espaços no início ou no fim.',
        url: 'Deve ter um formato de URL válida',
        uppercase: 'Deve estar em minúsculo'
    }
});

export default Yup;
