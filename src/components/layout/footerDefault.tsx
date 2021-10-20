import React, { ReactElement } from 'react';

import { P } from '../text/text';

import { variable } from '../../styles/variable';

export function FooterDefault(): ReactElement {
    return (
        <>
            <P color={variable.colorWhite} textAlign="center">
                Quiz IT
            </P>
        </>
    );
}
