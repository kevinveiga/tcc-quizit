import React, { ReactElement } from 'react';

import { P } from '../Text/P';

import { variable } from '../../Style/variable';

export default function FooterDefault(): ReactElement {
    return (
        <>
            <P color={variable.colorWhite} textAlign="center">
                Footer
            </P>
        </>
    );
}
