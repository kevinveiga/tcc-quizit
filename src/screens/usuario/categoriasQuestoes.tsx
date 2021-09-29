import React, { ReactElement } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import { Button } from 'react-native-elements';

import { categoriasQuestoes } from '../../categoriasQuestoes';
import { ICategoriasQuestoes } from '../../interface';

import { Spacer } from '../../components/layout/spacer';
import { Title1, Title2 } from '../../components/text/text';

import { button } from '../../styles/button';
import { layout } from '../../styles/layout';
import { variable } from '../../styles/variable';

function CategoriasQuestoes(): ReactElement {
    // STYLE
    const styles = StyleSheet.create({
        categoriasQuestoes: {
            minHeight: Dimensions.get('window').height - 100 - variable.headerHeight - variable.footerHeight,
            justifyContent: 'flex-start'
        }
    });

    return (
        <View style={layout.container}>
            <ScrollView>
                <View style={styles.categoriasQuestoes}>
                    <Title1 textAlign="center">QUIZ IT</Title1>

                    <Spacer />

                    <Title2>Selecione a categoria de questões.</Title2>

                    <Spacer height={25} />

                    {categoriasQuestoes
                        .sort((a, b) => {
                            return (a.order || 0) - (b.order || 0);
                        })
                        .map(({ id, name }: ICategoriasQuestoes) => {
                            return <Button buttonStyle={button.buttonPrimary} key={id} title={name} type="solid" />;
                        })}
                </View>
            </ScrollView>
        </View>
    );
}

export default CategoriasQuestoes;
