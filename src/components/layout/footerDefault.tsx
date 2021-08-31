import React, { ReactElement } from 'react';

import { P } from '../text/p';

import { variable } from '../../styles/variable';

export function FooterDefault(): ReactElement {
    return (
        <>
            <P color={variable.colorWhite} textAlign="center">
                Footer
            </P>
        </>
    );
}
