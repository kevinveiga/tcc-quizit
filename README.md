## **App Quiz IT**

### **ADMIN**

-   user: admin@admin.com
-   password: admin123

### **REQUISITOS DO PROJETO**

#### **GIT**

-   Instalar o [GIT](https://www.digitalocean.com/community/tutorials/como-instalar-o-git-no-ubuntu-18-04-inicio-rapido-pt)

#### **NODEJS**

-   Instalar o [NodeJS versão 14](https://nodejs.org/en/download/) para o projeto, sem utilizar o nvm já que o husky não funciona corretamente com o nvm.

**Caso opte por mesmo assim utilizar o nvm terá que desinstalar todas as outras versões (menos a 14) para poder comitar as alterações do projeto.**

#### **YARN**

-   Caso não tenha o yarn instalado utilize o comando:

```
sudo npm install -g yarn
```

### **CONFIGURAÇÕES DE IDE**

#### **INSTALAÇÃO DE PLUGINS**

-   EditorConfig (exemplo no VS Code: EditorConfig for VS Code)
-   ESLint (exemplo no VS Code: ESLint)
-   Prettier (exemplo no VS Code: Prettier - Code formatter)
-   Styled Components (exemplo no VS Code: vscode-styled-components (Julien Poissonnier))

#### **CONFIGURAÇÃO**

-   Configurar para formatar o código ao salvar o arquivo

#### **VS CODE CONFIGURAÇÃO**

```js
"[javascript]": {
 "editor.defaultFormatter": "esbenp.prettier-vscode"
 },
"editor.formatOnSave": true,
"files.eol": "\n",
"files.watcherExclude": {
 "**/.git/objects/**": true,
 "**/.git/subtree-cache/**": true,
 "**/node_modules/*/**": true
 },
"git.autofetch": true
```

### **ORGANIZAÇÃO**

Pastas dentro de src:

-   assets: Todos os "assets" do aplicativo
-   components: Componentes customizados para o aplicativo
-   contexts: Contextos de controle dos estados ou funcionalidades usadas em todo o aplicativo
-   entities: Interfaces para o autocompletar das API's
-   helpers: Funções úteis para uso em geral no aplicativo
-   routers: Rotas do aplicativo são controladas pelo StackNavigator, usando os dados em Routes.ts, a parte responsável pelos menus são controladas pelo DrawerNavigator, usando os dados em Routes.ts
-   screens: Telas do aplicativo
-   services: Serviços externos, como requisições das API's, ou ferramentas que não tem um porquê de estar misturada com a lógica da aplicação
-   stores: Actions, reducers e custom hooks
-   styles: Estilos do aplicativo

#### **NOTAS DE CÓDIGO**

-   Seguindo padrões mais novos do React, **NÃO USE CONST PARA COMPONENTES**. Olhando os exemplos mais novos, componentes são declarados como function ao invés de const. O motivo principal do React estar usando function ao invés de declarar const, é que a function funciona fora de ordem na chamada, e const precisa estar declarado anteriormente ao uso do mesmo. Um componente não é constante, e sim, função. Faz sentido usar const para funções anônimas, mas o componente por si só não é função anônima, e sim, uma função bem definida.
-   Funções compartilhadas, ficam dentro de helpers apropriados. Não fique espalhando com Copy/Paste, códigos duplicados.

### **PADRÕES DO PROJETO**

-   Nomes no singular: Todas as pastas, exceto as pastas na raiz de "src"
-   Nomes no plural: Todas as pastas na raiz de "src", nomes de arquivos específicos, como por exemplo, que trazem uma lista de dados. Ex: src/screens/noticias.tsx
-   Idioma inglês: Todos os nomes, exceto nomes próprios, como seções ou páginas
-   lowerCamelCase: Pastas, nomes de arquivos, custom hooks, variáveis, funções, propriedades, métodos. Ex: useAuth(), functionName
-   UpperCamelCase: Nomes dos componentes, nomes de styled components, imports, interfaces. Ex: Home(), AuthProvider()
-   spinal-case: Nomes de arquivos fonts, imagens ou svgs, nomes de classes CSS. Ex: src/pages/fale-conosco.tsx, public/images/banner-principal.jpg, public/svgs/svg-user.svg, .has-value

### **ANDROID**

#### **CONFIGURAÇÃO**

-   Instalação de NodeJS, Yarn e Android Studio de acordo com esse link [https://react-native.rocketseat.dev/android/linux](https://react-native.rocketseat.dev/android/linux)

-   Instalar Google Licensing Library [https://www.kindacode.com/article/react-native-please-accept-all-necessary-android-sdk-licenses/](https://www.kindacode.com/article/react-native-please-accept-all-necessary-android-sdk-licenses/)

-   Aumentar o limite de arquivos observados no sistema [https://stackoverflow.com/questions/55763428/react-native-error-enospc-system-limit-for-number-of-file-watchers-reached](https://stackoverflow.com/questions/55763428/react-native-error-enospc-system-limit-for-number-of-file-watchers-reached)

-   Configurar o MultiDex [https://developer.android.com/studio/build/multidex?hl=pt-br](https://developer.android.com/studio/build/multidex?hl=pt-br)

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

#### **CHAVE SHA1**

-   Para pegar a chave SHA1, digite no terminal:
    keytool -list -v -alias androiddebugkey -keystore android/app/debug.keystore

#### **EMULADOR**

-   Melhor opção para emulador é utilizando um aparelho, seguir este link [https://react-native.rocketseat.dev/usb/android](https://react-native.rocketseat.dev/usb/android)

### **IOS**

<!-- TODO -->

#### **EMULADOR**

Melhor opção para emulador é utilizando um aparelho, seguir este link [https://react-native.rocketseat.dev/usb/ios](https://react-native.rocketseat.dev/usb/ios)

### **CONFIGURAÇÕES DO AMBIENTE**

##### Primeira execução ou sempre que atualizar o package.json

-   Executar no terminal:
    yarn install

##### Ambiente de desenvolvimento por USB (com o aparelho conectado e autorizado)

-   Executar server em um terminal:
    yarn start --reset-cache
    ou para usar o ENV de produção:
    yarn start:prod --reset-cache

-   Executar emulador Android em outro terminal:
    yarn android
    ou a versão de produção
    yarn android --variant=release

-   Executar emulador IOS em outro terminal:
    yarn ios
    ou a versão de produção
    yarn ios --variant=release

##### Android: Gerar arquivo APK

-   MUITO CUIDADO ao fazer qualquer alteração dentro de "android", pode estar funcionando no emulador, mas não funcionar no APK

-   Primeiro executar no terminal:
    cd android && ./gradlew clean && cd ..

-   Depois executar no terminal o comando de bundle do env de desenvolvimento ou de produção:
    Env de desenvolvimento:
    yarn run publish:dev bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle

    Env de produção:
    yarn run publish bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle

-   Depois executar no terminal o comando de APK versão debug ou release:
    Versão debug do APK:
    cd android && ./gradlew assembleDebug && cd ..

    \*Obs: os arquivos de APK se encontram na pasta android/app/build/outputs/apk/debug,
    cada arquivo é para um range de versões do Android, no Moto G7, por exemplo, funcionou o arquivo
    app-armeabi-v7a-debug

    Versão release do APK:
    cd android && ./gradlew assembleRelease && cd ..

    \*Obs: os arquivos de APK se encontram na pasta android/app/build/outputs/apk/release,
    cada arquivo é para um range de versões do Android, no Moto G7, por exemplo, funcionou o arquivo
    app-armeabi-v7a-release

-   [Como instalar aplicativo APK no Android](https://www.tekimobile.com/dicas/como-instalar-aplicativos-apk-no-seu-android-manualmente/)

#### **REFERÊNCIAS**

-   [https://developer.android.com/](https://developer.android.com/)

-   [Publicar no Google Play](https://reactnative.dev/docs/signed-apk-android)

### **PROBLEMAS QUE PODEM OCORRER**

-   Se for alterado o valor de "appName" no arquivo app.json, para de funcionar o app, sempre que for necessário alterar esse valor, se deve mudar também em vários arquivos do Android e do IOS, uma alternativa é criar outro projeto e executar o comando:
    yarn react-native init novo_nome --template react-native-template-typescript

-   Caso as alterações não estejam aparecendo na tela, no terminal digite R para atualizar o emulador

-   Problema de commit no Rusky com a mensagem de versão do NodeJS, reinicie o VS Code

-   [Problemas com React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/installation/)

#### **Android**

-   Erro ao executar algum comando ou se a tela do app não abre no celular

    -   Executar no terminal:
        cd android && ./gradlew clean && cd ..
    -   E depois:
        yarn start --reset-cache

### **JAVASCRIPT**

#### **BOAS PRÁTICAS**

-   [Usar Optional Chaining](https://medium.com/@guigaoliveira_/entendendo-o-optional-chaining-no-javascript-964ca6928598)

-   [Usar Destructuring](https://crunchtech.medium.com/object-destructuring-best-practice-in-javascript-9c8794699a0d)

#### **BIBLIOTECAS**

-   [Dayjs](https://day.js.org/docs/en/installation/typescript)

#### **DOCUMENTAÇÃO JS**

-   [JSDOC](https://www.valentinog.com/blog/jsdoc/)

### **REACT**

#### **BOAS PRÁTICAS**

-   [10 coisas que não se deve fazer no React](https://medium.com/better-programming/10-things-not-to-do-when-building-react-applications-bc26d4f38644)

-   [React Clean Code](https://javascript.plainenglish.io/6-important-tips-to-write-clean-react-code-5ef29d6a73a6)

-   [Async Await/Promises](https://blog.rocketseat.com.br/quando-utililzar-promises-e-async-await-no-useeffect-do-react/)

-   [Nomeação de funções e propriedades](https://medium.com/javascript-in-plain-english/handy-naming-conventions-for-event-handler-functions-props-in-react-fc1cbb791364)

-   [Usar ES6 default values e não defaultProps](https://medium.com/@matanbobi/react-defaultprops-is-dying-whos-the-contender-443c19d9e7f1)

#### **ORGANIZAÇÃO**

-   Organizar "import" na ordem correta, tanto na ordem de contexto como na ordem alfabética. Ex:

```jsx
// REACT AND REACT-NATIVE
import React from 'react';
import { Platform } from 'react-native';

// LIBRARY
import { NavigationContainer } from '@react-navigation/native';

// OTHERS
import { apiUrlLogin } from '../config';
import { useAuth } from '../../contexts/auth';
import { maskPhone } from './helpers/mask';

// COMPONENT
import { Modal } from './components/modal/modal';

// SCREEN
import Login from './screens/login/login';

// STYLE
import { layout } from './styles/layout';

// SVG
import imageName from './assets/svg/svg-svgName.svg';

// IMAGE
import imageName from './assets/image/imageName.jpg';
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

#### **BOAS PRÁTICAS**

-   Componentes, custom hooks, reducers não devem ser constantes, eu seja, funções do React são declaradas como function, já em funções de JavaScript, utilize const. Ex:

```jsx
function Home(): ReactElement {
    ...
}

export default Home;

export function useApp(): IAppContext {...}

export const HomeStyled = styled.div`...`;

export const maskPhone = (value: string): IMask => {...}
```

-   Usar export default somente em componentes da pasta "src/screens", exceto em funções expecíficas. Ex:

```jsx
import * as yup from 'yup';

yup.setLocale({
    ...
});

export default yup;
```

-   Quando for utilizado o export default, usar no final do arquivo. Ex:

```jsx
function MyApp({ Component, pageProps }: AppProps): ReactElement {
    ...
}

export default MyApp;
```

-   Quando for usar a verificação de length no jsx, SEMPRE usar um operador de comparação. Ex:

```jsx
stateLista.length > 0;
```

-   Não se deve usar um componente de listagem do React Native (ex: FlatList) dentro de um componente ScrollView, por isso o ScrollView é utilizado somente nos locais necessários e não direto no componente de layout pai

-   Evitar utilizar estilos no componente de ScrollView, neste componente algumas propriedades não funcionam

#### **AUTENTICAÇÃO**

-   [Autenticação](https://www.youtube.com/watch?v=J7pkSP18Oko&ab_channel=PradipDebnath)

-   [Autenticação do Facebook](https://www.youtube.com/watch?v=pDLo7Pfcvfk&ab_channel=PradipDebnath)

-   [Autenticação do Google](https://rnfirebase.io/auth/social-auth)

#### **FONT**

-   [Custom fonts](https://mehrankhandev.medium.com/ultimate-guide-to-use-custom-fonts-in-react-native-77fcdf859cf4)

#### **FORM**

-   [Unform](https://unform.dev)

-   [Unform - Vídeo](https://www.youtube.com/watch?v=P65RJTTqkN4&ab_channel=Rocketseat)

-   [Radio button](https://github.com/moschan/react-native-simple-radio-button)

#### **NAVIGATION**

-   [React Navigation](https://reactnavigation.org/)

-   [React Navigation - Auth](https://www.robinwieruch.de/react-native-navigation)

-   [React Navigation - Quando não tem acesso a propriedade navigation](https://reactnavigation.org/docs/navigating-without-navigation-prop/)

#### **REFERÊNCIAS**

-   [Navegação, Autenticação e Context API](https://www.youtube.com/watch?v=KISMYYXSIX8&list=PLFeoM_Vx7KVaboPP4guU9qHobY9qA8a6k&index=10&ab_channel=Rocketseat)

### **STYLE**

#### **BIBLIOTECAS**

-   [React Native Elements](https://reactnativeelements.com/)

-   [React Native SVG](https://medium.com/mtholla/react-native-how-to-use-svgs-193e384e1d1b)

#### **COMPONENTES E PROPRIEDADES**

-   [FlexBox - React Native](https://reactnative.dev/docs/flexbox)

-   [Image](https://reactnative.dev/docs/image-style-props#props)

### **TYPESCRIPT**

#### **BOAS PRÁTICAS**

-   [Não usar React.FC](https://fettblog.eu/typescript-react-why-i-dont-use-react-fc/)

-   [Usar Function Declaration](https://blog.echobind.com/react-with-typescript-components-as-function-declarations-vs-function-expressions-e433ac8d6938)

-   [Usar Interface e ReactElement - Exemplos](https://thoughtbot.com/blog/type-safe-state-modeling-with-typescript-and-react-hooks)

#### **EXEMPLOS**

##### ChangeEvent:

```jsx
onChangeText={(
    element: React.ChangeEvent<{ value: string }>
    ) => {
    console.warn('element: ', element);
}}
```

#### **REFERÊNCIAS**

-   [VS Code e TypeScript](https://code.visualstudio.com/docs/languages/typescript)

-   [React Native e TypeScript](https://reactnative.dev/docs/typescript)

-   [Declaration file](https://basarat.gitbook.io/typescript/type-system/intro/d.ts)

-   [Componentização](https://medium.com/reactbrasil/trabalhando-com-componentiza%C3%A7%C3%A3o-no-react-typescript-e0aa8f5de5db)

-   [UseState](https://medium.com/ableneo/typing-of-react-hooks-in-typescript-947b200fa0b0)

### **SVG**

#### **OTIMIZAÇÃO**

-   Limpar código desnecessário, combinar paths quando possível, deixar com o fill default, tirar sobras da viewbox do svg, entre outras otimizações, tudo isso pode ser feito com o programa [Inkscape](https://inkscape.org/release/inkscape-master/?latest=1)

-   Depois das otimizações no Inkscape, otimizar o arquivo no site [SvgOmg](https://jakearchibald.github.io/svgomg/)

-   Os arquivos de svg se encontram na pasta 'assets/svg', o nome dos arquivos e suas propriedades das tags, devem seguir o padrão das já existentes
