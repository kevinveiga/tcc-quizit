## App Quiz IT

### Como é organizado?

Pastas dentro de src:

-   Asset: Todos os "assets" do aplicativo
-   Component: Componentes customizados para o aplicativo
-   Context: Contextos de controle dos estados ou funcionalidades usadas em todo o aplicativo
-   Entity: Interfaces para o autocompletar das API's
-   Helper: Funções úteis para uso em geral no aplicativo
-   Router: Rotas do aplicativo são controladas pelo StackNavigator, usando os dados em Routes.ts, a parte responsável pelos menus são controladas pelo DrawerNavigator, usando os dados em Routes.ts
-   Screen: Telas do aplicativo
-   Service: Serviços externos, como requisições das API's, ou ferramentas que não tem um porquê de estar misturada com a lógica da aplicação
-   Store: Actions, reducers e custom hooks
-   Style: Estilos do aplicativo

### Notas de código

-   Seguindo padrões mais novos do React, **NÃO USE CONST PARA COMPONENTES**. Olhando os exemplos mais novos, componentes são declarados como function ao invés de const. O motivo principal do React estar usando function ao invés de declarar const, é que a function funciona fora de ordem na chamada, e const precisa estar declarado anteriormente ao uso do mesmo. Um componente não é constante, e sim, função. Faz sentido usar const para funções anônimas, mas o componente por si só não é função anônima, e sim, uma função bem definida.
-   Funções compartilhadas, ficam dentro de helpers apropriados. Não fique espalhando com Copy/Paste, códigos duplicados.
-   Ao invés de implementar algo novo, **USE O QUE JÁ TEMOS**. Não queremos uma função nova "Super-Pica das Galáxias" que faça tudo. Use as que já tem, olhe nos helpers, e reaproveite. Se uma funcionalidade está faltando algo, aprimore-a ao invés de criar algo novo do seu gosto. É código _COLABORATIVO_, não código individual.
-   **NÃO QUEREMOS FUNCIONALIDADES DO TIPO ShortDate2, ShortDate3, ShortDateInfinito**. Pense um pouco em como nomear melhor as funcionalidades.

### **CONFIGURAÇÃO**

-   Instalação de NodeJS, Yarn e Android Studio de acordo com esse link [https://react-native.rocketseat.dev/android/linux](https://react-native.rocketseat.dev/android/linux)

-   Incluir no arquivo $HOME/.bashrc as linhas de código:

```
# NVM WITH YARN
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Load global yarn binaries
export PATH="$PATH:$(yarn global bin)"

# NVM USE
find-up() {
    path=$(pwd)
    while [[ "$path" != "" && ! -e "$path/$1" ]]; do
        path=${path%/*}
    done
    echo "$path"
}

cdnvm() {
    cd "$@";
    nvm_path=$(find-up .nvmrc | tr -d '\n')

    # If there are no .nvmrc file, use the default nvm version
    if [[ ! $nvm_path = *[^[:space:]]* ]]; then

        declare default_version;
        default_version=$(nvm version default);

        # If there is no default version, set it to `node`
        # This will use the latest version on your machine
        if [[ $default_version == "N/A" ]]; then
            nvm alias default node;
            default_version=$(nvm version default);
        fi

        # If the current version is not the default version, set it to use the default version
        if [[ $(nvm current) != "$default_version" ]]; then
            nvm use default;
        fi

        elif [[ -s $nvm_path/.nvmrc && -r $nvm_path/.nvmrc ]]; then
        declare nvm_version
        nvm_version=$(<"$nvm_path"/.nvmrc)

        declare locally_resolved_nvm_version
        # `nvm ls` will check all locally-available versions
        # If there are multiple matching versions, take the latest one
        # Remove the `->` and `*` characters and spaces
        # `locally_resolved_nvm_version` will be `N/A` if no local versions are found
        locally_resolved_nvm_version=$(nvm ls --no-colors "$nvm_version" | tail -1 | tr -d '\->*' | tr -d '[:space:]')

        # If it is not already installed, install it
        # `nvm install` will implicitly use the newly-installed version
        if [[ "$locally_resolved_nvm_version" == "N/A" ]]; then
            nvm install "$nvm_version";
        elif [[ $(nvm current) != "$locally_resolved_nvm_version" ]]; then
            nvm use "$nvm_version";
        fi
    fi
}
alias cd='cdnvm'
cd $PWD
```

### **ANDROID**

#### EMULADOR

-   Melhor opção para emulador é utilizando um aparelho, seguir este link [https://react-native.rocketseat.dev/usb/android](https://react-native.rocketseat.dev/usb/android)

#### COMANDOS

-   Executar no terminal apenas na primeira vez ou sempre que atualizar o package.json:
    yarn install

##### Ambiente de desenvolvimento por USB

###### Com o aparelho conectado e autorizado

-   Executar server em um terminal:
    yarn run start --reset-cache
    ou para usar o ENV de produção:
    yarn run start:prod --reset-cache

-   Executar emulador Android em outro terminal:
    yarn run android
    ou a versão de produção
    yarn run android --variant=release

-   Executar emulador IOS em outro terminal:
    yarn run ios
    ou a versão de produção
    yarn run ios --variant=release

##### Gerar arquivo APK

-   MUITO CUIDADO ao fazer qualquer alteração dentro de "android", pode estar funcionando no emulador, mas não funcionar no APK

-   Primeiro executar no terminal o comando de bundle:
    yarn run publish bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle

    ou para user o ENV de desenvolvimento:

    yarn run publish:dev bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle

-   Versão Debug do APK, executar no terminal o comando:
    cd android && ./gradlew clean assembleDebug && cd ..

    \*Obs: os arquivos de APK se encontram na pasta android/app/build/outputs/apk/debug,
    cada arquivo é para um range de versões do Android, no Moto G7, por exemplo, funcionou o arquivo
    app-armeabi-v7a-debug

-   Versão Release do APK, executar no terminal o comando:
    cd android && ./gradlew clean assembleRelease && cd ..

    \*Obs: os arquivos de APK se encontram na pasta android/app/build/outputs/apk/release,
    cada arquivo é para um range de versões do Android, no Moto G7, por exemplo, funcionou o arquivo
    app-armeabi-v7a-release

-   [Como instalar aplicativo APK no Android](https://www.tekimobile.com/dicas/como-instalar-aplicativos-apk-no-seu-android-manualmente/)

#### PROBLEMAS

-   Caso as alterações não estejam aparecendo na tela, no terminal digite R para atualizar o emulador

-   Erro ao executar algum comando ou tela do app não abre no celular

    -   Executar no terminal:
        cd android && ./gradlew clean && cd ..
    -   E depois:
        yarn run start --reset-cache

-   Problema de commit no Rusky com a mensagem de versão do NodeJS, reinicie o VS Code

-   [Problemas com React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/installation/)

#### REFERÊNCIAS

-   [https://developer.android.com/](https://developer.android.com/)

### **IOS**

<!-- TODO -->

#### EMULADOR

Melhor opção para emulador é utilizando um aparelho, seguir este link [https://react-native.rocketseat.dev/usb/ios](https://react-native.rocketseat.dev/usb/ios)

<!-- TODO -->

##### Ambiente de desenvolvimento

<!-- TODO -->

###### Com o aparelho conectado e autorizado

<!-- TODO -->

##### Ambiente de produção

<!-- TODO -->

#### COMANDOS

<!-- TODO -->

#### PROBLEMAS

<!-- TODO -->

-   [Problemas com React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/installation/)

## **BACKEND**

## **FRONTEND**

### **PADRÕES**

-   Nomes no singular: Todas as pastas;
-   Idioma inglês: Todos os nomes, exceto nomes próprios, como seções ou páginas;
-   lowerCamelCase: Nomes de arquivos comuns, variáveis, propriedades, funções, métodos - Ex: functionName;
-   UpperCamelCase: Nomes de pastas dentro de "/src", arquivos .ts e .tsx, imports, interfaces - Ex: ComponentName, Header.js;
-   spinal-case: Arquivos de imagens, svgs, exceto pastas de componentes e arquivos de componentes - Ex: topo-imagem-1.jpg, Header.js;

### **IDE - INSTALAÇÃO DE PLUGINS**

-   EditorConfig (exemplo no VS Code: EditorConfig for VS Code)
-   ESLint (exemplo no VS Code: ESLint)
-   Prettier (exemplo no VS Code: Prettier - Code formatter)
-   Styled Components (exemplo no VS Code: vscode-styled-components (Julien Poissonnier))

### **IDE - CONFIGURAÇÃO**

-   Configurar para formatar o código ao salvar o arquivo

### **IDE - VS CODE CONFIGURAÇÃO**

```js
"[javascript]": {
 "editor.defaultFormatter": "esbenp.prettier-vscode"
 },
"editor.formatOnSave": true,
"files.watcherExclude": {
 "**/.git/objects/**": true,
 "**/.git/subtree-cache/**": true,
 "**/node_modules/*/**": true
 },
"git.autofetch": true
```

### **JAVASCRIPT**

#### BOAS PRÁTICAS

-   [Usar Optional Chaining](https://medium.com/@guigaoliveira_/entendendo-o-optional-chaining-no-javascript-964ca6928598)

-   [Usar Destructuring](https://crunchtech.medium.com/object-destructuring-best-practice-in-javascript-9c8794699a0d)

#### BIBLIOTECAS

-   [Dayjs](https://day.js.org/docs/en/installation/typescript)

#### DOCUMENTAÇÃO JS

-   [JSDOC](https://www.valentinog.com/blog/jsdoc/)

### **REACT**

#### BOAS PRÁTICAS

-   [10 coisas que não se deve fazer no React](https://medium.com/better-programming/10-things-not-to-do-when-building-react-applications-bc26d4f38644);

-   [React Clean Code](https://javascript.plainenglish.io/6-important-tips-to-write-clean-react-code-5ef29d6a73a6)

-   [Async Await/Promises](https://blog.rocketseat.com.br/quando-utililzar-promises-e-async-await-no-useeffect-do-react/)

-   [Nomeação de funções e propriedades](https://medium.com/javascript-in-plain-english/handy-naming-conventions-for-event-handler-functions-props-in-react-fc1cbb791364)

-   [Usar ES6 default values e não defaultProps](https://medium.com/@matanbobi/react-defaultprops-is-dying-whos-the-contender-443c19d9e7f1)

#### ORGANIZAÇÃO

-   Organizar "import" na ordem correta, tanto na ordem de contexto como na ordem alfabética. Ex:

```jsx
// REACT AND REACT-NATIVE
import React from 'react';
import { Platform } from 'react-native';

// LIBRARY
import { NavigationContainer } from '@react-navigation/native';

// OTHERS
import { apiUrlLogin } from '../Config';
import { useAuth } from '../../Context/Auth';
import { maskPhone } from './Helper/Mask';

// COMPONENT
import { Modal } from './Component/Modal/Modal';

// SCREEN
import Login from './Screen/Login/Login';

// STYLE
import { layout } from './Style/Layout';

// SVG
import imageName from './Asset/Svg/svg-svgName.svg';

// IMAGE
import imageName from './Asset/Image/imageName.jpg';
```

-   Organização de código dentro do componente

```jsx
export default function ComponentName(): ReactElement {
    // VARIABLE
    const var1 = false;

    // STYLE
    const styles = StyleSheet.create({
        style: {
            flexGrow: 1,
            justifyContent: 'center'
        }
    });

    // STATE
    const [state1, setState1] = useState('');

    // FORM
    const {
        control,
        errors,
        formState: { touched },
        handleSubmit
    } = useForm({
        mode: 'onChange'
    });

    // FUNCTION
    function handleButton(): Dispatch<any> {
        return dispatch(state1);
    }

    // RULE
    if (state1) {
        return <Redirect to="/" />;
    }
```

### **REACT NATIVE**

#### BOAS PRÁTICAS

-   Componentes e custom hooks não devem ser constantes. Ex:

```jsx
export default function App(): ReactElement {...}

export function useApp(): IAppContext {...}
```

-   Usar export default somente em arquivos que retornam um único componente com código jsx, como por exemplo os componentes de "Screen"

-   Quando for usar a verificação de length no jsx, SEMPRE usar um operador de comparação. Ex:

```jsx
stateLista.length > 0;
```

-   Não se deve usar um componente de listagem do React Native (ex: FlatList) dentro de um componente ScrollView, por isso o ScrollView é utilizado somente nos locais necessários e não direto no componente de layout pai

-   Evitar utilizar estilos no componente de ScrollView, neste componente algumas propriedades não funcionam

#### FONTS

-   [Custom fonts](https://mehrankhandev.medium.com/ultimate-guide-to-use-custom-fonts-in-react-native-77fcdf859cf4)

#### FORMS

-   [Unform](https://unform.dev)

-   [Unform - Vídeo](https://www.youtube.com/watch?v=P65RJTTqkN4&ab_channel=Rocketseat)

#### NAVIGATION

-   [React Navigation](https://reactnavigation.org/)

-   [React Navigation - Auth](https://www.robinwieruch.de/react-native-navigation)

-   [React Navigation - Quando não tem acesso a propriedade navigation](https://reactnavigation.org/docs/navigating-without-navigation-prop/)

#### REFERÊNCIAS

-   [Navegação, Autenticação e Context API](https://www.youtube.com/watch?v=KISMYYXSIX8&list=PLFeoM_Vx7KVaboPP4guU9qHobY9qA8a6k&index=10&ab_channel=Rocketseat)

### **STYLE**

#### BIBLIOTECAS

-   [React Native Elements](https://reactnativeelements.com/)

-   [React Native SVG](https://medium.com/mtholla/react-native-how-to-use-svgs-193e384e1d1b)

#### COMPONENTES E PROPRIEDADES

-   [FlexBox - React Native](https://reactnative.dev/docs/flexbox)

-   [Image](https://reactnative.dev/docs/image-style-props#props)

### **TYPESCRIPT**

#### BOAS PRÁTICAS

-   [Não usar React.FC](https://fettblog.eu/typescript-react-why-i-dont-use-react-fc/)

-   [Usar Function Declaration](https://blog.echobind.com/react-with-typescript-components-as-function-declarations-vs-function-expressions-e433ac8d6938)

-   [Usar Interface e ReactElement - Exemplos](https://thoughtbot.com/blog/type-safe-state-modeling-with-typescript-and-react-hooks)

#### EXEMPLOS

##### ChangeEvent:

```jsx
onChangeText={(
    element: React.ChangeEvent<{ value: string }>
    ) => {
    console.warn('element: ', element);
}}
```

#### REFERÊNCIAS

-   [VS Code e TypeScript](https://code.visualstudio.com/docs/languages/typescript)

-   [React Native e TypeScript](https://reactnative.dev/docs/typescript)

-   [Declaration file](https://basarat.gitbook.io/typescript/type-system/intro/d.ts)

-   [Componentização](https://medium.com/reactbrasil/trabalhando-com-componentiza%C3%A7%C3%A3o-no-react-typescript-e0aa8f5de5db)

-   [UseState](https://medium.com/ableneo/typing-of-react-hooks-in-typescript-947b200fa0b0)

### **SVG**

#### OTIMIZAÇÃO

-   Limpar código desnecessário, combinar paths quando possível, deixar com o fill default, tirar sobras da viewbox do svg, entre outras otimizações, tudo isso pode ser feito com o programa [Inkscape](https://inkscape.org/release/inkscape-master/?latest=1)

-   Depois das otimizações no Inkscape, otimizar o arquivo no site [SvgOmg](https://jakearchibald.github.io/svgomg/)

-   Os arquivos de svg se encontram na pasta 'Assets/Svgs', o nome dos arquivos e suas propriedades das tags, devem seguir o padrão das já existentes
